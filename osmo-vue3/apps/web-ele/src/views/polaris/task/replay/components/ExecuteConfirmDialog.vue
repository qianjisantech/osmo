<script lang="ts" setup>
import { ElButton, ElDialog } from 'element-plus';

const props = defineProps({
  visible: Boolean,
  title: {
    type: String,
    default: '提示',
  },
  content: {
    type: String,
    default: '确定要执行此操作吗？',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
});

const emit = defineEmits(['update:visible', 'confirm', 'cancel']);

const handleConfirm = () => {
  emit('confirm');
  emit('update:visible', false);
};

const handleCancel = () => {
  emit('cancel');
  emit('update:visible', false);
};
</script>

<template>
  <ElDialog
    :model-value="visible"
    @update:model-value="(val) => emit('update:visible', val)"
    :title="title"
    width="500px"
    :close-on-click-modal="false"
  >
    <div class="confirm-content">
      {{ content }}
    </div>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="handleCancel">{{ cancelText }}</ElButton>
        <ElButton type="primary" @click="handleConfirm">
          {{ confirmText }}
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.confirm-content {
  font-size: 16px;
  line-height: 1.5;
  padding: 20px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
