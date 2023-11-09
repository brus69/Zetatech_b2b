import { attach, createEffect, createEvent, sample } from "effector";
import { $router } from "@/api/app";
import { TokenObtainPair, TokenObtainPairRequest } from "@/api/codegen";
import { requestFx } from "@/shared/api";

export const login = createEvent<TokenObtainPairRequest>();

export const loginFx = createEffect<TokenObtainPairRequest, TokenObtainPair>(
  () => {
    return requestFx({
      path: "/login/",
      method: "POST",
    });
  }
);

sample({ clock: login, target: loginFx });

sample({
  clock: loginFx.doneData,
  target: attach({
    source: $router,
    effect(router) {
      router?.push("/");
    },
  }),
});
