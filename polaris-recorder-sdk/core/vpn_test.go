package core

import (
	"net"
	"os"
	"testing"
	"time"
)

func TestVPNMode(t *testing.T) {
	// 跳过需要 root 权限的测试（本地开发时去掉这个检查）
	if os.Getuid() != 0 {
		t.Skip("Skipping test: requires root privileges for TUN device")
	}

	// 启动 VPN 模式（后台运行）
	go startVPNMode()
	time.Sleep(1 * time.Second) // 等待 TUN 设备初始化

	// 测试 TUN 设备是否存在
	if _, err := net.InterfaceByName("gor"); err != nil {
		t.Fatalf("TUN device 'gor' not created: %v", err)
	}

	// 这里可以添加更复杂的测试逻辑，例如：
	// 1. 发送测试数据包到 TUN 设备
	// 2. 验证 processPacket 是否正确处理数据
}
