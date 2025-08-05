// agent-types.ts
import type { GlobalNamespace } from '#/types/global';

import { TaskRecordNameSpace } from '#/types/task/record';

export namespace ResourceAgentNamespace {
  /** 执行机监控分页查询参数 */
  export interface AgentQueryPageParams
    extends GlobalNamespace.QueryPageParams {
    status: string | undefined;
    keyword: string;
    execute_status: string | undefined;
  }

  /** 执行机监控分页查询返回值Agent */
  export interface Agent {
    id?: string;
    name: string;
    execute_status: string;
    cpu_cores: number;
    cpu_used_percent: number;
    cpu_free_percent: number;
    memory_total: number;
    memory_used: number;
    memory_free: number;
    memory_used_percent: number;
    network_bytes_sent: number;
    network_bytes_receive: number;
    network_packets_sent: number;
    network_packets_receive: number;
    description: string;
    status: string;
    last_report_time: string;
    ip: string;
  }

  /**
   * 分页查询接口看板
   */
  export interface Board {
    total: number;
    healthy: number;
    warning: number;
    error: number;
    offline: number;
    created: number;
  }
  /**
   * 分页查询返回结果
   */
  export interface AgentQueryPageResult {
    records: Agent[];
    total: number;
    board: Board;
  }

  /**
   * 执行机创建或者更新参数
   */
  export interface AgentCreateOrUpdateParams {
    id?: string;
    name: string;
    description: string;
    selected_agent_id: string;
  }

  /**
   * 执行机编辑详情返回结果
   */
  export interface AgentDetailResult {
    id: string;
    name: string;
    description: string;
  }

  /**
   * 执行机详情返回结果
   */
  export interface AgentDetailV2Result {
    id: string;
    name: string;
    description: string;
    cpu: number;
    memory: number;
    disk: number;
    network: number;
    status: string;
    ip: string;
    last_report_time: string;
    identification_code: string;
    tasks: TaskRecordNameSpace.TaskRecord[];
    strategy_name: string;
    strategy_id: string;
    rule_name: string;
    rule_id: string;
  }
  /**
   * 执行机可选列表参数
   */
  export interface AgentSelectOptionsParams {
    keyword: string;
    status:string[];
    execute_status:string[];
  }
  /**
   * 执行机可选列表返回结果列表
   */
  export interface AgentSelectOptionsResult {
    id: string;
    key: string;
    value: string;
    execute_status: string;
  }
}
