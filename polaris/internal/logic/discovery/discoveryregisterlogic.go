package discovery

import (
	"context"
	"polaris/common/errorx"
	"polaris/gen/model"
	"polaris/gen/query"
	"polaris/internal/svc"
	"polaris/internal/types"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type DiscoveryRegisterLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDiscoveryRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DiscoveryRegisterLogic {
	return &DiscoveryRegisterLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DiscoveryRegisterLogic) DiscoveryRegister(req *types.DiscoveryRegisterReq) (resp *types.DiscoveryRegisterResp, err error) {

	// 检查ip是否已存在
	q := query.GosmoResourceAgent
	existing, err := q.WithContext(l.ctx).Debug().
		Where(q.IP.Eq(req.IP)).Where(q.HostName.Eq(req.Hostname)).
		First()

	if err == nil && existing != nil {
		return &types.DiscoveryRegisterResp{
			Success: true,
			Message: "执行机已注册过",
			Data: types.DiscoveryRegisterRespData{
				Id:                    strconv.FormatInt(existing.ID, 10),
				CPUCores:              int(existing.CPUCores),
				Hostname:              existing.HostName,
				CPUFreePercent:        existing.CPUFreePercent,
				CPUUsedPercent:        existing.CPUUsedPercent,
				NetworkBytesSent:      existing.NetworkBytesSent,
				NetworkBytesReceive:   existing.NetworkBytesReceive,
				NetworkPacketsSent:    existing.NetworkPacketsSent,
				NetworkPacketsReceive: existing.NetworkPacketsReceive,
				MemoryFree:            existing.MemoryFree,
				MemoryTotal:           existing.MemoryTotal,
				MemoryUsed:            existing.MemoryUsed,
				MemoryUsedPercent:     existing.MemoryUsedPercent,
				IP:                    existing.IP,
				IdentificationCode:    existing.IdentificationCode,
			},
		}, nil
	} else {
		// 创建执行机记录
		agent := &model.GosmoResourceAgent{
			IP:                    req.IP,
			HostName:              req.Hostname,
			CPUCores:              int32(req.CPUCores),
			CPUUsedPercent:        req.CPUUsedPercent,
			CPUFreePercent:        req.CPUFreePercent,
			MemoryTotal:           req.MemoryTotal,
			MemoryUsed:            req.MemoryUsed,
			MemoryFree:            req.MemoryFree,
			MemoryUsedPercent:     req.MemoryUsedPercent,
			NetworkBytesSent:      req.NetworkBytesSent,
			NetworkBytesReceive:   req.NetworkBytesReceive,
			NetworkPacketsSent:    req.NetworkPacketsSent,
			NetworkPacketsReceive: req.NetworkPacketsReceive,
		}

		err = q.WithContext(l.ctx).Debug().Create(agent)
		if err != nil {
			logx.Errorf("执行机注册失败: %v", err)
			return nil, errorx.NewCodeErrorf("注册执行机失败: %v", err)
		}

		// 5. 返回成功响应
		return &types.DiscoveryRegisterResp{
			Success: true,
			Message: "执行机注册成功",
			Data: types.DiscoveryRegisterRespData{
				Id:                    strconv.FormatInt(agent.ID, 10),
				CPUCores:              int(agent.CPUCores),
				Hostname:              agent.HostName,
				CPUFreePercent:        agent.CPUFreePercent,
				CPUUsedPercent:        agent.CPUUsedPercent,
				NetworkBytesSent:      agent.NetworkBytesSent,
				NetworkBytesReceive:   agent.NetworkBytesReceive,
				NetworkPacketsSent:    agent.NetworkPacketsSent,
				NetworkPacketsReceive: agent.NetworkPacketsReceive,
				MemoryFree:            agent.MemoryFree,
				MemoryTotal:           agent.MemoryTotal,
				MemoryUsed:            agent.MemoryUsed,
				MemoryUsedPercent:     agent.MemoryUsedPercent,
				IP:                    agent.IP,
				IdentificationCode:    agent.IdentificationCode,
			},
		}, nil
	}

}
