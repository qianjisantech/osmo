package config

import "github.com/zeromicro/go-zero/rest"

type Config struct {
	rest.RestConf
	Mysql struct {
		Datasource   string
		OpenDebugLog bool
		MaxIdleConns int
		MaxOpenConns int
	}
}
