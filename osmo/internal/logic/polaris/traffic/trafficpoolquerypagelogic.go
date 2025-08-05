package traffic

import (
	"context"
	"github.com/zeromicro/go-zero/core/logx"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"osmo/internal/svc"
	"osmo/internal/types"
	"strconv"
)

type TrafficPoolQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTrafficPoolQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TrafficPoolQueryPageLogic {
	return &TrafficPoolQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TrafficPoolQueryPageLogic) TrafficPoolQueryPage(req *types.TrafficPoolQueryPageReq) (resp *types.TrafficPoolQueryPageResp, err error) {
	// 使用 query 包中的 PolarisTrafficPool
	q := query.PolarisTrafficPool

	// 构建基础查询条件
	queryBuilder := q.WithContext(l.ctx).Debug().
		Where(q.IsDeleted.Is(false))

	// 添加关键词搜索条件
	if req.Keyword != "" {
		queryBuilder = queryBuilder.Where(
			q.URL.Like("%" + req.Keyword + "%"))
	}

	// 获取总数
	total, err := queryBuilder.Count()
	if err != nil {
		logx.Errorf("获取总数失败: %v", err)
		return nil, errorx.NewDefaultErrorf("获取总数失败: %v", err)
	}

	// 查询分页数据
	poolRecords, err := queryBuilder.
		Order(q.UpdateTime.Desc()).
		Offset((req.Page - 1) * req.PageSize).
		Limit(req.PageSize).
		Find()
	if err != nil {
		logx.Errorf("查询分页数据失败: %v", err)
		return nil, errorx.NewDefaultErrorf("查询分页数据失败: %v", err)
	}

	// 转换为响应格式
	records := make([]types.TrafficPoolQueryPageRespDataRecord, 0, len(poolRecords))
	for _, poolRecord := range poolRecords {
		// 处理可能为nil的指针字段
		responseBody := ""
		if poolRecord.ResponseBody != nil {
			responseBody = *poolRecord.ResponseBody
		}

		responseHeaders := ""
		if poolRecord.ResponseHeaders != nil {
			responseHeaders = *poolRecord.ResponseHeaders
		}

		requestBody := ""
		if poolRecord.RequestBody != nil {
			requestBody = *poolRecord.RequestBody
		}

		requestHeaders := ""
		if poolRecord.RequestHeaders != nil {
			requestHeaders = *poolRecord.RequestHeaders
		}

		httpType := ""
		if poolRecord.HTTPType != nil {
			httpType = *poolRecord.HTTPType
		}

		records = append(records, types.TrafficPoolQueryPageRespDataRecord{
			Id:              strconv.FormatInt(poolRecord.ID, 10),
			Url:             poolRecord.URL,
			ResponseBody:    responseBody,
			ResponseHeaders: responseHeaders,
			Method:          poolRecord.Method,
			RequestBody:     requestBody,
			RequestHeaders:  requestHeaders,
			HttpType:        httpType,
		})
	}

	return &types.TrafficPoolQueryPageResp{
		Success: true,
		Message: "查询成功",
		Data: types.TrafficPoolQueryPageRespData{
			Total:   int(total),
			Records: records,
		},
	}, nil
}
