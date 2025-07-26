<script lang="ts" setup>
import type { TaskRecordNameSpace } from '#/types/task/record';

import { computed, reactive, ref } from 'vue';

import {
  Delete,
  Document,
  Edit,
  Plus,
  Refresh,
  Search,
  View,
} from '@element-plus/icons-vue';
import {
  ElButton,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElDatePicker,
  ElIcon,
  ElInput,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import { useTaskRecordStore } from '#/store/gosmo/task/record';

const taskRecordStore = useTaskRecordStore();

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
handleQueryPage();
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

          <ElButton type="primary" @click="handleQueryPage">
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
              <label>创建时间</label>
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
        <ElTableColumn prop="id" label="任务编号" />
        <ElTableColumn prop="name" label="任务名称" />
        <ElTableColumn label="任务策略">
          <template #default="{ row }">
            <ElTag type="primary">
              {{ row.strategy_name }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="关联录制规则">
          <template #default="{ row }">
            <ElTag type="info">
              {{ row.rule_name }}
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
        <ElTableColumn label="任务状态">
          <template #default="{ row }">
            <ElTag :type="getTaskStatusType(row.status)">
              {{ getTaskStatusText(row.status) }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="180">
          <template #default="{ row }">
            <div class="action-buttons">
              <ElButton type="primary" size="small">
                <ElIcon><View /></ElIcon>
              </ElButton>
              <ElButton type="warning" size="small">
                <ElIcon><Edit /></ElIcon>
              </ElButton>
              <ElButton type="danger" size="small">
                <ElIcon><Delete /></ElIcon>
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

    .pagination-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.75rem;

      .pagination-info {
        font-size: 0.875rem;
        color: #666;
      }
    }
  }

  .detail-dialog {
    .detail-content {
      .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.75rem;

        .detail-item {
          label {
            display: block;
            margin-bottom: 0.25rem;
            font-size: 0.875rem;
            color: #666;
          }

          .detail-value {
            padding: 0.5rem;
            background-color: #f5f5f5;
            border-radius: 4px;
            font-size: 0.875rem;
          }
        }
      }
    }
  }

  .task-form-dialog {
    .task-form {
    }
  }
}
</style>
