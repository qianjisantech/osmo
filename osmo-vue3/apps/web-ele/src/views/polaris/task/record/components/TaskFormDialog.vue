<script lang="ts" setup>
import type { TaskRecordNameSpace } from '#/types/task/record';

import {computed, reactive, ref, watch} from 'vue';

import {
  ElButton,
  ElDatePicker,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElOption,
  ElSelect,
  ElTag,
} from 'element-plus';
import {useAgentStore} from "#/store";

const props = defineProps({
  visible: Boolean,
  formData: {
    type: Object as () => TaskRecordNameSpace.TaskRecordCreateForm,
    required: true,
  },
  strategies: {
    type: Array<TaskRecordNameSpace.RecordStrategy>,
    default: () => [],
  },
});
const agentStore = useAgentStore();
const emit = defineEmits(['update:visible', 'submit', 'update:form-data']);
const form = computed({
  get: () => props.formData,
  set: (value) => emit('update:form-data', value),
});
watch(
  () => props.formData,
  (newVal) => {
    Object.assign(form.value, newVal);
  },
  { deep: true, immediate: true },
);
const agentFocusParams = reactive({
  keyword: '',
  status: ["healthy",],
  execute_status: ["idle","busy"],
});
const agentListLoading = ref(false); // 单独控制执行机列表加载状态
const hasLoadedAgentList = ref(false); // 标记是否已加载过执行机列表
// 加载执行机列表
const loadAgentList = async () => {
  try {
    await agentStore.selectOptionsFunc(agentFocusParams);
  } catch (error) {
    ElMessage.error('加载执行机列表失败');
    console.error('加载执行机列表错误:', error);
  }
};
const agentSelectOptions = computed(() => agentStore.agentSelectOptions || []);
// Form validation rules
const rules = {
  name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  strategy: [
    { required: true, message: '请选择任务策略', trigger: 'change' },
  ],
  agent: [{ required: true, message: '请选择执行机', trigger: 'change' }],
  listen_port: [
    { required: true, message: '请输入监听端口', trigger: 'blur' },
    {
      pattern: /^[1-9]\d{0,4}$/,
      message: '端口号应为1-65535',
      trigger: 'blur',
    },
  ],
};
const handleSelectFocus = async () => {
  if (!hasLoadedAgentList.value) {
    await loadAgentList();
  }
};
// Loading states
const loadingStates = reactive({
  strategies: false,
  rules: false,
  agents: false,
});

// Search methods
const searchStrategies = async (query = '') => {
  loadingStates.strategies = true;
  await new Promise((resolve) => setTimeout(resolve, 300));
  loadingStates.strategies = false;
  return props.strategies.filter(
    (item) => item.name.includes(query) || item.value.includes(query),
  );
};

const handleStrategyChange = (value: TaskRecordNameSpace.RecordStrategy) => {
  form.value = {
    ...form.value,
    strategy: value,
  };
  console.log('form', form.value);
};

const handleAgentChange = (value: TaskRecordNameSpace.ResourceAgent) => {
  form.value = {
    ...form.value,
    agent: value,
  };
  console.log('form', form.value);
};

const submitForm = async () => {
  try {
    const port = Number.parseInt(form.value.listen_port);
    if (port < 1 || port > 65_535) {
      ElMessage.error('端口号范围应为1-65535');
      return;
    }

    emit('submit', form.value);
    ElMessage.success('任务创建成功');
    closeDialog();
  } catch (error) {
    ElMessage.error(`任务创建失败: ${error.message}`);
  }
};

