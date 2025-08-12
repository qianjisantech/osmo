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

type TaskReplayQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskReplayQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskReplayQueryPageLogic {
	return &TaskReplayQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskReplayQueryPageLogic) TaskReplayQueryPage(req *types.TaskReplayQueryPageReq) (resp *types.TaskReplayQueryPageResp, err error) {
	// 使用 query 包中的 PolarisTaskReplay
	q := query.PolarisTaskReplay

	// 构建基础查询条件
	queryBuilder := q.WithContext(l.ctx).Debug().
		Where(q.IsDeleted.Is(false))

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
	taskReplays, err := queryBuilder.
		Order(q.UpdateTime.Desc()).
		Offset((req.Page - 1) * req.PageSize).
		Limit(req.PageSize).
		Find()
	if err != nil {
		logx.Errorf("查询分页数据失败: %v", err)
		return nil, errorx.NewDefaultErrorf("查询分页数据失败: %v", err)
	}

	// 转换为响应格式
	records := make([]types.TaskReplayQueryPageRespRecord, 0, len(taskReplays))
	for _, taskReplay := range taskReplays {
		// 处理可能为 nil 的 Description 字段
		var (
			replayTime  string
			executeTime string
			failReason  string
		)
		if taskReplay.ReplayTime != nil {
			replayTime = taskReplay.ReplayTime.Format(time.DateTime)
		}
		if taskReplay.ExecuteTime != nil {
			executeTime = taskReplay.ExecuteTime.Format(time.DateTime)
		}
		if taskReplay.FailReason != nil {
			failReason = *taskReplay.FailReason
		}
		records = append(records, types.TaskReplayQueryPageRespRecord{
			Id:          strconv.FormatInt(taskReplay.ID, 10),
			Name:        taskReplay.Name,
			Status:      taskReplay.Status,
			ReplayTime:  replayTime,
			ReplayAddr:  taskReplay.ReplayAddr,
			ExecuteTime: executeTime,
			FailReason:  failReason,
		})
	}

	return &types.TaskReplayQueryPageResp{
		Success: true,
		Message: "查询成功",
		Data: struct {
			Total   int                                   `json:"total"`
			Records []types.TaskReplayQueryPageRespRecord `json:"records"`
		}{
			Total:   int(total),
			Records: records,
		},
	}, nil
}
