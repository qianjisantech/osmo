package binlog

import "log"

func PolarisTaskRecordWatcher(columnName string, oldVal, newVal interface{}, fullRow map[string]interface{}) {
	log.Printf("字段名 %s 从 %v 更新为 %v 完整数据为：%v",
		columnName, oldVal, newVal, fullRow)
	// 示例：只处理特定表的特定字段变更
	log.Printf("触发方法")
}
