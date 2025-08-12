<script lang="ts" setup>
import type { TaskRecordNameSpace } from '#/types/task/record';

import { computed, reactive, ref, watch } from 'vue';

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

import { useAgentStore } from '#/store';

const props = defineProps({
  visible: Boolean,
  formData: {
    type: Object as () => TaskRecordNameSpace.TaskRecordCreateForm,
    required: true,
  },
});
const emit = defineEmits(['update:visible', 'submit', 'update:form-data']);
const agentStore = useAgentStore();
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
  status: ['healthy'],
  execute_status: ['free', 'busy'],
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
interface MonitorOption {
  id: string;
  name: string;
  addr: string;
  status: string;
}
const monitorOptions = reactive<MonitorOption[]>([
  {
    id: '1',
    name: '云仓生产集群监控中心',
    addr: 'http://localhost:8080',
    status: 'online',
  },
  {
    id: '2',
    name: '云仓测试集群监控中心',
    addr: 'http://localhost:8080',
    status: 'online',
  },
]);
const agentSelectOptions = computed(() => agentStore.agentSelectOptions || []);
// Form validation rules
const rules = {
  name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  strategy: [{ required: true, message: '请选择任务策略', trigger: 'change' }],
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
const strategies: TaskRecordNameSpace.RecordStrategy[] = [
  {
    id: '1',
    value: 'live',
    name: '实时录制',
  },
  {
    id: '2',
    value: 'schedule',
    name: '定时录制',
  },
];

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
const now = new Date();
const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

// 设置默认时间范围
const defaultTimeRange = ref<[Date, Date]>([now, todayEnd]);

// 禁用日期函数（控制哪些日期可选）
const disabledDate = (time: Date) => {
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  // 禁用昨天及之前的日期
  const isPast =
    time.getTime() < now.setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000;

  // 禁用2周后的日期
  const isBeyondTwoWeeks =
    time.getTime() > twoWeeksLater.setHours(23, 59, 59, 999);

  return isPast || isBeyondTwoWeeks;
};

// 禁用时间函数（精确到分钟）
const disabledDateTime = (date: Date) => {
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  // 如果是今天，禁用过去的小时和分钟
  if (date.toDateString() === now.toDateString()) {
    return {
      disabledHours: () => range(0, now.getHours() - 1),
      disabledMinutes: (hour: number) => {
        if (hour === now.getHours()) {
          return range(0, now.getMinutes() - 1);
        }
        return [];
      },
    };
  }

  // 如果是2周后的日期，禁用所有时间（双重保险）
  if (date.getTime() > twoWeeksLater.getTime()) {
    return {
      disabledHours: () => range(0, 23),
      disabledMinutes: () => range(0, 59),
    };
  }

  return {};
};

// 辅助函数
const range = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

// 在提交时验证时间范围
const submitForm = async () => {
  try {
    // 验证时间范围
    if (form.value.record_time && form.value.record_time.length === 2) {
      const [start, end] = form.value.record_time as [string, string];
      // 解析时间字符串
      const startTime = new Date(start).getTime();
      const endTime = new Date(end).getTime();
      const now = Date.now();

      if (isNaN(startTime) || isNaN(endTime)) {
        ElMessage.error('时间格式不正确');
        return;
      }

      if (startTime < now) {
        ElMessage.error('开始时间不能是过去时间');
        return;
      }

      if (endTime <= startTime) {
        ElMessage.error('结束时间必须晚于开始时间');
        return;
      }
    }
    // 验证端口
    const port = Number.parseInt(form.value.listen_port);
    if (port < 1 || port > 65_535) {
      ElMessage.error('端口号范围应为1-65535');
      return;
    }

    emit('submit', form.value);
    ElMessage.success('任务创建成功');
    closeDialog();
  } catch (error: unknown) {
    if (error instanceof Error) {
      ElMessage.error(error.message);
    } else {
      ElMessage.error('发生未知错误');
      console.error('非Error类型的错误:', error);
    }
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
            v-model="form.monitor"
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
              v-for="item in monitorOptions"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
              <div class="option-content">
                <div class="option-header">
                  <span class="option-label">{{ item.name }}</span>
                  <div class="option-meta">{{ item.addr }}</div>
                  <ElTag
                    :type="item.status === 'online' ? 'success' : 'warning'"
                    size="small"
                    class="option-tag"
                  >
                    {{ item.status === 'online' ? '在线' : '离线' }}
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
                      item.execute_status === 'free' ? 'success' : 'warning'
                    "
                    size="small"
                    class="option-tag"
                  >
                    {{ item.execute_status === 'free' ? '空闲' : '忙碌' }}
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
            :loading="loadingStates.strategies"
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
          label="录制时间"
          prop="schedule_range"
          class="form-item-full"
        >
          <div class="time-range-tip">
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
              :disabled-date="disabledDate"
              :disabled-time="disabledDateTime"
              :default-value="defaultTimeRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              class="range-picker"
            />
            <div class="tip-text">
              出于性能考虑，目前只能选择未来2周内的时间范围
            </div>
          </div>
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
.time-range-tip {
  width: 100%;
  position: relative;

  .tip-text {
    font-size: 12px;
    color: #e12208;
    margin-top: 4px;
    padding-left: 2px;
  }
}
</style>
