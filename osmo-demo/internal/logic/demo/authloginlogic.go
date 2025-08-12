package demo

import (
	"context"

	"osmo-demo/internal/svc"
	"osmo-demo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AuthLoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAuthLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AuthLoginLogic {
	return &AuthLoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AuthLoginLogic) AuthLogin(req *types.AuthLoginReq) (resp *types.AuthLoginResp, err error) {

	return &types.AuthLoginResp{
		Success: true,
		Message: "登录成功",
		Data: types.AuthLoginRespData{
			Id:    "1",
			Token: "1",
		},
	}, nil
}
