package demo

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo-demo/internal/logic/demo"
	"osmo-demo/internal/svc"
	"osmo-demo/internal/types"
)

func AuthRegisterHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.AuthRegisterReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := demo.NewAuthRegisterLogic(r.Context(), svcCtx)
		resp, err := l.AuthRegister(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
