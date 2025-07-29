package resource

import (
	"context"
	"osmo/constant"
	"osmo/gen/model"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"strconv"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ResourceAgentCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewResourceAgentCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ResourceAgentCreateLogic {
	return &ResourceAgentCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ResourceAgentCreateLogic) ResourceAgentCreate(req *types.ResourceAgentCreateReq) (resp *types.ResourceAgentCreateResp, err error) {
	// 1. 参数校验
	if req.Name == "" {
		return nil, errorx.NewDefaultError("执行机名称不能为空")
	}
	if req.SelectedAgentId == "" {
		return nil, errorx.NewDefaultError("执行机ID不能为空")

	}
	// 2. 检查名称是否已存在
	q := query.GosmoResourceAgent
	existing, err := q.WithContext(l.ctx).Debug().
		Where(q.Name.Eq(req.Name)).
		First()
	if err == nil && existing != nil {
		return nil, errorx.NewDefaultError("执行机名称已存在")
	}

	// 3. 处理 Description 空值
	description := ""
	if req.Description != "" {
		description = req.Description
	}

	// 4. 创建执行机记录
	agent := &model.GosmoResourceAgent{
		Name:        &req.Name,
		Description: &description, // 使用处理后的值
		Status:      string(constant.AgentStatusHealthy),
	}
	id, err := strconv.ParseInt(req.SelectedAgentId, 10, 64)
	_, err = q.WithContext(l.ctx).Where(q.ID.Eq(id)).Updates(agent)
	if err != nil {
		logx.Errorf("执行机创建失败: %v", err)
		return nil, errorx.NewCodeErrorf("创建执行机失败: %v", err)
	}

	// 5. 返回成功响应
	return &types.ResourceAgentCreateResp{
		Success: true,
		Message: "执行机创建成功",
	}, nil
}
