import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler((event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }
  return useResponseSuccess({
    url: 'https://img0.baidu.com/it/u=3666118719,1618638927&fm=253&fmt=auto&app=138&f=PNG',
  });
  // return useResponseError("test")
});
