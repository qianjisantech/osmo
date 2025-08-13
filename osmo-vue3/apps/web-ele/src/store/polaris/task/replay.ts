import type { TaskReplayNameSpace } from '#/types/task/replay';

import { reactive, ref } from 'vue';

import { defineStore } from 'pinia';

import {
  replayTaskCreateApi,
  taskReplayDetailApi,
  taskReplayExecuteApi,
  taskReplayQueryPageApi,
} from '#/api/polaris/task/replay';

export const useTaskReplayStore = defineStore('taskReplay', () => {
  const queryLoading = ref(false);
  const taskReplayQueryPageResult =
    reactive<TaskReplayNameSpace.TaskReplayQueryPageResult>({
      records: [],
      total: 0,
    });
  const taskReplayDetailResult = reactive<TaskReplayNameSpace.TaskReplayDetail>(
    {
      id: '',
      status: 'pending',
      replay_time: '',
      replay_addr: '',
      name: '',
      description: '',
      traffics: [],
    },
  );
  /**
   * 异步处理 录制任务分页查询操作
   * @param params 录制任务分页查询参数
   */
  async function queryPage(
    params: TaskReplayNameSpace.TaskReplayQueryPageParams,
  ) {
    try {
      queryLoading.value = true;
      const { records, total } = await taskReplayQueryPageApi(params);

      // 正确做法：修改 reactive 对象的属性，而非整个替换
      Object.assign(taskReplayQueryPageResult, {
        records,
        total,
      });

      return taskReplayQueryPageResult;
    } catch (error) {
      // 错误时重置数据
      Object.assign(taskReplayQueryPageResult, {
        records: [],
        total: 0,
      });
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }
  /**
   * 创建回放任务
   * @param params
   */
  async function createFunc(params: TaskReplayNameSpace.TaskReplayCreateForm) {
    try {
      queryLoading.value = true;
      await replayTaskCreateApi(params);
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }
  /**
   * 执行回放任务
   * @param id
   */
  async function executeFunc(id: string) {
    try {
      queryLoading.value = true;
      await taskReplayExecuteApi(id);
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }
  /**
   * 回放任务详情
   * @param id
   */
  async function detailFunc(task_id: string) {
    try {
      queryLoading.value = true;
      const {
        id,
        status,
        replay_time,
        replay_addr,
        name,
        description,
        traffics,
      } = await taskReplayDetailApi(task_id);
      Object.assign(taskReplayDetailResult, {
        id,
        status,
        replay_time,
        replay_addr,
        name,
        description,
        traffics,
      });
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }
  function $reset() {
    queryLoading.value = false;
  }
  return {
    $reset,
    queryLoading,
    createFunc,
    queryPage,
    taskReplayQueryPageResult,
    executeFunc,
    detailFunc,
    taskReplayDetailResult,
  };
});
