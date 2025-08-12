<script lang="ts" setup>
import type { TaskRecordNameSpace } from '#/types/task/record';

import { computed, ref, watch } from 'vue';

import {
  ElButton,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElInput,
  ElMessage,
  ElProgress,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import { useAgentStore } from '#/store';

const props = defineProps({
  modelValue: Boolean,
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'restart',
  'offline',
  'console',
]);

const agentStore = useAgentStore();
const loading = ref(false);
const agentDetail = computed(() => agentStore.agentDetailV2Result);
// 状态映射
const statusOptions = [
  { value: 'offline', label: '离线', type: 'info' },
  { value: 'healthy', label: '健康', type: 'success' },
  { value: 'warning', label: '告警', type: 'warning' },
  { value: 'error', label: '异常', type: 'error' },
  { value: 'created', label: '待部署', type: 'primary' },
];

const getStatusText = (status: string) =>
  statusOptions.find((item) => item.value === status)?.label || '待部署';

const getStatusTagType = (status: string) =>
  statusOptions.find((item) => item.value === status)?.type || 'primary';

// 加载详情数据
const loadDetail = async () => {
  try {
    loading.value = true;
    await agentStore.detailV2(props.id);
  } catch {
    ElMessage.error('加载详情数据出错');
  } finally {
    loading.value = false;
  }
};

// 初始化加载
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) loadDetail();
  },
  { immediate: true },
);

const closeDialog = () => {
  emit('update:modelValue', false);
};

const handleSubmit = () => {};

const handleOffline = () => {};
const getTaskStatusText = (status: string): string => {
  const map: Record<'default' | TaskRecordNameSpace.TaskStatus, string> = {
    pending: '待定',
    running: '运行中',
    success: '成功',
    failed: '失败',
    canceled: '已取消',
    timeout: '超时',
    skipped: '跳过',
    aborted: '中止',
    waiting: '等待',
    paused: '暂停',
    default: '未知状态',
  };

  return map[status as TaskRecordNameSpace.TaskStatus] ?? map.default;
};
const getTaskStatusType = (status: string): TaskRecordNameSpace.ElTagType => {
  const typeMap: Record<string, TaskRecordNameSpace.ElTagType> = {
    running: 'success',
    success: 'success',
    failed: 'danger',
    timeout: 'danger',
    aborted: 'danger',
    canceled: 'warning',
    waiting: 'warning',
    paused: 'warning',
    pending: 'info',
    skipped: 'info',
  };
  return typeMap[status as TaskRecordNameSpace.TaskStatus] || 'info';
};
</script>

<template>
  <ElDialog
    :model-value="modelValue"
    @update:model-value="closeDialog"
    title="执行机详情"
    width="1000px"
    :close-on-click-modal="false"
  >
    <div>
      <!-- 基本信息 -->
      <ElDescriptions :column="2" border>
        <ElDescriptionsItem label="主机名">
          {{ agentDetail.name }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="IP地址">
          {{ agentDetail.ip || '-' }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="状态">
          <ElTag :type="getStatusTagType(agentDetail.status)" size="small">
            {{ getStatusText(agentDetail.status) }}
          </ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="最后上报时间">
          {{ agentDetail.last_report_time || '-' }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="描述">
          {{ agentDetail.description || '-' }}
        </ElDescriptionsItem>
      </ElDescriptions>

      <!-- 资源监控 -->
      <h4 class="my-4 text-lg font-medium">资源监控</h4>
      <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="rounded border p-4">
          <h5 class="mb-2 text-sm text-gray-500">CPU使用率</h5>
          <ElProgress
            :percentage="Number(agentDetail.cpu) || 0"
            :color="
              Number(agentDetail.cpu) > 80
                ? '#f56c6c'
                : Number(agentDetail.cpu) > 60
                  ? '#e6a23c'
                  : '#67c23a'
            "
          />
          <div class="mt-1 text-right">{{ agentDetail.cpu || 0 }}%</div>
        </div>
        <div class="rounded border p-4">
          <h5 class="mb-2 text-sm text-gray-500">内存使用</h5>
          <ElProgress
            :percentage="agentDetail.memory || 0"
            :color="
              agentDetail.memory > 80
                ? '#f56c6c'
                : agentDetail.memory > 60
                  ? '#e6a23c'
                  : '#67c23a'
            "
          />
          <div class="mt-1 text-right">{{ agentDetail.memory || 0 }}%</div>
        </div>
        <div class="rounded border p-4">
          <h5 class="mb-2 text-sm text-gray-500">磁盘空间</h5>
          <ElProgress :percentage="75" />
          <div class="mt-1 text-right">75%</div>
        </div>
        <div class="rounded border p-4">
          <h5 class="mb-2 text-sm text-gray-500">网络流量</h5>
          <ElProgress :percentage="45" />
          <div class="mt-1 text-right">45 Mbps</div>
        </div>
        <div>
          <h5 class="mb-2 text-sm text-gray-500">识别码</h5>
          <ElInput
            type="textarea"
            v-model="agentDetail.identification_code"
            placeholder="执行机描述信息"
            :disabled="true"
            clearable
            :rows="7"
          />
        </div>
      </div>

      <!-- 任务列表 -->
      <h4 class="my-4 text-lg font-medium">当前任务</h4>
      <ElTable :data="agentDetail.tasks" stripe>
        <ElTableColumn prop="id" label="任务ID" />
        <ElTableColumn prop="name" label="任务名称" />
        <ElTableColumn label="任务类型">
          <template #default="{ row }">
            <ElTag type="primary" size="small" class="status-tag">
              {{ row.type === 'record' ? '录制任务' : '回放任务' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="任务策略">
          <template #default="{ row }">
            <ElTag type="primary" size="small" class="status-tag">
              {{ row.strategy_name }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="status" label="状态" width="120">
          <template #default="{ row }">
            <ElTag
              :type="getTaskStatusType(row.status)"
              size="small"
              class="status-tag"
            >
              {{ getTaskStatusText(row.status) }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="开始时间">
          <template #default="{ row }">
            {{ row.start_time || '-' }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="结束时间">
          <template #default="{ row }">
            {{ row.end_time || '-' }}
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <template #footer>
      <ElButton @click="$emit('update:modelValue', false)"> 关闭 </ElButton>

      <template v-if="agentDetail">
        <ElButton type="danger" @click="handleOffline">强制下线</ElButton>
      </template>

      <ElButton v-else type="primary" @click="handleSubmit" :loading="loading">
        保存
      </ElButton>
    </template>
  </ElDialog>
</template>
