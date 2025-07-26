package agent

import (
	"context"

	"github.com/qianjisantech/gosmo-agent/internal/svc"
	"github.com/qianjisantech/gosmo-agent/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AgentTaskCloseLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAgentTaskCloseLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AgentTaskCloseLogic {
	return &AgentTaskCloseLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AgentTaskCloseLogic) AgentTaskClose(req *types.AgentTaskCloseReq) (resp *types.AgentTaskCloseResp, err error) {
	// todo: add your logic here and delete this line

	return
}
