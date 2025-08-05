package traffic

import (
	"context"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TrafficPoolDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTrafficPoolDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TrafficPoolDetailLogic {
	return &TrafficPoolDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TrafficPoolDetailLogic) TrafficPoolDetail(req *types.TrafficPoolDetailReq) (resp *types.TrafficPoolDetailResp, err error) {
	// todo: add your logic here and delete this line

	return
}
