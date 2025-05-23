import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import { useResponseSuccess } from '~/utils/response';
import { eventHandler } from 'h3';
import { MOCK_CODES } from '~/utils/mock-data';

export default eventHandler((event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const codes =
    MOCK_CODES.find((item) => item.username === userinfo.username)?.codes ?? [];

  return useResponseSuccess(codes);
});
