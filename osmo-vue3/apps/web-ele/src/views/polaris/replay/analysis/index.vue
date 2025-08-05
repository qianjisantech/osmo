<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';

import {
  CircleCheck,
  DataLine,
  Document,
  Download,
  Histogram,
  PieChart,
  Refresh,
  Search,
  Setting,
} from '@element-plus/icons-vue';
import {
  ElButton,
  ElCard,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElTag,
} from 'element-plus';

// 对比分析结果类型
interface ComparisonResult {
  id: number;
  ruleName: string;
  ruleType: string;
  requestCount: number;
  blockedCount: number;
  alertCount: number;
  successRate: number;
  avgResponseTime: number;
  errorRate: number;
  date: string;
}

// 模拟数据
const mockData: ComparisonResult[] = [
  {
    id: 1,
    ruleName: 'DDoS防护规则',
    ruleType: 'ddos',
    requestCount: 12_500,
    blockedCount: 1200,
    alertCount: 350,
    successRate: 90.5,
    avgResponseTime: 45,
    errorRate: 2.3,
    date: '2023-08-15',
  },
  {
    id: 2,
    ruleName: 'SQL注入防护',
    ruleType: 'injection',
    requestCount: 8500,
    blockedCount: 420,
    alertCount: 180,
    successRate: 94.2,
    avgResponseTime: 38,
    errorRate: 1.8,
    date: '2023-08-15',
  },
  {
    id: 3,
    ruleName: 'XSS攻击防护',
    ruleType: 'xss',
    requestCount: 9200,
    blockedCount: 380,
    alertCount: 210,
    successRate: 93.7,
    avgResponseTime: 42,
    errorRate: 2.1,
    date: '2023-08-15',
  },
  {
    id: 4,
    ruleName: 'DDoS防护规则',
    ruleType: 'ddos',
    requestCount: 14_200,
    blockedCount: 1800,
    alertCount: 420,
    successRate: 87.3,
    avgResponseTime: 52,
    errorRate: 3.5,
    date: '2023-08-14',
  },
  {
    id: 5,
    ruleName: 'SQL注入防护',
    ruleType: 'injection',
    requestCount: 7800,
    blockedCount: 380,
    alertCount: 150,
    successRate: 95.1,
    avgResponseTime: 36,
    errorRate: 1.5,
    date: '2023-08-14',
  },
];

// 查询参数
const queryParams = reactive({
  ruleName: '',
  ruleType: '',
  dateRange: [] as string[],
});

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: mockData.length,
});

// 过滤后的数据
const filteredData = computed(() => {
  return mockData.filter(
    (item) =>
      item.ruleName.includes(queryParams.ruleName) &&
      (queryParams.ruleType === '' || item.ruleType === queryParams.ruleType) &&
      (queryParams.dateRange.length === 0 ||
        (item.date >= queryParams.dateRange[0] &&
          item.date <= queryParams.dateRange[1])),
  );
});

// 表格数据
const tableData = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return filteredData.value.slice(start, end);
});

// 图表数据
computed(() => {
  const dataByRule: Record<string, any> = {};

  filteredData.value.forEach((item) => {
    if (!dataByRule[item.ruleName]) {
      dataByRule[item.ruleName] = {
        name: item.ruleName,
        type: item.ruleType,
        dates: [],
        requestCounts: [],
        blockedCounts: [],
        successRates: [],
        errorRates: [],
      };
    }

    const ruleData = dataByRule[item.ruleName];
    ruleData.dates.push(item.date);
    ruleData.requestCounts.push(item.requestCount);
    ruleData.blockedCounts.push(item.blockedCount);
    ruleData.successRates.push(item.successRate);
    ruleData.errorRates.push(item.errorRate);
  });

  return Object.values(dataByRule);
});
// 重置查询
const resetQuery = () => {
  queryParams.ruleName = '';
  queryParams.ruleType = '';
  queryParams.dateRange = [];
};

// 查询数据
const searchData = () => {
  pagination.currentPage = 1;
  pagination.total = filteredData.value.length;
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
  pagination.total = mockData.length;
});
</script>

