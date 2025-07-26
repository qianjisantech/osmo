package auth

import (
	"context"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AuthLoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}
type AuthLoginResponseData struct {
	Id          int      `json:"id"`
	Password    string   `json:"password"`
	RealName    string   `json:"realName"`
	Roles       []string `json:"roles"`
	Username    string   `json:"username"`
	HomePath    string   `json:"homePath"`
	AccessToken string   `json:"accessToken"`
}

func NewAuthLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AuthLoginLogic {
	return &AuthLoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AuthLoginLogic) AuthLogin(req *types.AuthLoginReq) (resp *types.AuthLoginResp, err error) {
	// todo: add your logic here and delete this line

	return &types.AuthLoginResp{
		Success: true,
		Message: "登录成功",
		Data: &AuthLoginResponseData{
			Id:          1,
			Username:    "admin",
			Password:    "123456",
			Roles:       []string{"admin"},
			RealName:    "Admin",
			HomePath:    "/workspace",
			AccessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGFzc3dvcmQiOiIxMjM0NTYiLCJyZWFsTmFtZSI6IkFkbWluIiwicm9sZXMiOlsiYWRtaW4iXSwidXNlcm5hbWUiOiJhZG1pbiIsImhvbWVQYXRoIjoiL3dvcmtzcGFjZSIsImlhdCI6MTc1MjIyOTgxOSwiZXhwIjoxNzUyODM0NjE5fQ.OgbEym9-36LLPxTBLdJ4IstuKXwvFvqMVJcjGLCSyo0",
		},
	}, nil
}
