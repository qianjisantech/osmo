package agent

import (
	"context"

	"github.com/qianjisantech/gosmo-agent/internal/svc"
	"github.com/zeromicro/go-zero/core/logx"
)

type AgentTaskStartLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAgentTaskStartLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AgentTaskStartLogic {
	return &AgentTaskStartLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AgentTaskStartLogic) AgentTaskStart() error {
	// todo: add your logic here and delete this line

	return nil
}
