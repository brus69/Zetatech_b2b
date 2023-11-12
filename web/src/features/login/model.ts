import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { reset } from "patronum";
import { $router } from "@/api/app";
import { TokenObtainPair, TokenObtainPairRequest } from "@/api/codegen";
import { requestFx } from "@/shared/api";
import { saveAccessToken, saveRefreshToken } from "@/shared/api/tokens";
import { fetchUser } from "@/api/user";

export const login = createEvent<TokenObtainPairRequest>();

export const loginFx = createEffect<TokenObtainPairRequest, TokenObtainPair>(
  async (data) => {
    const response = await requestFx({
      method: "POST",
      body: data,
      path: "/auth/jwt/create",
    });

    saveAccessToken(response.access);
    saveRefreshToken(response.refresh);

    return response;
  }
);

sample({ clock: login, target: loginFx });

sample({ clock: loginFx.doneData, target: fetchUser });

sample({
  clock: loginFx.doneData,
  target: attach({
    source: $router,
    effect(router) {
      router?.push("/lk/account");
    },
  }),
});

export const $error = createStore("");

reset({ clock: login, target: $error });

sample({
  clock: loginFx.failData,
  fn: (error) => {
    // @ts-ignore
    return error?.detail || "Неизвестная ошибка. Попробуйте ещё раз";
  },
  target: $error,
});
