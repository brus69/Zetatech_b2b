import { createEffect, createEvent, createStore, sample } from "effector";
import { requestFx } from "@/shared/api";

type Step = "email" | "pin" | "password" | "success";

export const $step = createStore<Step>("password");
export const stepChanged = createEvent<Step>();

sample({ clock: stepChanged, target: $step });

export const sendCode = createEvent();
export const sendCodeFx = createEffect(() => {
  return { data: { token: "asdf" } };
  // return requestFx({
  //   path: "",
  //   method: "post",
  // });
});

sample({ clock: sendCode, target: sendCodeFx });

sample({
  clock: sendCodeFx.doneData,
  fn: () => "pin" as const,
  target: stepChanged,
});

export const $token = createStore("");

sample({
  clock: sendCodeFx,
  fn: (data) => {
    return data.token;
  },
  target: $token,
});

export const pinChanged = createEvent<string>();
export const $pin = createStore("");

sample({ clock: pinChanged, target: $pin });

export const confirmPin = createEvent();
export const confirmPinFx = createEffect(() => {
  return true;
  // return requestFx({
  //   path: "",
  //   method: "post",
  // });
});

sample({
  source: {
    pin: $pin,
    token: $token,
  },
  clock: confirmPin,
  target: confirmPinFx,
});

sample({
  clock: confirmPinFx.doneData,
  fn: () => "password" as const,
  target: stepChanged,
});

export const updatePassword = createEvent();

export const updatePasswordFx = createEffect<unknown, unknown>(() => {
  return "";
  // return requestFx({
  //   path: "",
  //   method: "post",
  // });
});

sample({
  source: {
    pin: $pin,
    token: $token,
  },
  clock: updatePassword,
  target: updatePasswordFx,
});

sample({
  clock: updatePasswordFx.doneData,
  fn: () => "success" as const,
  target: stepChanged,
});
