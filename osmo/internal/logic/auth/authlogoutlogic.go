package auth

import (
	"context"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AuthLogoutLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAuthLogoutLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AuthLogoutLogic {
	return &AuthLogoutLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AuthLogoutLogic) AuthLogout(req *types.AuthLogoutReq) (resp *types.AuthLogoutResp, err error) {
	// todo: add your logic here and delete this line

	return &types.AuthLogoutResp{
		Success: true,
		Message: "退出成功",
	}, nil
}
