import type { RequestResponse } from '@vben/request';

import { requestClient } from '../request';

/**
 * 下载文件，获取Blob
 * @returns Blob
 */
async function downloadFile1() {
  return requestClient.download<Blob>(
    'https://img0.baidu.com/it/u=3666118719,1618638927&fm=253&fmt=auto&app=138&f=PNG',
  );
}

/**
 * 下载文件，获取完整的Response
 * @returns RequestResponse<Blob>
 */
async function downloadFile2() {
  return requestClient.download<RequestResponse<Blob>>(
    'https://img0.baidu.com/it/u=3666118719,1618638927&fm=253&fmt=auto&app=138&f=PNG',
    {
      responseReturn: 'raw',
    },
  );
}

export { downloadFile1, downloadFile2 };
