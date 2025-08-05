package config

import (
	"github.com/qianjisantech/polaris-discovery-sdk/conf"
	"github.com/zeromicro/go-zero/rest"
)

type Config struct {
	rest.RestConf
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
