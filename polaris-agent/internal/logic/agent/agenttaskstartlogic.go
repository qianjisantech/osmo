package agent

import (
	"context"
	"fmt"
	recorder "github.com/qianjisantech/gosmo"
	"github.com/qianjisantech/gosmo-agent/common/errorx"
	"github.com/qianjisantech/gosmo/engine"
	"log"
	"time"

	"github.com/qianjisantech/gosmo-agent/internal/svc"
	"github.com/qianjisantech/gosmo-agent/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AgentTaskStartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAgentTaskStartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AgentTaskStartLogic {
	return &AgentTaskStartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}
func (l *AgentTaskStartLogic) startGosmo(port string) error {

	// 初始化引擎
	enginer := engine.RecorderEngine{
		Port: ":" + port,
		InputRAWConfig: engine.InputRAWConfig{
			TrackResponse: true,
		},
		OutputStdout: true,
		OutputKafkaConfig: recorder.OutputKafkaConfig{
			Topic:   l.svcCtx.Config.Kafka.Topic,
			UseJSON: true,
			Host:    l.svcCtx.Config.Kafka.Host,
		},
	}

	// 启动引擎
	if err := enginer.Start(); err != nil {
		log.Printf("任务启动失败")
		return err
	}
	return nil
}
func (l *AgentTaskStartLogic) validRequest(req *types.AgentTaskStartReq) error {
	if req.ListenPort == "" {
		return fmt.Errorf("监听端口不能为空")
	}
	return nil
}
func (l *AgentTaskStartLogic) AgentTaskStart(req *types.AgentTaskStartReq) (resp *types.AgentTaskStartResp, err error) {
	if err := l.validRequest(req); err != nil {
		return nil, errorx.NewCodeErrorf("参数校验失败%v", err)
	}

	tm := l.svcCtx.TaskManager

	// 创建一个符合 TaskFunc 类型的函数
	taskFunc := func() error {
		return l.startGosmo(req.ListenPort)
	}

	// 启动任务
	task, err := tm.StartTask(req.Id, req.Name, req.ListenPort, req.EndTime, taskFunc)
	if err != nil {
		return nil, errorx.NewCodeErrorf("启动任务失败: %v", err)
	}

	logx.Infof("已启动任务 id为%d,名称为 %d,状态为%d 持续时间为 %d 监听端口为 %d", task.ID, task.Name, task.Status, task.Duration, task.ListenPort)

	return &types.AgentTaskStartResp{
		Data: types.AgentTaskRunRespData{
			Id:         task.ID,
			Name:       task.Name,
			Status:     task.Status,
			Duration:   task.Duration,
			ListenPort: task.ListenPort,
			StartTime:  task.StartTime.Format(time.DateTime),
			EndTime:    task.EndTime.Format(time.DateTime),
		},
		Message: fmt.Sprintf("任务【%s】执行成功", req.Name),
		Success: true,
	}, nil
}
