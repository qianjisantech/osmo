import type { ResourceAgentNamespace } from '#/types/resource/agent';

import { reactive, ref } from 'vue';

import { defineStore } from 'pinia';

import {
  agentCreateApi,
  agentDetailApi,
  agentDetailV2Api,
  agentQueryPageApi,
  agentUpdateApi,
} from '#/api/gosmo/resource/agent';

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
  };
});
