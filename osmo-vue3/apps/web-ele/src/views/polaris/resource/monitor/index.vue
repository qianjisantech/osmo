<template>
  <div class="monitor-dashboard sci-fi">
    <!-- 标题区域 -->
    <div class="dashboard-header">
      <div class="title-container">
        <h1 class="dashboard-title">北极星监控中心</h1>
        <div class="title-decoration"></div>
      </div>

      <!-- 监控中心切换 -->
      <div class="monitor-switcher">
        <button class="switch-btn" @click="showMonitorList = !showMonitorList">
          {{ currentMonitor }}
          <span class="arrow">▼</span>
        </button>

        <transition name="fade">
          <div v-if="showMonitorList" class="monitor-list">
            <div
              v-for="monitor in monitors"
              :key="monitor.value"
              @click="switchMonitor(monitor.value)"
              :class="{active: currentMonitor === monitor.label}"
            >
              {{ monitor.label }}
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 主监控区域 -->
    <div class="monitor-grid">
      <!-- 左上角：系统状态 -->
      <div class="monitor-card system-status" :class="{'alert': systemAlert}">
        <div class="card-header">
          <h3>系统状态</h3>
          <div class="status-indicator" :class="systemStatus"></div>
        </div>
        <div class="card-body">
          <div class="status-grid">
            <div v-for="(item, index) in systemMetrics" :key="index" class="status-item">
              <div class="metric-label">{{ item.label }}</div>
              <div class="metric-value">{{ item.value }}<span class="metric-unit">{{ item.unit }}</span></div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{width: item.percentage + '%'}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右上角：实时数据流 -->
      <div class="monitor-card data-stream">
        <div class="card-header">
          <h3>量子数据流</h3>
          <div class="stream-controls">
            <button @click="toggleStream" class="control-btn">
              {{ streamActive ? '暂停' : '继续' }}
            </button>
          </div>
        </div>
        <div class="card-body">
          <div ref="streamChart" class="stream-chart"></div>
        </div>
      </div>

      <!-- 左下角：警报面板 -->
      <div class="monitor-card alert-panel">
        <div class="card-header">
          <h3>威胁警报</h3>
          <div class="alert-count">{{ activeAlertsCount }}</div>
        </div>
        <div class="card-body">
          <div class="alert-list">
            <transition-group name="alert-item">
              <div v-for="alert in alerts" :key="alert.id" class="alert-item" :class="alert.level">
                <div class="alert-time">{{ formatTime(alert.time) }}</div>
                <div class="alert-message">{{ alert.message }}</div>
                <div class="alert-level">{{ alert.level === 'critical' ? '紧急' : alert.level === 'warning' ? '警告' : '信息' }}</div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>

      <!-- 右下角：资源分布 -->
      <div class="monitor-card resource-distribution">
        <div class="card-header">
          <h3>能量分布</h3>
        </div>
        <div class="card-body">
          <div ref="resourceChart" class="resource-chart"></div>
        </div>
      </div>

      <!-- 中央：主仪表盘 -->
      <div class="main-gauge">
        <div ref="mainGauge" class="gauge-container"></div>
        <div class="gauge-label">系统负载</div>
      </div>
    </div>

    <!-- 底部状态栏 -->
    <div class="status-bar">
      <div class="status-item">
        <span class="status-label">最后更新:</span>
        <span class="status-value">{{ lastUpdate }}</span>
      </div>
      <div class="status-item">
        <span class="status-label">运行时间:</span>
        <span class="status-value">{{ systemUptime }}</span>
      </div>
      <div class="status-item">
        <span class="status-label">活跃警报:</span>
        <span class="status-value">{{ activeAlertsCount }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, reactive, computed } from 'vue';
import * as echarts from 'echarts';
import { format } from 'date-fns';

interface SystemMetric {
  label: string;
  value: number | string;
  unit: string;
  percentage: number;
}

interface Alert {
  id: number;
  time: Date;
  message: string;
  level: 'critical' | 'warning' | 'info';
}

interface Monitor {
  value: string;
  label: string;
}

