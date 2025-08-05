import type { GlobalNamespace } from '#/types/global';
import type { ResourceAgentNamespace } from '#/types/resource/agent';

import { requestClient } from '#/api/request';

/**
 * 执行机分页查询
 * @param data ResourceAgentNamespace.AgentQueryPageParams
 */
export async function agentQueryPageApi(
  data: ResourceAgentNamespace.AgentQueryPageParams,
) {
  return requestClient.post<ResourceAgentNamespace.AgentQueryPageResult>(
    '/polaris/resource/agent/page',
    data,
  );
}

/**
 * 执行机创建
 * @param data ResourceAgentNamespace.AgentCreateOrUpdateParams
 */
export async function agentCreateApi(
  data: ResourceAgentNamespace.AgentCreateOrUpdateParams,
) {
  return requestClient.post<GlobalNamespace.Void>(
    '/polaris/resource/agent/create',
    data,
  );
}
/**
 * 执行机更新
 * @param data ResourceAgentNamespace.AgentCreateOrUpdateParams
 */
export async function agentUpdateApi(
  data: ResourceAgentNamespace.AgentCreateOrUpdateParams,
) {
  return requestClient.post<GlobalNamespace.Void>(
    '/polaris/resource/agent/update',
    data,
  );
}
/**
 * 执行机编辑详情
 * @param id
 */
export async function agentDetailApi(id: string) {
  return requestClient.get<ResourceAgentNamespace.AgentDetailResult>(
    `/polaris/resource/agent/detail/${id}`,
  );
}
/**
 * 执行机编辑详情
 * @param id
 */
export async function agentDetailV2Api(id: string) {
  return requestClient.get<ResourceAgentNamespace.AgentDetailV2Result>(
    `/polaris/resource/agent/detail/v2/${id}`,
  );
}
/**
 * 执行机可选列表
 * @param data
 */
export async function agentSelectOptionsApi(
  data: ResourceAgentNamespace.AgentSelectOptionsParams,
) {
  return requestClient.post<ResourceAgentNamespace.AgentSelectOptionsResult[]>(
    `/polaris/resource/agent/select/options`,
    data,
  );
}
