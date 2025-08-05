package main

import (
	"context"
	"database/sql"
	"errors"
	"flag"
	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/core/logx"
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/rest/httpx"
	"gorm.io/gorm"
	"io"
	"net"
	"net/http"
	"os"
	"os/signal"
	"osmo/internal/common/errorx"
	"osmo/internal/config"
	"osmo/internal/handler"
	"osmo/internal/svc"
	"syscall"
)

var configFile = flag.String("f", "etc/osmo-api.yaml", "the config file")

func main() {
	flag.Parse()

	var c config.Config
	conf.MustLoad(*configFile, &c)

	// 初始化服务上下文
	ctx := svc.NewServiceContext(c)

	// 创建HTTP服务器
	server := rest.MustNewServer(c.RestConf)
	defer func() {
		if server != nil {
			server.Stop()
		}
	}()

	// 注册处理器
	handler.RegisterHandlers(server, ctx)

	// 设置错误处理器
	httpx.SetErrorHandler(errorHandler)

	// 设置优雅关闭
	setupGracefulShutdown(server, ctx)

	logx.Infof("Starting server at %s:%d...", c.Host, c.Port)
	server.Start()
}

// 错误处理器
func errorHandler(err error) (int, interface{}) {
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
	default:
		logx.Debugf("未知错误: %v", err)
		return errorx.ErrorResponse(http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
	}
}

// 设置优雅关闭
func setupGracefulShutdown(server *rest.Server, ctx *svc.ServiceContext) {
	done := make(chan struct{})
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-quit
		logx.Info("开始关闭服务...")

		// 1. 先停止Binlog监听器
		if ctx.BinlogWatcher != nil {
			logx.Info("正在停止Binlog监听器...")
			ctx.BinlogWatcher.Stop()
			logx.Info("Binlog监听器已停止")
		}

		// 2. 停止HTTP服务器
		logx.Info("正在停止HTTP服务器...")
		server.Stop()
		logx.Info("HTTP服务器已停止")

		close(done)
	}()

	go func() {
		<-done
		logx.Info("服务关闭完成")
		os.Exit(0)
	}()
}
