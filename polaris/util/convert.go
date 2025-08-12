package util

import (
	"encoding/json"
	"fmt"
	"log"
	"polaris/gen/model"
	"strconv"
	"strings"
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
	if val, ok := getValue("agent_id").(string); ok {
		record.AgentID = val
	}

	if val, ok := getValue("listen_port").(string); ok {
		record.ListenPort = val
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
func MapToPolarisTrafficPool(data map[string]interface{}) (*model.PolarisTrafficPool, error) {
	trafficPool := &model.PolarisTrafficPool{
		// 初始化必填字段默认值
		Method:       "GET",      // 默认方法
		URL:          "/unknown", // 默认URL
		TaskID:       "unknown",  // 默认任务ID
		CreateBy:     "system",
		CreateByName: "system",
		UpdateBy:     "system",
		UpdateByName: "system",
		CreateTime:   time.Now(),
		UpdateTime:   time.Now(),
	}

	// 辅助函数：安全获取值并记录日志
	getValue := func(key string) interface{} {
		val, ok := data[key]
		if !ok {
			log.Printf("警告: 字段 %s 不存在于输入数据中", key)
			return nil
		}
		return val
	}

	// 处理ID字段
	if idVal := getValue("id"); idVal != nil {
		switch v := idVal.(type) {
		case int64:
			trafficPool.ID = v
		case float64: // JSON数字可能被解码为float64
			trafficPool.ID = int64(v)
		case string:
			if id, err := strconv.ParseInt(v, 10, 64); err == nil {
				trafficPool.ID = id
			} else {
				log.Printf("无法解析ID字段: %v", err)
			}
		default:
			log.Printf("ID字段类型不支持: %T", v)
		}
	}
	if urlVal := getValue("url"); urlVal != nil {
		switch v := urlVal.(type) {
		case string:
			trafficPool.URL = v
		case []byte:
			trafficPool.URL = string(v)
		case json.RawMessage:
			trafficPool.URL = string(v)
		default:
			// 其他类型尝试转换为字符串
			trafficPool.URL = fmt.Sprintf("%v", v)
		}

		// 如果转换后仍然是空字符串，使用默认值
		if trafficPool.URL == "" {
			trafficPool.URL = "/unknown"
		}
	}
	if methodVal := getValue("method"); methodVal != nil {
		if methodStr, ok := methodVal.(string); ok && methodStr != "" {
			trafficPool.Method = strings.ToUpper(methodStr)
		}
	}
	if methodVal := getValue("task_name"); methodVal != nil {
		if taskNameStr, ok := methodVal.(string); ok && taskNameStr != "" {
			trafficPool.TaskName = strings.ToUpper(taskNameStr)
		}
	}
	if taskIDVal := getValue("task_id"); taskIDVal != nil {
		switch v := taskIDVal.(type) {
		case string:
			if v != "" {
				trafficPool.TaskID = v
			}
		case int64:
			trafficPool.TaskID = strconv.FormatInt(v, 10)
		case float64:
			trafficPool.TaskID = strconv.FormatInt(int64(v), 10)
		}
	}

	// 处理JSON类型字段（request/response body/headers）
	processJSONField := func(key string, target **string) {
		val := getValue(key)
		if val == nil {
			return
		}

		var result string
		switch v := val.(type) {
		case string:
			result = v
		case []byte:
			result = string(v)
		case map[string]interface{}:
			if jsonData, err := json.Marshal(v); err == nil {
				result = string(jsonData)
			} else {
				result = fmt.Sprintf("%v", v)
			}
		default:
			result = fmt.Sprintf("%v", v)
		}

		if result != "" {
			*target = &result
		}
	}

	processJSONField("request_body", &trafficPool.RequestBody)
	processJSONField("request_headers", &trafficPool.RequestHeaders)
	processJSONField("response_body", &trafficPool.ResponseBody)
	processJSONField("response_headers", &trafficPool.ResponseHeaders)
	processJSONField("http_type", &trafficPool.HTTPType)

	// 处理其他字段
	if isDeletedVal := getValue("is_deleted"); isDeletedVal != nil {
		switch v := isDeletedVal.(type) {
		case bool:
			trafficPool.IsDeleted = v
		case int, int64:
			trafficPool.IsDeleted = v != 0
		case string:
			trafficPool.IsDeleted = strings.ToLower(v) == "true" || v == "1"
		}
	}

	// 处理时间字段
	parseTime := func(val interface{}) *time.Time {
		if val == nil {
			return nil
		}

		switch v := val.(type) {
		case string:
			if v == "" {
				return nil
			}
			formats := []string{
				"2006-01-02 15:04:05",
				time.RFC3339,
				time.DateTime,
			}
			for _, format := range formats {
				if t, err := time.Parse(format, v); err == nil {
					return &t
				}
			}
		case time.Time:
			return &v
		}
		return nil
	}

	if deletedTime := parseTime(getValue("deleted_time")); deletedTime != nil {
		trafficPool.DeletedTime = deletedTime
	}

	log.Printf("最终转换结果: %+v", trafficPool)
	return trafficPool, nil
}
func MapToPolarisResourceAgent(data map[string]interface{}) (*model.PolarisResourceAgent, error) {
	agent := &model.PolarisResourceAgent{
		// 设置默认值
		Status:                "idle", // 默认空闲状态
		IsDeleted:             false,
		CreateTime:            time.Now(),
		UpdateTime:            time.Now(),
		CreateBy:              "system",
		CreateByName:          "system",
		UpdateBy:              "system",
		UpdateByName:          "system",
		IP:                    "127.0.0.1:80", // 默认IP
		CPUCores:              0,
		CPUUsedPercent:        0.0,
		CPUFreePercent:        0.0,
		MemoryTotal:           0,
		MemoryUsed:            0,
		MemoryFree:            0,
		MemoryUsedPercent:     0.0,
		NetworkBytesSent:      0,
		NetworkBytesReceive:   0,
		NetworkPacketsSent:    0,
		NetworkPacketsReceive: 0,
		ExecuteStatus:         "idle",
	}

	// 辅助函数：安全获取值
	getValue := func(key string) interface{} {
		if val, ok := data[key]; ok {
			return val
		}
		return nil
	}

	// 处理ID字段
	if idVal := getValue("id"); idVal != nil {
		switch v := idVal.(type) {
		case int64:
			agent.ID = v
		case float64:
			agent.ID = int64(v)
		case string:
			if id, err := strconv.ParseInt(v, 10, 64); err == nil {
				agent.ID = id
			}
		}
	}

	// 处理字符串字段
	stringFields := []struct {
		key    string
		target *string
	}{
		{"name", agent.Name},
		{"status", &agent.Status},
		{"description", agent.Description},
		{"identification_code", &agent.IdentificationCode},
		{"host_name", &agent.HostName},
		{"execute_status", &agent.ExecuteStatus},
		{"deleted_by", agent.DeletedBy},
		{"deleted_by_name", agent.DeletedByName},
	}

	for _, field := range stringFields {
		if val := getValue(field.key); val != nil {
			if str, ok := val.(string); ok && str != "" {
				*field.target = str
			}
		}
	}

	// 处理bool字段
	if isDeletedVal := getValue("is_deleted"); isDeletedVal != nil {
		switch v := isDeletedVal.(type) {
		case bool:
			agent.IsDeleted = v
		case int, int64:
			agent.IsDeleted = v != 0
		case string:
			agent.IsDeleted = strings.ToLower(v) == "true" || v == "1"
		}
	}

	// 处理时间字段
	parseTime := func(val interface{}) *time.Time {
		if val == nil {
			return nil
		}

		switch v := val.(type) {
		case string:
			if v == "" {
				return nil
			}
			formats := []string{
				time.RFC3339,
				"2006-01-02 15:04:05",
				time.DateTime,
			}
			for _, format := range formats {
				if t, err := time.Parse(format, v); err == nil {
					return &t // 返回指针
				}
			}
		case time.Time:
			return &v // 返回指针
		case float64:
			// 处理时间戳 - 修正此处
			t := time.Unix(int64(v), 0)
			return &t // 返回指针
		case int64:
			t := time.Unix(v, 0)
			return &t // 返回指针
		}
		return nil
	}

	timeFields := []struct {
		key    string
		target **time.Time
	}{
		{"deleted_time", &agent.DeletedTime},
		{"last_report_time", &agent.LastReportTime},
		{"start_time", &agent.StartTime},
		{"stop_time", &agent.StopTime},
	}

	for _, field := range timeFields {
		if val := getValue(field.key); val != nil {
			if t := parseTime(val); t != nil {
				*field.target = t
			}
		}
	}

	// 处理数值字段
	numericFields := []struct {
		key    string
		target interface{}
	}{
		{"cpu_cores", &agent.CPUCores},
		{"cpu_used_percent", &agent.CPUUsedPercent},
		{"cpu_free_percent", &agent.CPUFreePercent},
		{"memory_total", &agent.MemoryTotal},
		{"memory_used", &agent.MemoryUsed},
		{"memory_free", &agent.MemoryFree},
		{"memory_used_percent", &agent.MemoryUsedPercent},
		{"network_bytes_sent", &agent.NetworkBytesSent},
		{"network_bytes_receive", &agent.NetworkBytesReceive},
		{"network_packets_sent", &agent.NetworkPacketsSent},
		{"network_packets_receive", &agent.NetworkPacketsReceive},
	}

	for _, field := range numericFields {
		if val := getValue(field.key); val != nil {
			switch ptr := field.target.(type) {
			case *int32:
				switch v := val.(type) {
				case int64:
					*ptr = int32(v)
				case float64:
					*ptr = int32(v)
				case string:
					if i, err := strconv.ParseInt(v, 10, 32); err == nil {
						*ptr = int32(i)
					}
				}
			case *int64:
				switch v := val.(type) {
				case int64:
					*ptr = v
				case float64:
					*ptr = int64(v)
				case string:
					if i, err := strconv.ParseInt(v, 10, 64); err == nil {
						*ptr = i
					}
				}
			case *float64:
				switch v := val.(type) {
				case float64:
					*ptr = v
				case int64:
					*ptr = float64(v)
				case string:
					if f, err := strconv.ParseFloat(v, 64); err == nil {
						*ptr = f
					}
				}
			}
		}
	}

	return agent, nil
}
