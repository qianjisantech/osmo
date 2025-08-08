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
	syncTaskRecordUrl = "/edi/task/record/sync"
)

type SyncOsmoPolarisTaskRecord struct {
	ID          string `json:"id"`
	Status      string `json:"status"`
	ExecuteTime string `json:"execute_time"`
}

func PolarisTaskRecordWatcher(columnName string, oldVal, newVal interface{}, oldFullRow, newFullRow map[string]interface{}, osmoAddr string) error {
	log.Printf("字段名 %s 从 %v 更新为 %v 旧的完整数据为：%v\n,新的完整数据为：%v\n",
		columnName, oldVal, newVal, oldFullRow, newFullRow)
	// 新增健壮性检查

	if newFullRow == nil {
		return fmt.Errorf("invalid row data")
	}

	polarisTaskRecord, err := util.MapToPolarisTaskRecord(newFullRow)
	if err != nil {
		return fmt.Errorf("转换数据出错: %v", err)
	}

	log.Printf("触发方法")

	// 检查必要字段
	if polarisTaskRecord == nil {
		return fmt.Errorf("录制任务记录为空")
	}

	client := util.NewHttpClient(6 * time.Second)
	syncPolarisTaskRecord := &SyncOsmoPolarisTaskRecord{
		ID:     strconv.FormatInt(polarisTaskRecord.ID, 10),
		Status: polarisTaskRecord.Status,
	}
	if polarisTaskRecord.ExecuteTime != nil {
		syncPolarisTaskRecord.ExecuteTime = polarisTaskRecord.ExecuteTime.Format(time.DateTime)
	}
	res, err := client.PostJSON(
		context.Background(),
		osmoAddr+syncTaskRecordUrl,
		syncPolarisTaskRecord,
	)
	if err != nil {
		return fmt.Errorf("同步数据出错: %v", err)
	}
	log.Printf("同步任务结果：%s", res)

	return nil
}
