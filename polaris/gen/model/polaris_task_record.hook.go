package model

import (
	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
	"polaris/common/utils"
	"polaris/constant"
	"time"
)

func (m *PolarisTaskRecord) BeforeCreate(tx *gorm.DB) (err error) {
	id, err := utils.InitSnowflakeId()
	if err != nil {
		logx.Errorf("生成雪花ID失败: %v", err)
		return err
	}
	if m.ID == 0 {
		m.ID = id
		logx.Infof("Generated snowflake ID: %s", m.ID)
	}
	if m.Status == "" {
		m.Status = string(constant.AgentStatusRegister) //默认注册进来的状态为已注册
	}
	// 确保必填字段有值
	if m.CreateBy == "" {
		m.CreateBy = "agent"
	}
	if m.CreateByName == "" {
		m.CreateByName = "执行机"
	}
	if m.UpdateBy == "" {
		m.UpdateBy = "agent"
	}
	if m.UpdateByName == "" {
		m.UpdateByName = "执行机"
	}

	if m.StartTime == nil {
		now := time.Now()
		m.StartTime = &now
	}

	m.IsDeleted = false
	return
}

func (m *PolarisTaskRecord) BeforeUpdate(tx *gorm.DB) (err error) {

	// 确保更新人信息有值
	if m.UpdateBy == "" {
		m.UpdateBy = "agent"
	}
	if m.UpdateByName == "" {
		m.UpdateByName = "执行机"
	}
	return
}
