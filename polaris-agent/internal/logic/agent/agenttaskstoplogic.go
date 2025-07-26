package agent

import (
	"context"
	"fmt"
	"github.com/qianjisantech/gosmo-agent/common/errorx"
	task2 "github.com/qianjisantech/gosmo-agent/task"
	"log"

	"github.com/qianjisantech/gosmo-agent/internal/svc"
	"github.com/qianjisantech/gosmo-agent/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AgentTaskStopLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAgentTaskStopLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AgentTaskStopLogic {
	return &AgentTaskStopLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AgentTaskStopLogic) AgentTaskStop(req *types.AgentTaskStopReq) (resp *types.AgentTaskStopResp, err error) {
	// 获取任务管理器实例
	taskMgr := l.svcCtx.TaskManager

	// 1. 根据ID查找任务
	status, err := taskMgr.GetTaskStatus(req.Id)
	if err != nil {
		logx.Errorf("停止任务失败，未找到任务ID: %s, 错误: %v", req.Id, err)
		return nil, errorx.NewDefaultErrorf("未找到ID为 %s 的任务", req.Id)
	}
	log.Printf("停止任务查询历史任务已找到任务ID: %s, 状态: %s", req.Id, status)
	if status != task2.StatusRunning {
		logx.Errorf("停止任务失败，任务ID: %s 当前状态为 %s，非运行中状态", req.Id, status)
		return nil, errorx.NewDefaultErrorf("任务 %s 当前状态为 %s，无法停止非运行中任务", req.Id, status)
	}

	// 3. 停止任务
	stoppedTask, err := taskMgr.StopTask(req.Id)
	if err != nil {
		logx.Errorf("停止任务操作失败，任务ID: %s, 错误: %v", req.Id, err)
		return nil, errorx.NewDefaultErrorf("停止任务 %s 失败: %v", req.Id, err)
	}

	// 4. 记录回调URL（如果有）
	if req.CallBackUrl != "" {
		go func() {
			// 异步调用回调URL通知任务已停止
			err := notifyCallback(req.CallBackUrl, stoppedTask)
			if err != nil {
				logx.Errorf("回调通知失败，URL: %s, 错误: %v", req.CallBackUrl, err)
			}
		}()
	}

	logx.Infof("成功停止任务ID: %s, 名称: %s", req.Id, stoppedTask.Name)

	return &types.AgentTaskStopResp{
		Success: true,
		Message: fmt.Sprintf("任务 %s 已成功停止", req.Id),
		Data: types.AgentTaskStopRespData{
			Id:     stoppedTask.ID,
			Status: stoppedTask.Status,
		},
	}, nil
}

// notifyCallback 异步通知回调URL
func notifyCallback(url string, task *task2.Task) error {
	// 实现HTTP请求逻辑通知回调URL
	// 示例代码：
	// client := &http.Client{}
	// payload, _ := json.Marshal(map[string]interface{}{
	//     "task_id": task.ID,
	//     "status":  task.Status,
	// })
	// req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	// resp, err := client.Do(req)
	// if err != nil {
	//     return err
	// }
	// defer resp.Body.Close()
	return nil
}
