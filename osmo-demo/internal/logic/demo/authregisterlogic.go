package demo

import (
	"context"

	"osmo-demo/internal/svc"
	"osmo-demo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AuthRegisterLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAuthRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AuthRegisterLogic {
	return &AuthRegisterLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AuthRegisterLogic) AuthRegister(req *types.AuthRegisterReq) (resp *types.AuthRegisterResp, err error) {
	return &types.AuthRegisterResp{
		Success: true,
		Message: "注册成功",
		Data: types.AuthRegisterRespData{
			Id:    "1",
			Token: "1",
		},
	}, nil
}