const closeDialog = () => {
  emit('update:visible', false);
};
</script>
<template>
  <ElDialog
    :model-value="visible"
    @update:model-value="closeDialog"
    title="新增录制任务"
    width="680px"
    :close-on-click-modal="false"
    class="task-form-dialog"
  >
    <ElForm
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="top"
      class="form-container"
    >
      <div class="form-grid">
        <!-- 第一行 -->
        <ElFormItem label="任务名称" prop="name" class="form-item-full">
          <ElInput v-model="form.name" placeholder="请输入任务名称" clearable />
        </ElFormItem>
        <ElFormItem label="监控中心" prop="agent" class="form-item">
          <ElSelect
            value-key="id"
            v-model="form.agent"
            @change="handleAgentChange"

            remote
            placeholder="请选择监控中心"
            clearable
            filterable
            :loading="agentListLoading"
            @focus="handleSelectFocus"
            @visible-change="handleSelectFocus"
            class="select-input"
          >
            <ElOption
              v-for="item in agentSelectOptions"
              :key="item.id"
              :label="item.key"
              :value="item"
            >
              <div class="option-content">
                <div class="option-header">
                  <span class="option-label">{{ item.key }}</span>
                  <div class="option-meta">{{ item.value }}</div>
                  <ElTag
                    :type="
                      item.execute_status === 'idle' ? 'success' : 'warning'
                    "
                    size="small"
                    class="option-tag"
                  >
                    {{ item.execute_status === 'idle' ? '空闲' : '忙碌' }}
                  </ElTag>
                </div>

              </div>
            </ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="执行机" prop="agent" class="form-item">
          <ElSelect
            value-key="id"
            v-model="form.agent"
            @change="handleAgentChange"

            remote
            placeholder="请选择执行机"
            clearable
            filterable
            :loading="agentListLoading"
            @focus="handleSelectFocus"
            @visible-change="handleSelectFocus"
            class="select-input"
          >
            <ElOption
              v-for="item in agentSelectOptions"
              :key="item.id"
              :label="item.key"
              :value="item"
            >
              <div class="option-content">
                <div class="option-header">
                  <span class="option-label">{{ item.key }}</span>
                  <div class="option-meta">{{ item.value }}</div>
                  <ElTag
                    :type="
                      item.execute_status === 'idle' ? 'success' : 'warning'
                    "
                    size="small"
                    class="option-tag"
                  >
                    {{ item.execute_status === 'idle' ? '空闲' : '忙碌' }}
                  </ElTag>
                </div>

              </div>
            </ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="录制策略" prop="strategy" class="form-item">
          <!-- 第二行 -->
          <ElSelect
            value-key="value"
            v-model="form.strategy"
            @change="handleStrategyChange"
            placeholder="请选择任务策略"
            filterable
            remote
            :remote-method="searchStrategies"
            :loading="loadingStates.strategies"
            @focus="searchStrategies()"
            class="select-input"
          >
            <ElOption
              v-for="item in strategies"
              :key="item.value"
              :label="item.name"
              :value="item"
            >
              <div class="option-content">
                <div class="option-header">
                  <span class="option-label">{{ item.value }}</span>
                  <ElTag size="small" class="option-tag">
                    {{ item.name }}
                  </ElTag>
                </div>
              </div>
            </ElOption>
          </ElSelect>
        </ElFormItem>

        <ElFormItem
          label="计划时间"
          prop="schedule_range"
          class="form-item-full"
        >
          <ElDatePicker
            v-model="form.record_time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="[
              new Date(2000, 1, 1, 0, 0, 0),
              new Date(2000, 1, 1, 23, 59, 59),
            ]"
            value-format="YYYY-MM-DD HH:mm:ss"
            class="range-picker"
          />
        </ElFormItem>

        <!-- 监听端口配置 -->
        <ElFormItem label="监听端口" prop="listenPort" class="form-item">
          <ElInput
            v-model="form.listen_port"
            placeholder="请输入监听端口"
            clearable
          />
        </ElFormItem>

        <!-- 任务描述 -->
        <ElFormItem label="任务描述" class="form-item-full">
          <ElInput
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="请输入任务描述"
            resize="none"
            class="description-input"
          />
        </ElFormItem>
      </div>
    </ElForm>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDialog" class="cancel-btn">取消</ElButton>
        <ElButton type="primary" @click="submitForm" class="submit-btn">
          确认
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.form-container {
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    .form-item {
      margin-bottom: 0;

      &:deep(.el-form-item__label) {
        padding-bottom: 8px;
        font-size: 14px;
        color: #606266;
        font-weight: 500;
      }
    }

    .form-item-full {
      grid-column: span 2;
    }
  }
}

.select-input {
  width: 100%;

  &:deep(.el-input__wrapper) {
    padding: 0 11px;
    height: 36px;
  }
}
.description-input {
  &:deep(.el-textarea__inner) {
    min-height: 100px;
    padding: 8px 12px;
    line-height: 1.5;
  }
}

.option-content {

  .option-header {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }

  .option-label {
    font-size: 14px;
    color: #333;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    white-space: nowrap;
  }

  .option-tag {
    margin-left: 8px;
    flex-shrink: 0;
  }

  .option-meta {
    font-size: 12px;
    color: #909399;
    margin-left: 8px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  .cancel-btn,
  .submit-btn {
    min-width: 80px;
    padding: 8px 16px;
    border-radius: 4px;
  }

  .submit-btn {
    background-color: #409eff;
    border-color: #409eff;

    &:hover {
      background-color: #66b1ff;
      border-color: #66b1ff;
    }
  }
}

@media (max-width: 768px) {
  .form-container .form-grid {
    grid-template-columns: 1fr;

    .form-item-full {
      grid-column: span 1;
    }
  }

  .task-form-dialog .el-dialog {
    width: 90% !important;
  }
}

/* 新增的时间选择器样式 */
.date-picker,
.range-picker {
  width: 100%;

  &:deep(.el-input__wrapper) {
    padding: 0 11px;
    height: 36px;
  }
}

.range-picker {
  &:deep(.el-range-input) {
    width: 45%;
  }
}
</style>
