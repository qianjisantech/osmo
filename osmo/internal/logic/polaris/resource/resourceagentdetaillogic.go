package resource

import (
	"context"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"strconv"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ResourceAgentDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewResourceAgentDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ResourceAgentDetailLogic {
	return &ResourceAgentDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ResourceAgentDetailLogic) ResourceAgentDetail(req *types.ResourceAgentDetailReq) (resp *types.ResourceAgentDetailResp, err error) {
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
		description string
	)
	if agent.Description != nil {
		description = *agent.Description
	}
	// 4. 返回成功响应
	return &types.ResourceAgentDetailResp{
		Success: true,
		Message: "获取成功",
		Data: types.ResourceAgentDetailRespData{
			ID:          strconv.FormatInt(agent.ID, 10),
			Name:        *agent.Name,
			Description: description,
		},
	}, nil
}
