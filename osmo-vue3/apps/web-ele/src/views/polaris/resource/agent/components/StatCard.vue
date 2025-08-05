<script lang="ts" setup>
import { computed } from 'vue';

import { ElCard } from 'element-plus';

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [Number, String, null], default: null }, // 修改为可选
  icon: { type: String, required: true },
  color: { type: String, default: 'blue' },
  percentage: { type: Number, default: null },
});

// 根据标题和值计算数值颜色
const valueColor = computed(() => {
  const title = props.title.toLowerCase();

  // 如果是健康状态相关
  if (title.includes('健康')) return 'text-green-500';
  if (title.includes('异常')) return 'text-red-500';
  if (title.includes('告警')) return 'text-yellow-500';
  if (title.includes('离线')) return 'text-gray-500';
  // 默认返回传入的颜色
  return `text-${props.color}-500`;
});
</script>

<template>
  <ElCard
    shadow="hover"
    :class="`border-l-4 border-${color}-500 h-full text-center`"
    body-class="flex flex-col justify-between h-full"
  >
    <!-- 主要内容区域 -->
    <div class="flex flex-1 flex-col items-center justify-center p-4">
      <!-- 标题 -->
      <p class="mb-2 text-sm text-gray-500">{{ title ?? '-' }}</p>

      <!-- 数值 - 应用动态颜色 -->
      <p class="text-2xl font-bold" :class="[valueColor]">
        {{ value ?? '-' }}
      </p>
    </div>
  </ElCard>
</template>

<style scoped>
/* 确保卡片内容垂直居中 */
:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
}
</style>
