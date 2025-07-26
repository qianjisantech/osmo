package main

import (
	"github.com/qianjisantech/polaris-recorder-sdk/core"
	recorder "github.com/qianjisantech/polaris-recorder-sdk/recoder"
	"runtime"
	"time"
)

func main() {
	// 默认配置
	config := recorder.Config{
		GOMAXPROCS: runtime.NumCPU() * 2,
		Inputs:     []string{":8080", string(core.InputRaw)},
		Outputs:    []string{string(core.OutStdout)},
		//Middleware: "/path/to/middleware",
		ExitAfter:  30 * time.Minute,
		DebugLevel: 1,
		PprofAddr:  ":6060",
	}

	recorder.AutoLoadConfiguration(config)
}
