package task

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"polaris/internal/logic/task"
	"polaris/internal/svc"
	"polaris/internal/types"
)

func TaskRunCallBackHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.TaskRunCallBackReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := task.NewTaskRunCallBackLogic(r.Context(), svcCtx)
		resp, err := l.TaskRunCallBack(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
