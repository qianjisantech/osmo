<script lang="ts" setup>
import type { ResourceAgentNamespace } from '#/types/resource/agent';

import { computed, reactive, ref } from 'vue';

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
import AgentConsoleDrawer from '#/views/gosmo/resource/agent/components/AgentConsoleDrawer.vue';
import AgentDetailDialog from '#/views/gosmo/resource/agent/components/AgentDetailDialog.vue';
import AgentFormDialog from '#/views/gosmo/resource/agent/components/AgentFormDialog.vue';

import AgentCard from './components/AgentCard.vue';
import StatCard from './components/StatCard.vue';

type TagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';

const agentStore = useAgentStore();

const agents = computed(() => agentStore.agentQueryPageResult.records || []);
const board = computed(() => agentStore.agentQueryPageResult.board);
const page = ref(1);
const page_size = ref(10);
const paginated_agents = computed(() => {
  const start = (page.value - 1) * page_size.value;
  const end = start + page_size.value;
  return agents.value.slice(start, end);
});
const showFormDialog = ref(false);
const showDetailDialog = ref(false);
const showConsoleDrawer = ref(false);
const currentMode = ref<'create' | 'edit'>('create');
const currentId = ref('');
const viewMode = ref<'card' | 'table'>('card');
const filterCollapse = ref(['filter']); // 控制折叠面板的展开状态
// 筛选表单
const filterForm: ResourceAgentNamespace.AgentQueryPageParams = reactive({
  page: page.value,
  page_size: page_size.value,
  status: 'all',
  keyword: '',
});

// 状态处理方法
const getStatusText = (status: number) => {
  return ['离线', '健康', '警告', '异常'][status] || '待部署';
};

const getStatusTagType = (status: number) => {
  const types = ['error', 'success', 'warning', 'danger', 'primary'];
  return types[status] || 'primary';
};

const getProgressColor = (percentage: number) => {
  if (percentage > 80) return '#f56c6c';
  if (percentage > 60) return '#e6a23c';
  return '#67c23a';
};

// 修改后的刷新数据方法
const handleRefreshData = async () => {
  await agentStore.queryPage({
    ...filterForm,
    status: filterForm.status === 'all' ? undefined : filterForm.status,
  });
};
// 重置方法
const handleReset = () => {
  // 正确重置 reactive 对象
  Object.assign(filterForm, {
    status: 'all',
    keyword: '',
    page: 1, // 重置到第一页
    page_size: 10, // 重置默认分页大小
  });

  // 同步更新独立的 ref 值
  page.value = 1;
  page_size.value = 10;

  // 触发刷新
  handleRefreshData();
};
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

// 打开详情弹窗
const openDetailDialog = (id: string) => {
  currentId.value = id;
  showDetailDialog.value = true;
};
const handleCloseConsole = () => {};
const handleRestartAgent = () => {};
const openConsoleDrawer = (agent: ResourceAgentNamespace.Agent) => {
  currentId.value = agent.id as string;
  showConsoleDrawer.value = true;
};

handleRefreshData();
</script>

<template>
  <Page>
    <div class="flex flex-col gap-5">
      <!-- 整合所有内容到一个卡片中 -->
      <ElCard>
        <ElButton type="primary" @click="handleRefreshData" class="mb-4">
          <ElIcon class="mr-1"><Search /></ElIcon>
          查询
        </ElButton>
        <ElButton @click="handleReset" class="mb-4">
          <ElIcon class="mr-1"><RefreshLeft /></ElIcon>
          重置
        </ElButton>
        <ElButton type="primary" @click="openCreateDialog" class="mb-4">
          <ElIcon class="mr-1"><Plus /></ElIcon>
          新增
        </ElButton>
        <!-- 筛选工具栏 - 使用折叠面板包裹 -->
        <ElCollapse v-model="filterCollapse" class="mb-6">
          <ElCollapseItem name="filter">
            <ElForm :inline="true" :model="filterForm" class="filter-form">
              <ElFormItem label="状态">
                <ElSelect
                  placeholder="全部"
                  clearable
                  v-model="filterForm.status"
                  class="min-w-[120px]"
                >
                  <ElOption label="全部" value="all" />
                  <ElOption label="健康" value="healthy" />
                  <ElOption label="告警" value="warning" />
                  <ElOption label="异常" value="error" />
                  <ElOption label="离线" value="offline" />
                  <ElOption label="待部署" value="created" />
                </ElSelect>
              </ElFormItem>
              <ElFormItem label="搜索">
                <ElInput
                  v-model="filterForm.keyword"
                  placeholder="执行机名称"
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
              title="总执行机数"
              :value="board.total"
              icon="Cpu"
              color="black"
              class="text-center"
            />

            <StatCard
              title="健康执行机"
              :value="board.healthy"
              icon="SuccessFilled"
              color="green"
              class="text-center"
            />

            <StatCard
              title="告警执行机"
              :value="board.warning"
              icon="WarningFilled"
              color="orange"
              class="text-center"
            />

            <StatCard
              title="异常执行机"
              :value="board.error"
              icon="CircleCloseFilled"
              color="red"
              class="text-center"
            />

            <StatCard
              title="离线执行机"
              :value="board.offline"
              icon="Connection"
              color="gray"
              class="text-center"
            />
            <StatCard
              title="待部署执行机"
              :value="board.created"
              icon="Connection"
              color="blue"
              class="text-center"
            />
          </div>
        </div>

        <!-- 执行机列表 -->
        <div>
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
          <ElTable v-else :data="paginated_agents" stripe style="width: 100%">
            <ElTableColumn type="selection" width="55" />
            <ElTableColumn prop="id" label="ID" />
            <ElTableColumn prop="name" label="名称" />
            <ElTableColumn prop="ip" label="IP地址" />
            <ElTableColumn label="状态">
              <template #default="{ row }">
                <ElTag
                  :type="getStatusTagType(row.status) as TagType"
                  size="small"
                >
                  {{ getStatusText(row.status) }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="cpu" label="CPU">
              <template #default="{ row }">
                <ElProgress
                  :percentage="row.cpu"
                  :color="getProgressColor(row.cpu)"
                  :show-text="false"
                />
                <span class="ml-2">{{ row.cpu }}%</span>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="memory" label="内存">
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
                <ElButton size="small" @click="openDetailDialog(row.id)">
                  详情
                </ElButton>
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
      @restart="handleRestartAgent"
    />
    <AgentConsoleDrawer
      v-model="showConsoleDrawer"
      :id="currentId"
      @update:model-value="handleCloseConsole"
    />
  </Page>
</template>

<style lang="scss" scoped>
.filter-form {
  @apply flex flex-wrap gap-4;
}

/* 调整折叠面板样式 */
:deep(.el-collapse-item__header) {
  @apply font-medium text-gray-700;
}

:deep(.el-collapse-item__content) {
  @apply pt-4;
}
</style>
