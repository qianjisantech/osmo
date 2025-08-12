package task

import (
	"context"
	"log"
	"osmo/constant"
	"osmo/gen/model"
	"osmo/internal/common/errorx"
	"strings"
	"time"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskReplayCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskReplayCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskReplayCreateLogic {
	return &TaskReplayCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskReplayCreateLogic) TaskReplayCreate(req *types.TaskReplayCreateReq) (*types.TaskReplayCreateResp, error) {
	// 1. Validate request
	if err := validateTaskReplayCreateReq(req); err != nil {
		return nil, err
	}

	// 2. Prepare task entity
	task := model.PolarisTaskReplay{
		Name:               req.Name,
		Description:        &req.Description,
		Status:             string(constant.TaskStatusPending),
		NeedReplayTraffics: strings.Join(req.NeedReplayTraffics, ","),
		ReplayAddr:         req.ReplayAddr,
	}

	if req.ReplayTime != "" {
		replayTime, err := time.Parse(time.DateTime, req.ReplayTime)
		if err != nil {
			return nil, errorx.NewDefaultError("Invalid ReplayTime format")
		}
		task.ReplayTime = &replayTime
	}

	// 5. Save to database
	if err := l.svcCtx.DB.Create(&task).Error; err != nil {
		log.Printf("创建回放任务失败: %v", err)
		return nil, errorx.NewDefaultError("创建回放任务失败")
	}

	// 6. Trigger task execution (async)
	go l.triggerTaskExecution(task.ID)

	return &types.TaskReplayCreateResp{
		Success: true,
		Message: "创建回放任务成功",
	}, nil
}

func validateTaskReplayCreateReq(req *types.TaskReplayCreateReq) error {
	if req.Name == "" {
		return errorx.NewDefaultError("任务名称不能为空")
	}

	if len(req.NeedReplayTraffics) == 0 {
		return errorx.NewDefaultError("需要回放的流量不能为空")
	}

	return nil
}

func (l *TaskReplayCreateLogic) triggerTaskExecution(taskID int64) {
	// Implement your task execution logic here
	// This could involve calling external services, setting up workers, etc.
}
