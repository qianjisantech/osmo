package discovery

import (
	"context"
	"fmt"
	"polaris/common/errorx"
	"polaris/common/utils"
	"polaris/constant"
	"polaris/gen/model"
	"polaris/gen/query"
	"polaris/internal/svc"
	"polaris/internal/types"
	"strconv"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
)

type DiscoveryHeatBeatLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDiscoveryHeatBeatLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DiscoveryHeatBeatLogic {
	return &DiscoveryHeatBeatLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DiscoveryHeatBeatLogic) DiscoveryHeatBeat(req *types.DiscoveryHeatBeatReq) (*types.DiscoveryHeatBeatResp, error) {
	// 1. 参数校验
	if req == nil {
		return nil, errorx.NewDefaultError("请求参数不能为空")
	}

	if req.IdentificationCode == "" {
		return nil, errorx.NewDefaultError("客户端无法识别心跳")
	}
	id, err := utils.ParseIdFromIdentificationCode(req.IdentificationCode)
	if err != nil {
		logx.WithContext(l.ctx).Errorf("从识别码解析id失败: %s, 错误: %v", req.IdentificationCode, err)
		return nil, errorx.NewDefaultError("从识别码解析id失败")
	}

	// 2. 准备数据模型
	agent := &model.PolarisResourceAgent{
		ID:                    id,
		IP:                    req.IP,
		Status:                req.Status,
		ExecuteStatus:         req.ExecuteStatus,
		CPUCores:              int32(req.CPUCores),
		CPUUsedPercent:        req.CPUUsedPercent,
		CPUFreePercent:        req.CPUFreePercent,
		MemoryTotal:           req.MemoryTotal,
		MemoryUsed:            req.MemoryUsed,
		MemoryFree:            req.MemoryFree,
		MemoryUsedPercent:     req.MemoryUsedPercent,
		NetworkBytesSent:      req.NetworkBytesSent,
		NetworkBytesReceive:   req.NetworkBytesReceive,
		NetworkPacketsSent:    req.NetworkPacketsSent,
		NetworkPacketsReceive: req.NetworkPacketsReceive,
	}

	// 3. 使用事务处理数据库操作
	var (
		updatedAgent *model.PolarisResourceAgent
		tasks        []*model.PolarisTaskRecord
	)
	err = query.Q.Transaction(func(tx *query.Query) error {
		// 更新操作
		res, err := tx.PolarisResourceAgent.WithContext(l.ctx).Debug().
			Where(tx.PolarisResourceAgent.ID.Eq(id)).
			Updates(agent)
		if err != nil {
			return err
		}
		logx.Infof("心跳处理完成: ID=%d,结果=%v", id, res.RowsAffected)

		// 查询最新信息
		updatedAgent, err = tx.PolarisResourceAgent.WithContext(l.ctx).
			Where(tx.PolarisResourceAgent.ID.Eq(id)).
			First()
		if err != nil {
			return err
		}

		// 查询关联的录制任务
		tasks, err = tx.PolarisTaskRecord.WithContext(l.ctx).
			Where(
				tx.PolarisTaskRecord.AgentID.Eq(strconv.FormatInt(id, 10)),
				tx.PolarisTaskRecord.IsDeleted.Is(false),
				tx.PolarisTaskRecord.Status.In(constant.TaskStatuses...),
			).
			Find()
		if err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		logx.WithContext(l.ctx).Errorf("处理执行机心跳失败: ID=%d, 错误: %v", id, err)
		return nil, errorx.NewDefaultErrorf("处理执行机心跳失败: %v", err)
	}

	// 4. 检查查询结果
	if updatedAgent == nil {
		return nil, errorx.NewDefaultError("未找到更新后的执行机信息")
	}

	// 5. 安全处理可能为nil的Name字段
	var name string
	if updatedAgent.Name != nil {
		name = *updatedAgent.Name
	}

	// 6. 转换任务数据
	taskList := make([]types.DiscoveryHeatBeatRespDataTask, 0, len(tasks))
	for _, task := range tasks {
		listenPort, _ := strconv.Atoi(task.ListenPort)

		taskList = append(taskList, types.DiscoveryHeatBeatRespDataTask{
			Id:           strconv.FormatInt(task.ID, 10),
			Name:         task.Name,
			Status:       task.Status,
			ListenPort:   listenPort,
			CreateTime:   task.CreateTime.Format(time.DateTime),
			CreateBy:     task.CreateBy,
			CreateByName: task.CreateByName,
			UpdateBy:     task.UpdateBy,
			UpdateByName: task.UpdateByName,
			UpdateTime:   task.UpdateTime.Format(time.DateTime),
			StartTime:    formatNullableTime(task.StartTime),
			EndTime:      formatNullableTime(task.EndTime),
			ExecuteTime:  formatNullableTime(task.ExecuteTime),
		})
	}

	// 7. 返回响应
	return &types.DiscoveryHeatBeatResp{
		Success: true,
		Message: fmt.Sprintf("处理执行机心跳成功: ID=%d", id),
		Data: types.DiscoveryHeatBeatRespData{
			Id:    strconv.FormatInt(updatedAgent.ID, 10),
			Name:  name,
			Tasks: taskList,
		},
	}, nil
}

// 辅助函数：格式化可能为nil的时间字段
func formatNullableTime(t *time.Time) string {
	if t == nil {
		return ""
	}
	return t.Format(time.DateTime)
}
