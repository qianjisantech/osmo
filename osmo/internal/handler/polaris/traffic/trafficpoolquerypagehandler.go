package traffic

import (
	"net/http"
	"osmo/internal/logic/polaris/traffic"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo/internal/svc"
	"osmo/internal/types"
)

func TrafficPoolQueryPageHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.TrafficPoolQueryPageReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := traffic.NewTrafficPoolQueryPageLogic(r.Context(), svcCtx)
		resp, err := l.TrafficPoolQueryPage(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
