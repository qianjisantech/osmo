<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';

import {
  Delete,
  Download,
  Edit,
  Plus,
  Refresh,
  Search,
  Upload,
  VideoPlay,
  View,
} from '@element-plus/icons-vue';
import {
  ElButton,
  ElCard,
  ElDialog,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElPagination,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTag,
  ElDatePicker
} from 'element-plus';

// 流量录制规则类型
interface RecordingRule {
  id: number;
  name: string;
  type: string;
  status: boolean;
  captureMode: string;
  lastRunTime: string;
  creator: string;
  updateTime: string;
  description: string;
}

// 模拟数据
const mockData: RecordingRule[] = [
  {
    id: 1,
    name: 'DDoS防护规则录制',
    type: 'attack',
    status: true,
    captureMode: 'manual',
    lastRunTime: '2023-08-15 09:35:25',
    creator: '张三',
    updateTime: '2023-08-16 14:20:10',
    description: '针对大规模DDoS攻击的流量录制规则',
  },
  {
    id: 2,
    name: 'SQL注入流量录制',
    type: 'attack',
    status: true,
    captureMode: 'scheduled',
    lastRunTime: '2023-08-10 11:20:33',
    creator: '王五',
    updateTime: '2023-08-12 09:45:18',
    description: '检测并录制SQL注入攻击流量',
  },
  {
    id: 3,
    name: '业务基线流量录制',
    type: 'baseline',
    status: false,
    captureMode: 'triggered',
    lastRunTime: '2023-07-25 14:27:47',
    creator: '赵六',
    updateTime: '2023-08-05 16:30:55',
    description: '正常业务流量基线录制',
  },
];

