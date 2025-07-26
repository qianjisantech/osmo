package main

import (
	"context"
	"database/sql"
	"errors"
	"flag"
	"fmt"
	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/core/logx"
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/rest/httpx"
	"gorm.io/gorm"
	"io"
	"net"
	"net/http"
	"os"
	"polaris/common/errorx"
	consumer "polaris/common/kafka"
	"polaris/internal/config"
	"polaris/internal/handler"
	"polaris/internal/svc"
)

var configFile = flag.String("f", "etc/polaris-api.yaml", "the config file")

func main() {
	flag.Parse()

	var c config.Config
	conf.MustLoad(*configFile, &c)

	svcCtx := svc.NewServiceContext(c)
	defer svcCtx.Shutdown() // 确保关闭资源

	// 创建全局上下文（控制消费者生命周期）
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// 启动 Kafka 消费者
	msgCh, errCh := svcCtx.StartKafkaConsumer(ctx)

	// 获取 Kafka reader 实例
	kafkaReader := svcCtx.Kafka.GetReader()

	// 监听系统信号（优雅关闭）
	go consumer.HandleShutdown(cancel, kafkaReader)

	// 处理消息和错误
	go consumer.ProcessMessages(svcCtx, kafkaReader, msgCh, errCh)

	httpx.SetErrorHandler(customErrorHandler)
	server := rest.MustNewServer(c.RestConf)
	handler.RegisterHandlers(server, svcCtx)
	defer server.Stop()

	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)
	server.Start()
}

func customErrorHandler(err error) (int, any) {
	var e *errorx.CodeError
	switch {
	case errors.As(err, &e):
		return http.StatusOK, e.Data()
	case errors.Is(err, sql.ErrNoRows) || errors.Is(err, gorm.ErrRecordNotFound):
		return errorx.ErrorResponse(http.StatusOK, errorx.ErrMessageNotFound)
	case errors.Is(err, sql.ErrConnDone):
		return errorx.ErrorResponse(http.StatusInternalServerError, errorx.ErrMessageDBConnClosed)
	case errors.Is(err, sql.ErrTxDone):
		return errorx.ErrorResponse(http.StatusInternalServerError, errorx.ErrMessageTxDone)
	case errors.Is(err, os.ErrNotExist):
		return errorx.ErrorResponse(http.StatusNotFound, errorx.ErrMessageResourceNotFound)
	case errors.Is(err, http.ErrBodyNotAllowed):
		return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageBodyNotAllowed)
	case errors.Is(err, http.ErrContentLength):
		return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageContentLength)
	case errors.Is(err, http.ErrHandlerTimeout):
		return errorx.ErrorResponse(http.StatusRequestTimeout, errorx.ErrMessageHandlerTimeout)
	case errors.Is(err, os.ErrPermission):
		return errorx.ErrorResponse(http.StatusForbidden, errorx.ErrMessagePermissionDenied)
	case errors.Is(err, net.ErrClosed):
		return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageNetClosed)
	case errors.Is(err, net.ErrWriteToConnected):
		return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageUDPWrite)
	case errors.Is(err, context.DeadlineExceeded):
		return errorx.ErrorResponse(http.StatusRequestTimeout, errorx.ErrMessageTimeout)
	case errors.Is(err, io.EOF):
		return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageEOF)
	case errors.Is(err, context.DeadlineExceeded):
		return errorx.ErrorResponse(http.StatusBadRequest, errorx.ContextDeadlineExceeded)
	default:
		// 记录未知错误的详细信息
		logx.Debug("未知错误: %v", err)
		return errorx.ErrorResponse(http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
	}

}
