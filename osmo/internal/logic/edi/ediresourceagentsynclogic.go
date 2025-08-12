package edi

import (
	"context"
	"osmo/gen/model"
	"osmo/internal/common/errorx"
	"strconv"
	"time"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type EdiResourceAgentSyncLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEdiResourceAgentSyncLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EdiResourceAgentSyncLogic {
	return &EdiResourceAgentSyncLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}
func (l *EdiResourceAgentSyncLogic) EdiResourceAgentSync(req *types.EdiResourceAgentSyncReq) (*types.EdiResourceAgentSyncResp, error) {
	// 1. 参数校验
	if req == nil {
		return nil, errorx.NewDefaultError("请求参数不能为空")
	}
	// 2. 转换ID类型
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError("ID格式不正确")
	}
	// 2. 准备数据
	now := time.Now()
	agent := &model.PolarisResourceAgent{
		ID:                  id,
		Status:              req.Status,
		LastReportTime:      &now,
		CPUCores:            int32(req.CPUCores),
		CPUUsedPercent:      req.CPUUsedPercent,
		MemoryTotal:         int64(req.MemoryTotal),
		MemoryUsed:          int64(req.MemoryUsed),
		NetworkBytesSent:    int64(req.NetworkBytesSent),
		NetworkBytesReceive: int64(req.NetworkBytesReceive),
		ExecuteStatus:       req.ExecuteStatus,
		HostName:            req.HostName,
	}

	// 3. 尝试更新，如果不存在则创建
	result := l.svcCtx.DB.Where("id = ?", req.Id).FirstOrCreate(agent)
	if result.Error != nil {
		return nil, errorx.NewDefaultErrorf("同步执行机信息失败: %v", result.Error)
	}

	// 4. 如果是已存在的记录，执行更新
	if result.RowsAffected == 0 {
		updateData := map[string]interface{}{
			"status":                req.Status,
			"last_report_time":      now,
			"cpu_cores":             req.CPUCores,
			"cpu_used_percent":      req.CPUUsedPercent,
			"memory_total":          req.MemoryTotal,
			"memory_used":           req.MemoryUsed,
			"network_bytes_sent":    req.NetworkBytesSent,
			"network_bytes_receive": req.NetworkBytesReceive,
			"execute_status":        req.ExecuteStatus,
			"host_name":             req.HostName,
		}
		if err := l.svcCtx.DB.Model(agent).Updates(updateData).Error; err != nil {
			return nil, errorx.NewDefaultErrorf("更新执行机信息失败: %v", err)
		}
	}

	// 5. 返回成功响应
	return &types.EdiResourceAgentSyncResp{
		Message: "执行机信息同步成功",
		Success: true,
	}, nil
}
