package agent

import (
	"net/http"

	"github.com/qianjisantech/gosmo-agent/internal/logic/agent"
	"github.com/qianjisantech/gosmo-agent/internal/svc"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func AgentTaskStartHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := agent.NewAgentTaskStartLogic(r.Context(), svcCtx)
		err := l.AgentTaskStart()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.Ok(w)
		}
	}
}
