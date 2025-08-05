import type { ResourceAgentNamespace } from '#/types/resource/agent';

import { reactive, ref } from 'vue';

import { defineStore } from 'pinia';

import {
  agentCreateApi,
  agentDetailApi,
  agentDetailV2Api,
  agentQueryPageApi,
  agentSelectOptionsApi,
  agentUpdateApi,
} from '#/api/polaris/resource/agent';

export const useAgentStore = defineStore('agent', () => {
  const queryLoading = ref(false); // 分页查询loading
  const agentQueryPageResult =
    reactive<ResourceAgentNamespace.AgentQueryPageResult>({
      records: [],
      total: 0,
      board: {
        total: 0,
        healthy: 0,
        warning: 0,
        error: 0,
        offline: 0,
        created: 0,
      },
    }); // 初始化一个空对象
  const agentDetailResult = reactive<ResourceAgentNamespace.AgentDetailResult>({
    id: '',
    name: '',
    description: '',
  });
  const agentDetailV2Result =
    reactive<ResourceAgentNamespace.AgentDetailV2Result>({
      id: '',
      name: '',
      description: '',
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0,
      status: '',
      ip: '',
      last_report_time: '',
      identification_code: '',
      tasks: [],
      strategy_name: '',
      strategy_id: '',
      rule_name: '',
      rule_id: '',
    });
  const agentSelectOptions = reactive<
    ResourceAgentNamespace.AgentSelectOptionsResult[]
  >([]);
  /**
   * 异步处理 执行机分页查询操作
   * @param params 分页查询参数
   */
  async function queryPage(
    params: ResourceAgentNamespace.AgentQueryPageParams,
  ) {
    try {
      queryLoading.value = true;
      const { records, total, board } = await agentQueryPageApi(params);

      // 正确做法：修改 reactive 对象的属性，而非整个替换
      Object.assign(agentQueryPageResult, {
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

      return agentQueryPageResult;
    } catch (error) {
      // 错误时重置数据
      Object.assign(agentQueryPageResult, {
        records: [],
        total: 0,
        board: { total: 0, healthy: 0, warning: 0, error: 0, offline: 0 },
      });
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }

  /**
   * 执行机创建
   * @param params
   */
  async function create(
    params: ResourceAgentNamespace.AgentCreateOrUpdateParams,
  ) {
    await agentCreateApi(params);
  }

  /**
   * 执行机更新
   * @param params
   */
  async function update(
    params: ResourceAgentNamespace.AgentCreateOrUpdateParams,
  ) {
    await agentUpdateApi(params);
  }

  /**
   * 执行机编辑详情
   * @param agent_id
   */
  async function detail(
    agent_id: string,
  ): Promise<ResourceAgentNamespace.AgentDetailResult> {
    try {
      const { id, name, description } = await agentDetailApi(agent_id);
      Object.assign(agentDetailResult, {
        id,
        name,
        description,
      });
      return agentDetailResult;
    } catch (error) {
      Object.assign(agentDetailResult, {
        id: '',
        name: '',
        description: '',
      });
      throw error; // 可选择抛出错误
    }
  }
  /**
   * 执行机编辑详情
   * @param agent_id
   */
  async function detailV2(
    agent_id: string,
  ): Promise<ResourceAgentNamespace.AgentDetailV2Result> {
    try {
      const {
        id,
        name,
        description,
        cpu,
        memory,
        disk,
        network,
        status,
        last_report_time,
        ip,
        identification_code,
        tasks,
        strategy_name,
        strategy_id,
        rule_name,
        rule_id,
      } = await agentDetailV2Api(agent_id);
      Object.assign(agentDetailV2Result, {
        id,
        name,
        description,
        cpu,
        memory,
        disk,
        network,
        status,
        last_report_time,
        ip,
        identification_code,
        tasks,
        strategy_name,
        strategy_id,
        rule_name,
        rule_id,
      });
      return agentDetailV2Result;
    } catch (error) {
      console.error('获取agent 详情失败', error);
      Object.assign(agentDetailV2Result, {
        id: '',
        name: '',
        description: '',
        cpu: 0,
        memory: 0,
        disk: 0,
        network: 0,
        status: '',
        last_report_time: '',
        ip: '',
      });
      return agentDetailV2Result;
    }
  }

  /**
   * 异步处理 执行机下拉查询
   * @param params 执行机下拉查询参数
   */
  async function selectOptionsFunc(
    params: ResourceAgentNamespace.AgentSelectOptionsParams,
  ) {
    try {
      queryLoading.value = true;
      const selectOptions = await agentSelectOptionsApi(params);

      // 处理空数据情况
      if (!selectOptions || selectOptions.length === 0) {
        agentSelectOptions.splice(0); // 清空数组
        console.log('接收到空选项列表，已清空 agentSelectOptions');
      } else {
        // 正确做法：修改数组内容而非整个替换
        agentSelectOptions.splice(
          0,
          agentSelectOptions.length,
          ...selectOptions,
        );
      }

      console.log('当前 agentSelectOptions:', agentSelectOptions);
      return agentSelectOptions;
    } catch (error) {
      // 错误时清空数据
      agentSelectOptions.splice(0);
      console.error('获取选项失败:', error);
      throw error;
    } finally {
      queryLoading.value = false;
    }
  }

  return {
    queryPage,
    queryLoading,
    agentQueryPageResult,
    create,
    update,
    detail,
    detailV2,
    agentDetailResult,
    agentDetailV2Result,
    agentSelectOptions,
    selectOptionsFunc,
  };
});
