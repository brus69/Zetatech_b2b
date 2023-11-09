import { createStore, createEffect, sample } from "effector";
import { createEvent } from "effector/compat";
import { Category } from "./codegen";
import { appStaredGate } from "./app";
import { requestFx } from "@/shared/api";

type TreeCategory = Category & { subcategories: Category[] };

export const $categories = createStore<TreeCategory[]>([]);

export const fetchCategories = createEvent();

export const fetchCategoriesFx = createEffect(() => {
  return requestFx({ path: "/categories/" });
});

sample({
  source: { categories: $categories, loading: fetchCategoriesFx.pending },
  clock: fetchCategories,
  filter: ({ categories, loading }) => categories.length === 0 && !loading,
  target: fetchCategoriesFx,
});

sample({ clock: fetchCategoriesFx.doneData, target: $categories });

sample({
  clock: appStaredGate.open,
  target: fetchCategories,
});
