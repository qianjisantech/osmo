package binlog

import (
	"fmt"
	"github.com/go-mysql-org/go-mysql/canal"
	"log"
	"strings"
)

// BinLogConfig 配置结构体
type BinLogConfig struct {
	Addr     string              `json:"addr"`     // MySQL地址
	User     string              `json:"user"`     // MySQL用户名
	Password string              `json:"password"` // MySQL密码
	Database string              `json:"database"` // 要监听的数据库
	Tables   []BinLogTableConfig `json:"tables"`   // 要监听的表配置
}

// BinLogTableConfig 表配置
type BinLogTableConfig struct {
	Name   string   `json:"name"`   // 表名
	Fields []string `json:"fields"` // 要监听的字段列表
}

// FieldChangeHandler 字段变更处理函数
type FieldChangeHandler func(dbName, tableName, columnName string, oldVal, newVal interface{}, fullRow map[string]interface{})

// BinlogWatcher Binlog监听器
type BinlogWatcher struct {
	canal    *canal.Canal
	config   BinLogConfig
	handlers []FieldChangeHandler
}

// NewWatcher 创建新的Binlog监听器
func NewWatcher(cfg BinLogConfig) (*BinlogWatcher, error) {
	canalCfg := canal.NewDefaultConfig()
	canalCfg.Addr = cfg.Addr
	canalCfg.User = cfg.User
	canalCfg.Password = cfg.Password
	canalCfg.Dump.ExecutionPath = ""

	// 构建表匹配正则
	var tableRegex []string
	for _, table := range cfg.Tables {
		tableRegex = append(tableRegex, fmt.Sprintf("%s.%s", cfg.Database, table.Name))
	}
	canalCfg.IncludeTableRegex = tableRegex

	c, err := canal.NewCanal(canalCfg)
	if err != nil {
		return nil, fmt.Errorf("failed to create canal: %v", err)
	}

	return &BinlogWatcher{
		canal:  c,
		config: cfg,
	}, nil
}

// AddHandler 添加字段变更处理函数
func (w *BinlogWatcher) AddHandler(handler FieldChangeHandler) {
	w.handlers = append(w.handlers, handler)
}

// Start 启动监听
func (w *BinlogWatcher) Start() error {
	handler := &binlogHandler{
		config:   w.config,
		handlers: w.handlers,
	}
	w.canal.SetEventHandler(handler)

	pos, err := w.canal.GetMasterPos()
	if err != nil {
		return fmt.Errorf("failed to get master position: %v", err)
	}

	go func() {
		if err := w.canal.RunFrom(pos); err != nil {
			log.Printf("binlog watcher error: %v", err)
		}
	}()

	return nil
}

// Stop 停止监听
func (w *BinlogWatcher) Stop() {
	if w.canal != nil {
		w.canal.Close()
	}
}

// binlogHandler 实现canal.EventHandler接口
type binlogHandler struct {
	canal.DummyEventHandler
	config   BinLogConfig
	handlers []FieldChangeHandler
}

// OnRow 处理行变更事件
func (h *binlogHandler) OnRow(e *canal.RowsEvent) error {
	// 检查数据库是否匹配
	if e.Table.Schema != h.config.Database {
		log.Printf("监听到非目标数据库事件，配置库: %s, 实际库: %s", h.config.Database, e.Table.Schema)
		return nil
	}

	// 查找表配置
	var tableConfig *BinLogTableConfig
	for _, table := range h.config.Tables {
		if e.Table.Name == table.Name {
			tableConfig = &table
			break
		}
	}

	if tableConfig == nil {
		log.Printf("监听到非配置表事件: %s.%s", e.Table.Schema, e.Table.Name)
		return nil
	}

	// 处理不同操作类型
	switch e.Action {
	case canal.UpdateAction:
		return h.handleUpdate(e, tableConfig)
	case canal.InsertAction:
		return h.handleInsert(e, tableConfig)
	case canal.DeleteAction:
		return h.handleDelete(e, tableConfig)
	}

	return nil
}

