package model

import (
	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
	"osmo/constant"
)

func (m *GosmoTaskRecord) BeforeCreate(tx *gorm.DB) (err error) {
	id, err := InitSnowflakeId()
	if err != nil {
		logx.Errorf("生成雪花ID失败: %v", err)
		return err
	}
	if m.ID == 0 {
		m.ID = id
		logx.Infof("生成雪花ID: %s", m.ID)
	}
	if m.Status == "" {
		m.Status = string(constant.TaskStatusPending)
	}
	// 确保必填字段有值
	if m.CreateBy == "" {
		m.CreateBy = "system"
	}
	if m.CreateByName == "" {
		m.CreateByName = "系统"
	}
	if m.UpdateBy == "" {
		m.UpdateBy = "system"
	}
	if m.UpdateByName == "" {
		m.UpdateByName = "系统"
	}
	m.IsDeleted = false
	return
}

func (m *GosmoTaskRecord) BeforeUpdate(tx *gorm.DB) (err error) {
	// 确保更新人信息有值
	if m.UpdateBy == "" {
		m.UpdateBy = "system"
	}
	if m.UpdateByName == "" {
		m.UpdateByName = "系统"
	}
	return
}
