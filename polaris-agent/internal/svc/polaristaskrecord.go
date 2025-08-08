package svc

import (
	"github.com/qianjisantech/gosmo-agent/internal/constant"
	"github.com/qianjisantech/polaris-discovery-sdk/core"
	"github.com/zeromicro/go-zero/core/logx"
	"strconv"
)

func HeartBeatCallback(svc *ServiceContext, resp *core.HeatBeatResponse) error {
	currentTasks := svc.TaskManager.GetActiveTasks()
	logx.Infof("当前进行中的任务: %v", currentTasks)

	// 如果响应中没有任务，停止所有当前任务
	if len(resp.Data.Tasks) == 0 {
		for _, task := range currentTasks {
			// 不管任务当前是什么状态，都执行停止操作
			stoppedTask, err := svc.TaskManager.StopTask(task.ID)
			if err != nil {
				logx.Errorf("停止任务 %s 失败: %v", task.ID, err)
				continue
			}

			// 关闭并移除已停止的任务
			if _, err := svc.TaskManager.CloseTask(stoppedTask.ID); err != nil {
				logx.Errorf("关闭任务 %s 失败: %v", stoppedTask.ID, err)
			}
		}
		return nil
	}

	// 构建响应任务映射表
	respTaskMap := make(map[string]core.HeatBeatResponseTask)
	for _, taskResp := range resp.Data.Tasks {
		respTaskMap[taskResp.Id] = taskResp
	}

	// 处理当前运行中的任务
	for _, currentTask := range currentTasks {
		respTask, exists := respTaskMap[currentTask.ID]

		// 如果当前任务不在响应任务列表中，停止并关闭该任务
		if !exists {
			stoppedTask, err := svc.TaskManager.StopTask(currentTask.ID)
			if err != nil {
				logx.Errorf("停止任务 %s 失败: %v", currentTask.ID, err)
				continue
			}

			if _, err := svc.TaskManager.CloseTask(stoppedTask.ID); err != nil {
				logx.Errorf("关闭任务 %s 失败: %v", stoppedTask.ID, err)
			}
			continue
		}

		// 如果响应任务状态不是running或waiting，停止当前任务
		if respTask.Status != string(constant.TaskStatusRunning) &&
			respTask.Status != string(constant.TaskStatusWaiting) {
			stoppedTask, err := svc.TaskManager.StopTask(currentTask.ID)
			if err != nil {
				logx.Errorf("停止任务 %s 失败: %v", currentTask.ID, err)
				continue
			}

			if _, err := svc.TaskManager.CloseTask(stoppedTask.ID); err != nil {
				logx.Errorf("关闭任务 %s 失败: %v", stoppedTask.ID, err)
			}
		}
	}

	// 处理响应中的任务（启动新任务）
	for _, task := range resp.Data.Tasks {
		// 检查任务是否已经在运行
		if svc.TaskManager.IsTaskRunning(task.Id) {
			continue
		}

		// 检查资源是否允许启动新任务
		if !svc.canStartNewTask() {
			logx.Infof("资源限制，无法启动新任务: %s", task.Id)
			continue
		}

		// 如果任务状态是waiting或running，启动任务
		if task.Status == string(constant.TaskStatusWaiting) ||
			task.Status == string(constant.TaskStatusRunning) {
			_, err := svc.TaskManager.StartTask(svc.Config, task.Id, task.Name, strconv.Itoa(task.ListenPort), task.EndTime)
			if err != nil {
				logx.Errorf("启动任务 %s 失败: %v", task.Id, err)
				return err
			}
		}
	}

	return nil
}

func (s *ServiceContext) canStartNewTask() bool {
	// 示例：检查当前活跃任务数是否小于最大限制
	maxTasks := s.Config.Task.MaxConcurrent
	currentTasks := s.TaskManager.GetActiveTaskCount()
	return currentTasks < maxTasks
}
