import { attach, createEffect, createEvent, sample } from "effector";
import { $router } from "@/api/app";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    effect(router: any) {
      router?.push("/");
    },
  }),
});
