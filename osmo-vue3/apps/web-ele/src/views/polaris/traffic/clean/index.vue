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
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

// 类型定义
interface TrafficRule {
  id: number;
  name: string;
  type: string;
  status: boolean;
  threshold: number;
  action: string;
  createTime: string;
  creator: string;
  updater: string;
  updateTime: string;
  description: string;
}

// 模拟数据
const mockData: TrafficRule[] = [
  {
    id: 1,
    name: 'DDoS防护规则',
    type: 'ddos',
    status: true,
    threshold: 1000,
    action: 'block',
    createTime: '2023-08-15 09:30:25',
    creator: '张三',
    updater: '李四',
    updateTime: '2023-08-16 14:20:10',
    description: '针对大规模DDoS攻击的防护规则',
  },
  {
    id: 2,
    name: 'SQL注入防护',
    type: 'injection',
    status: true,
    threshold: 5,
    action: 'alert',
    createTime: '2023-08-10 11:15:33',
    creator: '王五',
    updater: '王五',
    updateTime: '2023-08-12 09:45:18',
    description: '检测并阻止SQL注入攻击',
  },
  {
    id: 3,
    name: 'XSS攻击防护',
    type: 'xss',
    status: false,
    threshold: 10,
    action: 'block',
    createTime: '2023-07-25 14:22:47',
    creator: '赵六',
    updater: '张三',
    updateTime: '2023-08-05 16:30:55',
    description: '跨站脚本攻击防护规则',
  },
];

