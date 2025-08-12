package main

import (
	"context"
	"database/sql"
	"errors"
	"flag"
	"fmt"
	"github.com/qianjisantech/polaris-agent/internal/common/errorx"
	"github.com/qianjisantech/polaris-agent/internal/config"
	"github.com/qianjisantech/polaris-agent/internal/svc"
	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/rest/httpx"
	"gorm.io/gorm"
	"io"
	"log"
	"net"
	"net/http"
	"os"
)

var configFile = flag.String("f", "etc/agent-api.yaml", "the config file")

func main() {
	flag.Parse()

	var c config.Config
	conf.MustLoad(*configFile, &c)

	server := rest.MustNewServer(c.RestConf)
	defer server.Stop()

	svc.NewServiceContext(c)
	httpx.SetErrorHandler(func(err error) (int, interface{}) {
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
			log.Printf("未知错误: %v", err)
			return errorx.ErrorResponse(http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
		}

	})
	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)

	server.Start()
}
