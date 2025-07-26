package agent

import (
	"net/http"

	"github.com/qianjisantech/gosmo-agent/internal/logic/agent"
	"github.com/qianjisantech/gosmo-agent/internal/svc"
	"github.com/qianjisantech/gosmo-agent/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func AgentTaskCloseHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.AgentTaskCloseReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := agent.NewAgentTaskCloseLogic(r.Context(), svcCtx)
		resp, err := l.AgentTaskClose(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
