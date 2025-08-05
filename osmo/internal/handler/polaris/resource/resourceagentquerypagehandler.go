package resource

import (
	"net/http"
	"osmo/internal/logic/polaris/resource"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo/internal/svc"
	"osmo/internal/types"
)

func ResourceAgentQueryPageHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ResourceAgentQueryPageReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := resource.NewResourceAgentQueryPageLogic(r.Context(), svcCtx)
		resp, err := l.ResourceAgentQueryPage(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
