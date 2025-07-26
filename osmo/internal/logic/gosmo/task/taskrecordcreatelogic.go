package task

import (
	"context"
	"osmo/gen/model"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"strconv"

	"osmo/internal/svc"
	"osmo/internal/types"

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
	if req.StrategyName == "" || req.StrategyId == "" {
		return nil, errorx.NewDefaultError("录制策略不能为空")
	}
	if req.RuleId == "" || req.RuleName == "" {
		return nil, errorx.NewDefaultError("录制规则不能为空")
	}
	if req.AgentId == "" || req.AgentName == "" {
		return nil, errorx.NewDefaultError("录制任务需要关联执行机")
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
	strategyId, err := strconv.ParseInt(req.StrategyId, 10, 64)
	if err != nil {
		return nil, errorx.NewCodeErrorf("策略id不合法: %v", err)
	}
	ruleId, err := strconv.ParseInt(req.RuleId, 10, 64)
	if err != nil {
		return nil, errorx.NewCodeErrorf("规则id不合法: %v", err)
	}
	agentId, err := strconv.ParseInt(req.RuleId, 10, 64)
	if err != nil {
		return nil, errorx.NewCodeErrorf("执行机id不合法: %v", err)
	}
	// 4. 创建录制任务记录
	taskRecord := &model.GosmoTaskRecord{
		Name:         req.Name,
		Description:  &description,
		StrategyID:   strategyId,
		StrategyName: req.StrategyName,
		RuleID:       ruleId,
		RuleName:     req.RuleName,
		AgentID:      agentId,
		AgentName:    req.AgentName,
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
