package task

import (
	"context"
	"fmt"
	"osmo/gen/model"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"osmo/internal/svc"
	"osmo/internal/types"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskRecordCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskRecordCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskRecordCreateLogic {
	return &TaskRecordCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskRecordCreateLogic) TaskRecordCreate(req *types.TaskRecordCreateReq) (resp *types.TaskRecordCreateResp, err error) {
	// 1. 参数校验
	if req.Name == "" {
		return nil, errorx.NewDefaultError("录制任务名称不能为空")
	}
	if req.Strategy == nil {
		return nil, errorx.NewDefaultError("录制策略不能为空")
	}
	if req.Agent == nil {
		return nil, errorx.NewDefaultError("录制任务需要关联执行机")
	}
	if req.RecordTime == nil || len(req.RecordTime) == 0 {
		return nil, errorx.NewDefaultError("录制时间不能为空")
	}
	if req.ListenPort == "" {
		return nil, errorx.NewDefaultError("端口不能为空")
	}
	// 2. 检查录制任务名称是否已存在
	q := query.GosmoTaskRecord
	existing, err := q.WithContext(l.ctx).Debug().
		Where(q.Name.Eq(req.Name)).
		First()
	if err == nil && existing != nil {
		return nil, errorx.NewDefaultError("录制任务名称已存在")
	}

	// 3. 处理 Description 空值
	description := ""
	if req.Description != "" {
		description = req.Description
	}

	// 4. 创建录制任务记录
	taskRecord := &model.GosmoTaskRecord{
		Name:         req.Name,
		Description:  &description,
		StrategyCode: req.Strategy.Value,
		StrategyName: req.Strategy.Name,
		AgentID:      req.Agent.Id,
		AgentName:    req.Agent.Key,
		ListenPort:   req.ListenPort,
	}
	if len(req.RecordTime) == 2 {
		startTime, err := time.Parse(time.DateTime, req.RecordTime[0])
		if err != nil {
			return nil, fmt.Errorf("invalid start time format: %v", err)
		}

		endTime, err := time.Parse(time.DateTime, req.RecordTime[1])
		if err != nil {
			return nil, fmt.Errorf("invalid end time format: %v", err)
		}
		taskRecord.StartTime = &startTime
		taskRecord.EndTime = &endTime
	} else {
		return nil, errorx.NewDefaultError("录制时间格式出错！")
	}

	err = q.WithContext(l.ctx).Create(taskRecord)

	if err != nil {
		logx.Errorf("录制任务创建失败: %v", err)
		return nil, errorx.NewCodeErrorf("录制任务创建失败: %v", err)
	}

	// 5. 返回成功响应
	return &types.TaskRecordCreateResp{
		Success: true,
		Message: "录制任务创建成功",
	}, nil
}
