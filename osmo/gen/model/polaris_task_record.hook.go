package model

import (
	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
	"osmo/constant"
)

func (m *PolarisTaskRecord) BeforeCreate(tx *gorm.DB) (err error) {
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
		m.CreateBy = "admin"
	}
	if m.CreateByName == "" {
		m.CreateByName = "超级管理员"
	}
	if m.UpdateBy == "" {
		m.UpdateBy = "admin"
	}
	if m.UpdateByName == "" {
		m.UpdateByName = "超级管理员"
	}
	m.IsDeleted = false
	return
}

func (m *PolarisTaskRecord) BeforeUpdate(tx *gorm.DB) (err error) {
	// 确保更新人信息有值
	if m.UpdateBy == "" {
		m.UpdateBy = "admin"
	}
	if m.UpdateByName == "" {
		m.UpdateByName = "超级管理员"
	}
	return
}
