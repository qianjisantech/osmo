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
    '/gosmo/resource/agent/page',
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
    '/gosmo/resource/agent/create',
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
    '/gosmo/resource/agent/update',
    data,
  );
}
/**
 * 执行机编辑详情
 * @param id
 */
export async function agentDetailApi(id: string) {
  return requestClient.get<ResourceAgentNamespace.AgentDetailResult>(
    `/gosmo/resource/agent/detail/${id}`,
  );
}
/**
 * 执行机编辑详情
 * @param id
 */
export async function agentDetailV2Api(id: string) {
  return requestClient.get<ResourceAgentNamespace.AgentDetailV2Result>(
    `/gosmo/resource/agent/detail/v2/${id}`,
  );
}
