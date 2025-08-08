// agent-types.ts
import type { GlobalNamespace } from '#/types/global';

export namespace TrafficPoolNamespace {
  /** 执行机监控分页查询参数 */
  export interface TrafficPoolQueryPageParams
    extends GlobalNamespace.QueryPageParams {
    keyword: string;
    method?: string | undefined;
    record_time_range: string[];
  }

  /** 执行机监控分页查询返回值Agent */
  export interface TrafficPool {
    id: string;
    url: string;
    request_body: string;
    request_headers: string;
    response_body: string;
    response_headers: string;
    method: string;
    http_type: string;
    record_time: string;
    record_task_name: string;
    record_task_id: string;
  }

  /**
   * 分页查询返回结果
   */
  export interface TrafficPoolQueryPageResult {
    records: TrafficPool[];
    total: number;
  }
}
