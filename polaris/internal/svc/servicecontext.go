package svc

import (
	"context"
	"github.com/segmentio/kafka-go"
	"polaris/common/kafka/core"
	"sync"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"polaris/gen/query"
	"polaris/internal/config"
)

type ServiceContext struct {
	Config       config.Config
	DB           *gorm.DB
	Kafka        *core.KafkaConsumer
	msgCh        <-chan kafka.Message
	errCh        <-chan error
	shutdownOnce sync.Once
}

// 实现gorm的logger.Writer接口
type gormLoggerWriter struct{}

func (w *gormLoggerWriter) Printf(format string, args ...interface{}) {
	logx.Infof(format, args...)
}

func NewServiceContext(c config.Config) *ServiceContext {
	// 1. 初始化GORM
	db := initGorm(c)
	kaf := initKafka(c)
	// 4. 设置GORM查询生成器
	query.SetDefault(db)

	logx.Infof("ServiceContext initialized successfully")

	return &ServiceContext{
		Config: c,
		DB:     db,
		Kafka:  kaf,
	}
}
func initKafka(c config.Config) *core.KafkaConsumer {
	// 初始化 Kafka 消费者
	kafkaReader := core.NewConsumerEngine(
		c.Kafka.Brokers,
		c.Kafka.Topic,
		c.Kafka.Group,
		kafka.ReaderConfig{
			MinBytes:    10e3,
			MaxBytes:    10e6,
			MaxWait:     2 * time.Second,
			StartOffset: kafka.FirstOffset,
		},
	)
	return kafkaReader
}

// 初始化GORM连接
func initGorm(c config.Config) *gorm.DB {
	gormLog := logger.New(
		&gormLoggerWriter{},
		logger.Config{
			SlowThreshold:             time.Second,
			LogLevel:                  logger.Silent,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	if c.Mysql.OpenDebugLog {
		gormLog.LogMode(logger.Info)
	}

	db, err := gorm.Open(mysql.Open(c.Mysql.Datasource), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
		Logger:                 gormLog,
		NowFunc: func() time.Time {
			return time.Now().Local()
		},
	})
	if err != nil {
		logx.Errorf("failed to connect database: %v", err)
		panic(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		logx.Errorf("failed to get sql.DB: %v", err)
		panic(err)
	}

	sqlDB.SetMaxIdleConns(c.Mysql.MaxIdleConns)
	sqlDB.SetMaxOpenConns(c.Mysql.MaxOpenConns)
	sqlDB.SetConnMaxLifetime(time.Hour)
	sqlDB.SetConnMaxIdleTime(30 * time.Minute)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := sqlDB.PingContext(ctx); err != nil {
		logx.Errorf("database ping failed: %v", err)
		panic(err)
	}

	return db
}
func (s *ServiceContext) GetReader() *kafka.Reader {
	if s.Kafka == nil {
		return nil
	}
	return s.Kafka.GetReader()
}
func (s *ServiceContext) StartKafkaConsumer(ctx context.Context) (<-chan kafka.Message, <-chan error) {
	// 如果已经启动，直接返回现有通道
	if s.msgCh != nil && s.errCh != nil {
		return s.msgCh, s.errCh
	}

	// 启动消费者
	s.msgCh, s.errCh = s.Kafka.Start(ctx)
	return s.msgCh, s.errCh
}

// Shutdown 关闭资源
func (s *ServiceContext) Shutdown() {
	s.shutdownOnce.Do(func() {
		if s.Kafka != nil {
			if err := s.Kafka.Stop(); err != nil {
				logx.Errorf("关闭 Kafka 消费者失败: %v", err)
			}
		}
		if s.DB != nil {
			if sqlDB, err := s.DB.DB(); err == nil {
				sqlDB.Close()
			}
		}
	})
}
