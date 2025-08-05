
import type { TrafficPoolNamespace } from '#/types/traffic/pool';

import { reactive, ref } from 'vue';

import { defineStore } from 'pinia';

import { trafficPoolQueryPageApi } from '#/api/polaris/traffic/pool';

export const useTrafficPoolStore = defineStore('trafficPool', () => {
  const queryLoading = ref(false);
  const trafficPoolQueryPageResult =
    reactive<TrafficPoolNamespace.TrafficPoolQueryPageResult>({
      records: [],
      total: 0,
    });
  /**
   * 异步处理 流量池分页查询
   * @param params 流量池分页查询参数
   */
  async function queryPage(
    params: TrafficPoolNamespace.TrafficPoolQueryPageParams,
  ) {
    try {
      queryLoading.value = true;
      const { records, total } = await trafficPoolQueryPageApi(params);

      // 正确做法：修改 reactive 对象的属性，而非整个替换
      Object.assign(trafficPoolQueryPageResult, {
        records,
        total,
      });

      return trafficPoolQueryPageResult;
    } catch (error) {
      // 错误时重置数据
      Object.assign(trafficPoolQueryPageResult, {
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
    trafficPoolQueryPageResult,
  };
});
