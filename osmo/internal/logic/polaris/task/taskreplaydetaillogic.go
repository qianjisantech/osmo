package task

import (
	"context"
	"osmo/gen/model"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"strconv"
	"strings"
	"time"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskReplayDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskReplayDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskReplayDetailLogic {
	return &TaskReplayDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskReplayDetailLogic) TaskReplayDetail(req *types.TaskReplayDetailReq) (resp *types.TaskReplayDetailResp, err error) {
	// 1. 参数校验
	if req.ID == "" {
		return nil, errorx.NewDefaultError("回放任务ID不能为空")
	}

	// 2. 从数据库获取录制任务详情
	q := query.PolarisTaskReplay
	id, err := strconv.ParseInt(req.ID, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultErrorf("回放任务ID格式错误")
	}

	taskReplay, err := q.WithContext(l.ctx).Where(q.ID.Eq(id)).First()
	if err != nil {
		return nil, errorx.NewDefaultErrorf("获取回放任务失败: %v", err)
	}

	// 3. 获取关联的流量池数据
	trafficPoolIDs := strings.Split(taskReplay.NeedReplayTraffics, ",")
	var trafficPools []*model.PolarisTrafficPool

	if len(trafficPoolIDs) > 0 {
		// Convert string IDs to int64
		var trafficPoolIDsInt64 []int64
		for _, idStr := range trafficPoolIDs {
			id, err := strconv.ParseInt(idStr, 10, 64)
			if err != nil {
				continue // Skip invalid IDs or handle error as needed
			}
			trafficPoolIDsInt64 = append(trafficPoolIDsInt64, id)
		}

		trafficQ := query.PolarisTrafficPool
		trafficPools, err = trafficQ.WithContext(l.ctx).
			Where(trafficQ.ID.In(trafficPoolIDsInt64...)).
			Find()
		if err != nil {
			return nil, errorx.NewDefaultErrorf("获取关联流量池失败: %v", err)
		}
	}

	var (
		description string
		replayTime  string
	)
	if taskReplay.Description != nil {
		description = *taskReplay.Description
	}
	if taskReplay.ReplayTime != nil {
		replayTime = taskReplay.ReplayTime.Format(time.DateTime)
	}

	// 转换流量池数据为响应格式
	trafficPoolItems := make([]types.TaskReplayDetailRespDataTraffic, 0, len(trafficPools))
	for _, pool := range trafficPools {
		item := types.TaskReplayDetailRespDataTraffic{
			ID:     strconv.FormatInt(pool.ID, 10),
			Url:    pool.URL,
			Method: pool.Method,
		}
		trafficPoolItems = append(trafficPoolItems, item)
	}

	// 4. 返回成功响应
	return &types.TaskReplayDetailResp{
		Success: true,
		Message: "获取成功",
		Data: types.TaskReplayDetailRespData{
			ID:                               strconv.FormatInt(taskReplay.ID, 10),
			Name:                             taskReplay.Name,
			Description:                      description,
			Status:                           taskReplay.Status,
			ReplayTime:                       replayTime,
			ReplayAddr:                       taskReplay.ReplayAddr,
			TaskReplayDetailRespDataTraffics: trafficPoolItems, // Make sure this field exists in your response type
		},
	}, nil
}
