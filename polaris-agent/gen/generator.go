package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gen"
	"gorm.io/gorm"
)

func main() {
	g := gen.NewGenerator(gen.Config{
		OutPath:       "gen/query",
		Mode:          gen.WithDefaultQuery | gen.WithQueryInterface,
		FieldNullable: true,
	})

	dsn := "agent.db?_journal_mode=WAL&_sync=1&_foreign_keys=1"
	db, _ := gorm.Open(sqlite.Open(dsn))
	g.UseDB(db)
	// Common field configurations
	var commonFields []gen.ModelOpt

	// Tables to generate
	tables := []string{
		"gosmo_agent_info",
		"gosmo_agent_ops_log",
		"gosmo_agent_task",
		"table_change_events",
	}

	// Apply configurations to all tables
	for _, table := range tables {
		opts := commonFields

		g.ApplyBasic(g.GenerateModel(table, opts...))
	}

	g.Execute()
}
