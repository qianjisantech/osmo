package resource

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

type ResourceAgentDetailV2Logic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewResourceAgentDetailV2Logic(ctx context.Context, svcCtx *svc.ServiceContext) *ResourceAgentDetailV2Logic {
	return &ResourceAgentDetailV2Logic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ResourceAgentDetailV2Logic) ResourceAgentDetailV2(req *types.ResourceAgentDetailV2Req) (resp *types.ResourceAgentDetailV2Resp, err error) {
	// 1. 参数校验
	if req.ID == "" {
		return nil, errorx.NewDefaultError("执行机ID不能为空")
	}

	// 2. 从数据库获取执行机详情
	q := query.PolarisResourceAgent
	id, err := strconv.ParseInt(req.ID, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultErrorf("执行机ID格式错误")
	}
	agent, err := q.WithContext(l.ctx).Where(q.ID.Eq(id)).First()
	if err != nil {
		return nil, errorx.NewDefaultErrorf("执行机ID不能为空: %s", err)
	}

	var (
		lastReportTime string
		description    string
		startTime      string
		stopTime       string
	)
	if agent.Description != nil {
		description = *agent.Description
	}
	if agent.LastReportTime != nil {
		lastReportTime = agent.LastReportTime.Format(time.DateTime)
	}
	tasks, err := l.queryResourceTasksByAgentId(req.ID)
	if err != nil {
		return nil, errorx.NewDefaultErrorf("获取任务列表出错: %s", err)
	}
	if agent.StartTime != nil {
		startTime = agent.StartTime.Format(time.DateTime)
	}
	if agent.StopTime != nil {
		stopTime = agent.StopTime.Format(time.DateTime)
	}

	// 4. 返回成功响应
	return &types.ResourceAgentDetailV2Resp{
		Success: true,
		Message: "获取成功",
		Data: types.ResourceAgentDetailV2RespData{
			ID:                    strconv.FormatInt(agent.ID, 10),
			Name:                  *agent.Name,
			Description:           description,
			LastReportTime:        lastReportTime,
			CPUCores:              int(agent.CPUCores),
			CPUFreePercent:        agent.CPUUsedPercent,
			CPUUsedPercent:        agent.CPUFreePercent,
			Status:                agent.Status,
			NetworkBytesSent:      float64(agent.NetworkBytesSent),
			NetworkBytesReceive:   float64(agent.NetworkBytesReceive),
			NetworkPacketsSent:    float64(agent.NetworkPacketsSent),
			NetworkPacketsReceive: float64(agent.NetworkPacketsReceive),
			MemoryFree:            float64(agent.MemoryFree),
			MemoryTotal:           float64(agent.MemoryTotal),
			MemoryUsed:            agent.MemoryUsedPercent,
			IdentificationCode:    agent.IdentificationCode,
			Tasks:                 tasks,
			StartTime:             startTime,
			StopTime:              stopTime,
		},
	}, nil
}
func (l *ResourceAgentDetailV2Logic) queryResourceTasksByAgentId(id string) ([]types.ResourceAgentDetailV2RespDataTask, error) {
	q := query.PolarisTaskRecord
	records, err := q.WithContext(l.ctx).Debug().Where(q.AgentID.Eq(id)).Find()
	if err != nil {
		return nil, err
	}
	tasks := make([]types.ResourceAgentDetailV2RespDataTask, len(records))
	for i, record := range records {
		var (
			description string
			startTime   string
			endTime     string
		)
		if record.Description != nil {
			description = *record.Description
		}
		if record.StartTime != nil {
			startTime = record.StartTime.Format(time.DateTime)
		}
		if record.EndTime != nil {
			endTime = record.StartTime.Format(time.DateTime)
		}
		tasks[i] = types.ResourceAgentDetailV2RespDataTask{
			ID:           strconv.FormatInt(record.ID, 10),
			Name:         record.Name,
			Status:       record.Status,
			StartTime:    startTime,
			EndTime:      endTime,
			Description:  description,
			Type:         "record",
			StrategyName: record.StrategyName,
			StrategyId:   record.StrategyCode,
		}
	}
	return tasks, nil
}
