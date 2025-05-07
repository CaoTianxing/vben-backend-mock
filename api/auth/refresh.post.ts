import {
  clearRefreshTokenCookie,
  getRefreshTokenFromCookie,
  setRefreshTokenCookie,
} from '~/utils/cookie-utils';
import { verifyRefreshToken } from '~/utils/jwt-utils';
import { forbiddenResponse } from '~/utils/response';
import { generateAccessToken } from '~/utils/jwt-utils';
import { defineEventHandler } from 'h3';
import { MOCK_USERS } from '~/utils/mock-data';

export default defineEventHandler(async (event) => {
  const refreshToken = getRefreshTokenFromCookie(event);
  if (!refreshToken) {
    return forbiddenResponse(event);
  }

  clearRefreshTokenCookie(event);

  const userinfo = verifyRefreshToken(refreshToken);
  if (!userinfo) {
    return forbiddenResponse(event);
  }

  const findUser = MOCK_USERS.find(
    (item) => item.username === userinfo.username,
  );
  if (!findUser) {
    return forbiddenResponse(event);
  }
  const accessToken = generateAccessToken(findUser);

  setRefreshTokenCookie(event, refreshToken);

  return accessToken;
});
