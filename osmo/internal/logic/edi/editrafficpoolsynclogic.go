package edi

import (
	"context"
	"osmo/gen/model"
	"osmo/internal/common/errorx"
	"osmo/internal/svc"
	"osmo/internal/types"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type EdiTrafficPoolSyncLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEdiTrafficPoolSyncLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EdiTrafficPoolSyncLogic {
	return &EdiTrafficPoolSyncLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EdiTrafficPoolSyncLogic) EdiTrafficPoolSync(req *types.EdiTrafficPoolSyncReq) (resp *types.EdiTrafficPoolSyncResp, err error) {

	if req.Id == "" {
		return nil, errorx.NewCodeErrorf("id为必填参数")
	}

	if req.Method == "" {
		return nil, errorx.NewCodeErrorf("method为必填参数")
	}

	if req.Url == "" {
		return nil, errorx.NewCodeErrorf("url为必填参数")
	}

	if req.TaskId == "" {
		return nil, errorx.NewCodeErrorf("task_id为必填参数")
	}
	if req.RequestHeaders == "" {
		return nil, errorx.NewCodeErrorf("request_headers为必填参数")
	}
	if req.RequestBody == "" {
		return nil, errorx.NewCodeErrorf("request_body为必填参数")
	}
	if req.ResponseHeaders == "" {
		return nil, errorx.NewCodeErrorf("response_headers为必填参数")
	}
	if req.ResponseBody == "" {
		return nil, errorx.NewCodeErrorf("response_body为必填参数")
	}
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewCodeErrorf("id不合法: %v", err)
	}
	// 将请求数据转换为 PolarisTrafficPool 结构体
	trafficPool := &model.PolarisTrafficPool{
		ID:              id,
		Method:          req.Method,
		URL:             req.Url,
		RequestBody:     &req.RequestBody,
		RequestHeaders:  &req.RequestHeaders,
		ResponseBody:    &req.ResponseBody,
		ResponseHeaders: &req.ResponseHeaders,
		TaskID:          req.TaskId,
		HTTPType:        &req.HttpType,
		CreateBy:        "system", // 可根据实际情况修改
		CreateByName:    "系统",     // 可根据实际情况修改
		UpdateBy:        "system", // 可根据实际情况修改
		UpdateByName:    "系统",     // 可根据实际情况修改
	}

	// 执行数据库插入操作
	if err := l.svcCtx.DB.Create(trafficPool).Error; err != nil {
		return nil, errorx.NewDefaultErrorf("插入流量数据失败: %v", err)
	}

	return &types.EdiTrafficPoolSyncResp{
		Success: true,
		Message: "流量数据插入成功",
	}, nil
}
