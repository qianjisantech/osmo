import type { GlobalNamespace } from '#/types/global';
import type { ResourceAgentNamespace } from '#/types/resource/agent';
import type { TaskRecordNameSpace } from '#/types/task/record';

import { requestClient } from '#/api/request';

/**
 * 录制任务分页查询
 * @param data TaskRecordNameSpace.RecordTaskQueryPageParams
 */
export async function taskRecordQueryPageApi(
  data: TaskRecordNameSpace.TaskRecordQueryPageParams,
) {
  return requestClient.post<TaskRecordNameSpace.TaskRecordQueryPageResult>(
    '/polaris/task/record/page',
    data,
  );
}

/**
 * 执行机创建
 * @param data AgentType.AgentCreateOrUpdateParams
 */
export async function agentCreateApi(
  data: TaskRecordNameSpace.TaskRecordCreateForm,
) {
  return requestClient.post<GlobalNamespace.Void>(
    '/polaris/task/record/create',
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
    '/polaris/task/record/update',
    data,
  );
}
/**
 * 执行机编辑详情
 * @param id
 */
export async function agentDetailApi(id: string) {
  return requestClient.get<ResourceAgentNamespace.AgentDetailResult>(
    `/polaris/task/record/detail/${id}`,
  );
}

/**
 * 录制任务执行
 * @param id
 */
export async function taskRecordExecuteApi(id: string) {
  return requestClient.get<GlobalNamespace.Void>(
    `/polaris/task/record/execute/${id}`,
  );
}

