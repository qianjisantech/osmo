package task

import (
	"context"
	"log"

	"polaris/internal/svc"
	"polaris/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskRunCallBackLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskRunCallBackLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskRunCallBackLogic {
	return &TaskRunCallBackLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskRunCallBackLogic) TaskRunCallBack(req *types.TaskRunCallBackReq) (resp *types.TaskRunCallBackResp, err error) {

	log.Printf("任务成功回调 id: %s 名称：%s", req.Id, req.Name)
	return &types.TaskRunCallBackResp{
		Data: struct {
			Id        string `json:"id"`
			Status    string `json:"status"`
			Message   string `json:"message"`
			Timestamp string `json:"timestamp"`
			Name      string `json:"name"`
		}{
			Id:        req.Id,
			Status:    req.Status,
			Message:   req.Message,
			Timestamp: req.Timestamp,
			Name:      req.Name,
		},
		Message: "success",
		Success: true,
	}, nil
}
