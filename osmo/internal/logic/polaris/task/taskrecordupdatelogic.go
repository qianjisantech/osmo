package task

import (
	"context"
	"errors"
	"gorm.io/gorm"
	"osmo/gen/model"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"osmo/internal/svc"
	"osmo/internal/types"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskRecordUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskRecordUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskRecordUpdateLogic {
	return &TaskRecordUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskRecordUpdateLogic) TaskRecordUpdate(req *types.TaskRecordUpdateReq) (resp *types.TaskRecordUpdateResp, err error) {
	// 1. 参数校验
	if req.Name == "" {
		return nil, errorx.NewDefaultError("录制任务名称不能为空")
	}
	if req.StrategyName == "" || req.StrategyId == "" {
		return nil, errorx.NewDefaultError("录制策略不能为空")
	}
	if req.AgentId == "" {
		return nil, errorx.NewDefaultError("录制任务需要关联执行机")
	}
	//  转换ID类型
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError("执行机ID格式错误")
	}
	// 检查名称唯一性（排除当前记录）
	q := query.PolarisTaskRecord
	existing, err := q.WithContext(l.ctx).Debug().
		Where(q.Name.Eq(req.Name)).
		Where(q.ID.Neq(id)). // 关键修改：排除自身ID的检查
		First()
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		logx.Errorf("名称检查失败: %v", err)
		return nil, errorx.NewCodeError("系统繁忙，请稍后重试")
	}
	if existing != nil {
		return nil, errorx.NewDefaultError("录制任务名称已存在")
	}

	//  处理Description指针
	var description *string
	if req.Description != "" {
		desc := req.Description // 创建新变量避免取地址问题
		description = &desc
	}
	strategyId, err := strconv.ParseInt(req.StrategyId, 10, 64)
	if err != nil {
		return nil, errorx.NewCodeErrorf("策略id不合法: %v", err)
	}
	agentId, err := strconv.ParseInt(req.AgentId, 10, 64)
	if err != nil {
		return nil, errorx.NewCodeErrorf("执行机id不合法: %v", err)
	}
	// 执行更新操作
	taskRecord := &model.PolarisTaskRecord{
		ID:           id,
		Name:         req.Name,
		Description:  description,
		StrategyCode: strconv.FormatInt(strategyId, 10),
		StrategyName: req.StrategyName,
		AgentID:      strconv.FormatInt(agentId, 10),
		AgentName:    req.AgentName,
	}

	res, err := q.WithContext(l.ctx).Debug().Where(q.ID.Eq(id)).Updates(taskRecord)
	if err != nil {
		logx.Errorf("录制任务更新失败: %v", err)
		return nil, errorx.NewDefaultErrorf("录制任务更新失败%s", err)
	}
	logx.Infof("录制任务更新结果: %v", res)
	// 返回响应
	return &types.TaskRecordUpdateResp{
		Success: true,
		Message: "录制任务更新成功",
	}, nil
}
