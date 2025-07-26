package model

import (
	"fmt"
	"github.com/bwmarrin/snowflake"
)

// InitSnowflakeId 生成雪花ID的函数
func InitSnowflakeId() (int64, error) {
	// 初始化一个雪花节点
	node, err := snowflake.NewNode(1) // 1 是机器ID，通常是根据集群环境配置
	if err != nil {
		return 0, fmt.Errorf("生成雪花ID失败: %w", err)
	}
	// 返回生成的雪花ID
	return node.Generate().Int64(), nil
}
