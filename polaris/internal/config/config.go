package config

import (
	"github.com/zeromicro/go-zero/rest"
)

type Config struct {
	rest.RestConf
	Mysql struct {
		Datasource   string
		OpenDebugLog bool
		MaxIdleConns int
		MaxOpenConns int
	}
	Kafka struct {
		Brokers    []string
		Topic      string
		Group      string
		Offset     string
		Consumers  int
		Processors int
	}
}
