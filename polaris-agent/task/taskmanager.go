package task

import (
	"errors"
	"fmt"
	"log"
	"net"
	"strings"
	"sync"
	"time"
)

var (
	ErrWorkerPoolFull   = errors.New("工作池已满，无法启动新任务")
	ErrTaskAlreadyExist = errors.New("任务已存在")
	ErrPortAlreadyInUse = errors.New("端口已被占用")
	ErrInvalidPort      = errors.New("无效的端口号")
	ErrTaskNotClosable  = errors.New("任务不可关闭")
	ErrTaskNotFound     = errors.New("任务不存在")
)

// 任务状态常量
const (
	StatusRunning   = "运行中"
	StatusStopped   = "已停止"
	StatusCompleted = "已完成"
	StatusFailed    = "执行异常"
	StatusClosed    = "已关闭"
)

// TaskFunc 定义任务执行函数类型
type TaskFunc func() error

type Task struct {
	ID         string        // 任务ID
	Name       string        // 任务名称
	StartTime  time.Time     // 开始时间
	Duration   string        // 任务持续时间
	StopChan   chan struct{} // 停止通道
	Running    bool          // 是否正在运行
	Func       TaskFunc      // 任务执行函数
	ListenPort string        // 监听端口
	Status     string        // 任务状态
	EndTime    time.Time     // 结束时间
	Error      error         // 任务错误信息
}

type TaskManager struct {
	tasks      map[string]*Task // 任务映射表
	mu         sync.Mutex       // 互斥锁
	workerPool chan struct{}    // 工作池通道
}

func NewTaskManager(maxWorkers int) *TaskManager {
	return &TaskManager{
		tasks:      make(map[string]*Task),
		workerPool: make(chan struct{}, maxWorkers),
	}
}

// checkPortAvailable 检查端口是否可用
func (tm *TaskManager) checkPortAvailable(port string) bool {
	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		return false
	}
	_ = listener.Close()
	return true
}

