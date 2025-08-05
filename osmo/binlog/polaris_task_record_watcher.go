package binlog

import (
	"context"
	"fmt"
	"log"
	"osmo/util"
	"strconv"
	"time"
)

type SyncPolarisTaskRecord struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	ListenPort   string `json:"listen_port"`
	Status       string `json:"status"`
	CreateTime   string `json:"create_time"`
	UpdateTime   string `json:"update_time"`
	CreateBy     string `json:"create_by"`
	CreateByName string `json:"create_by_name"`
	UpdateBy     string `json:"update_by"`
	UpdateByName string `json:"update_by_name"`
	StartTime    string `json:"start_time"`
	EndTime      string `json:"end_time"`
	AgentID      string `json:"agent_id"`
	AgentName    string `json:"agent_name"`
	ExecuteTime  string `json:"execute_time"`
}

var (
	syncUrl = "/polaris/agent/task/sync"
)

func PolarisTaskRecordWatcher(columnName string, oldVal, newVal interface{}, fullRow map[string]interface{}) error {
	log.Printf("字段名 %s 从 %v 更新为 %v 完整数据为：%v",
		columnName, oldVal, newVal, fullRow)

	polarisTaskRecord, err := util.MapToPolarisTaskRecord(fullRow)
	if err != nil {
		return fmt.Errorf("转换数据出错: %v", err)
	}

	log.Printf("触发方法")

	// 检查必要字段
	if polarisTaskRecord == nil {
		return fmt.Errorf("录制任务记录为空")
	}
	if polarisTaskRecord.MonitorCenterURL == "" {
		return fmt.Errorf("监控中心地址为空")
	}

	client := util.NewHttpClient(6 * time.Second)
	syncPolarisTaskRecord := &SyncPolarisTaskRecord{
		ID:           strconv.FormatInt(polarisTaskRecord.ID, 10),
		Name:         polarisTaskRecord.Name,
		AgentID:      polarisTaskRecord.AgentID,
		AgentName:    polarisTaskRecord.AgentName,
		CreateBy:     polarisTaskRecord.CreateBy,
		CreateByName: polarisTaskRecord.CreateByName,
		CreateTime:   polarisTaskRecord.CreateTime.Format(time.DateTime),
		UpdateBy:     polarisTaskRecord.UpdateBy,
		UpdateByName: polarisTaskRecord.UpdateByName,
		StartTime:    polarisTaskRecord.StartTime.Format(time.DateTime),
		EndTime:      polarisTaskRecord.EndTime.Format(time.DateTime),
		Status:       polarisTaskRecord.Status,
		ListenPort:   polarisTaskRecord.ListenPort,
		ExecuteTime:  polarisTaskRecord.ExecuteTime.Format(time.DateTime),
	}
	res, err := client.PostJSON(
		context.Background(),
		polarisTaskRecord.MonitorCenterURL+syncUrl,
		syncPolarisTaskRecord,
	)
	if err != nil {
		return fmt.Errorf("同步数据出错: %v", err)
	}
	log.Printf("同步任务结果：%s", res)

	return nil
}
