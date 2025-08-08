package edi

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo/internal/logic/edi"
	"osmo/internal/svc"
	"osmo/internal/types"
)

func EdiTrafficPoolSyncHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.EdiTrafficPoolSyncReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := edi.NewEdiTrafficPoolSyncLogic(r.Context(), svcCtx)
		resp, err := l.EdiTrafficPoolSync(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