export default defineComponent({
  name: 'MonitorDashboard',
  setup() {
    // 图表引用
    const streamChart = ref<HTMLElement | null>(null);
    const resourceChart = ref<HTMLElement | null>(null);
    const mainGauge = ref<HTMLElement | null>(null);

    // 图表实例
    let streamChartInstance: echarts.ECharts | null = null;
    let resourceChartInstance: echarts.ECharts | null = null;
    let mainGaugeInstance: echarts.ECharts | null = null;

    // 数据状态
    const systemAlert = ref(false);
    const systemStatus = ref<'normal' | 'warning' | 'danger'>('normal');
    const streamActive = ref(true);
    const lastUpdate = ref(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    const systemUptime = ref('0天 12:34:56');
    const showMonitorList = ref(false);
    const currentMonitor = ref('云仓国内生产集群');

    // 监控中心列表
    const monitors: Monitor[] = [
      { value: 'main', label: '云仓国内生产集群' },
      { value: 'sector1', label: '云仓国内东南亚集群' },
      { value: 'sector2', label: '第二扇区' },
      { value: 'sector3', label: '第三扇区' },
      { value: 'engineering', label: '工程区域' },
      { value: 'research', label: '研究区域' }
    ];

    // 系统指标数据
    const systemMetrics = reactive<SystemMetric[]>([
      { label: '量子处理器', value: 45, unit: '%', percentage: 45 },
      { label: '能量储备', value: 78, unit: '%', percentage: 78 },
      { label: '存储矩阵', value: 32, unit: '%', percentage: 32 },
      { label: '网络带宽', value: '1.2', unit: 'Tbps', percentage: 60 },
      { label: '核心温度', value: 56, unit: '°K', percentage: 56 },
      { label: '护盾强度', value: 85, unit: '%', percentage: 85 }
    ]);

    // 警报数据
    const alerts = reactive<Alert[]>([
      { id: 1, time: new Date(Date.now() - 1000 * 60 * 5), message: '量子处理器过热', level: 'warning' },
      { id: 2, time: new Date(Date.now() - 1000 * 60 * 15), message: '能量储备不足', level: 'critical' },
      { id: 3, time: new Date(Date.now() - 1000 * 60 * 30), message: '检测到网络入侵', level: 'warning' },
      { id: 4, time: new Date(Date.now() - 1000 * 60 * 60), message: '系统自检完成', level: 'info' }
    ]);

    // 计算属性
    const activeAlertsCount = computed(() => {
      return alerts.filter(a => a.level !== 'info').length;
    });

    // 方法
    const toggleStream = () => {
      streamActive.value = !streamActive.value;
      if (streamActive.value && streamChartInstance) {
        streamChartInstance.resize();
      }
    };

    const formatTime = (date: Date) => {
      return format(date, 'HH:mm:ss');
    };

    const switchMonitor = (monitorValue: string) => {
      const monitor = monitors.find(m => m.value === monitorValue);
      if (monitor) {
        currentMonitor.value = monitor.label;
        showMonitorList.value = false;
        refreshData();
      }
    };

    const refreshData = () => {
      // 模拟数据刷新
      systemMetrics.forEach(metric => {
        const randomChange = Math.floor((Math.random() - 0.4) * 10);
        let newValue: number | string;

        if (metric.label === '网络带宽') {
          const current = parseFloat(metric.value as string);
          newValue = Math.max(0.5, Math.min(2.5, current + (Math.random() - 0.5) * 0.3)).toFixed(1);
        } else {
          const current = metric.value as number;
          newValue = Math.max(0, Math.min(100, current + randomChange));
        }

        metric.value = newValue;
        metric.percentage = typeof newValue === 'string' ? parseFloat(newValue) / 2.5 * 100 : newValue;
      });

      // 随机添加新警报
      if (Math.random() > 0.7) {
        const alertTypes = [
          { message: `检测到${currentMonitor.value}异常能量波动`, level: 'warning' },
          { message: `${currentMonitor.value}系统过载`, level: 'critical' },
          { message: `${currentMonitor.value}安全协议激活`, level: 'info' }
        ];

        const newAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        alerts.unshift({
          id: Date.now(),
          time: new Date(),
          message: newAlert.message,
          level: newAlert.level
        });

        // 保持警报列表不超过10条
        if (alerts.length > 10) {
          alerts.pop();
        }
      }

      // 更新图表
      if (mainGaugeInstance) {
        const avgLoad = systemMetrics
          .filter(m => m.label !== '网络带宽' && m.label !== '核心温度')
          .reduce((sum, m) => sum + (typeof m.value === 'string' ? parseFloat(m.value) : m.value), 0) / 4;

        mainGaugeInstance.setOption({
          series: [{
            data: [{
              value: Math.round(avgLoad)
            }]
          }]
        });
      }

      lastUpdate.value = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    };

    const generateRandomData = (length: number) => {
      return Array.from({ length }, (_, i) => ({
        value: Math.round(Math.random() * 100),
        time: new Date(Date.now() - (length - i) * 1000)
      }));
    };

    // 初始化流数据图表
    const initStreamChart = () => {
      if (!streamChart.value) return;

      streamChartInstance = echarts.init(streamChart.value);
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            const date = new Date(params[0].value[0]);
            return `${format(date, 'HH:mm:ss')}<br/>值: ${params[0].value[1]}`;
          },
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: '#00ffff',
          textStyle: {
            color: '#ffffff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.1)'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#00ffff'
            }
          },
          axisLabel: {
            color: '#00ffff'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.1)'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#00ffff'
            }
          },
          axisLabel: {
            color: '#00ffff'
          }
        },
        series: [{
          name: '量子数据流',
          type: 'line',
          showSymbol: false,
          data: generateRandomData(50).map(item => [item.time, item.value]),
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#00ffcc' },
              { offset: 1, color: '#0066ff' }
            ])
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 255, 204, 0.3)' },
              { offset: 1, color: 'rgba(0, 102, 255, 0.1)' }
            ])
          },
          animation: streamActive.value
        }]
      };

      streamChartInstance.setOption(option);
    };

    // 初始化资源分布图表
    const initResourceChart = () => {
      if (!resourceChart.value) return;

      resourceChartInstance = echarts.init(resourceChart.value);
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: '#00ffff',
          textStyle: {
            color: '#ffffff'
          }
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: {
            color: '#00ffff'
          },
          data: ['量子计算', '能量存储', '网络节点', '数据库', '其他']
        },
        series: [
          {
            name: '能量分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#0a1a2b',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center',
              color: '#ffffff'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold',
                color: '#ffffff'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 35, name: '量子计算', itemStyle: { color: '#00ffcc' } },
              { value: 25, name: '能量存储', itemStyle: { color: '#0066ff' } },
              { value: 20, name: '网络节点', itemStyle: { color: '#ff00aa' } },
              { value: 15, name: '数据库', itemStyle: { color: '#ffcc00' } },
              { value: 5, name: '其他', itemStyle: { color: '#aa00ff' } }
            ],
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx: number) {
              return Math.random() * 200;
            }
          }
        ]
      };

      resourceChartInstance.setOption(option);
    };

    // 初始化主仪表盘
    const initMainGauge = () => {
      if (!mainGauge.value) return;

      mainGaugeInstance = echarts.init(mainGauge.value);
      const option = {
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#00ffcc' },
                    { offset: 0.5, color: '#0066ff' },
                    { offset: 1, color: '#ff00aa' }
                  ]
                }
              }
            },
            axisLine: {
              lineStyle: {
                width: 20,
                color: [[1, 'rgba(0, 255, 255, 0.1)']]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              color: '#00ffff'
            },
            detail: {
              width: 50,
              height: 14,
              fontSize: 24,
              color: '#00ffff',
              backgroundColor: 'transparent',
              borderRadius: 3,
              formatter: '{value}%',
              valueAnimation: true,
              offsetCenter: [0, 0]
            },
            data: [
              {
                value: 65
              }
            ]
          }
        ]
      };

      mainGaugeInstance.setOption(option);
    };

    // 更新流数据
    const updateStreamData = () => {
      if (!streamActive.value || !streamChartInstance) return;

      const now = new Date();
      const data = generateRandomData(1)[0];

      const option = streamChartInstance.getOption() as any;
      const seriesData = option.series[0].data;

      // 移除第一个数据点并添加新数据点
      seriesData.shift();
      seriesData.push([now, data.value]);

      streamChartInstance.setOption({
        series: [{
          data: seriesData
        }]
      });
    };

    // 随机更新系统指标
    const updateSystemMetrics = () => {
      systemMetrics.forEach(metric => {
        if (metric.label === '网络带宽') {
          // 网络指标特殊处理
          const current = parseFloat(metric.value as string);
          const change = (Math.random() - 0.5) * 0.3;
          let newValue = current + change;
          newValue = Math.max(0.5, Math.min(2.5, newValue));
          metric.value = newValue.toFixed(1);
          metric.percentage = (newValue / 2.5) * 100;
        } else {
          // 其他指标
          const current = metric.value as number;
          const change = Math.floor((Math.random() - 0.4) * 10);
          let newValue = current + change;
          newValue = Math.max(0, Math.min(100, newValue));
          metric.value = newValue;
          metric.percentage = newValue;
        }
      });

      // 检查系统状态
      const criticalMetrics = systemMetrics.filter(m =>
        m.percentage > 90 || (m.label === '核心温度' && m.percentage > 80)
      );

      if (criticalMetrics.length > 1) {
        systemStatus.value = 'danger';
        systemAlert.value = true;

        // 添加警报
        if (Math.random() > 0.7 && alerts.length < 10) {
          const messages = [
            `${criticalMetrics[0].label}达到临界水平`,
            `检测到系统过载`,
            `需要立即处理`
          ];

          alerts.unshift({
            id: Date.now(),
            time: new Date(),
            message: messages[Math.floor(Math.random() * messages.length)],
            level: 'critical'
          });
        }
      } else if (criticalMetrics.length > 0 || systemMetrics.some(m => m.percentage > 80)) {
        systemStatus.value = 'warning';
        systemAlert.value = false;
      } else {
        systemStatus.value = 'normal';
        systemAlert.value = false;
      }

      // 更新主仪表盘
      if (mainGaugeInstance) {
        const avgLoad = systemMetrics
          .filter(m => m.label !== '网络带宽' && m.label !== '核心温度')
          .reduce((sum, m) => sum + (typeof m.value === 'string' ? parseFloat(m.value) : m.value), 0) / 4;

        mainGaugeInstance.setOption({
          series: [{
            data: [{
              value: Math.round(avgLoad)
            }]
          }]
        });
      }
    };

    // 更新时间
    const updateTime = () => {
      lastUpdate.value = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      // 模拟系统运行时间更新
      const uptime = systemUptime.value.split(' ');
      const days = parseInt(uptime[0]);
      const timeParts = uptime[1].split(':');
      let hours = parseInt(timeParts[0]);
      let minutes = parseInt(timeParts[1]);
      let seconds = parseInt(timeParts[2]);

      seconds += 1;
      if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
      }
      if (minutes >= 60) {
        minutes = 0;
        hours += 1;
      }
      if (hours >= 24) {
        hours = 0;
        uptime[0] = (days + 1).toString();
      }

      systemUptime.value = `${uptime[0]}天 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // 初始化
    onMounted(() => {
      initStreamChart();
      initResourceChart();
      initMainGauge();

      // 设置定时器
      const streamInterval = setInterval(updateStreamData, 1000);
      const metricsInterval = setInterval(updateSystemMetrics, 3000);
      const timeInterval = setInterval(updateTime, 1000);

      // 窗口大小变化时重新调整图表大小
      const handleResize = () => {
        streamChartInstance?.resize();
        resourceChartInstance?.resize();
        mainGaugeInstance?.resize();
      };
      window.addEventListener('resize', handleResize);

      // 组件卸载前清理
      onBeforeUnmount(() => {
        clearInterval(streamInterval);
        clearInterval(metricsInterval);
        clearInterval(timeInterval);
        window.removeEventListener('resize', handleResize);

        streamChartInstance?.dispose();
        resourceChartInstance?.dispose();
        mainGaugeInstance?.dispose();
      });
    });

    return {
      streamChart,
      resourceChart,
      mainGauge,
      systemAlert,
      systemStatus,
      systemMetrics,
      alerts,
      streamActive,
      lastUpdate,
      systemUptime,
      activeAlertsCount,
      monitors,
      currentMonitor,
      showMonitorList,
      toggleStream,
      formatTime,
      switchMonitor
    };
  }
});
</script>

<style scoped>
/* 科幻风格基础样式 */
.monitor-dashboard.sci-fi {
  --bg-color: #0a1a2b;
  --card-bg: rgba(16, 42, 67, 0.8);
  --text-color: #00ffff;
  --primary-color: #00ffff;
  --secondary-color: #0066ff;
  --border-color: rgba(0, 255, 255, 0.2);
  --shadow-color: rgba(0, 102, 255, 0.3);
  --success-color: #00ffcc;
  --warning-color: #ffcc00;
  --danger-color: #ff0000;
  --info-color: #aa00ff;
}

.monitor-dashboard {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  font-family: 'Courier New', monospace;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 30px rgba(0, 102, 255, 0.3);
  display: flex;
  flex-direction: column;
}

/* 标题区域 */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: linear-gradient(90deg, rgba(0, 20, 40, 0.8), rgba(0, 102, 255, 0.3));
  box-shadow: 0 2px 10px var(--shadow-color);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.dashboard-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
}

.title-container {
  position: relative;
}

.dashboard-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  letter-spacing: 2px;
}

.title-decoration {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  opacity: 0.7;
}

/* 监控中心切换器 */
.monitor-switcher {
  position: relative;
}

.switch-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.switch-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.arrow {
  font-size: 0.7rem;
  transition: transform 0.3s;
}

.monitor-switcher:hover .arrow {
  transform: rotate(180deg);
}

.monitor-list {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 20, 40, 0.9);
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  width: 180px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
  overflow: hidden;
}

.monitor-list div {
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}

.monitor-list div:last-child {
  border-bottom: none;
}

.monitor-list div:hover {
  background: rgba(0, 255, 255, 0.1);
  color: white;
}

.monitor-list div.active {
  background: rgba(0, 255, 255, 0.2);
  color: var(--primary-color);
  font-weight: bold;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 主监控区域 */
.monitor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
  padding: 15px;
  flex: 1;
  min-height: 0;
  position: relative;
}

/* 监控卡片通用样式 */
.monitor-card {
  background: var(--card-bg);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow-color);
  border: 1px solid var(--border-color);
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.monitor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
}

.monitor-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px var(--shadow-color);
}

.card-header {
  padding: 12px 15px;
  background: rgba(0, 20, 40, 0.5);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary-color);
  letter-spacing: 1px;
}

.card-body {
  padding: 15px;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* 系统状态卡片 */
.system-status {
  position: relative;
}

.system-status.alert::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 0, 0, 0.05);
  animation: pulse 2s infinite;
  pointer-events: none;
  border-radius: 5px;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.3); }
  70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 8px;
}

.status-indicator.normal {
  background: var(--success-color);
  box-shadow: 0 0 8px var(--success-color);
}

.status-indicator.warning {
  background: var(--warning-color);
  box-shadow: 0 0 8px var(--warning-color);
}

.status-indicator.danger {
  background: var(--danger-color);
  box-shadow: 0 0 8px var(--danger-color);
  animation: blink 1s infinite;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  height: 100%;
}

.status-item {
  background: rgba(0, 150, 255, 0.05);
  padding: 10px;
  border-radius: 4px;
  border-left: 2px solid var(--primary-color);
}

.metric-label {
  font-size: 0.8rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 5px;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.metric-unit {
  font-size: 0.7rem;
  color: var(--text-color);
  opacity: 0.6;
  margin-left: 3px;
}

.progress-bar {
  height: 4px;
  background: rgba(0, 150, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--success-color), var(--primary-color));
  border-radius: 2px;
  transition: width 0.5s ease;
}

/* 实时数据流卡片 */
.stream-chart {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.stream-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  background: rgba(0, 150, 255, 0.1);
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 4px 10px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.control-btn:hover {
  background: rgba(0, 150, 255, 0.2);
}

/* 警报面板 */
.alert-count {
  background: rgba(255, 0, 0, 0.1);
  color: var(--danger-color);
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
}

.alert-list {
  height: 100%;
  overflow-y: auto;
  padding-right: 5px;
}

.alert-item {
  background: rgba(0, 150, 255, 0.05);
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.alert-item.critical {
  border-left: 3px solid var(--danger-color);
  background: rgba(255, 0, 0, 0.05);
}

.alert-item.warning {
  border-left: 3px solid var(--warning-color);
  background: rgba(255, 204, 0, 0.05);
}

.alert-item.info {
  border-left: 3px solid var(--primary-color);
  background: rgba(0, 150, 255, 0.05);
}

.alert-time {
  font-size: 0.7rem;
  color: var(--text-color);
  opacity: 0.6;
  width: 50px;
}

.alert-message {
  flex: 1;
  font-size: 0.85rem;
  padding: 0 10px;
}

.alert-level {
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
}

.alert-level.critical {
  background: rgba(255, 0, 0, 0.1);
  color: var(--danger-color);
}

.alert-level.warning {
  background: rgba(255, 204, 0, 0.1);
  color: var(--warning-color);
}

.alert-level.info {
  background: rgba(0, 150, 255, 0.1);
  color: var(--primary-color);
}

.alert-item-enter-active,
.alert-item-leave-active {
  transition: all 0.5s ease;
}

.alert-item-enter-from,
.alert-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 资源分布卡片 */
.resource-chart {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

/* 主仪表盘 */
.main-gauge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  z-index: 2;
}

.gauge-container {
  width: 100%;
  height: 100%;
}

.gauge-label {
  text-align: center;
  margin-top: 10px;
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

/* 底部状态栏 */
.status-bar {
  background: rgba(0, 20, 40, 0.7);
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.status-item {
  display: flex;
  align-items: center;
}

.status-label {
  color: var(--text-color);
  opacity: 0.7;
  margin-right: 5px;
  font-size: 0.8rem;
}

.status-value {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--primary-color);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 255, 0.5);
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .monitor-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    height: auto;
  }

  .main-gauge {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    margin: 15px auto;
    grid-column: 1 / -1;
  }
}
</style>
