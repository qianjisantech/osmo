package binlog

import (
	"context"
	"fmt"
	"log"
	"polaris/util"
	"strconv"
	"time"
)

var (
	syncResourceAgentUrl = "/edi/resource/agent/sync"
)

type SyncOsmoResourceAgent struct {
	Id                    string  `json:"id"`
	Status                string  `json:"status"`
	CPUCores              int32   `json:"cpu_cores"`
	CPUUsedPercent        float64 `json:"cpu_used_percent"`
	CPUFreePercent        float64 `json:"cpu_free_percent"`
	MemoryTotal           int64   `json:"memory_total"`
	MemoryUsed            int64   `json:"memory_used"`
	MemoryFree            int64   `json:"memory_free"`
	MemoryUsedPercent     float64 `json:"memory_used_percent"`
	NetworkBytesSent      int64   `json:"network_bytes_sent"`
	NetworkBytesReceive   int64   `json:"network_bytes_receive"`
	NetworkPacketsSent    int64   `json:"network_packets_sent"`
	NetworkPacketsReceive int64   `json:"network_packets_receive"`
	ExecuteStatus         string  `json:"execute_status"`
	HostName              string  `json:"host_name"`
}

func PolarisResourceAgentWatcher(columnName string, oldVal, newVal interface{}, oldFullRow, newFullRow map[string]interface{}, osmoAddr string) error {
	log.Printf("字段名 %s 从 %v 更新为 %v 旧的完整数据为：%v\n,新的完整数据为：%v\n",
		columnName, oldVal, newVal, oldFullRow, newFullRow)
	// 新增健壮性检查

	if newFullRow == nil {
		return fmt.Errorf("invalid row data")
	}

	polarisResourceAgent, err := util.MapToPolarisResourceAgent(newFullRow)
	if err != nil {
		return fmt.Errorf("转换数据出错: %v", err)
	}

	log.Printf("触发方法")

	// 检查必要字段
	if polarisResourceAgent == nil {
		return fmt.Errorf("执行机信息记录为空")
	}

	client := util.NewHttpClient(6 * time.Second)
	syncOsmoResourceAgent := &SyncOsmoResourceAgent{
		Id:                    strconv.FormatInt(polarisResourceAgent.ID, 10),
		Status:                polarisResourceAgent.Status,
		ExecuteStatus:         polarisResourceAgent.ExecuteStatus,
		CPUUsedPercent:        polarisResourceAgent.CPUUsedPercent,
		CPUFreePercent:        polarisResourceAgent.CPUFreePercent,
		CPUCores:              polarisResourceAgent.CPUCores,
		MemoryTotal:           polarisResourceAgent.MemoryTotal,
		MemoryUsed:            polarisResourceAgent.MemoryUsed,
		MemoryFree:            polarisResourceAgent.MemoryFree,
		MemoryUsedPercent:     polarisResourceAgent.MemoryUsedPercent,
		NetworkBytesSent:      polarisResourceAgent.NetworkBytesSent,
		NetworkBytesReceive:   polarisResourceAgent.NetworkBytesReceive,
		NetworkPacketsSent:    polarisResourceAgent.NetworkPacketsSent,
		NetworkPacketsReceive: polarisResourceAgent.NetworkPacketsReceive,
		HostName:              polarisResourceAgent.HostName,
	}
	res, err := client.PostJSON(
		context.Background(),
		osmoAddr+syncResourceAgentUrl,
		syncOsmoResourceAgent,
	)
	if err != nil {
		return fmt.Errorf("同步数据出错: %v", err)
	}
	log.Printf("同步执行机信息结果：%s", res)

	return nil
}
