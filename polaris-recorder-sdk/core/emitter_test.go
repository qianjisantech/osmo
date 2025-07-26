package core

import (
	"fmt"
	"os"
	"sync"
	"sync/atomic"
	"testing"
	"time"
)

func TestMain(m *testing.M) {
	PRO = true
	code := m.Run()
	os.Exit(code)
}

func TestEmitter(t *testing.T) {
	t.Log("=== 开始测试Emitter基本功能 ===")
	wg := new(sync.WaitGroup)

	input := NewTestInput()
	output := NewTestOutput(func(msg *Message) {
		t.Logf("输出端收到消息 - 元数据: %q, 数据: %q", string(msg.Meta), string(msg.Data))
		wg.Done()
	})

	plugins := &InOutPlugins{
		Inputs:  []PluginReader{input},
		Outputs: []PluginWriter{output},
	}
	plugins.All = append(plugins.All, input, output)

	emitter := NewEmitter()
	t.Log("启动Emitter协程")
	go emitter.Start(plugins, Settings.Middleware)

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		t.Logf("发送GET请求 #%d", i)
		input.EmitGET()
	}

	t.Log("等待所有消息处理完成")
	wg.Wait()
	t.Log("关闭Emitter")
	emitter.Close()
	t.Log("=== Emitter基本功能测试完成 ===")
}

func TestEmitterFiltered(t *testing.T) {
	t.Log("=== 开始测试Emitter过滤功能 ===")
	wg := new(sync.WaitGroup)

	input := NewTestInput()
	input.skipHeader = true

	output := NewTestOutput(func(msg *Message) {
		t.Logf("输出端收到过滤后的消息 - 元数据: %q, 数据: %q", string(msg.Meta), string(msg.Data))
		wg.Done()
	})

	plugins := &InOutPlugins{
		Inputs:  []PluginReader{input},
		Outputs: []PluginWriter{output},
	}
	plugins.All = append(plugins.All, input, output)

	methods := HTTPMethods{[]byte("GET")}
	Settings.ModifierConfig = HTTPModifierConfig{Methods: methods}
	t.Logf("设置修改器配置: %+v", Settings.ModifierConfig)

	emitter := &Emitter{}
	t.Log("启动Emitter协程")
	go emitter.Start(plugins, "")

	wg.Add(2)

	id := uuid()
	reqh := payloadHeader(RequestPayload, id, time.Now().UnixNano(), -1)
	reqb := append(reqh, []byte("POST / HTTP/1.1\r\nHost: www.w3.org\r\nUser-Agent: Go 1.1 package http\r\nAccept-Encoding: gzip\r\n\r\n")...)
	t.Logf("发送POST请求 - ID: %s, 数据: %q", id, string(reqb))
	input.EmitBytes(reqb)

	resh := payloadHeader(ResponsePayload, id, time.Now().UnixNano()+1, 1)
	respb := append(resh, []byte("HTTP/1.1 200 OK\r\nContent-Length: 0\r\n\r\n")...)
	t.Logf("发送POST响应 - ID: %s, 数据: %q", id, string(respb))
	input.EmitBytes(respb)

	id = uuid()
	reqh = payloadHeader(RequestPayload, id, time.Now().UnixNano(), -1)
	reqb = append(reqh, []byte("GET / HTTP/1.1\r\nHost: www.w3.org\r\nUser-Agent: Go 1.1 package http\r\nAccept-Encoding: gzip\r\n\r\n")...)
	t.Logf("发送GET请求 - ID: %s, 数据: %q", id, string(reqb))
	input.EmitBytes(reqb)

	resh = payloadHeader(ResponsePayload, id, time.Now().UnixNano()+1, 1)
	respb = append(resh, []byte("HTTP/1.1 200 OK\r\nContent-Length: 0\r\n\r\n")...)
	t.Logf("发送GET响应 - ID: %s, 数据: %q", id, string(respb))
	input.EmitBytes(respb)

	t.Log("等待过滤消息处理完成")
	wg.Wait()
	t.Log("关闭Emitter")
	emitter.Close()
	Settings.ModifierConfig = HTTPModifierConfig{}
	t.Log("=== Emitter过滤功能测试完成 ===")
}

func TestEmitterSplitRoundRobin(t *testing.T) {
	t.Log("=== 开始测试Emitter轮询分发功能 ===")
	wg := new(sync.WaitGroup)

	input := NewTestInput()

	var counter1, counter2 int32

	output1 := NewTestOutput(func(msg *Message) {
		t.Logf("输出端1收到消息 - 元数据: %q, 数据: %q", string(msg.Meta), string(msg.Data))
		atomic.AddInt32(&counter1, 1)
		wg.Done()
	})

	output2 := NewTestOutput(func(msg *Message) {
		t.Logf("输出端2收到消息 - 元数据: %q, 数据: %q", string(msg.Meta), string(msg.Data))
		atomic.AddInt32(&counter2, 1)
		wg.Done()
	})

	plugins := &InOutPlugins{
		Inputs:  []PluginReader{input},
		Outputs: []PluginWriter{output1, output2},
	}

	Settings.SplitOutput = true
	t.Log("启用分流输出模式")

	emitter := NewEmitter()
	t.Log("启动Emitter协程")
	go emitter.Start(plugins, Settings.Middleware)

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		if i%100 == 0 {
			t.Logf("发送GET请求 #%d", i)
		}
		input.EmitGET()
	}

	t.Log("等待所有消息处理完成")
	wg.Wait()
	t.Log("关闭Emitter")
	emitter.Close()

	t.Logf("计数器结果 - 输出端1: %d, 输出端2: %d", counter1, counter2)
	if counter1 == 0 || counter2 == 0 || counter1 != counter2 {
		t.Errorf("轮询分发应该平均分配流量: %d vs %d", counter1, counter2)
	}

	Settings.SplitOutput = false
	t.Log("=== Emitter轮询分发功能测试完成 ===")
}

