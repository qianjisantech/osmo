package resource

import (
	"context"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ResourceAgentConsoleLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewResourceAgentConsoleLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ResourceAgentConsoleLogic {
	return &ResourceAgentConsoleLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ResourceAgentConsoleLogic) ResourceAgentConsole(req *types.ResourceAgentConsoleReq) (resp *types.ResourceAgentConsoleResp, err error) {
	// todo: add your logic here and delete this line

	return
}
