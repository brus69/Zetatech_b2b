export const API_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8088/api/v1",
};

export const APP_CONFIG = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  IS_DEV: process.env.NODE_ENV === "development",
};
