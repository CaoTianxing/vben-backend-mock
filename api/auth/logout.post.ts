import {
  clearRefreshTokenCookie,
  getRefreshTokenFromCookie,
} from '~/utils/cookie-utils';

import { useResponseSuccess } from '~/utils/response';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const refreshToken = getRefreshTokenFromCookie(event);
  if (!refreshToken) {
    return useResponseSuccess('');
  }

  clearRefreshTokenCookie(event);

  return useResponseSuccess('');
});
