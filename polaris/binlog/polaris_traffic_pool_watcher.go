package binlog

import (
	"context"
	"fmt"
	"log"
	"polaris/util"
	"strconv"
	"time"
)

type SyncOsmoPolarisTrafficPool struct {
	Id              string ` json:"id"`
	Method          string `json:"method"`
	URL             string `json:"url"`
	RequestBody     string `json:"request_body"`
	RequestHeaders  string `json:"request_headers"`
	ResponseBody    string `json:"response_body"`
	ResponseHeaders string `json:"response_headers"`
	TaskId          string `json:"task_id"`
	TaskName        string `json:"task_name"`
	HTTPType        string `json:"http_type"`
}

var (
	syncTrafficPoolUrl = "/edi/traffic/pool/sync"
)

func PolarisTrafficPoolWatcher(columnName string, oldVal, newVal interface{}, oldFullRow, newFullRow map[string]interface{}, osmoAddr string) error {
	log.Printf(" PolarisTrafficPool 表字段名 %s 从 %v 更新为 %v 旧的完整数据为：%v\n,新的完整数据为：%v\n",
		columnName, oldVal, newVal, oldFullRow, newFullRow)
	// 新增健壮性检查

	if newFullRow == nil {
		return fmt.Errorf("invalid row data")
	}

	polarisTrafficPool, err := util.MapToPolarisTrafficPool(newFullRow)
	if err != nil {
		return fmt.Errorf("转换数据出错: %v", err)
	}
	log.Printf("polarisTrafficPool%v", polarisTrafficPool)
	// 检查必要字段
	if polarisTrafficPool == nil {
		return fmt.Errorf("流量记录为空")
	}
	log.Printf("CompletedFlag 为1 触发方法%v", polarisTrafficPool)
	client := util.NewHttpClient(6 * time.Second)
	syncOsmoPolarisTrafficPool := &SyncOsmoPolarisTrafficPool{
		Id:              strconv.FormatInt(polarisTrafficPool.ID, 10),
		ResponseHeaders: *polarisTrafficPool.ResponseHeaders,
		RequestBody:     *polarisTrafficPool.RequestBody,
		RequestHeaders:  *polarisTrafficPool.RequestHeaders,
		ResponseBody:    *polarisTrafficPool.ResponseBody,
		URL:             polarisTrafficPool.URL,
		TaskId:          polarisTrafficPool.TaskID,
		TaskName:        polarisTrafficPool.TaskName,
		HTTPType:        *polarisTrafficPool.HTTPType,
		Method:          polarisTrafficPool.Method,
	}
	res, err := client.PostJSON(
		context.Background(),
		osmoAddr+syncTrafficPoolUrl,
		syncOsmoPolarisTrafficPool,
	)
	if err != nil {
		return fmt.Errorf("同步流量数据出错: %v", err)
	}
	log.Printf("同步流量结果：%s", res)
	return nil
}
