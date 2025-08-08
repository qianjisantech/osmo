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
import dayjs from 'dayjs'; // 推荐使用 dayjs 处理日期
import {
  ElButton,
  ElCard,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElPagination,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import { useTrafficPoolStore } from '#/store';

import TrafficDetailDialog from './components/TrafficDetailDialog.vue';

const activeNames = ref(['1']);
const handleChange = (val: CollapseModelValue) => {
  console.log(val);
};
const page = ref(1);
const page_size = ref(10);
// 计算默认日期范围
const getDefaultDateRange = () => {
  const now = dayjs();
  return [
    now.subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    now.add(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
  ];
};
// 查询条件
const filterForm = reactive({
  keyword: '',
  method: 'all',
  record_time_range: [] as string[], // 明确类型为字符串数组
  page: page.value,
  page_size: page_size.value,
});
// 组件挂载时设置默认日期范围

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
// 详情对话框状态
const detailDialogVisible = ref(false);
const currentPool = ref<any>(null);

// 查看详情方法
const showDetail = (pool: TrafficPoolNamespace.TrafficPool) => {
  currentPool.value = pool;
  detailDialogVisible.value = true;
};
const loading = ref(false);
const handleSearch = async () => {
  try {
    loading.value = true;

    const { method, ...rest } = filterForm;
    const requestParams = {
      ...rest,
      ...(method !== 'all' && { method }), // 仅当 method 不是 'all' 时包含该字段
    };

    await trafficPoolStore.queryPage(requestParams);
    page.value = 1;
  } catch (error) {
    console.error('加载流量列表失败:', error);
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
  filterForm.record_time_range = getDefaultDateRange();
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
          <ElForm label-width="80px" class="filter-form">
            <ElRow :gutter="16" class="filter-row">
              <!-- 关键字 -->
              <ElCol :span="6">
                <ElFormItem label="地址" class="filter-item">
                  <ElInput
                    v-model="filterForm.keyword"
                    placeholder="请输入地址"
                    clearable
                    style="width: 300px"
                  />
                </ElFormItem>
              </ElCol>

              <!-- 请求方式 -->
              <ElCol :span="8">
                <ElFormItem label="请求方式" class="filter-item">
                  <ElSelect
                    v-model="filterForm.method"
                    placeholder="请求方式"
                    clearable
                    style="width: 200px"
                  >
                    <ElOption label="全部" value="all" />
                    <ElOption label="GET" value="GET" />
                    <ElOption label="POST" value="POST" />
                    <ElOption label="PUT" value="PUT" />
                    <ElOption label="DELETE" value="DELETE" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>

              <!-- 录制时间 -->
              <ElCol :span="8">
                <ElFormItem label="录制时间" width="100" class="filter-item">
                  <ElDatePicker
                    v-model="filterForm.record_time_range"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :default-time="[
                      new Date(2000, 1, 1, 0, 0, 0),
                      new Date(2000, 1, 1, 23, 59, 59),
                    ]"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    class="w-full"
                  />
                </ElFormItem>
              </ElCol>
            </ElRow>
          </ElForm>
        </ElCollapseItem>
      </ElCollapse>
      <div>
        <ElTable :data="pools" style="width: 100%">
          <ElTableColumn prop="id" label="序号" width="200" />
          <ElTableColumn prop="url" label="地址" width="700" />
          <ElTableColumn prop="method" label="请求方式" />
          <ElTableColumn prop="record_time" label="录制时间" />
          <ElTableColumn label="操作" width="180">
            <template #default="{ row }">
              <div class="action-buttons">
                <ElButton type="primary" size="small" @click="showDetail(row)">
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

    <TrafficDetailDialog
      v-model="detailDialogVisible"
      :detail-data="currentPool"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 100%;
}

/* 查询表单样式 */
.filter-form {
  padding: 0;
}

.filter-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.filter-item {
  width: 100%;
  margin-bottom: 0;
}

/* 操作按钮间距 */
.action-buttons {
  display: flex;
  gap: 8px;
}
</style>
