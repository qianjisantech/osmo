package svc

import (
	"context"
	"github.com/qianjisantech/gosmo-agent/internal/config"
	"github.com/qianjisantech/gosmo-agent/internal/task"
	"github.com/qianjisantech/polaris-discovery-sdk/core"
	"github.com/shirou/gopsutil/v3/process"
	"gorm.io/gorm"
	"log"
	"os"
	"sync"
	"time"
)

type ResourceMonitor struct {
	CpuUsage float64
	MemUsage uint64
	mu       sync.Mutex
}

func (rm *ResourceMonitor) Start() {
	go rm.monitor()
}

func (rm *ResourceMonitor) monitor() {
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		rm.updateStats()
	}
}

func (rm *ResourceMonitor) updateStats() {
	rm.mu.Lock()
	defer rm.mu.Unlock()

	p, err := process.NewProcess(int32(os.Getpid()))
	if err != nil {
		return
	}

	// CPU使用率
	if cpuPercent, err := p.CPUPercent(); err == nil {
		rm.CpuUsage = cpuPercent
	}

	// 内存使用
	if memInfo, err := p.MemoryInfo(); err == nil {
		rm.MemUsage = memInfo.RSS
	}
}

type TaskCounter struct {
	sync.Mutex
	RunningTasks int // 当前运行的任务数
	MaxTasks     int // 最大允许的任务数
}

type ServiceContext struct {
	Config          config.Config
	SqliteDB        *gorm.DB
	cancel          context.CancelFunc
	Wg              sync.WaitGroup
	ShutdownChan    chan struct{}
	TaskCounter     *TaskCounter
	ResourceMonitor *ResourceMonitor
	TaskManager     *task.TaskManager
}

func NewServiceContext(c config.Config) *ServiceContext {
	// 固定最大并发数为2
	maxConcurrent := 2

	// 初始化资源监控
	monitor := &ResourceMonitor{}
	monitor.Start()

	client := &core.DiscoveryClient{Addr: c.Polaris.Discovery.Addr, HeartbeatInterval: c.Polaris.Discovery.HeartbeatInterval, Timeout: c.Polaris.Discovery.Timeout}
	log.Printf("判断客户端是否已经启动%v", client.IsStopped())
	scvt := &ServiceContext{
		Config:          c,
		ShutdownChan:    make(chan struct{}),
		TaskCounter:     &TaskCounter{MaxTasks: maxConcurrent},
		ResourceMonitor: monitor,
		TaskManager:     task.NewTaskManager(5, c.Polaris.Discovery.Addr),
	}
	err := client.Start(
		func(resp *core.RegisterResponse) {
			log.Printf("===============================注册成功回调方法! ID: %s", resp.Data.Id)
		},
		func(err error) {
			log.Printf("===============================注册失败回调方法: %v", err)
		},
		func(resp *core.HeatBeatResponse) {
			log.Printf("===============================心跳成功回调方法 id: %s", resp.Data.Id)
			log.Printf("===============================心跳成功回调方法 找到执行的任务: %v", resp)
			err := HeartBeatCallback(scvt, resp)
			if err != nil {
				log.Printf("启动任务失败%s", err)
			}
		},
		func(err error) {
			log.Printf("===============================心跳失败回调方法 : %v", err)
		},
	)

	if err != nil {
		log.Printf("===============================注册中心启动失败 : %v", err)
	}

	return scvt
}

// TaskCounter 方法实现...
func (tc *TaskCounter) Increment() {
	tc.Lock()
	defer tc.Unlock()
	tc.RunningTasks++
}

func (tc *TaskCounter) Decrement() {
	tc.Lock()
	defer tc.Unlock()
	tc.RunningTasks--
}

func (tc *TaskCounter) GetRunningTasks() int {
	tc.Lock()
	defer tc.Unlock()
	return tc.RunningTasks
}
