package resource

import (
	"context"
	"osmo/constant"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"strconv"
	"time"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

var (
	Statuses = []string{string(constant.AgentStatusRegister), string(constant.AgentStatusHealthy), string(constant.AgentStatusOffline), string(constant.AgentStatusError), string(constant.AgentStatusWarning)}
)

type ResourceAgentQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewResourceAgentQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ResourceAgentQueryPageLogic {
	return &ResourceAgentQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ResourceAgentQueryPageLogic) ResourceAgentQueryPage(req *types.ResourceAgentQueryPageReq) (resp *types.ResourceAgentQueryPageResp, err error) {
	// 使用 query 包中的 GosmoResourceAgent
	q := query.PolarisResourceAgent

	// 构建基础查询条件
	queryBuilder := q.WithContext(l.ctx).Debug().
		Where(q.IsDeleted.Is(false)).Where(q.Status.Neq(string(constant.AgentStatusRegister)))

	// 添加状态筛选条件
	if req.Status != "" {
		queryBuilder = queryBuilder.Where(q.Status.Eq(req.Status))
	}
	// 添加关键词搜索条件
	if req.ExecuteStatus != "" {
		queryBuilder = queryBuilder.Where(q.ExecuteStatus.Eq(req.ExecuteStatus))
	}
	// 添加关键词搜索条件
	if req.Keyword != "" {
		queryBuilder = queryBuilder.Where(
			q.Name.Like("%" + req.Keyword + "%"))

	}

	// 获取总数
	total, err := queryBuilder.Count()
	if err != nil {
		logx.Errorf("获取总数失败: %v", err)
		return nil, errorx.NewDefaultErrorf("获取总数失败: %v", err)
	}

	// 查询分页数据
	agents, err := queryBuilder.
		Order(q.LastReportTime.Desc()).
		Offset((req.Page - 1) * req.PageSize).
		Limit(req.PageSize).
		Find()
	if err != nil {
		logx.Errorf("查询分页数据失败: %v", err)
		return nil, errorx.NewDefaultErrorf("查询分页数据失败: %v", err)
	}

	// 统计各状态数量
	var board types.ResourceAgentQueryPageRespBoard
	if req.Status == "" {
		var err error
		board, err = l.getStatusCounts()
		if err != nil {
			logx.Errorf("获取状态统计失败: %v", err)
			// 即使统计失败也不中断主流程，返回部分数据
			board.Total = int(total)
		}
	} else {
		board.Total = int(total)
	}

	// 转换为响应格式
	records := make([]types.ResourceAgentQueryPageRespRecord, 0, len(agents))
	for _, agent := range agents {
		// 处理可能为 nil 的 Description 字段
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
		if err != nil {
			return nil, errorx.NewDefaultErrorf("获取总内存出错: %s", err)
		}
		if agent.StartTime != nil {
			startTime = agent.StartTime.Format(time.DateTime)
		}
		if agent.StopTime != nil {
			stopTime = agent.StopTime.Format(time.DateTime)
		}
		records = append(records, types.ResourceAgentQueryPageRespRecord{
			ID:                    strconv.FormatInt(agent.ID, 10),
			Name:                  *agent.Name,
			IP:                    agent.IP,
			Status:                agent.Status,
			Description:           description,
			CPUCores:              int(agent.CPUCores),
			LastReportTime:        lastReportTime,
			CPUFreePercent:        agent.CPUUsedPercent,
			CPUUsedPercent:        agent.CPUFreePercent,
			NetworkBytesSent:      float64(agent.NetworkBytesSent),
			NetworkBytesReceive:   float64(agent.NetworkBytesReceive),
			NetworkPacketsSent:    float64(agent.NetworkPacketsSent),
			NetworkPacketsReceive: float64(agent.NetworkPacketsReceive),
			MemoryFree:            float64(agent.MemoryFree),
			MemoryTotal:           float64(agent.MemoryTotal),
			MemoryUsedPercent:     agent.MemoryUsedPercent,
			StartTime:             startTime,
			StopTime:              stopTime,
			ExecuteStatus:         agent.ExecuteStatus,
		})
	}

	return &types.ResourceAgentQueryPageResp{
		Success: true,
		Message: "查询成功",
		Data: struct {
			Board   types.ResourceAgentQueryPageRespBoard    `json:"board"`
			Total   int                                      `json:"total"`
			Records []types.ResourceAgentQueryPageRespRecord `json:"records"`
		}{
			Total:   int(total),
			Records: records,
			Board:   board,
		},
	}, nil
}

// getStatusCounts 获取各状态数量统计
func (l *ResourceAgentQueryPageLogic) getStatusCounts() (types.ResourceAgentQueryPageRespBoard, error) {
	board := types.ResourceAgentQueryPageRespBoard{} // 初始化空结构体

	// 使用全局的 query.Q
	q := query.Q

	// 获取总数
	total, err := q.PolarisResourceAgent.WithContext(l.ctx).
		Where(q.PolarisResourceAgent.IsDeleted.Is(false)).Where(q.PolarisResourceAgent.Status.Neq(string(constant.AgentStatusRegister))).
		Count()
	if err != nil {
		return board, errorx.NewDefaultErrorf("获取总数失败: %v", err)
	}
	board.Total = int(total)

	// 并行获取各状态数量
	type countResult struct {
		status string
		count  int64
		err    error
	}

	results := make(chan countResult, len(Statuses))

	for _, status := range Statuses {
		go func(s string) {
			count, err := q.PolarisResourceAgent.WithContext(l.ctx).
				Where(
					q.PolarisResourceAgent.IsDeleted.Is(false),
					q.PolarisResourceAgent.Status.Eq(s),
				).
				Count()
			results <- countResult{status: s, count: count, err: err}
		}(status)
	}

	// 收集结果
	for i := 0; i < len(Statuses); i++ {
		result := <-results
		if result.err != nil {
			logx.Errorf("获取%s状态数量失败: %v", result.status, result.err)
			continue
		}

		switch result.status {
		case string(constant.AgentStatusHealthy):
			board.Healthy = int(result.count)
		case string(constant.AgentStatusWarning):
			board.Warning = int(result.count)
		case string(constant.AgentStatusError):
			board.Error = int(result.count)
		case string(constant.AgentStatusOffline):
			board.Offline = int(result.count)
		}
	}

	return board, nil
}
