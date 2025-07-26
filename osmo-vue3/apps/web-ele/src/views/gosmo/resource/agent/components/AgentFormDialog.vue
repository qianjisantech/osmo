<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';

import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
} from 'element-plus';

import { useAgentStore } from '#/store';

const props = defineProps({
  modelValue: Boolean,
  // eslint-disable-next-line vue/require-default-prop
  id: {
    type: String,
    required: false,
  },
  mode: {
    type: String as () => 'create' | 'edit',
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const agentStore = useAgentStore();
const loading = ref(false);
const formData = reactive({
  id: '',
  name: '',
  description: '',
});

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入执行机名称', trigger: 'blur' }],
};

// 加载编辑数据
const loadEditData = async (id: string) => {
  try {
    loading.value = true;
    await agentStore.detail(id);
    Object.assign(formData, agentStore.agentDetailResult);
  } catch {
    ElMessage.error('加载编辑数据失败');
    closeDialog();
  } finally {
    loading.value = false;
  }
};

// 初始化表单
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      if (props.mode === 'edit' && props.id) {
        loadEditData(props.id);
      } else {
        formData.id = '';
        formData.name = '';
        formData.description = '';
      }
    }
  },
  { immediate: true },
);

const handleSubmit = async () => {
  try {
    loading.value = true;
    await (props.mode === 'create'
      ? agentStore.create({
          id: undefined,
          name: formData.name,
          description: formData.description,
        })
      : agentStore.update({
          id: props.id,
          name: formData.name,
          description: formData.description,
        }));

    emit('submit');
    closeDialog();
  } catch {
    console.log('操作失败');
  } finally {
    loading.value = false;
  }
};

const closeDialog = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <ElDialog
    :model-value="modelValue"
    @update:model-value="closeDialog"
    :title="`${mode === 'create' ? '新增执行机' : '编辑执行机'}`"
    width="800px"
    :close-on-click-modal="false"
  >
    <div v-loading="loading">
      <ElForm :model="formData" :rules="rules" label-position="top">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ElFormItem label="执行机名称" prop="name">
            <ElInput v-model="formData.name" placeholder="请输入执行机名称" />
          </ElFormItem>
          <ElFormItem label="描述">
            <ElInput
              v-model="formData.description"
              type="textarea"
              :rows="2"
              placeholder="请输入描述信息"
            />
          </ElFormItem>
        </div>
      </ElForm>
    </div>
    <template #footer>
      <ElButton @click="closeDialog">取消</ElButton>
      <ElButton type="primary" @click="handleSubmit" :loading="loading">
        保存
      </ElButton>
    </template>
  </ElDialog>
</template>
