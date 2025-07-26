package core

import (
	"os/exec"
	"strconv"
)

// LinuxProxy  流量重定向linux
func LinuxProxy(port int) error {
	cmd := exec.Command("iptables", "-t", "nat", "-A", "OUTPUT", "-p", "tcp", "--dport", "80", "-j", "REDIRECT", "--to-port", strconv.Itoa(port))
	return cmd.Run()
}
