<script lang="ts" setup>
import type { AgentType } from '#/types/resource/agent';

import { computed } from 'vue';

import { ElButton, ElCard, ElProgress, ElTag } from 'element-plus';

const props = defineProps<{
  agent: AgentType.Agent;
}>();

const emit = defineEmits<{
  (e: 'detail', agent: AgentType.Agent): void;
  (e: 'console', agent: AgentType.Agent): void;
}>();

// 状态映射
const statusMap = {
  offline: {
    text: '离线',
    class: 'status-offline',
    border: 'border-gray-400',
    tag: 'info',
    color: '#909399',
  },
  healthy: {
    text: '健康',
    class: 'status-running',
    border: 'border-green-500',
    tag: 'success',
    color: '#67c23a',
  },
  warning: {
    text: '告警',
    class: 'status-warning',
    border: 'border-yellow-500',
    tag: 'warning',
    color: '#e6a23c',
  },
  error: {
    text: '异常',
    class: 'status-error',
    border: 'border-red-500',
    tag: 'danger',
    color: '#f56c6c',
  },
  created: {
    text: '待部署',
    class: 'status-created',
    border: 'border-gray-400',
    tag: 'primary',
    color: '#ffffff',
  },
} as const;

// 计算属性
const statusInfo = computed(
  () => statusMap[props.agent.status] || statusMap.created,
);
const statusText = computed(() => statusInfo.value.text);
const statusClass = computed(() => statusInfo.value.class);
const borderClass = computed(() => statusInfo.value.border);
const tagType = computed(() => statusInfo.value.tag);

// 资源监控数据配置
const resourceItems = computed(() => [
  {
    name: 'CPU',
    value: props.agent.cpu || 0, // 确保转换为数字
    unit: '%',
    color: progressColor.value,
  },
  {
    name: '内存',
    value: props.agent.memory || 0, // 确保转换为数字
    unit: '%',
    color: progressColor.value,
  },
  {
    name: '磁盘',
    value: props.agent.disk || 0, // 确保转换为数字
    unit: '%',
    color: progressColor.value,
  },
  {
    name: '网络',
    value: props.agent.network || 0, // 确保转换为数字
    unit: 'Mbps',
    color: progressColor.value,
  },
]);
const progressColor = computed(() => {
  const value = Math.max(props.agent.cpu, props.agent.memory);
  if (value > 80) return statusMap.error.color;
  if (value > 60) return statusMap.warning.color;
  return statusMap.healthy.color;
});
</script>

<template>
  <ElCard
    shadow="hover"
    :class="`border-l-4 ${borderClass}`"
    class="cursor-default transition-all duration-300 hover:shadow-lg"
  >
    <!-- 头部信息 -->
    <div class="mb-2 flex items-start justify-between">
      <div>
        <h3 class="flex items-center text-sm font-medium text-gray-800">
          <span :class="`status-indicator ${statusClass}`"></span>
          {{ agent.name }}
        </h3>
      </div>
      <ElTag :type="tagType" size="small" effect="dark">
        {{ statusText }}
      </ElTag>
    </div>

    <!-- 资源监控 -->
    <div class="grid grid-cols-2 gap-3">
      <div
        v-for="(item, index) in resourceItems"
        :key="index"
        class="rounded border p-2"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-500">{{ item.name }}</span>
          <span class="text-xs font-medium">
            {{ item.value }}{{ item.unit }}
          </span>
        </div>
        <ElProgress
          :percentage="item.value"
          :color="item.color"
          :show-text="false"
          class="mt-1"
        />
        <div class="mt-1 flex justify-between text-xs text-gray-500">
          <span>0{{ item.unit }}</span>
          <span>100{{ item.unit }}</span>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="mt-2 border-t border-gray-100 pt-2">
      <p class="text-sm font-medium text-gray-500">
        IP地址：{{ agent.ip || '-' }}
      </p>
      <p class="mt-1 text-xs text-gray-500">
        最后上报时间：{{ agent.last_report_time || '-' }}
      </p>
    </div>

    <!-- 操作按钮 -->
    <div class="mt-2 flex justify-end gap-2">
      <ElButton
        size="small"
        @click.stop="emit('detail', agent)"
        @mousedown.stop
        @mouseup.stop
      >
        详情
      </ElButton>
      <ElButton
        size="small"
        type="primary"
        plain
        @click.stop="emit('console', agent)"
        @mousedown.stop
        @mouseup.stop
      >
        控制台
      </ElButton>
    </div>
  </ElCard>
</template>

<style lang="scss" scoped>
.status-indicator {
  @apply mr-2 inline-block h-2 w-2 rounded-full;
}

.status-running {
  @apply bg-green-500;
}

.status-warning {
  @apply bg-yellow-500;
}

.status-error {
  @apply bg-red-500;
}

.status-offline {
  @apply bg-gray-400;
}

/* 移除卡片整体的点击效果 */
.el-card {
  transition: box-shadow 0.3s ease;

  &:hover {
    transform: none;
  }
}
</style>
