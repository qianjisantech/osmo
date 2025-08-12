<script lang="ts" setup>
import type { TaskReplayNameSpace } from '#/types/task/replay';
import type { TrafficPoolNamespace } from '#/types/traffic/pool';

import { computed, onMounted, reactive, ref } from 'vue';

import { Document, Plus, Refresh, Search } from '@element-plus/icons-vue';
import {
  ElButton,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElIcon,
  ElInput,
  ElMessage,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
  ElText,
} from 'element-plus';

import { useTaskRecordStore } from '#/store/polaris/task/record';
import { useTaskReplayStore } from '#/store/polaris/task/replay';

import ExecuteConfirmDialog from './components/ExecuteConfirmDialog.vue';
import ReplayTaskDialog from './components/ReplayTaskDialog.vue';

const currentTaskId = ref('');
const loading = ref(false);
const taskRecordStore = useTaskRecordStore();
const taskReplayStore = useTaskReplayStore();
// 添加确认弹窗状态
const confirmDialog = reactive({
  visible: false,
  currentTask: null as null | TaskReplayNameSpace.TaskReplay,
});
// 状态管理
const activeCollapse = ref(['1']);
const pagination = reactive({
  current_page: 1,
  page_size: 10,
  total: computed(() => taskReplayStore.taskReplayQueryPageResult.total),
});

// 筛选表单
const filterForm: TaskReplayNameSpace.TaskReplayQueryPageParams = reactive({
  page: pagination.current_page,
  page_size: pagination.page_size,
  keyword: '',
  replay_time_range: [],
  status: 'all',
});
const taskReplays = computed(
  () => taskReplayStore.taskReplayQueryPageResult.records || [],
);
const paginated_task_replays = computed(() => {
  const start = (pagination.current_page - 1) * pagination.page_size;
  const end = start + pagination.page_size;
  return taskReplays.value.slice(start, end);
});
// 修改后的刷新数据方法
const handleQueryPage = async () => {
  const { status, ...rest } = filterForm;
  const requestParams = {
    ...rest,
    ...(status !== 'all' && { status }),
  };
  await taskReplayStore.queryPage(requestParams);
};
const getTaskStatusText = (status: string): string => {
  const map: Record<'default' | TaskReplayNameSpace.TaskStatus, string> = {
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

  return map[status as TaskReplayNameSpace.TaskStatus] ?? map.default;
};
const getTaskStatusType = (status: string): TaskReplayNameSpace.ElTagType => {
  const typeMap: Record<string, TaskReplayNameSpace.ElTagType> = {
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
  return typeMap[status as TaskReplayNameSpace.TaskStatus] || 'info';
};

// 表单数据

// 修改 handleExecute 方法
const handleExecute = (task: TaskReplayNameSpace.TaskReplay) => {
  confirmDialog.currentTask = task;
  confirmDialog.visible = true;
};
// 添加确认执行方法
const confirmExecute = async () => {
  if (!confirmDialog.currentTask) return;
  try {
    // 这里添加实际执行任务的逻辑
    await taskReplayStore.executeFunc(confirmDialog.currentTask.id);
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
const handleSizeChange = async (val: number) => {
  try {
    loading.value = true;
    filterForm.page_size = val;
    filterForm.page = 1; // 重置到第一页
    pagination.current_page = 1;
    await handleQueryPage();
  } catch (error) {
    console.error('切换分页大小失败:', error);
  } finally {
    loading.value = false;
  }
};

const handleCurrentChange = async (val: number) => {
  try {
    loading.value = true;
    filterForm.page = val;
    await handleQueryPage();
  } catch (error) {
    console.error('切换当前页失败:', error);
  } finally {
    loading.value = false;
  }
};
const handleReset = () => {
  filterForm.keyword = '';
  filterForm.status = 'all';
  filterForm.page = 1;
  filterForm.page_size = 20;
  handleQueryPage();
};
// 正确 - 使用字面量
const mode = ref<'create' | 'view'>('create');
const replayTaskDialogVisible = ref(false);
const handleReplayTaskDetail = (id: string) => {
  mode.value = 'view';
  currentTaskId.value = id;
  replayTaskDialogVisible.value = true;
};
const handleSubmitTask = async (formData: any) => {
  try {
    loading.value = true;
    await taskReplayStore.createFunc(formData);
    replayTaskDialogVisible.value = false;
  } catch (error) {
    console.error('创建任务失败:', error);
    ElMessage.error('创建任务失败');
  } finally {
    loading.value = false;
  }
};
const selected_pools = ref<TrafficPoolNamespace.TrafficPool[]>([]);
const handleCreateTask = () => {
  mode.value = 'create';
  currentTaskId.value = '';
  replayTaskDialogVisible.value = true;
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
          <ElButton @click="handleReset">
            <ElIcon class="mr-1"><Refresh /></ElIcon>
            重置
          </ElButton>

          <ElButton type="primary" @click="handleCreateTask">
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
              <label>任务状态</label>
              <ElSelect
                v-model="filterForm.status"
                placeholder="任务状态"
                clearable
              >
                <ElOption label="全部" value="all" />
                <ElOption label="待定" value="pending" />
                <ElOption label="等待" value="waiting" />
                <ElOption label="运行中" value="running" />
                <ElOption label="失败" value="fail" />
                <ElOption label="中止" value="aborted" />
                <ElOption label="成功" value="success" />
                <ElOption label="关闭" value="closed" />
              </ElSelect>
            </div>
          </div>
        </ElCollapseItem>
      </ElCollapse>

      <!-- 数据表格 -->
      <ElTable :data="paginated_task_replays" class="data-table">
        <ElTableColumn type="selection" width="55" />
        <ElTableColumn prop="id" label="任务编号" />
        <ElTableColumn prop="name" label="任务名称" />

        <ElTableColumn label="回放时间" width="300">
          <template #default="{ row }">
            <ElTag type="primary">
              {{ row.replay_time }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="回放域名/地址">
          <template #default="{ row }">
            <ElTag type="info">
              {{ row.replay_addr }}
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
        <ElTableColumn label="异常原因" width="300">
          <template #default="{ row }">
            <ElText type="danger">{{ row.fail_reason }}</ElText>
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
              <ElButton
                link
                type="primary"
                size="small"
                @click="handleReplayTaskDetail(row.id)"
              >
                查看
              </ElButton>
              <ElButton link type="warning" size="small">
                <ElIcon> 编辑 </ElIcon>
              </ElButton>
              <ElButton link type="danger" size="small"> 删除 </ElButton>
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
          v-model:current-page="pagination.current_page"
          v-model:page-size="pagination.page_size"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </ElCard>

    <ReplayTaskDialog
      v-model="replayTaskDialogVisible"
      :selected-pools="selected_pools"
      :mode="mode"
      @submit="handleSubmitTask"
      :task-id="currentTaskId"
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