<template>
  <div class="comparison-container">
    <ElCard class="comparison-card">
      <!-- 标题和操作按钮 -->
      <div class="header">
        <div class="actions">
          <ElButton type="primary" :icon="Download">导出报告</ElButton>
          <ElButton :icon="Setting">分析设置</ElButton>
        </div>
      </div>

      <!-- 查询区域 -->
      <div class="query-area">
        <ElForm :inline="true" class="query-form">
          <ElFormItem label="规则名称">
            <ElInput
              v-model="queryParams.ruleName"
              placeholder="请输入规则名称"
              clearable
            >
              <template #prefix>
                <ElIcon><Document /></ElIcon>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem label="规则类型">
            <ElSelect
              v-model="queryParams.ruleType"
              placeholder="请选择规则类型"
              clearable
            >
              <ElOption label="全部" value="" />
              <ElOption label="DDoS防护" value="ddos" />
              <ElOption label="注入攻击" value="injection" />
              <ElOption label="XSS攻击" value="xss" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="日期范围">
            <ElDatePicker
              v-model="queryParams.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton @click="resetQuery">
              <ElIcon><Refresh /></ElIcon>
              重置
            </ElButton>
            <ElButton type="primary" @click="searchData">
              <ElIcon><Search /></ElIcon>
              查询
            </ElButton>
          </ElFormItem>
        </ElForm>
      </div>

      <!-- 分析结果展示 -->
      <ElTabs type="border-card" class="analysis-tabs">
        <!-- 数据表格标签页 -->
        <ElTabPane label="数据明细">
          <ElTable :data="tableData" class="data-table" border stripe>
            <ElTableColumn prop="date" label="日期" width="120" fixed />
            <ElTableColumn prop="ruleName" label="规则名称" width="150" />
            <ElTableColumn label="规则类型" width="120">
              <template #default="{ row }">
                <ElTag
                  :type="
                    row.ruleType === 'ddos'
                      ? 'danger'
                      : row.ruleType === 'injection'
                        ? 'warning'
                        : 'success'
                  "
                >
                  {{
                    row.ruleType === 'ddos'
                      ? 'DDoS防护'
                      : row.ruleType === 'injection'
                        ? '注入攻击'
                        : 'XSS攻击'
                  }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn
              prop="requestCount"
              label="请求量"
              width="120"
              sortable
            />
            <ElTableColumn
              prop="blockedCount"
              label="拦截量"
              width="120"
              sortable
            />
            <ElTableColumn
              prop="alertCount"
              label="告警量"
              width="120"
              sortable
            />
            <ElTableColumn label="成功率" width="120" sortable>
              <template #default="{ row }"> {{ row.successRate }}% </template>
            </ElTableColumn>
            <ElTableColumn label="平均响应时间" width="140" sortable>
              <template #default="{ row }">
                {{ row.avgResponseTime }}ms
              </template>
            </ElTableColumn>
            <ElTableColumn label="错误率" width="120" sortable>
              <template #default="{ row }"> {{ row.errorRate }}% </template>
            </ElTableColumn>
          </ElTable>

          <!-- 分页 -->
          <div class="pagination-bar">
            <ElPagination
              v-model:current-page="pagination.currentPage"
              v-model:page-size="pagination.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </ElTabPane>

        <!-- 趋势分析标签页 -->
        <ElTabPane label="趋势分析">
          <div class="chart-container">
            <div class="chart-row">
              <div class="chart-card">
                <h3>请求量趋势</h3>
                <div class="chart-placeholder">
                  <ElIcon :size="40"><DataLine /></ElIcon>
                  <p>请求量趋势图表</p>
                </div>
              </div>
              <div class="chart-card">
                <h3>拦截量趋势</h3>
                <div class="chart-placeholder">
                  <ElIcon :size="40"><Histogram /></ElIcon>
                  <p>拦截量趋势图表</p>
                </div>
              </div>
            </div>
            <div class="chart-row">
              <div class="chart-card">
                <h3>成功率趋势</h3>
                <div class="chart-placeholder">
                  <ElIcon :size="40"><CircleCheck /></ElIcon>
                  <p>成功率趋势图表</p>
                </div>
              </div>
              <div class="chart-card">
                <h3>错误率趋势</h3>
                <div class="chart-placeholder">
                  <ElIcon :size="40"><PieChart /></ElIcon>
                  <p>错误率趋势图表</p>
                </div>
              </div>
            </div>
          </div>
        </ElTabPane>

        <!-- 规则对比标签页 -->
        <ElTabPane label="规则对比">
          <div class="comparison-chart">
            <h3>规则效果对比</h3>
            <div class="chart-placeholder large">
              <ElIcon :size="60"><Histogram /></ElIcon>
              <p>规则对比综合图表</p>
            </div>
          </div>
        </ElTabPane>
      </ElTabs>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
.comparison-container {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;

  .comparison-card {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #333;
      }

      .actions {
        display: flex;
        gap: 10px;
      }
    }

    .query-area {
      margin-bottom: 20px;

      .query-form {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        align-items: center;

        .el-form-item {
          margin-bottom: 0;
        }
      }
    }

    .analysis-tabs {
      margin-top: 20px;

      :deep(.el-tabs__content) {
        padding: 20px;
      }

      .data-table {
        margin-top: 10px;
        width: 100%;

        .el-table__cell {
          padding: 12px 0;
        }
      }

      .pagination-bar {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }

      .chart-container {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .chart-row {
          display: flex;
          gap: 20px;

          .chart-card {
            flex: 1;
            border: 1px solid #ebeef5;
            border-radius: 4px;
            padding: 15px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            h3 {
              margin-top: 0;
              margin-bottom: 15px;
              font-size: 1.1rem;
              color: #409eff;
            }

            .chart-placeholder {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 250px;
              background-color: #f5f7fa;
              border-radius: 4px;
              color: #909399;

              p {
                margin-top: 10px;
                font-size: 0.9rem;
              }
            }
          }
        }
      }

      .comparison-chart {
        h3 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.1rem;
          color: #409eff;
        }

        .chart-placeholder.large {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          background-color: #f5f7fa;
          border-radius: 4px;
          color: #909399;

          p {
            margin-top: 15px;
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style>
