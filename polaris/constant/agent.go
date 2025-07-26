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
