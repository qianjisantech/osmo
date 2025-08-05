package handler

import (
	"net/http"
)

const dashboardHTML = `<!DOCTYPE html>
<html>
<head>
    <title>北极星超级监控中心</title>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #0a0a1a;
            color: #00fffc;
            font-family: 'Orbitron', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        
        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        h1 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 30px;
            text-shadow: 0 0 10px #00fffc;
            letter-spacing: 2px;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .metric {
            background: rgba(0, 20, 30, 0.7);
            border: 1px solid #00fffc;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 0 15px rgba(0, 255, 252, 0.3);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .metric:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 25px rgba(0, 255, 252, 0.5);
        }
        
        .metric::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 252, 0.2), transparent);
            transition: all 0.6s ease;
        }
        
        .metric:hover::before {
            left: 100%;
        }
        
        .metric-name {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: #00fffc;
        }
        
        .metric-value {
            font-size: 2rem;
            font-weight: bold;
            color: #ffffff;
        }
        
        .metric-unit {
            font-size: 1rem;
            color: #00fffc;
            margin-left: 5px;
        }
        
        .metric-trend {
            margin-top: 10px;
            font-size: 1.5rem;
        }
        
        .chart-container {
            background: rgba(0, 20, 30, 0.7);
            border: 1px solid #00fffc;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 0 15px rgba(0, 255, 252, 0.3);
            overflow: hidden; /* 确保内容不会溢出 */
        }
        
        .chart-title {
            font-size: 1.3rem;
            margin-bottom: 15px;
            color: #00fffc;
        }
        
        .chart-wrapper {
            position: relative;
            width: 100%;
            height: 300px; /* 固定高度 */
        }
        
        .chart-wrapper canvas {
            width: 100% !important;
            height: 100% !important;
        }
        
        .status-alert {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px;
            background: rgba(255, 50, 50, 0.8);
            border-radius: 5px;
            animation: pulse 2s infinite;
            display: none;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 50, 50, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(255, 50, 50, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 50, 50, 0); }
        }
        
        .scanlines {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(0, 255, 252, 0.06) 1px, transparent 1px);
            background-size: 100% 3px;
            pointer-events: none;
            z-index: 1000;
        }
        
        .glow {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(0, 255, 252, 0.05) 0%, transparent 70%);
            pointer-events: none;
            z-index: 999;
        }
    </style>
</head>
<body>
    <div class="scanlines"></div>
    <div class="glow"></div>
    
    <div id="app" class="dashboard">
        <h1>北极星监控中心</h1>
        
        <div class="metrics-grid">
            <div class="metric" v-for="item in metrics" :key="item.name">
                <div class="metric-name">{{ item.name }}</div>
                <div class="metric-value">
                    {{ item.value }}
                    <span class="metric-unit" v-if="item.unit">{{ item.unit }}</span>
                </div>
                <div class="metric-trend" v-if="item.trend">
                    <span :style="{color: item.trend === 'up' ? '#ff5555' : '#55ff55'}">
                        {{ item.trend === 'up' ? '↑' : '↓' }}
                    </span>
                </div>
            </div>
        </div>
        
        <div class="chart-container">
            <div class="chart-title">系统负载趋势</div>
            <div class="chart-wrapper">
                <canvas id="loadChart"></canvas>
            </div>
        </div>
        
        <div class="chart-container">
            <div class="chart-title">网络流量 (MB/s)</div>
            <div class="chart-wrapper">
                <canvas id="networkChart"></canvas>
            </div>
        </div>
        
        <div class="status-alert" id="alert">
            警告：检测到异常活动！
        </div>
    </div>
    
    <script>
        const backendData = [
            {name: "CPU使用率", value: "78", unit: "%", trend: "up"},
            {name: "内存使用", value: "5.2", unit: "GB", trend: "up"},
            {name: "磁盘空间", value: "1.5", unit: "TB", trend: "down"},
            {name: "网络延迟", value: "23", unit: "ms", trend: "down"},
            {name: "活跃连接", value: "1,284", trend: "up"},
            {name: "温度", value: "42", unit: "°C", trend: "up"},
            {name: "正常运行时间", value: "15", unit: "天"},
            {name: "安全威胁", value: "2", trend: "down"}
        ];
        
        new Vue({
            el: '#app',
            data: { metrics: backendData },
            mounted() {
                this.initCharts();
                this.startDataUpdates();
                
                // 随机显示警告
                setInterval(() => {
                    if(Math.random() > 0.8) {
                        document.getElementById('alert').style.display = 'block';
                        setTimeout(() => {
                            document.getElementById('alert').style.display = 'none';
                        }, 3000);
                    }
                }, 10000);
                
                // 窗口大小改变时重新调整图表
                window.addEventListener('resize', () => {
                    if(this.loadChart) this.loadChart.resize();
                    if(this.networkChart) this.networkChart.resize();
                });
            },
            methods: {
                initCharts() {
                    // 系统负载图表
                    const loadCtx = document.getElementById('loadChart').getContext('2d');
                    this.loadChart = new Chart(loadCtx, {
                        type: 'line',
                        data: {
                            labels: Array.from({length: 24}, (_, i) => i + ':00'),
                            datasets: [
                                {
                                    label: 'CPU负载',
                                    data: Array.from({length: 24}, () => Math.floor(Math.random() * 100)),
                                    borderColor: '#00fffc',
                                    backgroundColor: 'rgba(0, 255, 252, 0.1)',
                                    borderWidth: 2,
                                    fill: true
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    left: 10,
                                    right: 10,
                                    top: 10,
                                    bottom: 10
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: 'rgba(0, 255, 252, 0.1)'
                                    },
                                    ticks: {
                                        color: '#00fffc',
                                        padding: 10
                                    }
                                },
                                x: {
                                    grid: {
                                        color: 'rgba(0, 255, 252, 0.1)'
                                    },
                                    ticks: {
                                        color: '#00fffc',
                                        padding: 10
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#00fffc',
                                        padding: 20
                                    }
                                }
                            }
                        }
                    });
                    
                    // 网络流量图表
                    const networkCtx = document.getElementById('networkChart').getContext('2d');
                    this.networkChart = new Chart(networkCtx, {
                        type: 'bar',
                        data: {
                            labels: ['HTTP', 'HTTPS', 'FTP', 'SSH', 'DNS', '其他'],
                            datasets: [
                                {
                                    label: '入站流量',
                                    data: [120, 85, 30, 15, 10, 25],
                                    backgroundColor: 'rgba(0, 255, 252, 0.5)',
                                    borderColor: '#00fffc',
                                    borderWidth: 1
                                },
                                {
                                    label: '出站流量',
                                    data: [90, 70, 20, 10, 8, 15],
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    borderColor: '#ffffff',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    left: 10,
                                    right: 10,
                                    top: 10,
                                    bottom: 10
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: 'rgba(0, 255, 252, 0.1)'
                                    },
                                    ticks: {
                                        color: '#00fffc',
                                        padding: 10
                                    }
                                },
                                x: {
                                    grid: {
                                        color: 'rgba(0, 255, 252, 0.1)'
                                    },
                                    ticks: {
                                        color: '#00fffc',
                                        padding: 10
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#00fffc',
                                        padding: 20
                                    }
                                }
                            }
                        }
                    });
                },
                startDataUpdates() {
                    // 模拟实时数据更新
                    setInterval(() => {
                        // 更新指标数据
                        this.metrics.forEach(metric => {
                            if(metric.name === "CPU使用率") {
                                metric.value = Math.min(100, Math.max(0, parseInt(metric.value) + (Math.random() > 0.5 ? 2 : -2)));
                                metric.trend = Math.random() > 0.5 ? "up" : "down";
                            }
                            if(metric.name === "内存使用") {
                                metric.value = (parseFloat(metric.value) + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1);
                                metric.trend = Math.random() > 0.5 ? "up" : "down";
                            }
                            if(metric.name === "磁盘空间") {
                                metric.value = (parseFloat(metric.value) + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1);
                            }
                            if(metric.name === "网络延迟") {
                                metric.value = Math.max(1, parseInt(metric.value) + (Math.random() > 0.5 ? 1 : -1));
                            }
                            if(metric.name === "活跃连接") {
                                const current = parseInt(metric.value.replace(',', ''));
                                metric.value = (current + (Math.random() > 0.5 ? 10 : -10)).toLocaleString();
                            }
                            if(metric.name === "温度") {
                                metric.value = Math.max(20, Math.min(80, parseInt(metric.value) + (Math.random() > 0.5 ? 1 : -1)));
                            }
                        });
                        
                        // 更新图表数据
                        this.loadChart.data.datasets[0].data = this.loadChart.data.datasets[0].data.map(val => 
                            Math.min(100, Math.max(0, val + (Math.random() > 0.5 ? 5 : -5)))
                        );
                        this.loadChart.update();
                        
                        this.networkChart.data.datasets[0].data = this.networkChart.data.datasets[0].data.map(val => 
                            Math.max(0, val + (Math.random() > 0.5 ? 3 : -3))
                        );
                        this.networkChart.data.datasets[1].data = this.networkChart.data.datasets[1].data.map(val => 
                            Math.max(0, val + (Math.random() > 0.5 ? 2 : -2))
                        );
                        this.networkChart.update();
                    }, 2000);
                }
            }
        });
    </script>
</body>
</html>`

func DashboardHandler(w http.ResponseWriter, r *http.Request) {
	// 设置正确的Content-Type和字符编码
	w.Header().Set("Content-Type", "text/html; charset=UTF-8")
	_, err := w.Write([]byte(dashboardHTML))
	if err != nil {
		http.Error(w, "服务器错误", http.StatusInternalServerError)
		return
	}
}
