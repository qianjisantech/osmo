package auth

import (
	"context"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AuthCodesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAuthCodesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AuthCodesLogic {
	return &AuthCodesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AuthCodesLogic) AuthCodes() (resp *types.AuthCodesResp, err error) {
	// todo: add your logic here and delete this line

	return &types.AuthCodesResp{
		Success: true,
		Message: "ok",
		Data: []string{
			"AC_100010",
			"AC_100030",
			"AC_100030",
		},
	}, nil
}
