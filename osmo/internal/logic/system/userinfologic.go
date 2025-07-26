package system

import (
	"context"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UserInfoResponseData struct {
	Id       int      `json:"id"`
	RealName string   `json:"realName"`
	Roles    []string `json:"roles"`
	Username string   `json:"username"`
	HomePath string   `json:"homePath"`
}
type UserInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUserInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserInfoLogic {
	return &UserInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserInfoLogic) UserInfo() (resp *types.UserInfoResp, err error) {
	// todo: add your logic here and delete this line

	return &types.UserInfoResp{
		Success: true,
		Message: "success",
		Data: &UserInfoResponseData{
			Id:       1,
			Username: "admin",
			Roles:    []string{"admin"},
			RealName: "Admin",
			HomePath: "/workspace",
		},
	}, nil
}
