import { createStore, createEffect, sample } from "effector";
import { Category } from "./codegen";
import { requestFx } from "@/shared/api";

type TreeCategory = Category & { subcategories: Category[] };

export const $categories = createStore<TreeCategory[]>([]);

export const fetchCategoriesFx = createEffect(() => {
  return requestFx({ path: "/categories/" });
});

sample({ clock: fetchCategoriesFx.doneData, target: $categories });
