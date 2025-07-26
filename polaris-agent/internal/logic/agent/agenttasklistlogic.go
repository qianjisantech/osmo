package agent

import (
	"context"
	"github.com/qianjisantech/gosmo-agent/internal/svc"
	"github.com/qianjisantech/gosmo-agent/internal/types"
	"github.com/zeromicro/go-zero/core/logx"
	"time"
)

type AgentTaskListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAgentTaskListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AgentTaskListLogic {
	return &AgentTaskListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AgentTaskListLogic) AgentTaskList(req *types.AgentTaskListReq) (resp *types.AgentTaskListResp, err error) {
	// 获取任务管理器实例
	taskMgr := l.svcCtx.TaskManager

	// 获取所有任务列表
	tasks := taskMgr.GetActiveTasks()

	// 转换为API响应格式
	taskList := make([]types.AgentTaskListRespData, 0, len(tasks))
	for _, task := range tasks {
		status, _ := taskMgr.GetTaskStatus(task.ID)
		taskList = append(taskList, types.AgentTaskListRespData{
			Id:         task.ID,
			Name:       task.Name,
			Duration:   task.Duration,
			Status:     status,
			ListenPort: task.ListenPort,
			StartTime:  task.StartTime.Format(time.DateTime),
			EndTime:    task.EndTime.Format(time.DateTime),
		})
	}

	logx.Infof("获取任务列表成功，共%d个任务", len(taskList))
	return &types.AgentTaskListResp{
		Data:    taskList,
		Message: "获取任务列表成功",
		Success: true,
	}, nil
}
