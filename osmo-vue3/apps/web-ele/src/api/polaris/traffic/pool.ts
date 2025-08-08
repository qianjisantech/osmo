
import type { TrafficPoolNamespace } from '#/types/traffic/pool';

import { requestClient } from '#/api/request';

/**
 * 流量池分页查询
 * @param data TrafficPoolNamespace.TrafficPoolQueryPageParams
 */
export async function trafficPoolQueryPageApi(
  data: TrafficPoolNamespace.TrafficPoolQueryPageParams,
) {
  return requestClient.post<TrafficPoolNamespace.TrafficPoolQueryPageResult>(
    '/polaris/traffic/pool/page',
    data,
  );
}
