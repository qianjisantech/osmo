<script lang="ts" setup>
import { computed } from 'vue';
import JsonViewer from 'vue-json-viewer';

import { ElCard, ElDialog } from 'element-plus';

const props = defineProps({
  modelValue: Boolean,
  // eslint-disable-next-line vue/require-default-prop
  detailData: Object,
});

const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

// 安全的 JSON 解析
const parseJson = (str: string) => {
  try {
    return str ? JSON.parse(str) : {};
  } catch (error) {
    console.error('JSON 解析错误:', error);
    return str || '无效的 JSON 数据';
  }
};
</script>

<template>
  <ElDialog
    v-model="visible"
    title="流量详情"
    width="80%"
    top="5vh"
    destroy-on-close
  >
    <div v-if="detailData" class="detail-container">
      <!-- 请求信息 -->
      <ElCard shadow="never" class="mb-4">
        <template #header>
          <div class="font-bold">请求信息</div>
        </template>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="detail-item">
              <span class="label">请求地址:</span>
              <div class="value">{{ detailData.url }}</div>
            </div>
            <div class="detail-item">
              <span class="label">请求方式:</span>
              <div class="value">{{ detailData.method }}</div>
            </div>
            <div class="detail-item">
              <span class="label">HTTP 类型:</span>
              <div class="value">{{ detailData.http_type }}</div>
            </div>
          </div>

          <div>
            <div class="detail-item">
              <span class="label">录制时间:</span>
              <div class="value">{{ detailData.record_time }}</div>
            </div>
          </div>
        </div>
      </ElCard>

      <!-- 请求头 -->
      <ElCard shadow="never" class="mb-4">
        <template #header>
          <div class="font-bold">请求头</div>
        </template>
        <JsonViewer
          :value="parseJson(detailData.request_headers)"
          copyable
          boxed
        />
      </ElCard>

      <!-- 请求体 -->
      <ElCard shadow="never" class="mb-4">
        <template #header>
          <div class="font-bold">请求体</div>
        </template>
        <JsonViewer
          :value="parseJson(detailData.request_body)"
          copyable
          boxed
        />
      </ElCard>

      <!-- 响应信息 -->
      <div class="grid grid-cols-2 gap-4">
        <!-- 响应头 -->
        <ElCard shadow="never" class="mb-4">
          <template #header>
            <div class="font-bold">响应头</div>
          </template>
          <JsonViewer
            :value="parseJson(detailData.response_headers)"
            copyable
            boxed
          />
        </ElCard>

        <!-- 响应体 -->
        <ElCard shadow="never" class="mb-4">
          <template #header>
            <div class="font-bold">响应体</div>
          </template>
          <JsonViewer
            :value="parseJson(detailData.response_body)"
            copyable
            boxed
          />
        </ElCard>
      </div>
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
.detail-container {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0 10px;
}

.detail-item {
  margin-bottom: 12px;

  .label {
    font-weight: bold;
    color: #606266;
    margin-right: 8px;
  }

  .value {
    word-break: break-all;
  }
}

/* 调整卡片样式 */
.el-card {
  :deep(.el-card__header) {
    padding: 12px 20px;
    background-color: #f5f7fa;
  }

  :deep(.el-card__body) {
    padding: 16px 20px;
  }
}
</style>
