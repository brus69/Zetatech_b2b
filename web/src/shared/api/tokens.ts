import { destroyCookie, parseCookies, setCookie } from "nookies";

const REFRESH = "refresh_token";
const ACCESS = "access_token";

export const saveRefreshToken = (token?: string) => {
  if (!token) return;

  setCookie(null, REFRESH, token, {
    maxAge: 24 * 60 * 60 * 30,
    path: "/",
  });
};

export const saveAccessToken = (token?: string) => {
  if (!token) return;

  setCookie(null, ACCESS, token, {
    maxAge: 24 * 60 * 60,
    path: "/",
  });
};

export const getRefreshToken = () => {
  return parseCookies(null)?.[REFRESH];
};

export const getAccessToken = () => {
  return parseCookies(null)?.[ACCESS];
};

export const removeRefreshToken = () => {
  destroyCookie(null, REFRESH);
};

export const removeAccessToken = () => {
  destroyCookie(null, ACCESS);
};

export const removeTokens = () => {
  removeRefreshToken();
  removeAccessToken();
};
