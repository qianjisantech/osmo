package edi

import (
	"context"
	"errors"
	"gorm.io/gorm"
	"log"
	"polaris/common/errorx"
	"polaris/gen/model"
	"polaris/gen/query"
	"strconv"
	"time"

	"polaris/internal/svc"
	"polaris/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type EdiRecordTaskSyncLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEdiRecordTaskSyncLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EdiRecordTaskSyncLogic {
	return &EdiRecordTaskSyncLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EdiRecordTaskSyncLogic) EdiRecordTaskSync(req *types.EdiRecordTaskSyncReq) (resp *types.EdiRecordTaskSyncResp, err error) {
	// 参数校验
	if req.Name == "" {
		return resp, errorx.NewDefaultError("任务名称不能为空")
	}
	if req.Status == "" {
		return resp, errorx.NewDefaultError("任务状态不能为空")
	}
	if req.StartTime == "" {
		return resp, errorx.NewDefaultError("任务开始时间不能为空")
	}
	if req.Id == "" {
		return resp, errorx.NewDefaultError("任务ID不能为空")
	}

	// 将字符串ID转换为int64
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultErrorf("ID格式不正确: %v", err)
	}

	// 准备任务记录数据
	record := &model.PolarisTaskRecord{
		ID:           id, // 使用传入的ID
		Name:         req.Name,
		Status:       req.Status,
		CreateTime:   time.Now(),
		UpdateTime:   time.Now(),
		StartTime:    parseTime(req.StartTime),
		EndTime:      parseTime(req.EndTime),
		AgentID:      req.AgentId,
		ListenPort:   req.ListenPort,
		CreateBy:     req.CreateBy,
		CreateByName: req.CreateByName,
		UpdateBy:     req.UpdateBy,
		UpdateByName: req.UpdateByName,
	}

	q := query.Use(l.svcCtx.DB).PolarisTaskRecord
	queryBuilder := q.WithContext(l.ctx).Debug()

	// 查询记录是否存在
	_, err = queryBuilder.
		Where(q.ID.Eq(id), q.IsDeleted.Is(false)).
		First()
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// 记录不存在，创建新记录
			if err := queryBuilder.Create(record); err != nil {
				resp.Message = "创建任务记录失败"
				return resp, errorx.NewDefaultErrorf("创建任务记录失败: %v", err)
			}
		}
		log.Printf("任务不存在，需要创建任务记录: %v", err)
	}
	if _, err := queryBuilder.
		Where(q.ID.Eq(id)).
		Updates(record); err != nil {
		return nil, errorx.NewDefaultErrorf("更新任务记录失败: %v", err)
	}

	return &types.EdiRecordTaskSyncResp{
		Success: true,
		Message: "平台向监控中心同步任务成功",
	}, nil
}

// 辅助函数：解析时间字符串
func parseTime(timeStr string) *time.Time {
	if timeStr == "" {
		return nil
	}

	// 尝试RFC3339格式
	t, err := time.Parse(time.RFC3339, timeStr)
	if err == nil {
		return &t
	}

	// 尝试常见空格分隔格式
	t, err = time.Parse(time.DateTime, timeStr)
	if err == nil {
		return &t
	}

	// 其他格式尝试...
	return nil
}
