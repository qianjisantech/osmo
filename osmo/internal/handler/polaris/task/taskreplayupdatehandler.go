package task

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"osmo/internal/logic/polaris/task"
	"osmo/internal/svc"
	"osmo/internal/types"
)

func TaskReplayUpdateHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.TaskReplayUpdateReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := task.NewTaskReplayUpdateLogic(r.Context(), svcCtx)
		resp, err := l.TaskReplayUpdate(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
