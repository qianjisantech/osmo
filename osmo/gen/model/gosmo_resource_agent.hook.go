package model

import (
	"github.com/golang-jwt/jwt/v4"
	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
	"osmo/constant"
)

func (m *GosmoResourceAgent) BeforeCreate(tx *gorm.DB) (err error) {
	id, err := InitSnowflakeId()
	if err != nil {
		logx.Errorf("生成雪花ID失败: %v", err)
		return err
	}
	if m.ID == 0 {
		m.ID = id
		logx.Infof("Generated snowflake ID: %s", m.ID)
	}
	if m.Status == "" {
		m.Status = string(constant.AgentStatusRegister)
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
	if m.IdentificationCode == "" {
		m.IdentificationCode, err = GenerateIdentificationCodeFromSnowflake(m.ID)
	}

	m.IsDeleted = false
	return
}

func (m *GosmoResourceAgent) BeforeUpdate(tx *gorm.DB) (err error) {
	// 确保更新人信息有值
	if m.UpdateBy == "" {
		m.UpdateBy = "admin"
	}
	if m.UpdateByName == "" {
		m.UpdateByName = "超级管理员"
	}
	return
}

// GenerateIdentificationCodeFromSnowflake 生成加密ID的Token
func GenerateIdentificationCodeFromSnowflake(id int64) (string, error) {
	claims := jwt.MapClaims{
		"id":     id,
		"expire": constant.TokenExpireTime,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(constant.EncryptionKey))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
