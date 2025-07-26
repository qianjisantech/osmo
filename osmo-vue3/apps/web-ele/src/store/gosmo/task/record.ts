import type { TaskRecordNameSpace } from '#/types/task/record';

import { reactive, ref } from 'vue';

import { defineStore } from 'pinia';

import { taskRecordQueryPageApi } from '#/api/gosmo/task/record';

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
      const { records, total, board } = await taskRecordQueryPageApi(params);

      // 正确做法：修改 reactive 对象的属性，而非整个替换
      Object.assign(taskRecordQueryPageResult, {
        records,
        total,
        board: board || {
          total: 0,
          healthy: 0,
          warning: 0,
          error: 0,
          offline: 0,
        },
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

  return {
    queryPage,
    queryLoading,
    taskRecordQueryPageResult,
  };
});
