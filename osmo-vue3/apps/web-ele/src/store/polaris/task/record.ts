import type { TaskRecordNameSpace } from '#/types/task/record';

import { reactive, ref } from 'vue';

import { defineStore } from 'pinia';

import {
  agentCreateApi, taskRecordExecuteApi,
  taskRecordQueryPageApi,
} from '#/api/polaris/task/record';

export const useTaskRecordStore = defineStore('taskRecord', () => {
  const queryLoading = ref(false);
  const taskRecordQueryPageResult =
    reactive<TaskRecordNameSpace.TaskRecordQueryPageResult>({
      records: [],
      total: 0,
    });
  /**
   * 异步处理 录制任务分页查询操作
   * @param params 录制任务分页查询参数
   */
  async function queryPage(
    params: TaskRecordNameSpace.TaskRecordQueryPageParams,
  ) {
    try {
      queryLoading.value = true;
      const { records, total } = await taskRecordQueryPageApi(params);

      // 正确做法：修改 reactive 对象的属性，而非整个替换
      Object.assign(taskRecordQueryPageResult, {
        records,
        total,
      });

      return taskRecordQueryPageResult;
    } catch (error) {
      // 错误时重置数据
      Object.assign(taskRecordQueryPageResult, {
        records: [],
        total: 0,
      });
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }

  /**
   * 创建录制任务
   * @param params
   */
  async function createFunc(params: TaskRecordNameSpace.TaskRecordCreateForm) {
    try {
      queryLoading.value = true;
      await agentCreateApi(params);
    } catch (error) {
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }

  /**
   * 执行录制任务
   * @param id
   */
  async function executeFunc(id:string) {
    try {
      queryLoading.value = true;
      await taskRecordExecuteApi(id);
    } catch (error) {
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }
  return {
    queryPage,
    queryLoading,
    taskRecordQueryPageResult,
    createFunc,
    executeFunc
  };
});
