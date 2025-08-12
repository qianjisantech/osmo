<script lang="ts" setup>
import type { TrafficPoolNamespace } from '#/types/traffic/pool';

import { ref } from 'vue';

import {
  ElButton,
  ElDatePicker,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElTag,
} from 'element-plus';

const props = defineProps({
  modelValue: Boolean,
  selectedPools: {
    type: Array as () => TrafficPoolNamespace.TrafficPool[],
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const form = ref({
  name: '',
  description: '',
  replay_time: '',
  replay_addr: '',
});

const handleSubmit = () => {
  emit('submit', {
    ...form.value,
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
    title="创建回放任务"
    width="800px"
  >
    <ElForm label-width="150px">
      <ElFormItem label="任务名称" required>
        <ElInput v-model="form.name" placeholder="请输入任务名称" />
      </ElFormItem>

      <ElFormItem label="任务描述">
        <ElInput
          v-model="form.description"
          type="textarea"
          :rows="3"
          placeholder="请输入任务描述"
        />
      </ElFormItem>
      <ElFormItem label="回放域名/地址" required>
        <ElInput v-model="form.replay_addr" placeholder="请输入回放域名/地址" />
      </ElFormItem>

      <ElFormItem label="回放时间">
        <ElDatePicker
          v-model="form.replay_time"
          type="datetime"
          placeholder="选择回放时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </ElFormItem>
      <ElFormItem label="选择流量">
        <div>
          <div v-for="pool in selectedPools" :key="pool.id">
            <ElTag :type="getMethodTagType(pool.method)">
              {{ pool.method }}
            </ElTag>
            <span class="traffic-url"> {{ pool.url }}</span>
          </div>
        </div>
      </ElFormItem>
    </ElForm>

    <template #footer>
      <ElButton @click="handleCancel">取消</ElButton>
      <ElButton type="primary" @click="handleSubmit">确认创建</ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.selected-pools {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}

.pool-item {
  padding: 5px 0;
  border-bottom: 1px dashed #eee;
}

.pool-item:last-child {
  border-bottom: none;
}
</style>
