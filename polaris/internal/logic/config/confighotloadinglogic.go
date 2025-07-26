package config

import (
	"context"

	"polaris/internal/svc"
	"polaris/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ConfigHotLoadingLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewConfigHotLoadingLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ConfigHotLoadingLogic {
	return &ConfigHotLoadingLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ConfigHotLoadingLogic) ConfigHotLoading(req *types.ConfigHotLoadingReq) (resp *types.ConfigHotLoadingResp, err error) {
	// todo: add your logic here and delete this line

	return
}
