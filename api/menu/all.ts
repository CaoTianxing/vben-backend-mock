import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import { MOCK_MENUS } from '~/utils/mock-data';
import { useResponseSuccess } from '~/utils/response';
import { eventHandler } from 'h3';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const menus =
    MOCK_MENUS.find((item) => item.username === userinfo.username)?.menus ?? [];
  return useResponseSuccess(menus);
});
