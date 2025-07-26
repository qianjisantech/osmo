<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
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
  ElDialog,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

// 类型定义
interface Task {
  id: number;
  name: string;
  strategy: string;
  rule: string;
  createTime: string;
  creator: string;
  updater: string;
  updateTime: string;
}

// 模拟数据
const mockData: Task[] = [
  {
    id: 1,
    name: '用户服务全量回放',
    strategy: 'full',
    rule: '用户查询规则集',
    createTime: '2023-08-15 09:30:25',
    creator: '张三',
    updater: '李四',
    updateTime: '2023-08-16 14:20:10',
  },
  // 其他数据...
];

// 状态管理
const activeCollapse = ref(['1']);
const queryParams = reactive({
  name: '',
  strategy: '',
  dateRange: [] as string[],
});

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: mockData.length,
});

const tableData = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return filteredData.value.slice(start, end);
});

const filteredData = ref<Task[]>(mockData);

// 详情弹窗
const detailDialogVisible = ref(false);
const currentTask = ref<null | Task>(null);

// 任务表单弹窗
const taskDialogVisible = ref(false);
const isEditMode = ref(false);
const taskForm = reactive({
  id: 0,
  name: '',
  strategy: '',
  rule: '',
});

// 方法定义
const searchTasks = () => {
  filteredData.value = mockData.filter(item =>
    item.name.includes(queryParams.name) &&
    (queryParams.strategy === '' || item.strategy === queryParams.strategy)
  );
  pagination.total = filteredData.value.length;
};

const resetQuery = () => {
  queryParams.name = '';
  queryParams.strategy = '';
  queryParams.dateRange = [];
  searchTasks();
};

const showDetail = (id: number) => {
  currentTask.value = mockData.find((task) => task.id === id) || null;
  detailDialogVisible.value = true;
};

const showAddTaskDialog = () => {
  isEditMode.value = false;
  Object.assign(taskForm, {
    id: 0,
    name: '',
    strategy: '',
    rule: '',
  });
  taskDialogVisible.value = true;
};

const editTask = (id: number) => {
  const task = mockData.find((task) => task.id === id);
  if (task) {
    isEditMode.value = true;
    Object.assign(taskForm, {
      id: task.id,
      name: task.name,
      strategy: task.strategy,
      rule: task.rule,
    });
    taskDialogVisible.value = true;
  }
};

const deleteTask = (id: number) => {
  // 实际项目中这里应该是API调用
  const index = mockData.findIndex(task => task.id === id);
  if (index !== -1) {
    mockData.splice(index, 1);
    searchTasks();
  }
};

const saveTask = () => {
  // 实际项目中这里应该是API调用
  if (isEditMode.value) {
    const index = mockData.findIndex(task => task.id === taskForm.id);
    if (index !== -1) {
      Object.assign(mockData[index], {
        name: taskForm.name,
        strategy: taskForm.strategy,
        rule: taskForm.rule,
        updateTime: new Date().toLocaleString(),
        updater: '当前用户'
      });
    }
  } else {
    const newId = Math.max(...mockData.map(task => task.id)) + 1;
    mockData.unshift({
      id: newId,
      name: taskForm.name,
      strategy: taskForm.strategy,
      rule: taskForm.rule,
      createTime: new Date().toLocaleString(),
      creator: '当前用户',
      updater: '当前用户',
      updateTime: new Date().toLocaleString()
    });
  }
  taskDialogVisible.value = false;
  searchTasks();
};

const handleSizeChange = (size: number) => {
  pagination.pageSize = size;
  pagination.currentPage = 1;
};

const handleCurrentChange = (page: number) => {
  pagination.currentPage = page;
};

// 初始化
onMounted(() => {
  filteredData.value = mockData;
  pagination.total = mockData.length;
});
</script>