// 状态管理
const activeCollapse = ref(['1']);
const queryParams = reactive({
  name: '',
  type: '',
  status: '', // 修改这里
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

const filteredData = ref<TrafficRule[]>(mockData);

// 详情弹窗
const detailDialogVisible = ref(false);
const currentRule = ref<null | TrafficRule>(null);

// 规则表单弹窗
const ruleDialogVisible = ref(false);
const isEditMode = ref(false);
const ruleForm = reactive({
  id: 0,
  name: '',
  type: '',
  status: true,
  threshold: 0,
  action: '',
  description: '',
});

// 修改搜索方法
const searchRules = () => {
  filteredData.value = mockData.filter(
    (item) =>
      item.name.includes(queryParams.name) &&
      (queryParams.type === '' || item.type === queryParams.type) &&
      (queryParams.status === '' || item.status === queryParams.status), // 修改这里
  );
  pagination.total = filteredData.value.length;
};
const resetQuery = () => {
  queryParams.name = '';
  queryParams.type = '';
  queryParams.status = '';
  queryParams.dateRange = [];
  searchRules();
};

const showDetail = (id: number) => {
  currentRule.value = mockData.find((rule) => rule.id === id) || null;
  detailDialogVisible.value = true;
};

const showAddRuleDialog = () => {
  isEditMode.value = false;
  Object.assign(ruleForm, {
    id: 0,
    name: '',
    type: '',
    status: true,
    threshold: 0,
    action: '',
    description: '',
  });
  ruleDialogVisible.value = true;
};

const editRule = (id: number) => {
  const rule = mockData.find((rule) => rule.id === id);
  if (rule) {
    isEditMode.value = true;
    Object.assign(ruleForm, {
      id: rule.id,
      name: rule.name,
      type: rule.type,
      status: rule.status,
      threshold: rule.threshold,
      action: rule.action,
      description: rule.description,
    });
    ruleDialogVisible.value = true;
  }
};

const deleteRule = (id: number) => {
  // 实际项目中这里应该是API调用
  const index = mockData.findIndex((rule) => rule.id === id);
  if (index !== -1) {
    mockData.splice(index, 1);
    searchRules();
  }
};

const toggleStatus = (id: number, status: boolean) => {
  const index = mockData.findIndex((rule) => rule.id === id);
  if (index !== -1) {
    mockData[index].status = status;
    mockData[index].updateTime = new Date().toLocaleString();
    mockData[index].updater = '当前用户';
  }
};

const saveRule = () => {
  // 实际项目中这里应该是API调用
  if (isEditMode.value) {
    const index = mockData.findIndex((rule) => rule.id === ruleForm.id);
    if (index !== -1) {
      Object.assign(mockData[index], {
        name: ruleForm.name,
        type: ruleForm.type,
        status: ruleForm.status,
        threshold: ruleForm.threshold,
        action: ruleForm.action,
        description: ruleForm.description,
        updateTime: new Date().toLocaleString(),
        updater: '当前用户',
      });
    }
  } else {
    const newId = Math.max(...mockData.map((rule) => rule.id)) + 1;
    mockData.unshift({
      id: newId,
      name: ruleForm.name,
      type: ruleForm.type,
      status: ruleForm.status,
      threshold: ruleForm.threshold,
      action: ruleForm.action,
      description: ruleForm.description,
      createTime: new Date().toLocaleString(),
      creator: '当前用户',
      updater: '当前用户',
      updateTime: new Date().toLocaleString(),
    });
  }
  ruleDialogVisible.value = false;
  searchRules();
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
        <ElButton type="primary" @click="showAddRuleDialog">
          <ElIcon class="mr-1"><Plus /></ElIcon>
          新增规则
        </ElButton>
      </div>

      <div class="query-bar">
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

      <ElCollapse v-model="activeCollapse">
        <ElCollapseItem name="1">
          <div class="query-form">
            <div class="form-item">
              <label>规则名称</label>
              <ElInput
                v-model="queryParams.name"
                placeholder="请输入规则名称"
                clearable
              >
                <template #prefix>
                  <ElIcon><Document /></ElIcon>
                </template>
              </ElInput>
            </div>

            <div class="form-item">
              <label>规则类型</label>
              <ElSelect
                v-model="queryParams.type"
                placeholder="请选择规则类型"
                clearable
              >
                <ElOption label="全部" value="undefined" />
                <ElOption label="DDoS防护" value="ddos" />
                <ElOption label="注入攻击" value="injection" />
                <ElOption label="XSS攻击" value="xss" />
                <ElOption label="CC攻击" value="cc" />
                <ElOption label="爬虫防护" value="bot" />
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
        </ElCollapseItem>
      </ElCollapse>

      <!-- 数据表格 -->
      <ElTable :data="tableData" class="data-table">
        <ElTableColumn prop="id" label="序号" width="80" />
        <ElTableColumn prop="name" label="规则名称" />
        <ElTableColumn label="规则类型" width="120">
          <template #default="{ row }">
            <ElTag
              :type="
                row.type === 'ddos'
                  ? 'danger'
                  : row.type === 'injection'
                    ? 'warning'
                    : row.type === 'xss'
                      ? 'success'
                      : 'info'
              "
            >
              {{
                row.type === 'ddos'
                  ? 'DDoS防护'
                  : row.type === 'injection'
                    ? '注入攻击'
                    : row.type === 'xss'
                      ? 'XSS攻击'
                      : row.type === 'cc'
                        ? 'CC攻击'
                        : '爬虫防护'
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
        <ElTableColumn prop="threshold" label="阈值" width="100" />
        <ElTableColumn label="动作" width="100">
          <template #default="{ row }">
            <ElTag :type="row.action === 'block' ? 'danger' : 'warning'">
              {{ row.action === 'block' ? '阻断' : '告警' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="createTime" label="创建时间" width="160" />
        <ElTableColumn prop="creator" label="创建人" width="100" />
        <ElTableColumn prop="updater" label="更新人" width="100" />
        <ElTableColumn prop="updateTime" label="更新时间" width="160" />
        <ElTableColumn label="操作" width="180">
          <template #default="{ row }">
            <div class="action-buttons">
              <ElButton type="primary" size="small" @click="showDetail(row.id)">
                <ElIcon><View /></ElIcon>
              </ElButton>
              <ElButton type="warning" size="small" @click="editRule(row.id)">
                <ElIcon><Edit /></ElIcon>
              </ElButton>
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
      width="70%"
      top="5vh"
      class="detail-dialog"
    >
      <div v-if="currentRule" class="detail-content">
        <div class="detail-grid">
          <div class="detail-item">
            <label>序号</label>
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
                  currentRule.type === 'ddos'
                    ? 'danger'
                    : currentRule.type === 'injection'
                      ? 'warning'
                      : currentRule.type === 'xss'
                        ? 'success'
                        : 'info'
                "
              >
                {{
                  currentRule.type === 'ddos'
                    ? 'DDoS防护'
                    : currentRule.type === 'injection'
                      ? '注入攻击'
                      : currentRule.type === 'xss'
                        ? 'XSS攻击'
                        : currentRule.type === 'cc'
                          ? 'CC攻击'
                          : '爬虫防护'
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
            <label>阈值</label>
            <div class="detail-value">{{ currentRule.threshold }}</div>
          </div>
          <div class="detail-item">
            <label>动作</label>
            <div class="detail-value">
              <ElTag
                :type="currentRule.action === 'block' ? 'danger' : 'warning'"
              >
                {{ currentRule.action === 'block' ? '阻断' : '告警' }}
              </ElTag>
            </div>
          </div>
          <div class="detail-item">
            <label>创建时间</label>
            <div class="detail-value">{{ currentRule.createTime }}</div>
          </div>
          <div class="detail-item">
            <label>创建人</label>
            <div class="detail-value">{{ currentRule.creator }}</div>
          </div>
          <div class="detail-item">
            <label>更新时间</label>
            <div class="detail-value">{{ currentRule.updateTime }}</div>
          </div>
          <div class="detail-item">
            <label>更新人</label>
            <div class="detail-value">{{ currentRule.updater }}</div>
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
          <ElSelect
            v-model="ruleForm.type"
            placeholder="请选择规则类型"
            :disabled="isEditMode"
          >
            <ElOption label="DDoS防护" value="ddos" />
            <ElOption label="注入攻击" value="injection" />
            <ElOption label="XSS攻击" value="xss" />
            <ElOption label="CC攻击" value="cc" />
            <ElOption label="爬虫防护" value="bot" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="规则状态" prop="status">
          <ElSwitch
            v-model="ruleForm.status"
            active-text="启用"
            inactive-text="禁用"
          />
        </ElFormItem>
        <ElFormItem label="触发阈值" prop="threshold" required>
          <ElInput
            v-model.number="ruleForm.threshold"
            type="number"
            placeholder="请输入触发阈值"
          >
            <template #append>
              <span v-if="ruleForm.type === 'ddos'">请求/秒</span>
              <span v-else-if="ruleForm.type === 'cc'">请求/分钟</span>
              <span v-else>次</span>
            </template>
          </ElInput>
        </ElFormItem>
        <ElFormItem label="触发动作" prop="action" required>
          <ElSelect v-model="ruleForm.action" placeholder="请选择触发动作">
            <ElOption label="阻断" value="block" />
            <ElOption label="告警" value="alert" />
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
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
