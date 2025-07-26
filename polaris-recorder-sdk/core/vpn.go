package core

import (
	"github.com/songgao/water"
	"log"
	"os/exec"
	"runtime"
	"strings"
)

// Start VPN mode (TUN device)
func startVPNMode() {
	config := water.Config{
		DeviceType: water.TUN,
	}

	// Windows 专用配置
	if runtime.GOOS == "windows" {
		config.InterfaceName = "gor"
		// Windows 需要 PlatformSpecificParams
		config.PlatformSpecificParams = water.PlatformSpecificParams{
			ComponentID: "tap0901",         // 必须与安装的 TAP 驱动匹配
			Network:     "192.168.42.1/24", // 分配的虚拟网络
		}
	}

	ifce, err := water.New(config)
	if err != nil {
		log.Fatalf("Failed to create TUN device: %v", err)
	}
	defer ifce.Close()

	log.Printf("VPN mode active (Interface: %s)", ifce.Name())

	// Windows 需要手动启用接口
	if runtime.GOOS == "windows" {
		enableWindowsInterface(ifce.Name())
	}

	packet := make([]byte, 1500)
	for {
		n, err := ifce.Read(packet)
		if err != nil {
			// Windows 错误处理需要更健壮
			if strings.Contains(err.Error(), "operation aborted") {
				continue
			}
			log.Fatalf("Read error: %v", err)
		}
		go processPacket(packet[:n])
	}
}

// 启用 Windows 网络接口
func enableWindowsInterface(ifaceName string) {
	// 使用 netsh 命令启用接口
	cmd := exec.Command("netsh", "interface", "set", "interface",
		"name="+ifaceName, "admin=enabled")
	if err := cmd.Run(); err != nil {
		log.Printf("Warning: failed to enable interface: %v", err)
	}
}
func processPacket(data []byte) {
	// Add your packet parsing and forwarding logic here
	// Example: Extract HTTP/HTTPS traffic and send to Goreplay's recorder
}
