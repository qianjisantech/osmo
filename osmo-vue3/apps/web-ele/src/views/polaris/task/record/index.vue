<script lang="ts" setup>
import type { TaskRecordNameSpace } from '#/types/task/record';

import { computed, onMounted, reactive, ref } from 'vue';

import {
  Document,
  Plus,
  Refresh,
  Search,
} from '@element-plus/icons-vue';
import {
  ElButton,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElDatePicker,
  ElIcon,
  ElInput,
  ElMessage,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import { useTaskRecordStore } from '#/store/polaris/task/record';
import dayjs from 'dayjs'; // 推荐使用dayjs处理日期
import ExecuteConfirmDialog from './components/ExecuteConfirmDialog.vue';
import TaskFormDialog from './components/TaskFormDialog.vue';

const taskRecordStore = useTaskRecordStore();
const showDialog = ref(false);
// 添加确认弹窗状态
const confirmDialog = reactive({
  visible: false,
  currentTask: null as null | TaskRecordNameSpace.TaskRecord,
});
// 状态管理
const activeCollapse = ref(['1']);
const page = ref(1);
const page_size = ref(10);
// 筛选表单
const filterForm: TaskRecordNameSpace.TaskRecordQueryPageParams = reactive({
  page: page.value,
  page_size: page_size.value,
  rule: '',
  strategy: '',
  keyword: '',
  agent: '',
  create_time_range: [],
  status: '',
});
const taskRecords = computed(
  () => taskRecordStore.taskRecordQueryPageResult.records || [],
);
const paginated_task_records = computed(() => {
  const start = (page.value - 1) * page_size.value;
  const end = start + page_size.value;
  return taskRecords.value.slice(start, end);
});
// 修改后的刷新数据方法
const handleQueryPage = async () => {
  await taskRecordStore.queryPage({
    ...filterForm,
  });
};
const getTaskStatusText = (status: string): string => {
  const map: Record<'default' | TaskRecordNameSpace.TaskStatus, string> = {
    pending: '待执行',
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

const handleAddTask = () => {
  showDialog.value = true;
};
const now = dayjs(); // 当前时间
const endOfDay = dayjs().endOf('day'); // 当天23:59:59
// 表单数据
const form = reactive<TaskRecordNameSpace.TaskRecordCreateForm>({
  id: '',
  name: '',
  strategy: {},
  agent: {},
  description: '',
  listen_port: '80', // 默认监听80端口
  record_time: [
    now.format('YYYY-MM-DD HH:mm:ss'),
    endOfDay.format('YYYY-MM-DD HH:mm:ss')
  ],
});
const mockData = reactive({
  strategies: [
    {
      id: '1',
      value: 'live',
      name: '实时录制',
      description:
        '立即启动流量录制，实时捕获所有匹配规则的请求流量，适用于即时分析和调试场景',
    },
    {
      id: '2',
      value: 'scheduled',
      name: '定时录制',
      description:
        '按照预设时间计划自动执行录制任务，支持周期性录制配置，适用于定期数据采集和分析',
    },
  ],
  agents: [
    {
      id: '1946088688127578112',
      name: '北京节点-执行机01',
      execute_status: 'idle',
    },
  ],
});
const handleSubmitTask = async (
  formData: TaskRecordNameSpace.TaskRecordCreateForm,
) => {
  try {
    if (formData.id === '') {
      await taskRecordStore.createFunc(formData);
    }
    await handleQueryPage();
    showDialog.value = false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      ElMessage.error(error.message);
    } else {
      ElMessage.error('发生未知错误');
      console.error('非Error类型的错误:', error);
    }
  }
};
// 修改 handleExecute 方法
const handleExecute = (task: TaskRecordNameSpace.TaskRecord) => {
  confirmDialog.currentTask = task;
  confirmDialog.visible = true;
};
// 添加确认执行方法
const confirmExecute = async () => {
  if (!confirmDialog.currentTask) return;
  try {
    // 这里添加实际执行任务的逻辑
    await taskRecordStore.executeFunc(confirmDialog.currentTask.id)

  } catch (error: unknown) {
    if (error instanceof Error) {
      ElMessage.error(error.message);
    } else {
      ElMessage.error('发生未知错误');
      console.error('非Error类型的错误:', error);
    }
  } finally {
    confirmDialog.visible = false;
    confirmDialog.currentTask = null;
   await handleQueryPage();
  }
};
// 组件挂载时加载数据
onMounted(() => {
  handleQueryPage();
});
</script>

<template>
  <div class="container">
    <!-- 查询区域 -->
    <ElCard class="query-card">
      <div class="query-bar">
        <div class="query-actions">
          <ElButton type="primary" @click="handleQueryPage">
            <ElIcon class="mr-1"><Search /></ElIcon>
            查询
          </ElButton>
          <ElButton @click="handleQueryPage">
            <ElIcon class="mr-1"><Refresh /></ElIcon>
            重置
          </ElButton>

          <ElButton type="primary" @click="handleAddTask">
            <ElIcon class="mr-1"><Plus /></ElIcon>
            新增
          </ElButton>
        </div>
      </div>
      <ElCollapse v-model="activeCollapse">
        <ElCollapseItem name="1">
          <div class="query-form">
            <div class="form-item">
              <label>任务名称</label>
              <ElInput
                v-model="filterForm.keyword"
                placeholder="请输入任务名称"
                clearable
              >
                <template #prefix>
                  <ElIcon><Document /></ElIcon>
                </template>
              </ElInput>
            </div>

            <div class="form-item">
              <label>任务策略</label>
              <ElSelect
                v-model="filterForm.strategy"
                placeholder="请选择任务策略"
                clearable
              >
                <ElOption label="全部" value="" />
                <ElOption label="全量回放" value="full" />
                <ElOption label="抽样回放" value="sample" />
                <ElOption label="定时回放" value="scheduled" />
              </ElSelect>
            </div>
            <div class="form-item">
              <label>任务状态</label>
              <ElSelect
                v-model="filterForm.status"
                placeholder="任务状态"
                clearable
              >
                <ElOption label="全部" value="" />
                <ElOption label="待定" value="pending" />
                <ElOption label="运行中" value="running" />
                <ElOption label="成功" value="success" />
              </ElSelect>
            </div>
            <div class="form-item">
              <label>录制时间</label>
              <ElDatePicker
                v-model="filterForm.create_time_range"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </div>
          </div>
        </ElCollapseItem>
      </ElCollapse>

      <!-- 数据表格 -->
      <ElTable :data="paginated_task_records" class="data-table">
        <ElTableColumn type="selection" width="55" />
        <ElTableColumn prop="id" label="任务编号" />
        <ElTableColumn prop="name" label="任务名称" />
        <ElTableColumn label="任务策略">
          <template #default="{ row }">
            <ElTag type="primary">
              {{ row.strategy_name }}
            </ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="关联执行机">
          <template #default="{ row }">
            <ElTag type="danger">
              {{ row.agent_name }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="录制时间" width="300">
          <template #default="{ row }">
            <ElTag type="primary">
              {{ `${row.start_time}-${row.end_time}` }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="监听端口">
          <template #default="{ row }">
            <ElTag type="info">
              {{ row.listen_port }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="任务状态">
          <template #default="{ row }">
            <ElTag :type="getTaskStatusType(row.status)">
              {{ getTaskStatusText(row.status) }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="执行时间">
          <template #default="{ row }">
            <ElTag type="info">
              {{ row.execute_time }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="250">
          <template #default="{ row }">
            <div class="action-buttons">
              <ElButton  link type="primary" size="small">
                查看
              </ElButton>
              <ElButton link type="warning" size="small">
                <ElIcon>
                  编辑
                </ElIcon>
              </ElButton>
              <ElButton  link type="danger" size="small">
                删除
              </ElButton>
              <ElButton
                link
                type="primary"
                size="small"
                @click="handleExecute(row)"
              >
                执行
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <ElPagination
          v-model:current-page="page"
          v-model:page-size="page_size"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="taskRecords.length"
        />
      </div>
    </ElCard>

    <TaskFormDialog
      v-model:visible="showDialog"
      :form-data="form"
      @submit="handleSubmitTask"
      :strategies="mockData.strategies"
      :agents="mockData.agents"
    />
    <ExecuteConfirmDialog
      v-model:visible="confirmDialog.visible"
      title="友情提示"
      :content="`确定要执行任务【${confirmDialog.currentTask?.name}】吗？`"
      @confirm="confirmExecute"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0.75rem;
  max-width: 100%;
  margin: 0 auto;

  .query-card {
    padding: 0.75rem;
    border-radius: 8px;
    height: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .query-bar {
      margin-bottom: 0.75rem;

      .query-actions {
        display: flex;
        gap: 0.5rem;
      }
    }

    .query-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 0.75rem;
      margin-bottom: 0.75rem;

      .form-item {
        label {
          display: block;
          margin-bottom: 0.25rem;
          font-size: 0.875rem;
          color: #666;
        }
      }
    }

    .data-table {
      margin-top: 0.75rem;
      width: 100%;
      height: 100%;

      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
}
</style>
