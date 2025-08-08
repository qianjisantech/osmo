package consumer

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/segmentio/kafka-go"
	"gorm.io/gorm"
	"log"
	"os"
	"os/signal"
	"polaris/gen/model"
	"polaris/gen/query"
	"polaris/internal/svc"
	"strings"
	"syscall"
	"time"
)

type TrafficKafkaMsg struct {
	URL       string            `json:"url"`
	Type      string            `json:"type"`
	ID        string            `json:"id"`
	Timestamp string            `json:"timestamp"`
	Method    string            `json:"method"`
	Body      string            `json:"body"`
	Headers   map[string]string `json:"headers"`
}

// 最大重试次数
const maxRetries = 3

// HandleTransfer 处理消息并转存数据库（增加重试机制）
func HandleTransfer(svcCtx *svc.ServiceContext, msg kafka.Message) error {
	var lastErr error

	// 带重试的逻辑
	for i := 0; i < maxRetries; i++ {
		err := processSingleMessage(svcCtx, msg)
		if err == nil {
			return nil // 成功处理
		}

		lastErr = err
		log.Printf("处理消息失败 (尝试 %d/%d): %v", i+1, maxRetries, err)

		// 非最后一次重试时等待
		if i < maxRetries-1 {
			time.Sleep(time.Second * time.Duration(i+1)) // 指数退避
		}
	}

	return fmt.Errorf("消息处理失败（最终错误）: %w", lastErr)
}

// processSingleMessage 实际处理单条消息的逻辑
func processSingleMessage(svcCtx *svc.ServiceContext, msg kafka.Message) error {
	// 解析Kafka消息
	log.Printf("处理消息: Topic=%s Partition=%d Offset=%d Key=%s Value=%s",
		msg.Topic, msg.Partition, msg.Offset, string(msg.Key), string(msg.Value))

	message, err := parseKafkaMessage(msg.Value)
	if err != nil {
		log.Printf("解析消息失败: %v", err)
		return fmt.Errorf("解析消息失败: %v", err)
	}
	log.Printf("解析出来的信息: %v", message)

	// 先查询任务记录获取任务名称
	var taskRecord model.PolarisTaskRecord
	taskID := string(msg.Key)
	if err := svcCtx.DB.Where("id = ?", taskID).First(&taskRecord).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("警告: 未找到对应的任务记录, TaskID: %s", taskID)
			// 可以设置默认任务名称或返回错误
			taskRecord.Name = "未知任务"
		} else {
			log.Printf("查询任务记录失败: %v", err)
			return fmt.Errorf("查询任务记录失败: %v", err)
		}
	}

	// 先查询是否已存在该 APIID 的记录
	var existingRecord model.PolarisTrafficPool
	err = svcCtx.DB.Where(query.PolarisTrafficPool.APIID.Eq(message.ID)).First(&existingRecord).Error

	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		// 记录不存在，根据类型创建记录
		if message.Type == "1" { // 请求数据
			headers := mapToJsonString(message.Headers)
			tx := svcCtx.DB.Create(&model.PolarisTrafficPool{
				APIID:          message.ID,
				RequestHeaders: &headers,
				RequestBody:    &message.Body,
				URL:            message.URL,
				Method:         message.Method,
				CompletedFlag:  0,
				TaskID:         string(msg.Key),
				TaskName:       taskRecord.Name,
			})
			if tx.Error != nil {
				return fmt.Errorf("创建请求记录失败: %v", tx.Error)
			}
			log.Printf("创建请求记录成功，APIID: %s", message.ID)
		} else if message.Type == "2" { // 响应数据
			headers := mapToJsonString(message.Headers)
			tx := svcCtx.DB.Create(&model.PolarisTrafficPool{
				APIID:           message.ID,
				ResponseHeaders: &headers,
				ResponseBody:    &message.Body,
				HTTPType:        &message.Method,
				CompletedFlag:   0,
				TaskID:          string(msg.Key),
				TaskName:        taskRecord.Name,
			})
			if tx.Error != nil {
				return fmt.Errorf("创建请求记录失败: %v", tx.Error)
			}
			log.Printf("创建请求记录成功，APIID: %s", message.ID)
			return nil
		}
	} else if err == nil {
		// 记录已存在，根据类型更新相应字段
		if message.Type == "1" { // 请求数据
			updateFields := map[string]interface{}{
				"request_headers": mapToJsonString(message.Headers),
				"request_body":    message.Body,
				"url":             message.URL,
				"method":          message.Method,
				"completed_flag":  1,
			}

			tx := svcCtx.DB.Model(&existingRecord).Updates(updateFields)
			if tx.Error != nil {
				return fmt.Errorf("更新请求数据失败: %v", tx.Error)
			}
			log.Printf("更新请求数据成功，APIID: %s", message.ID)
		} else if message.Type == "2" { // 响应数据
			responseHeaders := mapToJsonString(message.Headers)
			updateFields := map[string]interface{}{
				"response_headers": responseHeaders,
				"response_body":    message.Body,
				"http_type":        message.Method,
				"completed_flag":   1,
			}

			tx := svcCtx.DB.Model(&existingRecord).Updates(updateFields)
			if tx.Error != nil {
				return fmt.Errorf("更新响应数据失败: %v", tx.Error)
			}
			log.Printf("更新响应数据成功，APIID: %s", message.ID)
		}
	} else {
		// 查询出错
		return fmt.Errorf("查询流量记录失败，APIID: %s, 错误: %v", message.ID, err)
	}

	return nil

}

// handleKafkaError 处理Kafka错误
func handleKafkaError(err error) {
	if shouldShutdown(err) {
		log.Printf("致命错误，即将关闭: %v", err)
		os.Exit(1)
	}
	log.Printf("Kafka错误: %v", err)
}

func shouldShutdown(err error) bool {
	return strings.Contains(err.Error(), "fatal") ||
		strings.Contains(err.Error(), "unrecoverable")
}

func HandleShutdown(cancel context.CancelFunc, reader *kafka.Reader) {
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	<-sigChan
	fmt.Println("\nReceived shutdown signal")

	// 优雅关闭
	if reader != nil {
		if err := reader.Close(); err != nil {
			log.Printf("关闭Kafka reader失败: %v", err)
		}
	}
	cancel()
}
func parseKafkaMessage(msg []byte) (*TrafficKafkaMsg, error) {
	// 解析外层请求
	var trafficKafkaMsg *TrafficKafkaMsg
	if err := json.Unmarshal(msg, &trafficKafkaMsg); err != nil {
		return nil, fmt.Errorf("failed to parse request: %v", err)
	}

	return trafficKafkaMsg, nil
}
func mapToJsonString(headers map[string]string) string {
	// 转换为 JSON 字符串
	jsonBytes, err := json.Marshal(headers)
	if err != nil {
		fmt.Printf("转换失败: %v\n", err)
		return ""
	}

	jsonStr := string(jsonBytes)
	return jsonStr
}
