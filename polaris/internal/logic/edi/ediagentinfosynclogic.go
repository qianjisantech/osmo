package edi

import (
	"context"

	"polaris/internal/svc"
	"polaris/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type EdiAgentInfoSyncLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEdiAgentInfoSyncLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EdiAgentInfoSyncLogic {
	return &EdiAgentInfoSyncLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EdiAgentInfoSyncLogic) EdiAgentInfoSync(req *types.EdiAgentInfoSyncReq) (resp *types.EdiAgentInfoSyncResp, err error) {
	return &types.EdiAgentInfoSyncResp{
		Success: true,
		Message: "平台向监控中心同步执行机信息成功:" + req.Id,
	}, nil
}
