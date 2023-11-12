import { createEffect, createEvent, createStore, sample } from "effector";
import { not, or, reset } from "patronum";
import { appStaredGate } from "./app";
import { User } from "./codegen";
import { requestFx } from "@/shared/api";
import { getRefreshToken, removeTokens } from "@/shared/api/tokens";

export const $user = createStore<User | null>(null);

export const fetchUser = createEvent();

sample({ clock: appStaredGate.open, target: fetchUser });

export const $fetchInitialUserFinished = createStore(false);

export const fetchInitialUserFx = createEffect<unknown, User>(async () => {
  if (!getRefreshToken()) {
    throw new Error("no access token");
  }

  try {
    const response = await requestFx({
      method: "GET",
      path: "/auth/users/me/",
    });

    return response;
  } catch (error) {}
});

sample({
  clock: fetchUser,
  target: fetchInitialUserFx,
  filter: not(or($user, fetchInitialUserFx.pending)),
});

sample({ clock: fetchInitialUserFx.doneData, target: $user });

sample({
  clock: fetchInitialUserFx.finally,
  fn: () => true,
  target: $fetchInitialUserFinished,
});

export const logout = createEvent();

export const logoutFx = createEffect(() => {
  removeTokens();
});

sample({ clock: logout, target: logoutFx });

reset({ target: $user, clock: logout });
