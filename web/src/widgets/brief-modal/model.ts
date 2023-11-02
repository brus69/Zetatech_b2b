import { createEvent, createStore, sample } from "effector";
import { createEffect } from "effector/effector.mjs";
import { reset } from "patronum";
import { UseFormReset } from "react-hook-form";
import { restore } from "effector/effector.umd";
import { ApplicationRequest } from "@/api/codegen";
import { requestFx } from "@/shared/api";

export const $isOpen = createStore(false);
export const isOpenChanged = createEvent<boolean>();

export const setForm = createEvent<{
  reset: UseFormReset<ApplicationRequest>;
} | null>();

export const form = restore(setForm, null);

sample({ clock: isOpenChanged, target: $isOpen });

export const createApplication = createEvent<ApplicationRequest>();

export const createApplicationFx = createEffect<ApplicationRequest, void>(
  ({ attachment, ...data }) => {
    const formData = new FormData();

    let key: keyof typeof data;
    for (key in data) {
      formData.append(key, data[key]!);
    }

    if (attachment) formData.append("attachment", attachment);

    return requestFx({
      path: "/applications",
      method: "post",
      body: formData,
      rawData: true,
    });
  }
);

sample({ clock: createApplication, target: createApplicationFx });

export const $createApplicationSuccess = createStore(false);

sample({
  clock: createApplicationFx.done,
  fn: () => true,
  target: $createApplicationSuccess,
});

export const $createApplicationError = createStore("");

reset({
  clock: [createApplicationFx.finally, isOpenChanged],
  target: [$createApplicationSuccess, $createApplicationError],
});

sample({
  clock: createApplicationFx.failData,
  fn: (error) => {
    return (error as unknown as { detail: string })?.detail || "";
  },
  target: $createApplicationError,
});

sample({
  source: form,
  clock: createApplicationFx.doneData,
  fn: (form) => {
    form?.reset();
  },
});
