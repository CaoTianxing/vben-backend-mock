import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import { useResponseSuccess } from '~/utils/response';
import { eventHandler } from 'h3';

export default eventHandler((event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }
  return useResponseSuccess({
    url: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
  });
  // return useResponseError("test")
});
