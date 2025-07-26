package sqlite

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

type SqliteDBConf struct {
	DataSourceName string
	SqlFilePath    string
}
type SqliteDB struct {
	db             *sql.DB
	Path           string
	DriverName     string
	DataSourceName string
	SqlFilePath    string
}

// InitializeSqlite 初始化sqlite数据库/*
func (sqlite *SqliteDB) InitializeSqlite() error {
	// 删除已存在的数据库文件
	_ = os.Remove(sqlite.Path)
	db, err := sql.Open(sqlite.DriverName, sqlite.DataSourceName)
	if err != nil {
		return err
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
		}
	}(db)
	return nil
}

// CreateTableInTransaction 在事务中初始化表文件
func (sqlite *SqliteDB) CreateTableInTransaction() error {
	// 开始事务
	tx, err := sqlite.db.Begin()
	if err != nil {
		return fmt.Errorf("开始事务失败: %w", err)
	}

	// 如果出错则回滚
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	// 读取SQL文件
	content, err := ioutil.ReadFile(sqlite.SqlFilePath)
	if err != nil {
		return fmt.Errorf("读取SQL文件失败: %w", err)
	}

	// 分割并执行SQL语句
	statements := strings.Split(string(content), ";")
	for _, stmt := range statements {
		stmt = strings.TrimSpace(stmt)
		if stmt == "" {
			continue
		}

		if _, err = tx.Exec(stmt); err != nil {
			return fmt.Errorf("执行SQL语句失败: %s\n错误: %w", stmt, err)
		}
	}

	// 提交事务
	return tx.Commit()
}