func TestEmitterRoundRobin(t *testing.T) {
	t.Log("=== 开始测试Emitter简单轮询功能 ===")
	wg := new(sync.WaitGroup)

	input := NewTestInput()

	var counter1, counter2 int32

	output1 := NewTestOutput(func(msg *Message) {
		t.Logf("输出端1收到消息 - 元数据: %q, 数据: %q", string(msg.Meta), string(msg.Data))
		counter1++
		wg.Done()
	})

	output2 := NewTestOutput(func(msg *Message) {
		t.Logf("输出端2收到消息 - 元数据: %q, 数据: %q", string(msg.Meta), string(msg.Data))
		counter2++
		wg.Done()
	})

	plugins := &InOutPlugins{
		Inputs:  []PluginReader{input},
		Outputs: []PluginWriter{output1, output2},
	}
	plugins.All = append(plugins.All, input, output1, output2)

	Settings.SplitOutput = true
	t.Log("启用分流输出模式")

	emitter := NewEmitter()
	t.Log("启动Emitter协程")
	go emitter.Start(plugins, Settings.Middleware)

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		if i%100 == 0 {
			t.Logf("发送GET请求 #%d", i)
		}
		input.EmitGET()
	}

	t.Log("等待所有消息处理完成")
	wg.Wait()
	t.Log("关闭Emitter")
	emitter.Close()

	t.Logf("计数器结果 - 输出端1: %d, 输出端2: %d", counter1, counter2)
	if counter1 == 0 || counter2 == 0 {
		t.Errorf("轮询应该平均分配流量: %d vs %d", counter1, counter2)
	}

	Settings.SplitOutput = false
	t.Log("=== Emitter简单轮询功能测试完成 ===")
}

func TestEmitterSplitSession(t *testing.T) {
	t.Log("=== 开始测试Emitter会话感知分发功能 ===")
	wg := new(sync.WaitGroup)
	wg.Add(200)

	input := NewTestInput()
	input.skipHeader = true

	var counter1, counter2 int32

	output1 := NewTestOutput(func(msg *Message) {
		id := payloadID(msg.Meta)
		t.Logf("输出端1收到消息 - ID: %s, 数据: %q", string(id), string(msg.Data))
		if id[0] == 'a' {
			counter1++
		}
		wg.Done()
	})

	output2 := NewTestOutput(func(msg *Message) {
		id := payloadID(msg.Meta)
		t.Logf("输出端2收到消息 - ID: %s, 数据: %q", string(id), string(msg.Data))
		if id[0] == 'b' {
			counter2++
		}
		wg.Done()
	})

	plugins := &InOutPlugins{
		Inputs:  []PluginReader{input},
		Outputs: []PluginWriter{output1, output2},
	}

	Settings.SplitOutput = true
	Settings.RecognizeTCPSessions = true
	t.Log("启用分流输出和TCP会话识别模式")

	emitter := NewEmitter()
	t.Log("启动Emitter协程")
	go emitter.Start(plugins, Settings.Middleware)

	for i := 0; i < 200; i++ {
		id := make([]byte, 20)
		if i&1 == 0 {
			id[0] = 'a'
			t.Logf("发送消息(会话ID以'a'开头) - #%d", i)
		} else {
			id[0] = 'b'
			t.Logf("发送消息(会话ID以'b'开头) - #%d", i)
		}
		data := []byte(fmt.Sprintf("1 %s 1 1\nGET / HTTP/1.1\r\n\r\n", id[:20]))
		t.Logf("发送消息数据: %q", string(data))
		input.EmitBytes(data)
	}

	t.Log("等待所有消息处理完成")
	wg.Wait()

	t.Logf("计数器结果 - 会话'a': %d, 会话'b': %d", counter1, counter2)
	if counter1 != counter2 {
		t.Errorf("会话感知分发应该平均分配流量: %d vs %d", counter1, counter2)
	}

	Settings.SplitOutput = false
	Settings.RecognizeTCPSessions = false
	t.Log("关闭Emitter")
	emitter.Close()
	t.Log("=== Emitter会话感知分发功能测试完成 ===")
}

func BenchmarkEmitter(b *testing.B) {
	b.Log("=== 开始Emitter性能测试 ===")
	wg := new(sync.WaitGroup)

	input := NewTestInput()

	output := NewTestOutput(func(msg *Message) {
		b.Logf("输出端收到消息 - 元数据: %q, 数据: %q", string(msg.Meta), string(msg.Data))
		wg.Done()
	})

	plugins := &InOutPlugins{
		Inputs:  []PluginReader{input},
		Outputs: []PluginWriter{output},
	}
	plugins.All = append(plugins.All, input, output)

	emitter := NewEmitter()
	b.Log("启动Emitter协程")
	go emitter.Start(plugins, Settings.Middleware)

	b.ResetTimer()
	b.Log("开始性能测试迭代")

	for i := 0; i < b.N; i++ {
		wg.Add(1)
		if i%1000 == 0 {
			b.Logf("发送GET请求 #%d", i)
		}
		input.EmitGET()
	}

	b.Log("等待所有消息处理完成")
	wg.Wait()
	b.Log("关闭Emitter")
	emitter.Close()
	b.Log("=== Emitter性能测试完成 ===")
}
