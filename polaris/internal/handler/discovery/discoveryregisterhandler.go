package discovery

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"polaris/internal/logic/discovery"
	"polaris/internal/svc"
	"polaris/internal/types"
)

func DiscoveryRegisterHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.DiscoveryRegisterReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := discovery.NewDiscoveryRegisterLogic(r.Context(), svcCtx)
		resp, err := l.DiscoveryRegister(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
