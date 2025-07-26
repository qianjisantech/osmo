import type { GlobalNamespace } from '#/types/global';
import type { ResourceAgentNamespace } from '#/types/resource/agent';
import type { TaskRecordNameSpace } from '#/types/task/record';

import { requestClient } from '#/api/request';

/**
 * 录制任务分页查询
 * @param data TaskRecordNameSpace.RecordTaskQueryPageParams
 */
export async function taskRecordQueryPageApi(
  data: TaskRecordNameSpace.RecordTaskQueryPageParams,
) {
  return requestClient.post<TaskRecordNameSpace.RecordTaskQueryPageResult>(
    '/gosmo/task/record/page',
    data,
  );
}

/**
 * 执行机创建
 * @param data AgentType.AgentCreateOrUpdateParams
 */
export async function agentCreateApi(
  data: ResourceAgentNamespace.AgentCreateOrUpdateParams,
) {
  return requestClient.post<GlobalNamespace.Void>(
    '/gosmo/task/record/create',
    data,
  );
}
/**
 * 执行机更新
 * @param data AgentType.AgentCreateOrUpdateParams
 */
export async function agentUpdateApi(
  data: ResourceAgentNamespace.AgentCreateOrUpdateParams,
) {
  return requestClient.post<GlobalNamespace.Void>(
    '/gosmo/task/record/update',
    data,
  );
}
/**
 * 执行机编辑详情
 * @param id
 */
export async function agentDetailApi(id: string) {
  return requestClient.get<ResourceAgentNamespace.AgentDetailResult>(
    `/gosmo/task/record/detail/${id}`,
  );
}
