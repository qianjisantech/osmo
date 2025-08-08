package inner

import (
	"context"

	"polaris/internal/svc"
	"polaris/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type InnerAgentInfoSyncLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewInnerAgentInfoSyncLogic(ctx context.Context, svcCtx *svc.ServiceContext) *InnerAgentInfoSyncLogic {
	return &InnerAgentInfoSyncLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *InnerAgentInfoSyncLogic) InnerAgentInfoSync(req *types.InnerAgentInfoSyncReq) (resp *types.InnerAgentInfoSyncResp, err error) {
	return &types.InnerAgentInfoSyncResp{
		Success: true,
		Message: "执行机向监控中心同步执行机信息成功:" + req.Id,
	}, nil
}
