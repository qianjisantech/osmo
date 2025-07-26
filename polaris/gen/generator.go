package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gen"
	"gorm.io/gen/field"
	"gorm.io/gorm"
)

func main() {
	g := gen.NewGenerator(gen.Config{
		OutPath:       "gen/query",
		Mode:          gen.WithDefaultQuery | gen.WithQueryInterface,
		FieldNullable: true,
	})

	dsn := "root:123456@tcp(localhost:3306)/osmo?charset=utf8mb4&parseTime=true&loc=Asia%2FShanghai"
	db, _ := gorm.Open(mysql.Open(dsn))
	g.UseDB(db)
	// Common field configurations
	commonFields := []gen.ModelOpt{
		gen.FieldGORMTag("create_time", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "create_time").Set("->", "")
		}),
		gen.FieldGORMTag("update_time", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "update_time").Set("->", "")
		}),
		gen.FieldGORMTag("is_deleted", func(tag field.GormTag) field.GormTag {
			return tag.Set("column", "is_deleted").Set("->", "")
		}),
	}

	// Tables to generate
	tables := []string{
		"gosmo_resource_agent",
		"polaris_traffic_pool",
	}

	// Apply configurations to all tables
	for _, table := range tables {
		opts := commonFields

		g.ApplyBasic(g.GenerateModel(table, opts...))
	}

	g.Execute()
}
