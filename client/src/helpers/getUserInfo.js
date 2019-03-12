import { getCookie } from "tiny-cookie";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN_KEY } from "../constants/token";

export const getUserTypeFromCookie = () => {
  const accToken = getCookie(ACCESS_TOKEN_KEY);
  if (!accToken) return null;
  return jwtDecode(accToken).userType;
};
