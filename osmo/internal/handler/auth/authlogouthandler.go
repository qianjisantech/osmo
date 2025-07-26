package auth

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo/internal/logic/auth"
	"osmo/internal/svc"
	"osmo/internal/types"
)

func AuthLogoutHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.AuthLogoutReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := auth.NewAuthLogoutLogic(r.Context(), svcCtx)
		resp, err := l.AuthLogout(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
