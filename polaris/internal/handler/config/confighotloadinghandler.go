package config

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"polaris/internal/logic/config"
	"polaris/internal/svc"
	"polaris/internal/types"
)

func ConfigHotLoadingHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ConfigHotLoadingReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := config.NewConfigHotLoadingLogic(r.Context(), svcCtx)
		resp, err := l.ConfigHotLoading(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
