package errorx

import (
	"fmt"
)

const (
	ErrMessageNotFound         = "查询不到记录"
	ErrMessageDBConnClosed     = "数据库连接已关闭"
	ErrMessageTxDone           = "事务已提交或回滚"
	ErrMessageResourceNotFound = "资源不存在"
	ErrMessageBodyNotAllowed   = "请求体不允许"
	ErrMessageContentLength    = "内容长度错误"
	ErrMessageHandlerTimeout   = "处理超时"
	ErrMessagePermissionDenied = "权限不足"
	ErrMessageJSONSyntax       = "JSON 语法错误"
	ErrMessageJSONTypeMismatch = "JSON 类型不匹配"
	ErrMessageInvalidUnmarshal = "无效的 JSON 反序列化目标"
	ErrMessageNetClosed        = "网络连接已关闭"
	ErrMessageUDPWrite         = "无法向已连接的 UDP 连接写入数据"
	ErrMessageTimeFormat       = "时间格式错误"
	ErrMessageTimeout          = "请求超时"
	ErrMessageEOF              = "文件读取结束"
	ContextDeadlineExceeded    = "处理超时"
)

type CodeError struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type CodeErrorResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

// NewCodeError 创建新的错误实例
func NewCodeError(msg string) error {
	return &CodeError{Success: false, Message: msg}
}

// NewCodeErrorf 支持格式化的错误创建
func NewCodeErrorf(format string, args ...interface{}) error {
	return &CodeError{
		Success: false,
		Message: fmt.Sprintf(format, args...),
	}
}

// NewDefaultError 创建默认错误
func NewDefaultError(msg string) error {
	return NewCodeError(msg)
}

// NewDefaultErrorf 支持格式化的默认错误创建
func NewDefaultErrorf(format string, args ...interface{}) error {
	return NewCodeErrorf(format, args...)
}

// Error 实现error接口
func (e *CodeError) Error() string {
	return e.Message
}

// Data 转换为响应格式
func (e *CodeError) Data() *CodeErrorResponse {
	return &CodeErrorResponse{
		Success: e.Success,
		Message: e.Message,
	}
}

// ErrorResponse 辅助函数：生成错误响应
func ErrorResponse(statusCode int, message string) (int, interface{}) {
	return statusCode, CodeErrorResponse{
		Success: false,
		Message: message,
	}
}

// ErrorResponsef 支持格式化的错误响应
func ErrorResponsef(statusCode int, format string, args ...interface{}) (int, interface{}) {
	return statusCode, CodeErrorResponse{
		Success: false,
		Message: fmt.Sprintf(format, args...),
	}
}
