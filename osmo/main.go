package main

//import (
//	"fmt"
//	"github.com/go-mysql-org/go-mysql/canal"
//	"log"
//	"os"
//	"os/signal"
//	"syscall"
//	"time"
//)
//
//// 自定义事件处理器
//type MyEventHandler struct {
//	canal.DummyEventHandler
//	// 添加要监控的字段名
//	targetColumn string
//}
//
//func (h *MyEventHandler) OnRow(e *canal.RowsEvent) error {
//	// 只处理特定表的更新事件
//	if e.Table.Schema == "osmo" && e.Table.Name == "gosmo_task_record" {
//		// 查找目标字段的索引
//		columnIndex := -1
//		for i, col := range e.Table.Columns {
//			if col.Name == h.targetColumn {
//				columnIndex = i
//				break
//			}
//		}
//
//		if columnIndex == -1 {
//			return nil
//		}
//
//		switch e.Action {
//		case canal.UpdateAction:
//			// 确保有足够的数据行
//			if len(e.Rows)%2 != 0 {
//				return fmt.Errorf("invalid rows data for update event")
//			}
//
//			for i := 0; i < len(e.Rows); i += 2 {
//				oldRow := e.Rows[i]
//				newRow := e.Rows[i+1]
//				if oldRow[columnIndex] != newRow[columnIndex] {
//					fmt.Printf("Field '%s' changed! Old: %v, New: %v\n",
//						h.targetColumn, oldRow[columnIndex], newRow[columnIndex])
//				}
//				// 只关注特定状态变化
//				if oldRow[columnIndex] == "pending" && newRow[columnIndex] == "running" {
//					fmt.Printf("Important status change detected!")
//					fmt.Printf("[%s] Table: %s.%s, Action: %s, Field: %s, Old: %v, New: %v\n",
//						time.Now().Format(time.DateTime),
//						e.Table.Schema,
//						e.Table.Name,
//						e.Action,
//						h.targetColumn,
//						oldRow[columnIndex],
//						newRow[columnIndex])
//				}
//			}
//
//		case canal.InsertAction:
//			for _, row := range e.Rows {
//				fmt.Printf("New row inserted, %s value: %v\n", h.targetColumn, row[columnIndex])
//			}
//
//		case canal.DeleteAction:
//			for _, row := range e.Rows {
//				fmt.Printf("Row deleted, %s value was: %v\n", h.targetColumn, row[columnIndex])
//			}
//		}
//	}
//	return nil
//}
//func (h *MyEventHandler) String() string {
//	return "MyEventHandler"
//}
//
//func main() {
//	cfg := canal.NewDefaultConfig()
//	cfg.Addr = "127.0.0.1:3306"
//	cfg.User = "root"
//	cfg.Password = "123456"
//	cfg.Dump.ExecutionPath = "" // 不需要mysqldump
//
//	// 只监听特定数据库和表
//	cfg.IncludeTableRegex = []string{"osmo.gosmo_task_record"}
//
//	// 创建canal实例
//	c, err := canal.NewCanal(cfg)
//	if err != nil {
//		log.Fatal(err)
//	}
//
//	// 设置事件处理器，指定要监控的字段名
//	handler := &MyEventHandler{
//		targetColumn: "status", // 替换为你想监控的字段名
//	}
//	c.SetEventHandler(handler)
//
//	// 从最新的binlog位置开始监听
//	go func() {
//		pos, err := c.GetMasterPos()
//		if err != nil {
//			log.Fatal(err)
//		}
//		err = c.RunFrom(pos)
//		if err != nil {
//			log.Fatal(err)
//		}
//	}()
//
//	// 优雅退出
//	sigChan := make(chan os.Signal, 1)
//	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
//	<-sigChan
//	log.Println("Shutting down...")
//	c.Close()
//}
