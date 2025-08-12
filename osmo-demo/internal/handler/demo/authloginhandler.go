package demo

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo-demo/internal/logic/demo"
	"osmo-demo/internal/svc"
	"osmo-demo/internal/types"
)

func AuthLoginHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.AuthLoginReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := demo.NewAuthLoginLogic(r.Context(), svcCtx)
		resp, err := l.AuthLogin(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
