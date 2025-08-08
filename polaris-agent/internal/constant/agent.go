package constant

// AgentStatus 定义执行机状态类型
type AgentStatus string
type AgentExecuteStatus string

// 执行机状态枚举值
const (
	AgentStatusRegister AgentStatus = "register" // 已注册
	AgentStatusOffline  AgentStatus = "offline"  // 离线
	AgentStatusError    AgentStatus = "error"    // 错误
	AgentStatusWarning  AgentStatus = "warning"  // 警告
)
const (
	AgentExecuteStatusFree AgentExecuteStatus = "free" // 空闲
	AgentExecuteStatusBusy AgentExecuteStatus = "busy" //忙碌中
)

const (
	InnerAgentInfoSyncPath = "/polaris/inner/agent/info/sync" //执行机信息同步接口
)

type InnerRecordTaskSyncReq struct {
	Id          string `json:"id"`
	Status      string `json:"status"`
	StartTime   string `json:"start_time"`
	EndTime     string `json:"end_time"`
	FailReason  string `json:"fail_reason"`
	ExecuteTime string `json:"execute_time"`
}
type InnerRecordTaskSyncResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
