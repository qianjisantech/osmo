package resource

import (
	"context"
	"errors"
	"gorm.io/gorm"
	"osmo/gen/model"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"strconv"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ResourceAgentUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewResourceAgentUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ResourceAgentUpdateLogic {
	return &ResourceAgentUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ResourceAgentUpdateLogic) ResourceAgentUpdate(req *types.ResourceAgentUpdateReq) (resp *types.ResourceAgentUpdateResp, err error) {
	// 参数校验
	if req.Name == "" {
		return nil, errorx.NewDefaultError("执行机名称不能为空")
	}
	if req.Id == "" {
		return nil, errorx.NewDefaultError("执行机ID不能为空")
	}
	//  转换ID类型
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError("执行机ID格式错误")
	}
	// 检查名称唯一性（排除当前记录）
	q := query.GosmoResourceAgent
	existing, err := q.WithContext(l.ctx).
		Where(q.Name.Eq(req.Name)).
		Where(q.ID.Neq(id)). // 关键修改：排除自身ID的检查
		First()
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		logx.Errorf("名称检查失败: %v", err)
		return nil, errorx.NewCodeError("系统繁忙，请稍后重试")
	}
	if existing != nil {
		return nil, errorx.NewDefaultError("执行机名称已存在")
	}

	//  处理Description指针
	var description *string
	if req.Description != "" {
		desc := req.Description // 创建新变量避免取地址问题
		description = &desc
	}

	// 执行更新操作
	agent := &model.GosmoResourceAgent{
		ID:          id,
		Name:        &req.Name,
		Description: description,
	}

	res, err := q.WithContext(l.ctx).Where(q.ID.Eq(id)).Updates(agent)
	if err != nil {
		return nil, errorx.NewDefaultErrorf("执行机更新失败%s", err)
	}
	logx.Infof("更新结果: %v", res)
	// 返回响应
	return &types.ResourceAgentUpdateResp{
		Success: true,
		Message: "执行机更新成功",
	}, nil
}
