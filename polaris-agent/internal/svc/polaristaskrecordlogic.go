package svc

import (
	"fmt"
	recorder "github.com/qianjisantech/gosmo"
	"github.com/qianjisantech/gosmo/engine"
	"github.com/qianjisantech/polaris-discovery-sdk/core"
	"github.com/zeromicro/go-zero/core/logx"
	"log"
)

func HeartBeatCallback(svc *ServiceContext, resp *core.HeatBeatResponse) error {
	if len(resp.Data.Tasks) == 0 {
		// 没有任务，停止所有运行中的Gosmo实例
		_, err := svc.TaskManager.StopTask("1")
		if err != nil {
			return err
		}
		return nil
	}

	// 处理每个任务
	for _, taskResp := range resp.Data.Tasks {
		// 检查任务是否已经在运行
		if svc.TaskManager.IsTaskRunning(taskResp.Id) {
			continue
		}

		// 只处理需要运行状态的任务
		if !shouldStartTask(taskResp.Status) {
			continue
		}

		// 检查资源是否允许启动新任务
		if !svc.canStartNewTask() {
			logx.Infof("资源限制，无法启动新任务: %s", taskResp.Id)
			continue
		}

		// 启动任务
		err := svc.startTask(taskResp)
		if err != nil {
			logx.Errorf("启动任务失败: %s, 错误: %v", taskResp.Id, err)
			continue
		}
	}

	return nil
}

func (s *ServiceContext) StartGosmo(port string) error {

	// 初始化引擎
	enginer := engine.RecorderEngine{
		Port: ":" + port,
		InputRAWConfig: engine.InputRAWConfig{
			TrackResponse: true,
		},
		OutputStdout: true,
		OutputKafkaConfig: recorder.OutputKafkaConfig{
			Topic:   s.Config.Kafka.Topic,
			UseJSON: true,
			Host:    s.Config.Kafka.Host,
		},
	}

	// 启动引擎
	if err := enginer.Start(); err != nil {
		log.Printf("任务启动失败")
		return err
	}
	return nil
}

func (s *ServiceContext) AgentTaskStart() (err error) {

	tm := s.TaskManager

	// 创建一个符合 TaskFunc 类型的函数
	taskFunc := func() error {
		return s.StartGosmo(req.ListenPort)
	}

	// 启动任务
	task, err := tm.StartTask(req.Id, req.Name, req.ListenPort, req.EndTime, taskFunc)
	if err != nil {
		return fmt.Errorf("启动任务失败: %v", err)
	}

	logx.Infof("已启动任务 id为%d,名称为 %d,状态为%d 持续时间为 %d 监听端口为 %d", task.ID, task.Name, task.Status, task.Duration, task.ListenPort)
	return nil
}
