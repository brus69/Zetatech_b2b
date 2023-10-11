import { $router } from "@/api/app";
import { requestFx } from "@/shared/api";
import { attach, createEffect, createEvent, sample } from "effector";

export const register = createEvent();

export const registerFx = createEffect(() => {
  return true;
  // return requestFx({
  //   path: "/register/",
  //   method: "POST",
  // });
});

sample({ clock: register, target: registerFx });

sample({
  clock: registerFx.doneData,
  target: attach({
    source: $router,
    effect(router) {
      router?.push("/");
    },
  }),
});
