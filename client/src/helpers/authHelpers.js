import { getCookie, setCookie, removeCookie } from 'tiny-cookie';
import jwt_decode from 'jwt-decode';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/token';

export const checkAuth = async () => {
  const accessToken = await getCookie(ACCESS_TOKEN_KEY);
  if (!accessToken) return false;
  
  const { exp } = jwt_decode(accessToken);
  if(!exp) return false;

  if(Date.now() <= exp * 1000) return true;
  await removeCookie(ACCESS_TOKEN_KEY);
  await removeCookie(REFRESH_TOKEN_KEY);
  // removeCookie('user');

  return false;
}

export const signIn = async (accessToken, refToken) => {
  const { exp, user } = jwt_decode(accessToken);
  if(!exp || Date.now() < exp) return false;
  const expires = new Date(exp * 1000);
  await (accessToken && setCookie(ACCESS_TOKEN_KEY, accessToken, {expires}));
  await (refToken && setCookie(REFRESH_TOKEN_KEY, refToken, { expires }));
}

export const signOut = cb => {
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
  cb && cb();
}

export const getRefToken = () => {
  const refToken = getCookie(REFRESH_TOKEN_KEY);
  return refToken ? refToken : null;
}

export const getAccessToken = () => {
  const accToken = getCookie(ACCESS_TOKEN_KEY);
  return accToken ? accToken : null;
}