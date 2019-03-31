import { getCookie, setCookie, removeCookie } from 'tiny-cookie';
import jwt_decode from 'jwt-decode';

//constants
import { 
  ACCESS_TOKEN_KEY, 
  REFRESH_TOKEN_KEY,
  USER_INFO_KEY,
} from '../constants/token';

// functions
export const checkAuth = () => {
  const accessToken = getCookie(ACCESS_TOKEN_KEY);
  if (!accessToken) return false;
  
  const { exp } = jwt_decode(accessToken);
  if(!exp) return false;

  if(Date.now() <= exp * 1000) return true;
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
  removeCookie(USER_INFO_KEY);

  return false;
}

export const signIn = async (accessToken, refToken, userBasicInfo) => {
  const { exp, iat, ...userInfo } = jwt_decode(accessToken);
  console.log(`authHelpers -> signIn -> jwt_decode(ACCESS_TOKEN): `, jwt_decode(accessToken));
  console.log(`userBasic info: `, userBasicInfo);
  if(!exp || Date.now() < exp) return false;
  const expires = new Date(exp * 1000);
  await (accessToken && setCookie(ACCESS_TOKEN_KEY, accessToken, {expires}));
  await (refToken && setCookie(REFRESH_TOKEN_KEY, refToken, { expires }));

  const user = {
    ...userInfo,
    ...userBasicInfo
  }
  await (user && setCookie(USER_INFO_KEY, JSON.stringify(user), { expires }));
}

export const signOut = cb => {
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
  removeCookie(USER_INFO_KEY);
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

export const getUserEntity = () => {
  const cookie = getCookie(USER_INFO_KEY);
  return (cookie && JSON.parse(cookie)) || '';
}

export const getUserInfo = info => {
  return (
    (checkAuth() && getUserEntity() !== '' && getUserEntity()[info]) || null
  );
};

export const getUserId = () => {
  return (
    jwt_decode(getCookie(ACCESS_TOKEN_KEY)).userId
  );
}