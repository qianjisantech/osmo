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
    agent?: string | undefined;
    strategy?: string | undefined;
    create_time_range: string[];
    status?: string | undefined;
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
    strategy_code: string;
    strategy_name: string;
    agent_id: string;
    agent_name: string;
    listen_port: string;
    execute_time: string;
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

  export interface TaskRecordCreateForm {
    id?: string;
    name: string;
    strategy: object;
    agent: object;
    description: string;
    listen_port: string;
    record_time: string[];
  }
  export interface ResourceAgent {
    id: string;
    name: string;
    execute_status: string;
  }
  export interface RecordStrategy {
    id: string;
    name: string;
    value: string;
  }
}