<template>
  <div class="container">
    <!-- 查询区域 -->
    <ElCard class="query-card">
      <!-- 操作按钮 -->
      <div class="action-bar">
        <ElButton type="primary" @click="showAddTaskDialog">
          <ElIcon class="mr-1"><Plus /></ElIcon>
          新增任务
        </ElButton>
      </div>

      <div class="query-bar">
        <div class="query-actions">
          <ElButton @click="resetQuery">
            <ElIcon class="mr-1"><Refresh /></ElIcon>
            重置
          </ElButton>
          <ElButton type="primary" @click="searchTasks">
            <ElIcon class="mr-1"><Search /></ElIcon>
            查询
          </ElButton>
        </div>
      </div>

      <ElCollapse v-model="activeCollapse">
        <ElCollapseItem name="1">
          <div class="query-form">
            <div class="form-item">
              <label>任务名称</label>
              <ElInput
                v-model="queryParams.name"
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
                v-model="queryParams.strategy"
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
              <label>创建时间</label>
              <ElDatePicker
                v-model="queryParams.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </div>
        </ElCollapseItem>
      </ElCollapse>

      <!-- 数据表格 -->
      <ElTable :data="tableData" class="data-table">
        <ElTableColumn prop="id" label="序号" width="80" />
        <ElTableColumn prop="name" label="任务名称" />
        <ElTableColumn label="任务策略" width="120">
          <template #default="{ row }">
            <ElTag
              :type="
                row.strategy === 'full'
                  ? 'primary'
                  : row.strategy === 'sample'
                    ? 'success'
                    : 'warning'
              "
            >
              {{
                row.strategy === 'full'
                  ? '全量回放'
                  : row.strategy === 'sample'
                    ? '抽样回放'
                    : '定时回放'
              }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="rule" label="关联回放规则" />
        <ElTableColumn prop="createTime" label="创建时间" />
        <ElTableColumn prop="creator" label="创建人" />
        <ElTableColumn prop="updater" label="更新人" />
        <ElTableColumn prop="updateTime" label="更新时间" />
        <ElTableColumn label="操作" width="180">
          <template #default="{ row }">
            <div class="action-buttons">
              <ElButton type="primary" size="small" @click="showDetail(row.id)">
                <ElIcon><View /></ElIcon>
              </ElButton>
              <ElButton type="warning" size="small" @click="editTask(row.id)">
                <ElIcon><Edit /></ElIcon>
              </ElButton>
              <ElButton type="danger" size="small" @click="deleteTask(row.id)">
                <ElIcon><Delete /></ElIcon>
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>

      <!-- 分页 -->
      <div class="pagination-bar">
        <div>
          <p class="pagination-info">
            显示第 {{ (pagination.currentPage - 1) * pagination.pageSize + 1 }} 至
            {{
              Math.min(
                pagination.currentPage * pagination.pageSize,
                pagination.total,
              )
            }}
            条，共 {{ pagination.total }} 条记录
          </p>
        </div>
        <ElPagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[5, 10, 20, 50]"
          layout="prev, pager, next, sizes"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </ElCard>

    <!-- 详情弹窗 -->
    <ElDialog
      v-model="detailDialogVisible"
      title="任务详情"
      width="70%"
      top="5vh"
      class="detail-dialog"
    >
      <div v-if="currentTask" class="detail-content">
        <div class="detail-grid">
          <div class="detail-item">
            <label>序号</label>
            <div class="detail-value">{{ currentTask.id }}</div>
          </div>
          <div class="detail-item">
            <label>任务名称</label>
            <div class="detail-value">{{ currentTask.name }}</div>
          </div>
          <div class="detail-item">
            <label>任务策略</label>
            <div class="detail-value">
              {{
                currentTask.strategy === 'full'
                  ? '全量回放'
                  : currentTask.strategy === 'sample'
                    ? '抽样回放'
                    : '定时回放'
              }}
            </div>
          </div>
          <div class="detail-item">
            <label>关联回放规则</label>
            <div class="detail-value">{{ currentTask.rule }}</div>
          </div>
          <div class="detail-item">
            <label>创建时间</label>
            <div class="detail-value">{{ currentTask.createTime }}</div>
          </div>
          <div class="detail-item">
            <label>创建人</label>
            <div class="detail-value">{{ currentTask.creator }}</div>
          </div>
          <div class="detail-item">
            <label>更新时间</label>
            <div class="detail-value">{{ currentTask.updateTime }}</div>
          </div>
          <div class="detail-item">
            <label>更新人</label>
            <div class="detail-value">{{ currentTask.updater }}</div>
          </div>
        </div>
      </div>
      <template #footer>
        <ElButton @click="detailDialogVisible = false">关闭</ElButton>
      </template>
    </ElDialog>

    <!-- 新增/编辑任务弹窗 -->
    <ElDialog
      v-model="taskDialogVisible"
      :title="isEditMode ? '编辑任务' : '新增任务'"
      width="50%"
      class="task-form-dialog"
    >
      <ElForm :model="taskForm" label-width="120px" class="task-form">
        <ElFormItem label="任务名称" prop="name" required>
          <ElInput
            v-model="taskForm.name"
            placeholder="请输入任务名称(最多50字符)"
            maxlength="50"
            show-word-limit
          />
        </ElFormItem>
        <ElFormItem label="任务类型" prop="strategy" required>
          <ElSelect
            v-model="taskForm.strategy"
            placeholder="请选择任务类型"
            :disabled="isEditMode"
          >
            <ElOption label="全量回放" value="full" />
            <ElOption label="抽样回放" value="sample" />
            <ElOption label="定时回放" value="scheduled" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="关联回放规则" prop="rule" required>
          <ElSelect v-model="taskForm.rule" placeholder="请选择回放规则">
            <ElOption label="用户查询规则集" value="用户查询规则集" />
            <ElOption label="订单处理规则集" value="订单处理规则集" />
            <ElOption label="支付验证规则集" value="支付验证规则集" />
            <ElOption label="商品查询规则集" value="商品查询规则集" />
            <ElOption label="库存检查规则集" value="库存检查规则集" />
          </ElSelect>
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="taskDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="saveTask">保存</ElButton>
      </template>
    </ElDialog>
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
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .action-bar {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0.75rem;
    }

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

      .el-table__cell {
        padding: 0.5rem 0;
      }

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
      .el-form-item {
        margin-bottom: 1rem;
      }
    }
  }
}

</style>
