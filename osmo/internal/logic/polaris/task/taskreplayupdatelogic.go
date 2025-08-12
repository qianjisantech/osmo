package task

import (
	"context"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskReplayUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskReplayUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskReplayUpdateLogic {
	return &TaskReplayUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskReplayUpdateLogic) TaskReplayUpdate(req *types.TaskReplayUpdateReq) (resp *types.TaskReplayUpdateResp, err error) {
	// todo: add your logic here and delete this line

	return
}
