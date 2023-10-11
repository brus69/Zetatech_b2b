import ky from "ky";
import { API_CONFIG } from "../config";
import { TokenRefresh } from "./generated";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeTokens,
  saveAccessToken,
} from "./tokens";

export const api = ky.create({
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    beforeRetry: [
      async ({ request }) => {
        removeAccessToken();

        const refresh = getRefreshToken();

        if (!refresh) {
          removeTokens();
          return;
        }

        try {
          const json = { refresh };

          const response = await ky
            .post(`${API_CONFIG.API_URL}/auth/jwt/refresh/`, { json })
            .json<TokenRefresh>();

          saveAccessToken(response.access);

          request.headers.set("Authorization", `Bearer ${response.access}`);
        } catch (error) {
          removeTokens();
        }
      },
    ],
  },
});