// validatePort 验证端口号是否有效
func validatePort(port string) bool {
	if port == "" {
		return false
	}
	for _, c := range port {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

// ListTasks 获取任务列表（动态计算状态）
func (tm *TaskManager) ListTasks() []Task {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	result := make([]Task, 0, len(tm.tasks))
	for _, task := range tm.tasks {
		currentStatus := tm.calculateRealTimeStatus(task)
		result = append(result, Task{
			ID:         task.ID,
			Name:       task.Name,
			StartTime:  task.StartTime,
			Duration:   task.Duration,
			ListenPort: task.ListenPort,
			Status:     currentStatus,
			EndTime:    task.EndTime,
		})
	}
	return result
}

// calculateRealTimeStatus 计算任务的实时状态
func (tm *TaskManager) calculateRealTimeStatus(task *Task) string {
	if task.Status == StatusClosed {
		return StatusClosed
	}

	if task.Running && time.Since(task.StartTime) < time.Since(task.EndTime) {
		return StatusRunning
	}

	return task.Status
}

// formatDuration 智能格式化持续时间
func formatDuration(d time.Duration) string {
	d = d.Round(time.Second) // 舍入到最近的秒数

	// 分解为小时、分钟、秒
	h := d / time.Hour
	d -= h * time.Hour
	m := d / time.Minute
	d -= m * time.Minute
	s := d / time.Second

	var parts []string

	if h > 0 {
		parts = append(parts, fmt.Sprintf("%dh", h))
	}
	if m > 0 {
		parts = append(parts, fmt.Sprintf("%dm", m))
	}
	if s > 0 || len(parts) == 0 { // 确保至少显示0s
		parts = append(parts, fmt.Sprintf("%ds", s))
	}

	// 组合各部分
	return strings.Join(parts, "")
}

// StartTask 启动一个新任务，根据结束时间计算持续时间
func (tm *TaskManager) StartTask(id string, name string, listenPort string, endTime string, taskFunc TaskFunc) (*Task, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	// 1. 验证端口号
	if !validatePort(listenPort) {
		return nil, ErrInvalidPort
	}

	// 2. 验证结束时间格式并计算持续时间
	end, err := time.Parse(time.DateTime, endTime)
	if err != nil {
		return nil, fmt.Errorf("结束时间格式错误，要求格式: %s", time.DateTime)
	}

	now := time.Now()
	if end.Before(now) {
		return nil, fmt.Errorf("结束时间 %s 不能早于当前时间 %s",
			end.Format(time.DateTime), now.Format(time.DateTime))
	}

	duration := end.Sub(now)

	// 3. 检查任务是否已存在
	if task, exists := tm.tasks[id]; exists {
		if task.Status != StatusClosed {
			return nil, ErrTaskAlreadyExist
		}
	}

	//// 4. 检查端口占用情况
	//if !tm.checkPortAvailable(listenPort) {
	//	return nil, fmt.Errorf("%w: 端口 %s 已被系统占用", ErrPortAlreadyInUse, listenPort)
	//}

	for _, task := range tm.tasks {
		if task.ListenPort == listenPort && task.Status != StatusClosed {
			return nil, fmt.Errorf("%w: 端口 %s 已被任务 %s 使用", ErrPortAlreadyInUse, listenPort, task.ID)
		}
	}

	// 5. 获取工作槽位
	select {
	case tm.workerPool <- struct{}{}:
	default:
		return nil, ErrWorkerPoolFull
	}

	// 6. 创建任务对象
	task := &Task{
		ID:         id,
		Name:       name,
		ListenPort: listenPort,
		StartTime:  now,
		Duration:   formatDuration(duration),
		StopChan:   make(chan struct{}),
		Running:    true,
		Func:       taskFunc,
		Status:     StatusRunning,
		EndTime:    end,
	}
	tm.tasks[id] = task

	log.Printf("任务启动 - ID: %s, 预计结束时间: %s, 持续时间: %v",
		id, end.Format(time.DateTime), formatDuration(duration))

	// 7. 启动任务协程
	go func() {
		startTime := time.Now()
		defer func() {
			<-tm.workerPool
			tm.mu.Lock()
			task.Running = false
			task.EndTime = time.Now()
			tm.mu.Unlock()

			actualDuration := time.Since(startTime)
			log.Printf("任务 %s 实际运行时间: %v (预期: %v)", id, actualDuration, duration)
		}()

		timer := time.NewTimer(duration)
		defer timer.Stop()

		taskDone := make(chan error, 1)
		funcDone := make(chan struct{})

		// 执行任务函数
		go func() {
			defer close(funcDone)
			err := taskFunc()
			taskDone <- err
		}()

		select {
		case <-timer.C:
			tm.mu.Lock()
			task.Status = StatusCompleted
			tm.mu.Unlock()
			log.Printf("任务 %s 正常完成（达到结束时间）", id)

		case <-task.StopChan:
			tm.mu.Lock()
			task.Status = StatusStopped
			tm.mu.Unlock()
			log.Printf("任务 %s 被手动停止", id)
			return

		case err := <-taskDone:
			<-funcDone // 等待函数完全结束

			// 继续等待剩余时间
			remaining := time.Until(end)
			if remaining > 0 {
				log.Printf("任务 %s 函数已完成，等待剩余时间: %v", id, remaining)
				select {
				case <-time.After(remaining):
					tm.mu.Lock()
					task.Status = StatusCompleted
					tm.mu.Unlock()
					log.Printf("任务 %s 完成等待，标记为已完成", id)

				case <-task.StopChan:
					tm.mu.Lock()
					task.Status = StatusStopped
					tm.mu.Unlock()
					log.Printf("任务 %s 在等待期间被手动停止", id)
					return
				}
			}

			tm.mu.Lock()
			if err != nil {
				task.Status = StatusFailed
				task.Error = err
			} else {
				task.Status = StatusCompleted
			}
			tm.mu.Unlock()
		}
	}()

	return task, nil
}

// StopTask 停止一个任务，返回被停止的任务对象
func (tm *TaskManager) StopTask(id string) (*Task, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	task, ok := tm.tasks[id]
	if !ok {
		return nil, ErrTaskNotFound
	}

	if !task.Running {
		return task, fmt.Errorf("任务 %s 当前未运行", id)
	}

	close(task.StopChan)
	task.Running = false
	task.Status = StatusStopped
	task.EndTime = time.Now()

	log.Printf("任务 %s (%s) 状态变更为: %s", task.ID, task.Name, task.Status)
	return task, nil
}

// CloseTask 关闭已完成或执行异常的任务
func (tm *TaskManager) CloseTask(id string) (*Task, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	task, ok := tm.tasks[id]
	if !ok {
		return nil, ErrTaskNotFound
	}

	// 只有已完成或执行异常的任务可以关闭
	if task.Status != StatusCompleted && task.Status != StatusFailed {
		return nil, fmt.Errorf("%w: 任务状态为 %s", ErrTaskNotClosable, task.Status)
	}

	task.Status = StatusClosed
	log.Printf("任务 %s (%s) 已关闭", task.ID, task.Name)
	return task, nil
}

// GetActiveTasks 获取活跃任务列表（不包括已关闭的任务）
func (tm *TaskManager) GetActiveTasks() []Task {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	result := make([]Task, 0)
	for _, task := range tm.tasks {
		if task.Status != StatusClosed {
			result = append(result, *task)
		}
	}
	return result
}

// GetTaskByPort 根据端口号查找活跃任务
func (tm *TaskManager) GetTaskByPort(port string) (*Task, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	for _, task := range tm.tasks {
		if task.ListenPort == port && task.Status != StatusClosed {
			return task, nil
		}
	}
	return nil, fmt.Errorf("未找到使用端口 %s 的活跃任务", port)
}

// GetTaskStatus 获取任务状态（动态计算）
func (tm *TaskManager) GetTaskStatus(id string) (string, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	task, ok := tm.tasks[id]
	if !ok {
		return "", ErrTaskNotFound
	}

	return tm.calculateRealTimeStatus(task), nil
}

// TaskExists 检查任务是否存在（包括已关闭的任务）
func (tm *TaskManager) TaskExists(id string) bool {
	tm.mu.Lock()
	defer tm.mu.Unlock()
	_, exists := tm.tasks[id]
	return exists
}

// GetActiveTaskCount 获取活跃任务数量
func (tm *TaskManager) GetActiveTaskCount() int {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	count := 0
	for _, task := range tm.tasks {
		if task.Status != StatusClosed {
			count++
		}
	}
	return count
}
