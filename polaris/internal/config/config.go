package config

import (
	"github.com/zeromicro/go-zero/rest"
)

type BinLogTableConfig struct {
	Name   string
	Fields []string
}
type Config struct {
	rest.RestConf
	Mysql struct {
		Addr         string
		DbName       string
		User         string
		Password     string
		Charset      string
		MaxLifeTime  int
		MaxIdleTime  int
		ParseTime    bool
		OpenDebugLog bool
		loc          string
		MaxIdleConns int
		MaxOpenConns int
		BinLogTables []BinLogTableConfig
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
