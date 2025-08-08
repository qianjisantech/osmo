package util

import (
	"osmo/gen/model"
	"strconv"
	"time"
)

func MapToPolarisTaskRecord(data map[string]interface{}) (*model.PolarisTaskRecord, error) {
	record := &model.PolarisTaskRecord{}

	// 辅助函数：安全获取map值
	getValue := func(key string) interface{} {
		if val, ok := data[key]; ok {
			return val
		}
		return nil
	}

	// 辅助函数：解析时间
	parseTime := func(val interface{}) *time.Time {
		if val == nil {
			return nil
		}

		str, ok := val.(string)
		if !ok || str == "" {
			return nil
		}

		// 支持的时间格式
		formats := []string{
			"2006-01-02 15:04:05",
			time.RFC3339,
			time.DateTime,
		}

		for _, format := range formats {
			if t, err := time.Parse(format, str); err == nil {
				return &t
			}
		}
		return nil
	}

	// ID
	if id, ok := getValue("id").(int64); ok {
		record.ID = id
	} else if idStr, ok := getValue("id").(string); ok {
		if id, err := strconv.ParseInt(idStr, 10, 64); err == nil {
			record.ID = id
		}
	}

	// 字符串类型字段
	if val, ok := getValue("name").(string); ok {
		record.Name = val
	}
	if val, ok := getValue("status").(string); ok {
		record.Status = val
	}
	if val, ok := getValue("strategy_code").(string); ok {
		record.StrategyCode = val
	}
	if val, ok := getValue("strategy_name").(string); ok {
		record.StrategyName = val
	}
	if val, ok := getValue("agent_id").(string); ok {
		record.AgentID = val
	}
	if val, ok := getValue("agent_name").(string); ok {
		record.AgentName = val
	}
	if val, ok := getValue("listen_port").(string); ok {
		record.ListenPort = val
	}
	if val, ok := getValue("monitor_center_id").(string); ok {
		record.MonitorCenterID = val
	}
	if val, ok := getValue("monitor_center_name").(string); ok {
		record.MonitorCenterName = val
	}

	// 布尔类型
	if val, ok := getValue("is_deleted").(bool); ok {
		record.IsDeleted = val
	} else if val, ok := getValue("is_deleted").(int64); ok {
		record.IsDeleted = val != 0
	}

	// 时间类型字段
	record.CreateTime = *parseTime(getValue("create_time"))
	record.UpdateTime = *parseTime(getValue("update_time"))
	record.StartTime = parseTime(getValue("start_time"))
	record.EndTime = parseTime(getValue("end_time"))
	record.ExecuteTime = parseTime(getValue("execute_time"))
	record.DeletedTime = parseTime(getValue("deleted_time"))

	// 指针类型字段
	if val, ok := getValue("description").(string); ok {
		record.Description = &val
	}
	if val, ok := getValue("deleted_by").(string); ok {
		record.DeletedBy = &val
	}
	if val, ok := getValue("deleted_by_name").(string); ok {
		record.DeletedByName = &val
	}
	if val, ok := getValue("rule_id").(int64); ok {
		record.RuleID = &val
	}
	if val, ok := getValue("rule_name").(string); ok {
		record.RuleName = &val
	}

	// 特殊处理 monitor_center_url (可能是字节切片)
	if urlBytes, ok := getValue("monitor_center_url").([]byte); ok {
		record.MonitorCenterURL = string(urlBytes)
	} else if urlStr, ok := getValue("monitor_center_url").(string); ok {
		record.MonitorCenterURL = urlStr
	} else if urlSlice, ok := getValue("monitor_center_url").([]interface{}); ok {
		// 处理 [104 116 116 112 58 47 47 108 111 99 97 108 104 111 115 116 58 56 48 56 48] 这种情况
		byteSlice := make([]byte, len(urlSlice))
		for i, v := range urlSlice {
			if num, ok := v.(int64); ok {
				byteSlice[i] = byte(num)
			}
		}
		record.MonitorCenterURL = string(byteSlice)
	}

	// 创建者和更新者信息
	if val, ok := getValue("create_by").(string); ok {
		record.CreateBy = val
	}
	if val, ok := getValue("create_by_name").(string); ok {
		record.CreateByName = val
	}
	if val, ok := getValue("update_by").(string); ok {
		record.UpdateBy = val
	}
	if val, ok := getValue("update_by_name").(string); ok {
		record.UpdateByName = val
	}

	return record, nil
}
