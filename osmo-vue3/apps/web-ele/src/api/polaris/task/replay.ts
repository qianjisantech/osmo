import type { GlobalNamespace } from '#/types/global';
import type { ResourceAgentNamespace } from '#/types/resource/agent';
import type { TaskReplayNameSpace} from '#/types/task/replay';

import { requestClient } from '#/api/request';

/**
 * 回放任务分页查询
 * @param data TaskRecordNameSpace.RecordTaskQueryPageParams
 */
export async function taskReplayQueryPageApi(
  data: TaskReplayNameSpace.TaskReplayQueryPageParams,
) {
  return requestClient.post<TaskReplayNameSpace.TaskReplayQueryPageResult>(
    '/polaris/task/replay/page',
    data,
  );
}

/**
 * 回放任务创建
 * @param data AgentType.TaskReplayCreateForm
 */
export async function replayTaskCreateApi(
  data: TaskReplayNameSpace.TaskReplayCreateForm,
) {
  return requestClient.post<GlobalNamespace.Void>(
    '/polaris/task/replay/create',
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
 * 回放任务详情
 * @param id
 */
export async function taskReplayDetailApi(id: string) {
  return requestClient.get<TaskReplayNameSpace.TaskReplayDetail>(
    `/polaris/task/replay/detail/${id}`,
  );
}

/**
 * 回放任务执行
 * @param id
 */
export async function taskReplayExecuteApi(id: string) {
  return requestClient.get<GlobalNamespace.Void>(
    `/polaris/task/replay/execute/${id}`,
  );
}
