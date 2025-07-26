<script lang="ts" setup>
import type { CollapseModelValue } from 'element-plus';

import { computed, ref } from 'vue';

import { CaretRight, Refresh, Search } from '@element-plus/icons-vue';
import {
  ElButton,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElDatePicker,
  ElDialog,
  ElIcon,
  ElInput,
  ElMessage,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag
} from 'element-plus';

interface TrafficPool {
  id: string;
  name: string;
  capacity: number;
  usage: number;
  status: number; // 0: 空闲, 1: 正常, 2: 繁忙, 3: 超载
  inRate: number;
  outRate: number;
  totalTraffic: number;
  domain: string;
  method: string;
  time: string;
  apiPath: string;
  requestHeaders: Record<string, string>;
  requestBody: string;
  responseHeaders: Record<string, string>;
  responseBody: string;
}
const activeNames = ref(['1']);
const handleChange = (val: CollapseModelValue) => {
  console.log(val);
};
// 模拟数据 - 流量池
const pools = ref<TrafficPool[]>([
  {
    id: '1',
    name: '核心业务池',
    capacity: 1000,
    usage: 45,
    status: 1,
    inRate: 120,
    outRate: 80,
    totalTraffic: 450,
    domain: 'api.example.com',
    method: 'GET',
    time: '2025-06-25 14:32:45',
    apiPath: '/api/v1/users',
    requestHeaders: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      Accept: 'application/json',
    },
    requestBody: '',
    responseHeaders: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Request-ID': '8f7d9e2a-1b3c-4d5e-6f7g-8h9i0j1k2l3m',
    },
    responseBody: JSON.stringify(
      {
        users: [
          {
            id: 1,
            name: '张伟',
            email: 'zhang.wei@example.com',
          },
          {
            id: 2,
            name: '李娜',
            email: 'li.na@example.com',
          },
        ],
        total: 2,
        page: 1,
        limit: 10,
      },
      null,
      2,
    ),
  },
  {
    id: '2',
    name: '数据分析池',
    capacity: 800,
    usage: 82,
    status: 2,
    inRate: 320,
    outRate: 280,
    totalTraffic: 656,
    domain: 'data.example.com',
    method: 'POST',
    time: '2025-06-24 09:15:22',
    apiPath: '/api/v1/analytics',
    requestHeaders: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      Accept: 'application/json',
    },
    requestBody: JSON.stringify(
      {
        startDate: '2025-06-01',
        endDate: '2025-06-24',
        metrics: ['visits', 'conversions'],
      },
      null,
      2,
    ),
    responseHeaders: {
      'Content-Type': 'application/json',
      'X-Request-ID': '2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p',
    },
    responseBody: JSON.stringify(
      {
        data: {
          visits: 12_000,
          conversions: 850,
          conversionRate: 0.0708,
        },
        status: 'success',
      },
      null,
      2,
    ),
  },
  {
    id: '3',
    name: '备份存储池',
    capacity: 500,
    usage: 15,
    status: 0,
    inRate: 30,
    outRate: 25,
    totalTraffic: 75,
    domain: 'storage.example.com',
    method: 'PUT',
    time: '2025-06-23 16:45:10',
    apiPath: '/api/v1/backups',
    requestHeaders: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      Accept: 'application/json',
    },
    requestBody: JSON.stringify(
      {
        backupId: 'backup-20250623',
        description: 'Daily database backup',
      },
      null,
      2,
    ),
    responseHeaders: {
      'Content-Type': 'application/json',
      'X-Request-ID': '3b4c5d6e-7f8g-9h0i-1j2k-3l4m5n6o7p8q',
    },
    responseBody: JSON.stringify(
      {
        status: 'success',
        message: 'Backup initiated',
        backupId: 'backup-20250623',
        estimatedSize: '45GB',
      },
      null,
      2,
    ),
  },
  {
    id: '4',
    name: '视频流池',
    capacity: 1500,
    usage: 93,
    status: 3,
    inRate: 580,
    outRate: 520,
    totalTraffic: 1395,
    domain: 'stream.example.com',
    method: 'GET',
    time: '2025-06-22 10:30:15',
    apiPath: '/api/v1/videos/12345/stream',
    requestHeaders: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      Accept: 'application/json',
    },
    requestBody: '',
    responseHeaders: {
      'Content-Type': 'video/mp4',
      'Content-Length': '1024000',
      'X-Request-ID': '4c5d6e7f-8g9h-0i1j-2k3l-4m5n6o7p8q9r',
    },
    responseBody: '[Binary video data]',
  },
]);

// 查询条件
const queryParams = ref({
  name: '',
  domain: '',
  dateRange: ['', ''],
  status: '',
  method: '',
});

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

// 详情弹窗
const detailDialogVisible = ref(false);
const currentPool = ref<null | TrafficPool>(null);

// 状态文本
const getStatusText = (status: number) => {
  return ['空闲', '正常', '繁忙', '超载'][status] || '未知';
};

const getStatusTagType = (status: number) => {
  return ['info', 'success', 'warning', 'danger'][status] || '';
};

