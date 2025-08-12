<script lang="ts" setup>
import type { TaskReplayNameSpace } from '#/types/task/replay';
import type { TrafficPoolNamespace } from '#/types/traffic/pool';

import { computed, reactive, ref, watch } from 'vue';

import {
  ElButton,
  ElDatePicker,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElTag,
} from 'element-plus';

import { useTaskReplayStore } from '#/store/polaris/task/replay';

const props = defineProps({
  modelValue: Boolean,
  selectedPools: {
    type: Array as () => TrafficPoolNamespace.TrafficPool[],
    required: true,
  },
  mode: {
    type: String as () => 'create' | 'view',
    default: 'create',
  },
  taskId: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const taskReplayStore = useTaskReplayStore();

const loading = ref(false);

const form = reactive<TaskReplayNameSpace.TaskReplayDetailForm>({
  id: '',
  name: '',
  description: '',
  replay_time: '',
  replay_addr: '',
  traffics: [],
});

const fetchTaskDetail = async () => {
  console.log('fetchTaskDetail:', props.taskId);
  if (props.mode === 'view' && props.taskId) {
    try {
      loading.value = true;
      await taskReplayStore.detailFunc(props.taskId);

      // 更新表单数据（保持响应性）
      const detail = taskReplayStore.taskReplayDetailResult;
      if (detail) {
        Object.assign(form, {
          id: detail.id || '',
          name: detail.name,
          description: detail.description || '',
          replay_time: detail.replay_time || '',
          replay_addr: detail.replay_addr || '',
          traffics: detail.traffics || [],
        });
      }
    } catch (error) {
      console.error('获取任务详情失败:', error);
      ElMessage.error('获取任务详情失败');
    } finally {
      loading.value = false;
    }
  }
};

// 监听taskId和mode变化
watch(
  () => [props.taskId, props.mode],
  () => {
    console.log('props.taskId,:', props.taskId);
    console.log('props.mode:', props.mode);
    if (props.taskId && props.mode === 'view') {
      fetchTaskDetail();
    }
  },
  { immediate: true },
);

const isViewMode = computed(() => props.mode === 'view');

const handleSubmit = () => {
  emit('submit', {
    ...form,
    need_replay_traffics: props.selectedPools.map((pool) => pool.id),
  });
  emit('update:modelValue', false);
};

const handleCancel = () => {
  emit('update:modelValue', false);
};
const getMethodTagType = (method: string) => {
  const map = {
    GET: '',
    POST: 'success',
    PUT: 'warning',
    DELETE: 'danger',
    PATCH: 'info',
  };
  return map[method] || '';
};
</script>

<template>
  <ElDialog
    :model-value="modelValue"
    @update:model-value="handleCancel"
    :title="isViewMode ? '回放任务详情' : '创建回放任务'"
    width="800px"
  >
    <div v-loading="loading">
      <ElForm label-width="120px">
        <ElFormItem label="任务名称" required>
          <ElInput
            v-model="form.name"
            placeholder="请输入任务名称"
            :disabled="isViewMode"
          />
        </ElFormItem>

        <ElFormItem label="任务描述">
          <ElInput
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入任务描述"
            :disabled="isViewMode"
          />
        </ElFormItem>

        <ElFormItem label="回放地址" required>
          <ElInput
            v-model="form.replay_addr"
            placeholder="请输入回放域名/地址"
            :disabled="isViewMode"
          />
        </ElFormItem>

        <ElFormItem label="回放时间">
          <ElDatePicker
            v-model="form.replay_time"
            type="datetime"
            placeholder="选择回放时间"
            value-format="YYYY-MM-DD HH:mm:ss"
            :disabled="isViewMode"
          />
        </ElFormItem>

        <ElFormItem label="流量">
          <div>
            <div v-for="traffic in form.traffics" :key="traffic.id">
              <ElTag :type="getMethodTagType(traffic.method)">
                {{ traffic.method }}
              </ElTag>
              <ElTag type="danger">
                {{ form.replay_addr }}
              </ElTag>
              <span class="traffic-url">{{ traffic.url }}</span>
            </div>
          </div>
        </ElFormItem>
      </ElForm>
    </div>

    <template #footer>
      <ElButton @click="handleCancel">
        {{ isViewMode ? '关闭' : '取消' }}
      </ElButton>
      <ElButton v-if="!isViewMode" type="primary" @click="handleSubmit">
        确认创建
      </ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>

</style>