// handleUpdate 处理更新事件
// 修改handleUpdate方法
func (h *binlogHandler) handleUpdate(e *canal.RowsEvent, tableConfig *BinLogTableConfig) error {
	if len(e.Rows)%2 != 0 {
		return fmt.Errorf("invalid rows data for update event in table %s", e.Table.Name)
	}

	// 构建字段索引映射
	columnIndexes := make(map[string]int)
	for i, col := range e.Table.Columns {
		columnIndexes[col.Name] = i
	}

	for i := 0; i < len(e.Rows); i += 2 {
		oldRow := e.Rows[i]
		newRow := e.Rows[i+1]

		// 构建完整行数据
		fullRow := make(map[string]interface{})
		for colName, idx := range columnIndexes {
			fullRow[colName] = newRow[idx]
		}

		// 检查所有配置的字段
		for _, column := range tableConfig.Fields {
			if idx, ok := columnIndexes[column]; ok {
				if oldRow[idx] != newRow[idx] {
					h.notifyHandlers(e.Table.Schema, e.Table.Name, column, oldRow[idx], newRow[idx], fullRow)
				}
			}
		}
	}

	return nil
}

// 修改handleInsert方法
func (h *binlogHandler) handleInsert(e *canal.RowsEvent, tableConfig *BinLogTableConfig) error {
	columnIndexes := make(map[string]int)
	for i, col := range e.Table.Columns {
		columnIndexes[col.Name] = i
	}

	for _, row := range e.Rows {
		// 构建完整行数据
		fullRow := make(map[string]interface{})
		for colName, idx := range columnIndexes {
			fullRow[colName] = row[idx]
		}

		for _, column := range tableConfig.Fields {
			if idx, ok := columnIndexes[column]; ok {
				h.notifyHandlers(e.Table.Schema, e.Table.Name, column, nil, row[idx], fullRow)
			}
		}
	}

	return nil
}

// 修改handleDelete方法
func (h *binlogHandler) handleDelete(e *canal.RowsEvent, tableConfig *BinLogTableConfig) error {
	columnIndexes := make(map[string]int)
	for i, col := range e.Table.Columns {
		columnIndexes[col.Name] = i
	}

	for _, row := range e.Rows {
		// 构建完整行数据
		fullRow := make(map[string]interface{})
		for colName, idx := range columnIndexes {
			fullRow[colName] = row[idx]
		}

		for _, column := range tableConfig.Fields {
			if idx, ok := columnIndexes[column]; ok {
				h.notifyHandlers(e.Table.Schema, e.Table.Name, column, row[idx], nil, fullRow)
			}
		}
	}

	return nil
}

// notifyHandlers 通知所有处理函数
func (h *binlogHandler) notifyHandlers(dbName, tableName, columnName string, oldVal, newVal interface{}, fullRow map[string]interface{}) {
	for _, handler := range h.handlers {
		handler(dbName, tableName, columnName, oldVal, newVal, fullRow)
	}
}

func (h *binlogHandler) String() string {
	var tables []string
	for _, table := range h.config.Tables {
		tables = append(tables, fmt.Sprintf("%s(%s)", table.Name, strings.Join(table.Fields, ",")))
	}
	return fmt.Sprintf("BinlogHandler[db:%s, tables:%s]", h.config.Database, strings.Join(tables, ";"))
}

// 修改WatcherEngine函数
func WatcherEngine(dbName, tableName, columnName string, oldVal, newVal interface{}, fullRow map[string]interface{}) {
	log.Printf("[%s.%s] 字段名 %s 从 %v 更新为 %v",
		dbName, tableName, columnName, oldVal, newVal)
	log.Printf("完整行数据: %+v", fullRow)

	if tableName == "polaris_task_record" {
		PolarisTaskRecordWatcher(columnName, oldVal, newVal, fullRow)
	}
}
