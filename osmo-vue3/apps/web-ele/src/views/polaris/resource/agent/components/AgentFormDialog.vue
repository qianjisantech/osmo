<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';

import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElOption,
  ElSelect,
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
const agentListLoading = ref(false); // 单独控制执行机列表加载状态
const hasLoadedAgentList = ref(false); // 标记是否已加载过执行机列表

const formData = reactive({
  id: '',
  name: '',
  description: '',
  selected_agent_id: '',
});

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入执行机名称', trigger: 'blur' }],
  selected_agent_id: [
    { required: true, message: '请选择执行机', trigger: 'change' },
  ],
};
const agentFocusParams = reactive({
  keyword: '',
  status: ["register"],
  execute_status: [],
});
// 加载执行机列表
const loadAgentList = async () => {
  try {
    await agentStore.selectOptionsFunc(agentFocusParams);
  } catch (error) {
    ElMessage.error('加载执行机列表失败');
    console.error('加载执行机列表错误:', error);
  }
};
const agentSelectOptions = computed(() => agentStore.agentSelectOptions || []);
// 当下拉框被点击时触发加载
const handleSelectFocus = async () => {
  if (!hasLoadedAgentList.value) {
    await loadAgentList();
  }
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
        formData.selected_agent_id = '';
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
          selected_agent_id: formData.selected_agent_id,
        })
      : agentStore.update({
          id: props.id,
          name: formData.name,
          description: formData.description,
          selected_agent_id: formData.selected_agent_id,
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
          <!-- 新增执行机选择下拉框 -->
          <ElFormItem label="可选执行机" prop="selected_agent_id">
            <ElSelect
              v-model="formData.selected_agent_id"
              placeholder="请选择执行机"
              clearable
              filterable
              :loading="agentListLoading"
              @focus="handleSelectFocus"
              @visible-change="handleSelectFocus"
            >
              <ElOption
                v-for="agent in agentSelectOptions"
                :key="agent.id"
                :label="agent.key"
                :value="agent.id"
              >
                <div class="flex justify-between">
                  <span>{{ agent.key }}</span>
                  <span>{{ agent.value }}</span>
                </div>
              </ElOption>
            </ElSelect>
          </ElFormItem>

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

<style scoped>
/* 可选：自定义下拉选项样式 */
.el-select-dropdown__item {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
}
</style>
