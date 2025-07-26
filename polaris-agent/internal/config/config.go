package config

import (
	"github.com/qianjisantech/polaris-discovery-sdk/conf"
	"github.com/zeromicro/go-zero/rest"

	"github.com/qianjisantech/gosmo-agent/sqlite"
)

type Config struct {
	rest.RestConf
	Sqlite  sqlite.SqliteDBConf
	Polaris struct {
		Discovery conf.PolarisDiscoveryConf
	}
	Task struct {
		MaxConcurrent int
	}
	Kafka struct {
		Host  string
		Topic string
	}
}
