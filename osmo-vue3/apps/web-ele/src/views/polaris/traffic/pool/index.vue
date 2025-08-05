<script lang="ts" setup>
import type { CollapseModelValue } from 'element-plus';

import type { TrafficPoolNamespace } from '#/types/traffic/pool';

import { computed, onMounted, reactive, ref } from 'vue';

import {
  CaretRight,
  Delete,
  Edit,
  Refresh,
  Search,
  View,
} from '@element-plus/icons-vue';
import {
  ElButton,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElIcon,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import { useTrafficPoolStore } from '#/store';

const activeNames = ref(['1']);
const handleChange = (val: CollapseModelValue) => {
  console.log(val);
};
const page = ref(1);
const page_size = ref(10);
// 查询条件
const filterForm = reactive({
  keyword: '',
  page: page.value,
  page_size: page_size.value,
});

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const trafficPoolStore = useTrafficPoolStore();

// 响应式数据
const pools = computed(
  () => trafficPoolStore.trafficPoolQueryPageResult.records,
);
// 详情弹窗
const detailDialogVisible = ref(false);
const currentPool = ref<null | TrafficPoolNamespace.TrafficPool>(null);

// const showDetail = (pool: TrafficPoolNamespace.TrafficPool) => {
//   currentPool.value = pool;
//   detailDialogVisible.value = true;
// };
const loading = ref(false);
const handleSearch = async () => {
  try {
    loading.value = true;
    await trafficPoolStore.queryPage({
      ...filterForm,
    });
    // 重置到第一页
    page.value = 1;
  } catch (error) {
    console.error('加载执行机列表失败:', error);
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {};

const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
};
const handleEdit = (id: string) => {
  console.log(id);
};
// 组件挂载时加载数据
onMounted(() => {
  handleSearch();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <!-- 查询区域 -->
    <ElCard class="mb-6">
      <div class="mb-2 flex items-start justify-between">
        <div class="flex space-x-3">
          <ElButton @click="handleReset">
            <ElIcon class="mr-1"><Refresh /></ElIcon>
            重置
          </ElButton>
          <ElButton type="primary" @click="handleSearch">
            <ElIcon class="mr-1"><Search /></ElIcon>
            查询
          </ElButton>
        </div>
      </div>

      <ElCollapse v-model="activeNames" @change="handleChange">
        <ElCollapseItem name="1" :icon="CaretRight">
          <div
            class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">关键词查询</label>
              <ElSelect
                v-model="filterForm.keyword"
                placeholder="关键词查询"
                clearable
                class="w-full"
              >
                <ElOption label="GET" value="GET" />
                <ElOption label="POST" value="POST" />
                <ElOption label="PUT" value="PUT" />
                <ElOption label="DELETE" value="DELETE" />
              </ElSelect>
            </div>
          </div>
        </ElCollapseItem>
      </ElCollapse>

      <div>
        <ElTable :data="pools" style="width: 100%">
          <ElTableColumn prop="id" label="序号" width="200" />
          <ElTableColumn prop="url" label="地址" />
          <ElTableColumn prop="method" label="请求方式" />
          <ElTableColumn prop="method" label="录制时间" />
          <ElTableColumn label="操作" width="180">
            <template #default="{ row }">
              <div class="action-buttons">
                <ElButton type="primary" size="small">
                  <ElIcon><View /></ElIcon>
                </ElButton>
                <ElButton type="warning" size="small">
                  <ElIcon><Edit @click="handleEdit(row.id)" /></ElIcon>
                </ElButton>
                <ElButton type="danger" size="small">
                  <ElIcon><Delete /></ElIcon>
                </ElButton>
              </div>
            </template>
          </ElTableColumn>
        </ElTable>

        <ElPagination
          class="mt-4"
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :small="false"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pools.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </ElCard>
    <!-- 详情弹窗 -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 100%;
}

@keyframes wave {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
</style>
