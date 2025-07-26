package utils

import (
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"polaris/constant"
)

// GenerateIdentificationCodeFromSnowflake  根据id 生成IdentificationCode
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

// ParseIdFromIdentificationCode 从IdentificationCode 解析出id
func ParseIdFromIdentificationCode(identificationCode string) (int64, error) {
	// 解析Token
	token, err := jwt.Parse(identificationCode, func(token *jwt.Token) (interface{}, error) {
		// 验证签名方法
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(constant.EncryptionKey), nil
	})

	// 处理解析错误
	if err != nil {
		return 0, fmt.Errorf("token解析失败: %v", err)
	}

	// 验证claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// 提取id字段
		id, ok := claims["id"].(float64) // JWT数字默认解码为float64
		if !ok {
			return 0, fmt.Errorf("token中缺少id字段")
		}
		return int64(id), nil
	}

	return 0, fmt.Errorf("无效的token")
}
