package edi

import (
	"context"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type EdiResourceAgentSyncLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEdiResourceAgentSyncLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EdiResourceAgentSyncLogic {
	return &EdiResourceAgentSyncLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EdiResourceAgentSyncLogic) EdiResourceAgentSync(req *types.EdiResourceAgentSyncReq) (resp *types.EdiResourceAgentSyncResp, err error) {
	// todo: add your logic here and delete this line

	return
}
