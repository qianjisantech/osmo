import type { GlobalNamespace } from '#/types/global';

// task.d.ts

export namespace TaskRecordNameSpace {
  /** 执行机详情关联任务返回体 */
  export interface TaskRecord {
    id: string;
    type: 'record' | 'replay';
    status:
      | 'canceled'
      | 'failed'
      | 'pending'
      | 'running'
      | 'stopped'
      | 'success'
      | 'timeout';
    start_time: string;
    end_time: string;
    name: string;
    description: string;
    rule_id: string;
    rule_name: string;
    strategy_id: string;
    strategy_name: string;
  }

  export interface TaskRecordQueryPageParams
    extends GlobalNamespace.QueryPageParams {
    keyword: string;
    agent: string;
    rule: string;
    strategy: string;
    create_time_range: string[];
    status: string;
  }
  export interface TaskRecordQueryPageRecord {
    id: string;
    type: 'record' | 'replay';
    status:
      | 'canceled'
      | 'failed'
      | 'pending'
      | 'running'
      | 'stopped'
      | 'success'
      | 'timeout';
    start_time: string;
    end_time: string;
    name: string;
    description: string;
    rule_id: string;
    rule_name: string;
    strategy_id: string;
    strategy_name: string;
    agent_id: string;
    agent_name: string;
  }
  export interface TaskRecordQueryPageResult {
    records: TaskRecordQueryPageRecord[];
    total: number;
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
}