// 状态管理
const queryParams = reactive({
  name: '',
  type: '',
  status: null,
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

const filteredData = ref<RecordingRule[]>(mockData);

// 详情弹窗
const detailDialogVisible = ref(false);
const currentRule = ref<null | RecordingRule>(null);

// 规则表单弹窗
const ruleDialogVisible = ref(false);
const isEditMode = ref(false);
const ruleForm = reactive({
  id: 0,
  name: '',
  type: 'traffic',
  status: true,
  captureMode: 'manual',
  description: '',
});

// 查询规则
const searchRules = () => {
  filteredData.value = mockData.filter(
    (item) =>
      item.name.includes(queryParams.name) &&
      (queryParams.type === '' || item.type === queryParams.type) &&
      (queryParams.status === null || item.status === queryParams.status),
  );
  pagination.total = filteredData.value.length;
};

// 重置查询
const resetQuery = () => {
  queryParams.name = '';
  queryParams.type = '';
  queryParams.status = null;
  queryParams.dateRange = [];
  searchRules();
};

// 显示详情
const showDetail = (id: number) => {
  currentRule.value = mockData.find((rule) => rule.id === id) || null;
  detailDialogVisible.value = true;
};

// 新增规则
const showAddRuleDialog = () => {
  isEditMode.value = false;
  Object.assign(ruleForm, {
    id: 0,
    name: '',
    type: 'traffic',
    status: true,
    captureMode: 'manual',
    description: '',
  });
  ruleDialogVisible.value = true;
};

// 编辑规则
const editRule = (id: number) => {
  const rule = mockData.find((rule) => rule.id === id);
  if (rule) {
    isEditMode.value = true;
    Object.assign(ruleForm, {
      id: rule.id,
      name: rule.name,
      type: rule.type,
      status: rule.status,
      captureMode: rule.captureMode,
      description: rule.description,
    });
    ruleDialogVisible.value = true;
  }
};

// 删除规则
const deleteRule = (id: number) => {
  const index = mockData.findIndex((rule) => rule.id === id);
  if (index !== -1) {
    mockData.splice(index, 1);
    searchRules();
  }
};

// 切换规则状态
const toggleStatus = (id: number, status: boolean) => {
  const index = mockData.findIndex((rule) => rule.id === id);
  if (index !== -1) {
    mockData[index].status = status;
    mockData[index].updateTime = new Date().toLocaleString();
  }
};

// 保存规则
const saveRule = () => {
  if (isEditMode.value) {
    const index = mockData.findIndex((rule) => rule.id === ruleForm.id);
    if (index !== -1) {
      Object.assign(mockData[index], {
        name: ruleForm.name,
        type: ruleForm.type,
        status: ruleForm.status,
        captureMode: ruleForm.captureMode,
        description: ruleForm.description,
        updateTime: new Date().toLocaleString(),
      });
    }
  } else {
    const newId = Math.max(...mockData.map((rule) => rule.id)) + 1;
    mockData.unshift({
      id: newId,
      name: ruleForm.name,
      type: ruleForm.type,
      status: ruleForm.status,
      captureMode: ruleForm.captureMode,
      lastRunTime: '',
      creator: '当前用户',
      updateTime: new Date().toLocaleString(),
      description: ruleForm.description,
    });
  }
  ruleDialogVisible.value = false;
  searchRules();
};

// 分页处理
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
  <div class="recording-list-container">
    <!-- 查询区域 -->
    <ElCard class="query-card">
      <!-- 操作按钮 -->
      <div class="action-bar">
        <ElButton type="primary" @click="showAddRuleDialog">
          <ElIcon class="mr-1"><Plus /></ElIcon>
          新增规则
        </ElButton>
        <ElButton type="success" :icon="Upload">导入规则</ElButton>
        <ElButton :icon="Download">导出规则</ElButton>
      </div>

      <!-- 查询表单 -->
      <div class="query-form">
        <div class="form-row">
          <div class="form-item">
            <label>规则名称</label>
            <ElInput
              v-model="queryParams.name"
              placeholder="请输入规则名称"
              clearable
            />
          </div>
          <div class="form-item">
            <label>规则类型</label>
            <ElSelect
              v-model="queryParams.type"
              placeholder="请选择规则类型"
              clearable
            >
              <ElOption label="全部" value="" />
              <ElOption label="流量录制" value="traffic" />
              <ElOption label="攻击样本" value="attack" />
              <ElOption label="业务基线" value="baseline" />
            </ElSelect>
          </div>
          <div class="form-item">
            <label>规则状态</label>
            <ElSelect
              v-model="queryParams.status"
              placeholder="请选择规则状态"
              clearable
            >
              <ElOption label="全部" value="" />
              <ElOption label="启用" :value="true" />
              <ElOption label="禁用" :value="false" />
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
        <div class="query-actions">
          <ElButton @click="resetQuery">
            <ElIcon class="mr-1"><Refresh /></ElIcon>
            重置
          </ElButton>
          <ElButton type="primary" @click="searchRules">
            <ElIcon class="mr-1"><Search /></ElIcon>
            查询
          </ElButton>
        </div>
      </div>

      <!-- 数据表格 -->
      <ElTable :data="tableData" class="data-table">
        <ElTableColumn prop="id" label="ID" width="80" />
        <ElTableColumn prop="name" label="规则名称" min-width="150" />
        <ElTableColumn label="规则类型" width="120">
          <template #default="{ row }">
            <ElTag
              :type="
                row.type === 'attack'
                  ? 'danger'
                  : row.type === 'baseline'
                    ? 'success'
                    : 'primary'
              "
            >
              {{
                row.type === 'attack'
                  ? '攻击样本'
                  : row.type === 'baseline'
                    ? '业务基线'
                    : '流量录制'
              }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="状态" width="100">
          <template #default="{ row }">
            <ElSwitch
              v-model="row.status"
              @change="toggleStatus(row.id, row.status)"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn label="录制模式" width="120">
          <template #default="{ row }">
            {{
              row.captureMode === 'scheduled'
                ? '定时录制'
                : row.captureMode === 'triggered'
                  ? '触发录制'
                  : '手动录制'
            }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="lastRunTime" label="最后运行时间" width="160" />
        <ElTableColumn prop="creator" label="创建人" width="100" />
        <ElTableColumn prop="updateTime" label="更新时间" width="160" />
        <ElTableColumn label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <ElButton type="primary" size="small" @click="showDetail(row.id)">
                <ElIcon><View /></ElIcon>
              </ElButton>
              <ElButton type="success" size="small" @click="editRule(row.id)">
                <ElIcon><Edit /></ElIcon>
              </ElButton>
              <ElButton type="warning" size="small" :icon="VideoPlay" />
              <ElButton type="danger" size="small" @click="deleteRule(row.id)">
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
            显示第
            {{ (pagination.currentPage - 1) * pagination.pageSize + 1 }} 至
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
      title="规则详情"
      width="60%"
      class="detail-dialog"
    >
      <div v-if="currentRule" class="detail-content">
        <div class="detail-grid">
          <div class="detail-item">
            <label>ID</label>
            <div class="detail-value">{{ currentRule.id }}</div>
          </div>
          <div class="detail-item">
            <label>规则名称</label>
            <div class="detail-value">{{ currentRule.name }}</div>
          </div>
          <div class="detail-item">
            <label>规则类型</label>
            <div class="detail-value">
              <ElTag
                :type="
                  currentRule.type === 'attack'
                    ? 'danger'
                    : currentRule.type === 'baseline'
                      ? 'success'
                      : 'primary'
                "
              >
                {{
                  currentRule.type === 'attack'
                    ? '攻击样本'
                    : currentRule.type === 'baseline'
                      ? '业务基线'
                      : '流量录制'
                }}
              </ElTag>
            </div>
          </div>
          <div class="detail-item">
            <label>状态</label>
            <div class="detail-value">
              <ElTag :type="currentRule.status ? 'success' : 'danger'">
                {{ currentRule.status ? '启用' : '禁用' }}
              </ElTag>
            </div>
          </div>
          <div class="detail-item">
            <label>录制模式</label>
            <div class="detail-value">
              {{
                currentRule.captureMode === 'scheduled'
                  ? '定时录制'
                  : currentRule.captureMode === 'triggered'
                    ? '触发录制'
                    : '手动录制'
              }}
            </div>
          </div>
          <div class="detail-item">
            <label>最后运行时间</label>
            <div class="detail-value">{{ currentRule.lastRunTime }}</div>
          </div>
          <div class="detail-item">
            <label>创建人</label>
            <div class="detail-value">{{ currentRule.creator }}</div>
          </div>
          <div class="detail-item">
            <label>更新时间</label>
            <div class="detail-value">{{ currentRule.updateTime }}</div>
          </div>
          <div class="detail-item full-width">
            <label>规则描述</label>
            <div class="detail-value">{{ currentRule.description }}</div>
          </div>
        </div>
      </div>
      <template #footer>
        <ElButton @click="detailDialogVisible = false">关闭</ElButton>
      </template>
    </ElDialog>

    <!-- 新增/编辑规则弹窗 -->
    <ElDialog
      v-model="ruleDialogVisible"
      :title="isEditMode ? '编辑规则' : '新增规则'"
      width="50%"
      class="rule-form-dialog"
    >
      <ElForm :model="ruleForm" label-width="120px" class="rule-form">
        <ElFormItem label="规则名称" prop="name" required>
          <ElInput
            v-model="ruleForm.name"
            placeholder="请输入规则名称(最多50字符)"
            maxlength="50"
            show-word-limit
          />
        </ElFormItem>
        <ElFormItem label="规则类型" prop="type" required>
          <ElSelect v-model="ruleForm.type" placeholder="请选择规则类型">
            <ElOption label="流量录制" value="traffic" />
            <ElOption label="攻击样本" value="attack" />
            <ElOption label="业务基线" value="baseline" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="规则状态" prop="status">
          <ElSwitch v-model="ruleForm.status" />
        </ElFormItem>
        <ElFormItem label="录制模式" prop="captureMode" required>
          <ElSelect v-model="ruleForm.captureMode" placeholder="请选择录制模式">
            <ElOption label="手动录制" value="manual" />
            <ElOption label="定时录制" value="scheduled" />
            <ElOption label="触发录制" value="triggered" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="规则描述" prop="description">
          <ElInput
            v-model="ruleForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入规则描述"
            maxlength="200"
            show-word-limit
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="ruleDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="saveRule">保存</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<style lang="scss" scoped>
.recording-list-container {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;

  .query-card {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .action-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .query-form {
      margin-bottom: 20px;

      .form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 15px;

        .form-item {
          label {
            display: block;
            margin-bottom: 5px;
            font-size: 0.875rem;
            color: #666;
          }
        }
      }

      .query-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
    }

    .data-table {
      margin-top: 15px;
      width: 100%;

      .el-table__cell {
        padding: 12px 0;
      }

      .action-buttons {
        display: flex;
        gap: 5px;
      }
    }

    .pagination-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

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
        gap: 15px;

        .detail-item {
          label {
            display: block;
            margin-bottom: 5px;
            font-size: 0.875rem;
            color: #666;
          }

          .detail-value {
            padding: 8px;
            background-color: #f5f5f5;
            border-radius: 4px;
            font-size: 0.875rem;
            min-height: 36px;
          }

          &.full-width {
            grid-column: 1 / -1;
          }
        }
      }
    }
  }

  .rule-form-dialog {
    .rule-form {
      .el-form-item {
        margin-bottom: 18px;
      }
    }
  }
}
</style>
