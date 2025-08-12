package task

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"gorm.io/gorm"
	"io"
	"osmo/constant"
	"osmo/gen/model"
	"osmo/httputil"
	"osmo/internal/common/errorx"
	"strings"
	"time"

	"osmo/internal/svc"
	"osmo/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskReplayExecuteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskReplayExecuteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskReplayExecuteLogic {
	return &TaskReplayExecuteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskReplayExecuteLogic) TaskReplayExecute(req *types.TaskReplayExecuteReq) (*types.TaskReplayExecuteResp, error) {
	// 1. 参数校验
	if req.ID == "" {
		return nil, errorx.NewDefaultError("任务ID不能为空")
	}

	// 2. 查询任务记录
	var task model.PolarisTaskReplay
	err := l.svcCtx.DB.Where("id = ?", req.ID).First(&task).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errorx.NewDefaultError("未找到对应任务记录")
		}
		logx.Errorf("查询任务失败: %v", err)
		return nil, errorx.NewDefaultErrorf("查询任务失败: %v", err)
	}

	// 3. 更新任务状态
	result := l.svcCtx.DB.Model(&model.PolarisTaskReplay{}).
		Where("id = ?", req.ID).
		Updates(map[string]interface{}{
			"status":       constant.TaskStatusRunning,
			"execute_time": time.Now(),
		})

	if result.Error != nil {
		logx.Errorf("更新任务状态失败: %v", result.Error)
		return nil, errorx.NewDefaultErrorf("更新任务状态失败: %v", result.Error)
	}

	if result.RowsAffected == 0 {
		logx.Errorf("未找到对应任务记录, ID: %s", req.ID)
		return nil, errorx.NewDefaultError("未找到对应任务记录")
	}

	// 4. 异步处理关联流量池
	if task.NeedReplayTraffics != "" {
		go func() {
			defer func() {
				if r := recover(); r != nil {
					logx.Errorf("处理流量池时发生panic: %v", r)
				}
			}()

			// 分割流量池ID
			trafficPoolIDs := strings.Split(task.NeedReplayTraffics, ",")

			var trafficPools []model.PolarisTrafficPool
			err := l.svcCtx.DB.Where("id IN (?)", trafficPoolIDs).Find(&trafficPools).Error
			if err != nil {
				logx.Errorf("查询关联流量池失败: %v", err)
				return
			}

			logx.Infof("找到 %d 个关联流量池", len(trafficPools))

			// 异步处理流量池
			if err := l.asyncHandleTrafficPools(task.ReplayAddr, trafficPools); err != nil {
				logx.Errorf("异步处理流量池失败: %v", err)
				// 3. 更新任务状态
				_ = l.svcCtx.DB.Model(&model.PolarisTaskReplay{}).
					Where("id = ?", req.ID).
					Updates(map[string]interface{}{
						"fail_reason": err.Error(),
						"status":      constant.TaskStatusFailed,
					})
				return
			} else {
				// 3. 更新任务状态
				_ = l.svcCtx.DB.Model(&model.PolarisTaskReplay{}).
					Where("id = ?", req.ID).
					Updates(map[string]interface{}{
						"status":      constant.TaskStatusSuccess,
						"fail_reason": "",
					})
			}
		}()
	}

	// 5. 记录操作日志
	logx.Infof("任务执行成功, ID: %s", req.ID)

	// 6. 返回响应
	return &types.TaskReplayExecuteResp{
		Success: true,
		Message: "任务已执行",
	}, nil
}

// 异步处理流量池
func (l *TaskReplayExecuteLogic) asyncHandleTrafficPools(replayAddr string, pools []model.PolarisTrafficPool) error {
	for _, pool := range pools {
		// 1. 记录开始处理
		logx.Infof("开始处理流量池: ID=%s, URL=%s, Method=%s", pool.ID, pool.URL, pool.Method)

		// 2. 准备请求头
		var headers map[string]string
		if pool.RequestHeaders != nil {
			var err error
			headers, err = HeadersToMap(*pool.RequestHeaders)
			if err != nil {
				logx.Errorf("解析请求头失败, ID=%s: %v", pool.ID, err)
				return err
			}
		} else {
			headers = make(map[string]string)
		}

		// 3. 确保有默认Content-Type
		if _, ok := headers["Content-Type"]; !ok {
			headers["Content-Type"] = "application/json"
		}

		// 4. 创建HTTP客户端
		client := httputil.NewClient(
			httputil.WithBaseURL(replayAddr),
			httputil.WithTimeout(10*time.Second),
			httputil.WithRetry(2, 1*time.Second),
		)

		// 5. 发送请求
		var reqBody interface{}
		if pool.RequestBody != nil {
			reqBody = *pool.RequestBody
		}

		resp, err := client.Post(context.Background(), pool.URL, reqBody, headers)
		if err != nil {
			logx.Errorf("请求失败, ID=%s: %v", pool.ID, err)
			return err
		}
		defer resp.Body.Close()

		// 6. 记录完整响应信息
		logx.Infof("响应状态: ID=%s, Status=%s", pool.ID, resp.Status)

		// 7. 检查响应状态
		if resp.StatusCode >= 400 {
			body, _ := io.ReadAll(resp.Body)
			logx.Errorf("请求错误, ID=%s, Status=%s, Body=%s",
				pool.ID, resp.Status, string(body))
			return fmt.Errorf("请求错误, ID=%s, Status=%s, Body=%s",
				pool.ID, resp.Status, string(body))
		}

		// 8. 处理成功响应
		logx.Infof("处理成功, ID=%s", pool.ID)
	}

	return nil
}

func HeadersToMap(headersStr string) (map[string]string, error) {
	headersStr = strings.TrimSpace(headersStr)

	// 空字符串返回空map
	if headersStr == "" {
		return make(map[string]string), nil
	}

	// 检查JSON格式
	if !strings.HasPrefix(headersStr, "{") || !strings.HasSuffix(headersStr, "}") {
		return nil, fmt.Errorf("invalid headers format, expected JSON object")
	}

	var headersMap map[string]string
	if err := json.Unmarshal([]byte(headersStr), &headersMap); err != nil {
		return nil, fmt.Errorf("failed to parse headers JSON: %v", err)
	}

	return headersMap, nil
}
