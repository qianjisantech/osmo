package edi

import (
	"context"
	"errors"
	"gorm.io/gorm"
	"log"
	"osmo/gen/model"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"strconv"
	"time"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type EdiTaskRecordyncLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEdiTaskRecordyncLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EdiTaskRecordyncLogic {
	return &EdiTaskRecordyncLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EdiTaskRecordyncLogic) EdiTaskRecordync(req *types.EdiTaskRecordyncReq) (resp *types.EdiTaskRecordyncResp, err error) {
	log.Printf("打印监控中心向平台同步录制任务入参：%v", req)
	// 参数校验

	if req.Status == "" {
		return resp, errorx.NewDefaultError("任务状态不能为空")
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
		ID:          id, // 使用传入的ID
		Status:      req.Status,
		ExecuteTime: parseTime(req.ExecuteTime),
	}
	if req.FailReason != "" {
		*record.FailReason = req.FailReason
	}
	if req.ExecuteTime != "" {
		*record.FailReason = req.ExecuteTime
	}
	q := query.Use(l.svcCtx.DB).PolarisTaskRecord
	queryBuilder := q.WithContext(l.ctx).Debug()

	// 查询记录是否存在
	_, err = queryBuilder.
		Where(q.ID.Eq(id), q.IsDeleted.Is(false)).
		First()
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("任务不存在: %v", err)
			return nil, errorx.NewDefaultErrorf("任务不存在: %v", err)
		}

	}
	if _, err := queryBuilder.
		Where(q.ID.Eq(id)).
		Updates(record); err != nil {
		return nil, errorx.NewDefaultErrorf("更新任务记录失败: %v", err)
	}

	return &types.EdiTaskRecordyncResp{
		Success: true,
		Message: "监控中心向平台同步任务成功",
	}, nil
}
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
