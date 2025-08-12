import type { GlobalNamespace } from '#/types/global';

export namespace TaskReplayNameSpace {
  export interface TaskReplayQueryPageParams
    extends GlobalNamespace.QueryPageParams {
    keyword: string;
    replay_time_range: string[];
    status?: string | undefined;
  }
  export interface TaskReplayQueryPageResult {
    records: TaskReplayQueryPageRecord[];
    total: number;
  }
  export interface TaskReplay {
    id: string;
    status:
      | 'canceled'
      | 'failed'
      | 'pending'
      | 'running'
      | 'stopped'
      | 'success'
      | 'timeout';
    replay_time: string;
    replay_addr: string;
    name: string;
    description: string;
  }
  export interface TaskReplayDetail {
    id: string;
    status:
      | 'canceled'
      | 'failed'
      | 'pending'
      | 'running'
      | 'stopped'
      | 'success'
      | 'timeout';
    replay_time: string;
    replay_addr: string;
    name: string;
    description: string;
    traffics: TrafficPool[];
  }
  export interface TrafficPool {
    id: string;
    url: string;
    method: string;
  }
  export interface TaskReplayQueryPageRecord {
    id: string;
    status:
      | 'canceled'
      | 'failed'
      | 'pending'
      | 'running'
      | 'stopped'
      | 'success'
      | 'timeout';
    replay_time: string;
    name: string;
    description: string;
    fail_reason: string;
    replay_addr: string;
    execute_time: string;
  }
  export type TaskStatus =
    | 'aborted'
    | 'canceled'
    | 'failed'
    | 'paused'
    | 'pending'
    | 'running'
    | 'skipped'
    | 'success'
    | 'timeout'
    | 'waiting';

  export type ElTagType = 'danger' | 'info' | 'primary' | 'success' | 'warning';

  export interface TaskReplayCreateForm {
    id?: string;
    name: string;
    description: string;
    replay_time: string;
    replay_addr: string;
    traffics: string[];
  }
  export interface TaskReplayDetailForm {
    id?: string;
    name: string;
    description: string;
    replay_time: string;
    replay_addr: string;
    traffics: TaskReplayDetailFormTraffic[];
  }
  export interface TaskReplayDetailFormTraffic {
    id: string;
    url: string;
    method: string;
  }
}
