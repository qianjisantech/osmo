package consumer

import (
	"context"
	"fmt"
	"github.com/segmentio/kafka-go"
	"log"
	"os"
	"os/signal"
	"polaris/gen/model"
	"polaris/internal/svc"
	"strings"
	"syscall"
	"time"
)

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
	// 示例：将消息存入数据库
	// 这里替换为你的实际业务逻辑
	log.Printf("处理消息: Topic=%s Partition=%d Offset=%d Key=%s Value=%s",
		msg.Topic, msg.Partition, msg.Offset, string(msg.Key), string(msg.Value))

	// 模拟可能出现的错误（实际使用时移除）
	tx := svcCtx.DB.Create(&model.PolarisTrafficPool{
		Content: string(msg.Value),
		APIID:   string(msg.Key),
		TaskID:  string(msg.Key),
	})
	log.Printf("创建流量%v", tx)
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
