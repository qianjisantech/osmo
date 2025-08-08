package task

import (
	"context"
	"osmo/constant"
	"osmo/gen/model"
	"osmo/internal/common/errorx"
	"osmo/internal/svc"
	"osmo/internal/types"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskRecordExecuteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskRecordExecuteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskRecordExecuteLogic {
	return &TaskRecordExecuteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskRecordExecuteLogic) TaskRecordExecute(req *types.TaskRecordExecuteReq) (resp *types.TaskRecordExecuteResp, err error) {
	// 参数校验
	if req.ID == "" {
		return nil, errorx.NewDefaultError("任务ID不能为空")
	}
	// 使用GORM更新记录
	result := l.svcCtx.DB.Model(&model.PolarisTaskRecord{}).
		Where("id = ?", req.ID).
		Updates(map[string]interface{}{
			"status":       constant.TaskStatusWaiting,
			"execute_time": time.Now(),
		})

	if result.Error != nil {
		logx.Errorf("更新任务状态失败: %v", result.Error)
		return nil, errorx.NewDefaultErrorf("更新任务状态失败: %v", result.Error)
	}

	if result.RowsAffected == 0 {
		logx.Errorf("未找到对应任务记录, ID: %d", req.ID)
		return nil, errorx.NewDefaultError("未找到对应任务记录")
	}

	// 记录操作日志
	logx.Infof("任务状态更新成功, ID: %d", req.ID)

	return &types.TaskRecordExecuteResp{
		Success: true,
		Message: "任务执行成功",
	}, nil
}
