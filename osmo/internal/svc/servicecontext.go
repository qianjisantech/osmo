package svc

import (
	"context"
	"fmt"
	"osmo/binlog"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"osmo/gen/query"
	"osmo/internal/config"
)

type ServiceContext struct {
	Config        config.Config
	DB            *gorm.DB // 将DB暴露给ServiceContext
	BinlogWatcher *binlog.BinlogWatcher
}

// 实现gorm的logger.Writer接口
type gormLoggerWriter struct{}

func (w *gormLoggerWriter) Printf(format string, args ...interface{}) {
	logx.Infof(format, args...)
}

func NewServiceContext(c config.Config) *ServiceContext {

	var binLogTables []binlog.BinLogTableConfig
	for _, table := range c.Mysql.BinLogTables {
		binLogTables = append(binLogTables, binlog.BinLogTableConfig{
			Name:   table.Name,
			Fields: table.Fields,
		})
	}

	// 初始化binlog监听器
	watcher, err := binlog.NewWatcher(binlog.BinLogConfig{
		Addr:     c.Mysql.Addr,
		Database: c.Mysql.DbName,
		Tables:   binLogTables,
		User:     c.Mysql.User,
		Password: c.Mysql.Password,
	})
	if err != nil {
		panic(err)
	}
	// 注册处理函数
	watcher.AddHandler(func(dbName, tableName, columnName string, oldVal, newVal interface{}, fullRow map[string]interface{}) {
		binlog.WatcherEngine(dbName, tableName, columnName, oldVal, newVal, fullRow)
	})
	// 启动监听
	if err := watcher.Start(); err != nil {
		panic(err)
	}

	// 创建自定义的GORM日志器
	gormLog := logger.New(
		&gormLoggerWriter{}, // 使用自定义的日志写入器
		logger.Config{
			SlowThreshold:             time.Second,   // 慢查询阈值
			LogLevel:                  logger.Silent, // 默认日志级别
			IgnoreRecordNotFoundError: true,          // 忽略记录不存在的错误
			Colorful:                  true,          // 启用彩色输出
		},
	)

	if c.Mysql.OpenDebugLog {
		gormLog.LogMode(logger.Info) // 调试模式下开启SQL日志
	}
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", c.Mysql.User, c.Mysql.Password, c.Mysql.Addr, c.Mysql.DbName)
	// 初始化GORM连接
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		SkipDefaultTransaction: true, // 禁用默认事务
		PrepareStmt:            true, // 开启预编译语句
		Logger:                 gormLog,
		NowFunc: func() time.Time {
			return time.Now().Local() // 使用本地时间
		},
	})
	if err != nil {
		logx.Errorf("failed to connect database: %v", err)
		panic(err)
	}
	// 获取底层sql.DB连接池
	sqlDB, err := db.DB()
	if err != nil {
		logx.Errorf("failed to get sql.DB: %v", err)
		panic(err)
	}

	// 优化连接池配置
	sqlDB.SetMaxIdleConns(c.Mysql.MaxIdleConns) // 默认值: 10
	sqlDB.SetMaxOpenConns(c.Mysql.MaxOpenConns) // 默认值: 100
	sqlDB.SetConnMaxLifetime(time.Hour)         // 连接最大存活时间
	sqlDB.SetConnMaxIdleTime(30 * time.Minute)  // 空闲连接最大存活时间

	// 测试数据库连接
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := sqlDB.PingContext(ctx); err != nil {
		logx.Errorf("database ping failed: %v", err)
		panic(err)
	}

	// 设置GORM查询生成器
	query.SetDefault(db)

	logx.Infof("MySQL connected successfully, datasource: %s", c.Mysql.Addr)

	return &ServiceContext{
		Config:        c,
		DB:            db, // 将db实例暴露出去
		BinlogWatcher: watcher,
	}
}
