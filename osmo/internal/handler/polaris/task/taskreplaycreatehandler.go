package task

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo/internal/logic/polaris/task"
	"osmo/internal/svc"
	"osmo/internal/types"
)

func TaskReplayCreateHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.TaskReplayCreateReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := task.NewTaskReplayCreateLogic(r.Context(), svcCtx)
		resp, err := l.TaskReplayCreate(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
