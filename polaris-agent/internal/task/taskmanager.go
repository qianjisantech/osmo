package task

import (
	"context"
	"errors"
	"fmt"
	"github.com/IBM/sarama"
	recorder "github.com/qianjisantech/gosmo"
	"github.com/qianjisantech/gosmo/engine"
	"github.com/qianjisantech/polaris-agent/internal/common/util"
	"github.com/qianjisantech/polaris-agent/internal/config"
	"github.com/qianjisantech/polaris-agent/internal/constant"
	"github.com/zeromicro/go-zero/core/logx"
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

//// 任务状态常量
//const (
//	StatusRunning   = "运行中"
//	StatusStopped   = "已停止"
//	StatusCompleted = "已完成"
//	StatusFailed    = "执行异常"
//	StatusClosed    = "已关闭"
//)

// TaskFunc 定义任务执行函数类型
type TaskFunc func(task *Task) error

type Task struct {
	ID         string                 // 任务ID
	Name       string                 // 任务名称
	StartTime  time.Time              // 开始时间
	Duration   string                 // 任务持续时间
	StopChan   chan struct{}          // 停止通道
	Running    bool                   // 是否正在运行
	ListenPort string                 // 监听端口
	Status     string                 // 任务状态
	EndTime    time.Time              // 结束时间
	Error      error                  // 任务错误信息
	Engine     *engine.RecorderEngine // 保存引擎实例
	Pid        int
}

type TaskManager struct {
	tasks       map[string]*Task // 任务映射表
	mu          sync.Mutex       // 互斥锁
	workerPool  chan struct{}    // 工作池通道
	polarisAddr string
}

func NewTaskManager(maxWorkers int, polarisAddr string) *TaskManager {
	return &TaskManager{
		tasks:       make(map[string]*Task),
		workerPool:  make(chan struct{}, maxWorkers),
		polarisAddr: polarisAddr,
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
	if task.Status == string(constant.TaskStatusClosed) {
		return string(constant.TaskStatusClosed)
	}

	if task.Running && time.Since(task.StartTime) < time.Since(task.EndTime) {
		return string(constant.TaskStatusRunning)
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

func (tm *TaskManager) StartTask(c config.Config, id string, name string, listenPort string, endTime string) (*Task, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	// 检查任务是否已存在且未关闭
	if task, exists := tm.tasks[id]; exists {
		if task.Status != string(constant.TaskStatusClosed) {
			return nil, ErrTaskAlreadyExist
		} else {
			// 如果任务是已关闭状态，释放可能占用的工作池槽位
			tm.releaseWorkerSlot()
		}
	}

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
	task := &Task{
		ID:         id,
		Name:       name,
		ListenPort: listenPort,
		StartTime:  time.Now(),
		Duration:   formatDuration(duration),
		StopChan:   make(chan struct{}),
		Running:    true,
		Status:     string(constant.TaskStatusRunning),
		EndTime:    end,
	}

	// 3. 检查任务是否已存在
	if task, exists := tm.tasks[id]; exists {
		if task.Status != string(constant.TaskStatusClosed) {
			return nil, ErrTaskAlreadyExist
		}
	}

	// 4. 检查端口占用情况
	for _, t := range tm.tasks {
		if t.ListenPort == listenPort && t.Status != string(constant.TaskStatusClosed) {
			return nil, fmt.Errorf("%w: 端口 %s 已被任务 %s 使用", ErrPortAlreadyInUse, listenPort, t.ID)
		}
	}

	// 5. 获取工作槽位
	select {
	case tm.workerPool <- struct{}{}:
	default:
		return nil, ErrWorkerPoolFull
	}

	// 初始化引擎
	enginer := &engine.RecorderEngine{
		Port: ":" + listenPort,
		InputRAWConfig: engine.InputRAWConfig{
			TrackResponse: true,
		},
		OutputStdout: true,
		OutputKafkaConfig: recorder.OutputKafkaConfig{
			Topic:   c.Kafka.Topic,
			UseJSON: true,
			Host:    c.Kafka.Host,
			Key:     sarama.StringEncoder(id),
		},
	}

	// 启动引擎
	pid, err := enginer.Start()
	if err != nil {
		tm.releaseWorkerSlot()
		return nil, fmt.Errorf("引擎启动失败: %w", err)
	}

	// 设置任务引擎和PID
	task.Engine = enginer
	task.Pid = pid
	tm.tasks[id] = task

	logx.Infof("任务启动成功 - ID: %s, PID: %d, 端口: %s, 预计结束时间: %s",
		id, pid, listenPort, end.Format(time.DateTime))

	// 启动任务协程
	go func() {
		err := tm.runTask(task, duration)
		if err != nil {
			log.Printf("启动任务协程失败%v", err)
		}
	}()

	return task, nil
}

// runTask 执行任务的主要逻辑
func (tm *TaskManager) runTask(task *Task, duration time.Duration) error {
	startTime := time.Now()
	defer func() {
		// 确保资源释放
		if task.Engine != nil && task.Pid != 0 {
			if task.Engine.IsRunning(task.Pid) {
				_ = task.Engine.Stop(task.Pid)
			}
		}

		<-tm.workerPool
		tm.mu.Lock()
		task.Running = false
		task.EndTime = time.Now()
		tm.mu.Unlock()

		actualDuration := time.Since(startTime)
		logx.Infof("任务 %s 实际运行时间: %v (预期: %v)", task.ID, actualDuration, duration)
	}()

	// 执行启动回调
	if task.syncTaskCallBack(tm.polarisAddr) != nil {

		if err := task.syncTaskCallBack(tm.polarisAddr); err != nil {
			task.Status = string(constant.TaskStatusFailed)
			task.Error = err
			tm.mu.Lock()
			tm.mu.Unlock()
			return fmt.Errorf("启动回调执行失败: %w", err)
		}
	}

	timer := time.NewTimer(duration)
	defer timer.Stop()

	select {
	case <-timer.C:
		tm.mu.Lock()
		task.Status = string(constant.TaskStatusRunning)
		tm.mu.Unlock()
		logx.Infof("任务 %s 正常完成（达到结束时间）", task.ID)

	case <-task.StopChan:
		// 停止回调在 StopTask 方法中执行
		return nil
	}

	return nil
}

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

	// 停止录制引擎
	if task.Engine != nil && task.Pid != 0 {
		if task.Engine.IsRunning(task.Pid) {
			if err := task.Engine.Stop(task.Pid); err != nil {
				logx.Errorf("停止录制引擎失败: %v", err)
				return nil, err
			}
		}
	}

	// 执行停止回调
	if task.syncTaskCallBack(tm.polarisAddr) != nil {
		if err := task.syncTaskCallBack(tm.polarisAddr); err != nil {
			logx.Errorf("停止回调执行失败: %v", err)
			// 不返回错误，继续执行停止流程
		}
	}

	close(task.StopChan)
	task.Running = false
	task.Status = string(constant.TaskStatusAborted)
	task.EndTime = time.Now()

	logx.Infof("任务 %s (%s) 已停止", task.ID, task.Name)
	return task, nil
}
func (tm *TaskManager) CloseTask(id string) (*Task, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	task, ok := tm.tasks[id]
	if !ok {
		return nil, ErrTaskNotFound
	}

	// 如果任务正在运行，先停止
	if task.Running {
		if task.Engine != nil {
			_, err := tm.StopTask(id)
			if err != nil {
				return nil, err
			}
		} else {
			close(task.StopChan)
			tm.releaseWorkerSlot()
		}
	}

	// 执行关闭回调
	if task.syncTaskCallBack(tm.polarisAddr) != nil {
		if err := task.syncTaskCallBack(tm.polarisAddr); err != nil {
			logx.Errorf("关闭回调执行失败: %v", err)
			// 不返回错误，继续执行关闭流程
		}
	}

	task.Status = string(constant.TaskStatusClosed)
	logx.Infof("任务 %s (%s) 已关闭", task.ID, task.Name)
	return task, nil
}

// GetActiveTasks 获取活跃任务列表（不包括已关闭的任务）
func (tm *TaskManager) GetActiveTasks() []Task {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	result := make([]Task, 0)
	for _, task := range tm.tasks {
		if task.Status != string(constant.TaskStatusClosed) {
			result = append(result, *task)
		}
	}
	return result
}
func (tm *TaskManager) GetTask(id string) (*Task, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	task, ok := tm.tasks[id]
	if !ok {
		return nil, ErrTaskNotFound
	}
	return task, nil
}

// GetTaskByPort 根据端口号查找活跃任务
func (tm *TaskManager) GetTaskByPort(port string) (*Task, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	for _, task := range tm.tasks {
		if task.ListenPort == port && task.Status != string(constant.TaskStatusClosed) {
			return task, nil
		}
	}
	return nil, fmt.Errorf("未找到使用端口 %s 的活跃任务", port)
}

// releaseWorkerSlot 释放工作池槽位（内部方法）
func (tm *TaskManager) releaseWorkerSlot() {
	select {
	case <-tm.workerPool: // 尝试释放一个槽位
	default:
		// 如果没有槽位被占用，不做任何操作
	}
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
		if task.Status != string(constant.TaskStatusClosed) {
			count++
		}
	}
	return count
}

// IsTaskRunning 检查指定ID的任务是否正在运行
func (tm *TaskManager) IsTaskRunning(id string) bool {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	task, exists := tm.tasks[id]
	if !exists {
		return false
	}

	return task.Running && tm.calculateRealTimeStatus(task) == string(constant.TaskStatusRunning)
}
func (t *Task) syncTaskCallBack(polarisAddr string) error {
	log.Printf("这是同步任务的回调方法")
	startTaskCallBackUrl := fmt.Sprintf("%s%s", polarisAddr, constant.InnerRecordTaskSyncPath)
	log.Printf("这是同步任务的回调方法 url:%s", startTaskCallBackUrl)
	innerRecordTaskSyncReq := constant.InnerRecordTaskSyncReq{
		Id:          t.ID,
		StartTime:   t.StartTime.Format(time.DateTime),
		Status:      t.Status,
		EndTime:     t.EndTime.Format(time.DateTime),
		ExecuteTime: time.Now().Format(time.DateTime),
	}
	if t.Error != nil {
		innerRecordTaskSyncReq.FailReason = t.Error.Error()
	}
	if !t.EndTime.IsZero() {
		innerRecordTaskSyncReq.EndTime = t.EndTime.Format(time.DateTime)
	}
	client := util.NewHttpClient(6 * time.Second)
	res, err := client.PostJSON(context.Background(), startTaskCallBackUrl, innerRecordTaskSyncReq)
	if err != nil {
		return err
	}
	log.Printf("同步任务结束回调结果---------->%s", res)
	return nil
}