// 统计信息
computed(() => {
  return pools.value.reduce((sum, pool) => sum + pool.capacity, 0);
});
computed(() => {
  return pools.value.reduce(
    (sum, pool) => sum + Math.round((pool.capacity * pool.usage) / 100),
    0,
  );
});
computed(() => {
  return pools.value.filter((pool) => pool.status > 0).length;
});
computed(() => {
  return pools.value.filter((pool) => pool.status === 3).length;
});
const showDetail = (pool: TrafficPool) => {
  currentPool.value = pool;
  detailDialogVisible.value = true;
};

const handleSearch = () => {
  // 在实际应用中，这里应该是根据查询条件过滤数据
  ElMessage.success('查询成功');
};

const handleReset = () => {
  queryParams.value = {
    name: '',
    domain: '',
    dateRange: ['', ''],
    status: '',
    method: '',
  };
  ElMessage.success('重置成功');
};

const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
};
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
              <label class="mb-1 block text-sm font-medium text-gray-700">流量池名称</label>
              <ElInput
                v-model="queryParams.name"
                placeholder="请输入流量池名称"
                clearable
              >
                <template #prefix>
                  <i class="ri-link-m-line"></i>
                </template>
              </ElInput>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">域名</label>
              <ElInput
                v-model="queryParams.domain"
                placeholder="请输入域名"
                clearable
              >
                <template #prefix>
                  <i class="ri-global-line"></i>
                </template>
              </ElInput>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">录制时间</label>
              <ElDatePicker
                v-model="queryParams.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="w-full"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">状态</label>
              <ElSelect
                v-model="queryParams.status"
                placeholder="请选择状态"
                clearable
                class="w-full"
              >
                <ElOption label="空闲" value="0" />
                <ElOption label="正常" value="1" />
                <ElOption label="繁忙" value="2" />
                <ElOption label="超载" value="3" />
              </ElSelect>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">请求方式</label>
              <ElSelect
                v-model="queryParams.method"
                placeholder="请选择请求方式"
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
          <ElTableColumn prop="id" label="序号" width="80" />
          <ElTableColumn prop="name" label="流量池名称" />
          <ElTableColumn prop="domain" label="域名" />
          <ElTableColumn label="接口地址">
            <template #default="{ row }">
              {{ row?.domain }}{{ row?.apiPath }}
            </template>
          </ElTableColumn>
          <ElTableColumn prop="method" label="请求方式" width="120">
            <template #default="{ row }">
              <ElTag
                :type="
                  row.method === 'GET'
                    ? 'primary'
                    : row.method === 'POST'
                      ? 'success'
                      : row.method === 'PUT'
                        ? 'warning'
                        : 'danger'
                "
              >
                {{ row.method }}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="time" label="录制时间" width="180" />
          <ElTableColumn label="状态" width="120">
            <template #default="{ row }">
              <ElTag :type="getStatusTagType(row.status)" size="small">
                {{ getStatusText(row.status) }}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="120">
            <template #default="{ row }">
              <ElButton type="primary" size="small" @click="showDetail(row)">
                查看
              </ElButton>
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
    <ElDialog
      v-model="detailDialogVisible"
      title="接口详情"
      width="70%"
      top="5vh"
    >
      <div v-if="currentPool" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">流量池名称</label>
            <div class="rounded bg-gray-50 p-2">{{ currentPool.name }}</div>
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">状态</label>
            <div class="rounded bg-gray-50 p-2">
              <ElTag :type="getStatusTagType(currentPool.status)" size="small">
                {{ getStatusText(currentPool.status) }}
              </ElTag>
            </div>
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >完整URL</label>
          <div class="rounded bg-gray-50 p-2 font-mono">
            {{ currentPool.domain }}{{ currentPool.apiPath }}
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >请求方式</label
          >
          <div class="rounded bg-gray-50 p-2">
            <ElTag
              :type="
                currentPool.method === 'GET'
                  ? 'primary'
                  : currentPool.method === 'POST'
                    ? 'success'
                    : currentPool.method === 'PUT'
                      ? 'warning'
                      : 'danger'
              "
            >
              {{ currentPool.method }}
            </ElTag>
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">请求头</label>
          <div
            class="max-h-40 overflow-y-auto whitespace-pre-wrap rounded bg-gray-50 p-2 font-mono"
          >
            {{ JSON.stringify(currentPool.requestHeaders, null, 2) }}
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">请求体</label>
          <div
            class="max-h-40 overflow-y-auto whitespace-pre-wrap rounded bg-gray-50 p-2 font-mono"
          >
            {{ currentPool.requestBody || '无请求体' }}
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">响应头</label>
          <div
            class="max-h-40 overflow-y-auto whitespace-pre-wrap rounded bg-gray-50 p-2 font-mono"
          >
            {{ JSON.stringify(currentPool.responseHeaders, null, 2) }}
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">响应体</label>
          <div
            class="max-h-40 overflow-y-auto whitespace-pre-wrap rounded bg-gray-50 p-2 font-mono"
          >
            {{ currentPool.responseBody }}
          </div>
        </div>
      </div>

      <template #footer>
        <ElButton @click="detailDialogVisible = false">关闭</ElButton>
      </template>
    </ElDialog>
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
