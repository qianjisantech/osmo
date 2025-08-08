package inner

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"polaris/internal/logic/inner"
	"polaris/internal/svc"
	"polaris/internal/types"
)

func InnerAgentInfoSyncHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.InnerAgentInfoSyncReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := inner.NewInnerAgentInfoSyncLogic(r.Context(), svcCtx)
		resp, err := l.InnerAgentInfoSync(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
