package task

import (
	"context"
	"log"

	"polaris/internal/svc"
	"polaris/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AgentRecordTaskRunCallBackLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAgentRecordTaskRunCallBackLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AgentRecordTaskRunCallBackLogic {
	return &AgentRecordTaskRunCallBackLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AgentRecordTaskRunCallBackLogic) AgentRecordTaskRunCallBack(req *types.AgentRecordTaskRunCallBackReq) (resp *types.AgentRecordTaskRunCallBackResp, err error) {
	log.Printf("任务成功回调 id: %s 名称：%s", req.Id, req.Name)
	return &types.AgentRecordTaskRunCallBackResp{
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
