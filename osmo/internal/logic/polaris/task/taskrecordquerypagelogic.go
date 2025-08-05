package task

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

type TaskRecordQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskRecordQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskRecordQueryPageLogic {
	return &TaskRecordQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskRecordQueryPageLogic) TaskRecordQueryPage(req *types.TaskRecordQueryPageReq) (resp *types.TaskRecordQueryPageResp, err error) {
	// 使用 query 包中的 GosmoTaskRecord
	q := query.PolarisTaskRecord

	// 构建基础查询条件
	queryBuilder := q.WithContext(l.ctx).Debug().
		Where(q.IsDeleted.Is(false))

	// 添加关联规则筛选条件
	if req.Rule != "" {
		queryBuilder = queryBuilder.Where(q.RuleName.Eq(req.Rule))
	}
	// 添加录制策略筛选条件
	if req.Strategy != "" {
		queryBuilder = queryBuilder.Where(q.StrategyName.Eq(req.Strategy))
	}
	if req.Status != "" {
		queryBuilder = queryBuilder.Where(q.Status.Eq(req.Status))
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
	taskRecords, err := queryBuilder.
		Order(q.UpdateTime.Desc()).
		Offset((req.Page - 1) * req.PageSize).
		Limit(req.PageSize).
		Find()
	if err != nil {
		logx.Errorf("查询分页数据失败: %v", err)
		return nil, errorx.NewDefaultErrorf("查询分页数据失败: %v", err)
	}

	// 转换为响应格式
	records := make([]types.TaskRecordQueryPageRespRecord, 0, len(taskRecords))
	for _, taskRecord := range taskRecords {
		// 处理可能为 nil 的 Description 字段
		var (
			startTime   string
			endTime     string
			executeTime string
		)
		if taskRecord.StartTime != nil {
			startTime = taskRecord.StartTime.Format(time.DateTime)
		}
		if taskRecord.EndTime != nil {
			endTime = taskRecord.EndTime.Format(time.DateTime)
		}
		if taskRecord.ExecuteTime != nil {
			executeTime = taskRecord.ExecuteTime.Format(time.DateTime)
		}
		records = append(records, types.TaskRecordQueryPageRespRecord{
			Id:           strconv.FormatInt(taskRecord.ID, 10),
			Name:         taskRecord.Name,
			StrategyCode: taskRecord.StrategyCode,
			StrategyName: taskRecord.StrategyName,
			AgentId:      taskRecord.AgentID,
			AgentName:    taskRecord.AgentName,
			Status:       taskRecord.Status,
			StartTime:    startTime,
			EndTime:      endTime,
			ListenPort:   taskRecord.ListenPort,
			ExecuteTime:  executeTime,
		})
	}

	return &types.TaskRecordQueryPageResp{
		Success: true,
		Message: "查询成功",
		Data: struct {
			Total   int                                   `json:"total"`
			Records []types.TaskRecordQueryPageRespRecord `json:"records"`
		}{
			Total:   int(total),
			Records: records,
		},
	}, nil
}
