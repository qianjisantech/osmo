package resource

import (
	"context"
	"osmo/gen/query"
	"osmo/internal/common/errorx"
	"osmo/internal/svc"
	"osmo/internal/types"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type ResourceAgentSelectOptionsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewResourceAgentSelectOptionsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ResourceAgentSelectOptionsLogic {
	return &ResourceAgentSelectOptionsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ResourceAgentSelectOptionsLogic) ResourceAgentSelectOptions(req *types.ResourceAgentSelectOptionsReq) (resp *types.ResourceAgentSelectOptionsResp, err error) {
	// 使用 query 包中的 GosmoResourceAgent
	q := query.PolarisResourceAgent

	// 构建基础查询条件
	queryBuilder := q.WithContext(l.ctx).Debug().
		Where(q.IsDeleted.Is(false)).Where(q.Name.IsNotNull())
	if len(req.Status) > 0 {
		queryBuilder = queryBuilder.
			Where(q.Status.In(req.Status...))
	}
	if len(req.ExecuteStatus) > 0 {
		queryBuilder = queryBuilder.
			Where(q.ExecuteStatus.In(req.ExecuteStatus...))
	}
	// 添加关键词搜索条件
	if req.Keyword != "" {
		queryBuilder = queryBuilder.Where(
			q.IP.Like("%" + req.Keyword + "%")).Or().Where(q.HostName.Like("%" + req.Keyword + "%"))
	}

	// 查询所有符合条件的代理
	agents, err := queryBuilder.Find()
	if err != nil {
		logx.Errorf("查询执行机失败: %v", err)
		return nil, errorx.NewDefaultError("查询执行机失败")
	}

	// 转换为前端下拉框需要的格式
	options := make([]types.ResourceAgentSelectOptionsRespData, 0, len(agents))
	for _, agent := range agents {
		options = append(options, types.ResourceAgentSelectOptionsRespData{
			Key:           *agent.Name,
			Value:         agent.IP,
			Id:            strconv.FormatInt(agent.ID, 10),
			ExecuteStatus: agent.ExecuteStatus,
		})
	}

	return &types.ResourceAgentSelectOptionsResp{
		Success: true,
		Message: "查询成功",
		Data:    options,
	}, nil
}
