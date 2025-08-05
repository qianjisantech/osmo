package resource

import (
	"net/http"
	"osmo/internal/logic/polaris/resource"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo/internal/svc"
	"osmo/internal/types"
)

func ResourceAgentCreateHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ResourceAgentCreateReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := resource.NewResourceAgentCreateLogic(r.Context(), svcCtx)
		resp, err := l.ResourceAgentCreate(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
