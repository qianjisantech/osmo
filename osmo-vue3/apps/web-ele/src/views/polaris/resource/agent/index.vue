<script lang="ts" setup>
import type { ResourceAgentNamespace } from '#/types/resource/agent';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Grid, Menu, Plus, RefreshLeft, Search } from '@element-plus/icons-vue';
import {
  ElButton,
  ElButtonGroup,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElPagination,
  ElProgress,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import { useAgentStore } from '#/store';
import AgentConsoleDrawer from '#/views/polaris/resource/agent/components/AgentConsoleDrawer.vue';
import AgentDetailDialog from '#/views/polaris/resource/agent/components/AgentDetailDialog.vue';
import AgentFormDialog from '#/views/polaris/resource/agent/components/AgentFormDialog.vue';

import AgentCard from './components/AgentCard.vue';
import StatCard from './components/StatCard.vue';

// 状态类型定义
type StatusKey = 'error' | 'healthy' | 'offline' | 'warning';

interface StatusMapping {
  text: string;
  tagType: 'danger' | 'info' | 'success' | 'warning';
  icon: string;
  color: string;
}

// 状态映射配置
const statusMappings: Record<StatusKey, StatusMapping> = {
  healthy: {
    text: '健康',
    tagType: 'success',
    icon: 'SuccessFilled',
    color: 'green',
  },
  warning: {
    text: '警告',
    tagType: 'warning',
    icon: 'WarningFilled',
    color: 'orange',
  },
  error: {
    text: '异常',
    tagType: 'danger',
    icon: 'CircleCloseFilled',
    color: 'red',
  },
  offline: {
    text: '离线',
    tagType: 'info',
    icon: 'Connection',
    color: 'gray',
  },
};

// 类型守卫函数
function isStatusKey(status: string): status is StatusKey {
  return status in statusMappings;
}

// 获取状态映射
const getStatusMapping = (status: string): StatusMapping => {
  const defaultMapping: StatusMapping = {
    text: '未知',
    tagType: 'info',
    icon: 'QuestionFilled',
    color: 'gray',
  };

  if (isStatusKey(status)) {
    return statusMappings[status];
  }
  return defaultMapping;
};

// 获取状态标签信息
const getStatusTag = (status: string) => {
  const mapping = getStatusMapping(status);
  return {
    type: mapping.tagType,
    text: mapping.text,
    icon: mapping.icon,
    color: mapping.color,
  };
};

const agentStore = useAgentStore();

// 响应式数据
const agents = computed(() => agentStore.agentQueryPageResult.records || []);
const board = computed(
  () =>
    agentStore.agentQueryPageResult.board || {
      total: 0,
      healthy: 0,
      warning: 0,
      error: 0,
      offline: 0,
    },
);
const loading = ref(false);
const page = ref(1);
const page_size = ref(10);
const showFormDialog = ref(false);
const showDetailDialog = ref(false);
const showConsoleDrawer = ref(false);
const currentMode = ref<'create' | 'edit'>('create');
const currentId = ref('');
const viewMode = ref<'card' | 'table'>('card');
const filterCollapse = ref(['filter']);

// 筛选表单
const filterForm = reactive({
  page: page.value,
  page_size: page_size.value,
  status: 'all',
  keyword: '',
  execute_status: 'all',
});

// 分页后的数据
const paginated_agents = computed(() => {
  const start = (page.value - 1) * page_size.value;
  const end = start + page_size.value;
  return agents.value.slice(start, end);
});

// 获取进度条颜色
const getProgressColor = (percentage: number) => {
  if (percentage > 80) return '#f56c6c';
  if (percentage > 60) return '#e6a23c';
  return '#67c23a';
};

// 刷新数据
const handleRefreshData = async () => {
  try {
    loading.value = true;
    await agentStore.queryPage({
      ...filterForm,
      status: filterForm.status === 'all' ? undefined : filterForm.status,
      execute_status:
        filterForm.execute_status === 'all'
          ? undefined
          : filterForm.execute_status,
    });
    // 重置到第一页
    page.value = 1;
  } catch (error) {
    console.error('加载执行机列表失败:', error);
  } finally {
    loading.value = false;
  }
};

// 重置筛选
const handleReset = () => {
  Object.assign(filterForm, {
    status: 'all',
    execute_status: 'all',
    keyword: '',
    page: 1,
    page_size: 10,
  });
  page.value = 1;
  page_size.value = 10;
  handleRefreshData();
};

// 打开详情
const showDetail = (agent: ResourceAgentNamespace.Agent) => {
  currentId.value = agent.id as string;
  showDetailDialog.value = true;
};

// 打开创建弹窗
const openCreateDialog = () => {
  currentMode.value = 'create';
  showFormDialog.value = true;
};

// 打开编辑弹窗
const openEditDialog = (id: string) => {
  currentMode.value = 'edit';
  currentId.value = id;
  showFormDialog.value = true;
};

// 打开控制台
const openConsoleDrawer = (agent: ResourceAgentNamespace.Agent) => {
  currentId.value = agent.id as string;
  showConsoleDrawer.value = true;
};

// 组件挂载时加载数据
onMounted(() => {
  handleRefreshData();
});
</script>

<template>
  <Page>
    <div class="flex flex-col gap-5">
      <ElCard>
        <!-- 操作按钮 -->
        <div class="mb-4 flex flex-wrap gap-2">
          <ElButton
            type="primary"
            @click="handleRefreshData"
            :loading="loading"
          >
            <ElIcon class="mr-1"><Search /></ElIcon>
            查询
          </ElButton>
          <ElButton @click="handleReset" :disabled="loading">
            <ElIcon class="mr-1"><RefreshLeft /></ElIcon>
            重置
          </ElButton>
          <ElButton type="primary" @click="openCreateDialog">
            <ElIcon class="mr-1"><Plus /></ElIcon>
            新增
          </ElButton>
        </div>

        <!-- 筛选表单 -->
        <ElCollapse v-model="filterCollapse" class="mb-6">
          <ElCollapseItem name="filter">
            <ElForm :inline="true" :model="filterForm" class="filter-form">
              <ElFormItem label="状态">
                <ElSelect
                  v-model="filterForm.status"
                  placeholder="全部"
                  clearable
                  class="min-w-[120px]"
                >
                  <ElOption label="全部" value="all" />
                  <ElOption label="健康" value="healthy" />
                  <ElOption label="警告" value="warning" />
                  <ElOption label="异常" value="error" />
                  <ElOption label="离线" value="offline" />
                </ElSelect>
              </ElFormItem>
              <ElFormItem label="执行状态">
                <ElSelect
                  v-model="filterForm.execute_status"
                  placeholder="全部"
                  clearable
                  class="min-w-[120px]"
                >
                  <ElOption label="全部" value="all" />
                  <ElOption label="空闲" value="idle" />
                  <ElOption label="忙碌" value="busy" />
                </ElSelect>
              </ElFormItem>
              <ElFormItem label="搜索">
                <ElInput
                  v-model="filterForm.keyword"
                  placeholder="执行机名称/IP"
                  clearable
                  class="min-w-[300px]"
                >
                  <template #prefix>
                    <ElIcon><Search /></ElIcon>
                  </template>
                </ElInput>
              </ElFormItem>
            </ElForm>
          </ElCollapseItem>
        </ElCollapse>

        <!-- 统计看板 -->
        <div class="mb-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <StatCard
              title="执行机总数"
              :value="board.total"
              icon="Cpu"
              color="black"
            />
            <StatCard
              title="健康"
              :value="board.healthy"
              icon="SuccessFilled"
              color="green"
            />
            <StatCard
              title="警告"
              :value="board.warning"
              icon="WarningFilled"
              color="orange"
            />
            <StatCard
              title="异常"
              :value="board.error"
              icon="CircleCloseFilled"
              color="red"
            />
            <StatCard
              title="离线"
              :value="board.offline"
              icon="Connection"
              color="gray"
            />
          </div>
        </div>

        <!-- 执行机列表 -->
        <div v-loading="loading">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-medium">执行机列表</h3>
            <div class="flex items-center gap-2">
              <ElButtonGroup>
                <ElButton
                  :type="viewMode === 'card' ? 'primary' : ''"
                  @click="viewMode = 'card'"
                >
                  <ElIcon><Grid /></ElIcon>
                </ElButton>
                <ElButton
                  :type="viewMode === 'table' ? 'primary' : ''"
                  @click="viewMode = 'table'"
                >
                  <ElIcon><Menu /></ElIcon>
                </ElButton>
              </ElButtonGroup>
            </div>
          </div>

          <!-- 卡片视图 -->
          <div
            v-if="viewMode === 'card'"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AgentCard
              v-for="agent in paginated_agents"
              :key="agent.id"
              :agent="agent"
              @detail="showDetail(agent)"
              @console="openConsoleDrawer(agent)"
            />
          </div>

          <!-- 表格视图 -->
          <ElTable
            v-else
            :data="paginated_agents"
            stripe
            style="width: 100%"
            v-loading="loading"
          >
            <ElTableColumn prop="id" label="ID" width="180" />
            <ElTableColumn prop="name" label="名称" />
            <ElTableColumn prop="ip" label="IP地址" />
            <ElTableColumn label="状态" width="120">
              <template #default="{ row }">
                <ElTag :type="getStatusTag(row.status).type" size="small">
                  <ElIcon :class="`text-${getStatusTag(row.status).color}`">
                    <component :is="getStatusTag(row.status).icon" />
                  </ElIcon>
                  {{ getStatusTag(row.status).text }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="CPU" width="180">
              <template #default="{ row }">
                <ElProgress
                  :percentage="row.cpu"
                  :color="getProgressColor(row.cpu)"
                  :show-text="false"
                />
                <span class="ml-2">{{ row.cpu }}%</span>
              </template>
            </ElTableColumn>
            <ElTableColumn label="内存" width="180">
              <template #default="{ row }">
                <ElProgress
                  :percentage="row.memory"
                  :color="getProgressColor(row.memory)"
                  :show-text="false"
                />
                <span class="ml-2">{{ row.memory }}%</span>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="300">
              <template #default="{ row }">
                <ElButton size="small" @click="showDetail(row)">详情</ElButton>
                <ElButton
                  size="small"
                  type="primary"
                  @click="openEditDialog(row.id)"
                >
                  编辑
                </ElButton>
                <ElButton
                  size="small"
                  type="primary"
                  @click="openConsoleDrawer(row)"
                >
                  控制台
                </ElButton>
                <ElButton
                  size="small"
                  type="danger"
                  @click="openConsoleDrawer(row)"
                >
                  删除
                </ElButton>
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
              :total="agents.length"
              @size-change="handleRefreshData"
              @current-change="handleRefreshData"
            />
          </div>
        </div>
      </ElCard>
    </div>

    <!-- 动态弹窗 -->
    <AgentFormDialog
      v-model="showFormDialog"
      :mode="currentMode"
      :id="currentMode === 'edit' ? currentId : undefined"
      @submit="handleRefreshData"
    />

    <AgentDetailDialog
      v-model="showDetailDialog"
      :id="currentId"
      @restart="handleRefreshData"
    />

    <AgentConsoleDrawer
      v-model="showConsoleDrawer"
      :id="currentId"
      @close="showConsoleDrawer = false"
    />
  </Page>
</template>

<style lang="scss" scoped>
.filter-form {
  @apply flex flex-wrap gap-4;
}

:deep(.el-collapse-item__header) {
  @apply font-medium text-gray-700;
}

:deep(.el-collapse-item__content) {
  @apply pt-4;
}
</style>
