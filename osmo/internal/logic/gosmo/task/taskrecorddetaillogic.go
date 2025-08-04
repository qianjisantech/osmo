package task

import (
	"context"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"strconv"
	"time"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskRecordDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskRecordDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskRecordDetailLogic {
	return &TaskRecordDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskRecordDetailLogic) TaskRecordDetail(req *types.TaskRecordDetailReq) (resp *types.TaskRecordDetailResp, err error) {
	// 1. 参数校验
	if req.ID == "" {
		return nil, errorx.NewDefaultError("录制任务ID不能为空")
	}

	// 2. 从数据库获取录制任务详情
	q := query.GosmoTaskRecord
	id, err := strconv.ParseInt(req.ID, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultErrorf("录制任务ID格式错误")
	}
	taskRecord, err := q.WithContext(l.ctx).Where(q.ID.Eq(id)).First()
	if err != nil {
		return nil, errorx.NewDefaultErrorf("录制任务ID不能为空: %s", err)
	}
	var (
		description string
		startTime   string
		endTime     string
	)
	if taskRecord.Description != nil {
		description = *taskRecord.Description
	}
	if taskRecord.StartTime != nil {
		startTime = taskRecord.StartTime.Format(time.DateTime)
	}
	if taskRecord.EndTime != nil {
		endTime = taskRecord.EndTime.Format(time.DateTime)
	}
	// 4. 返回成功响应
	return &types.TaskRecordDetailResp{
		Success: true,
		Message: "获取成功",
		Data: types.TaskRecordDetailRespData{
			ID:           strconv.FormatInt(taskRecord.ID, 10),
			Name:         taskRecord.Name,
			Description:  description,
			StrategyId:   taskRecord.StrategyCode,
			StrategyName: taskRecord.StrategyName,
			AgentId:      taskRecord.AgentID,
			AgentName:    taskRecord.AgentName,
			Status:       taskRecord.Status,
			StartTime:    startTime,
			EndTime:      endTime,
			CreateTime:   taskRecord.CreateTime.Format(time.DateTime),
			UpdateTime:   taskRecord.UpdateTime.Format(time.DateTime),
			CreateBy:     taskRecord.CreateBy,
			UpdateBy:     taskRecord.UpdateBy,
			CreateByName: taskRecord.CreateByName,
			UpdateByName: taskRecord.UpdateByName,
		},
	}, nil
}
