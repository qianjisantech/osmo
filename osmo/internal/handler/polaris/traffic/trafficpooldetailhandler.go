package traffic

import (
	"net/http"
	"osmo/internal/logic/polaris/traffic"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo/internal/svc"
	"osmo/internal/types"
)

func TrafficPoolDetailHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.TrafficPoolDetailReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := traffic.NewTrafficPoolDetailLogic(r.Context(), svcCtx)
		resp, err := l.TrafficPoolDetail(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
