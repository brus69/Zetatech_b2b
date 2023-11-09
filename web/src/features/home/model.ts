import { createEvent, createEffect, createStore, sample } from "effector";
import { requestFx } from "@/shared/api";
import {
  FAQ,
  PaginatedPostList,
  Post,
  Price,
  Review,
  Team,
} from "@/api/codegen";

import { fetchCategories } from "@/api/categories";

export const homePageStared = createEvent();

export const $faqs = createStore<FAQ[]>([]);

const fetchFaqFx = createEffect(() => {
  return requestFx({
    path: "/faqs",
  });
});

sample({ clock: fetchFaqFx.doneData, target: $faqs });

export const $team = createStore<Team[]>([]);

const fetchTeamFx = createEffect(() => {
  return requestFx({
    path: "/team",
  });
});

sample({ clock: fetchTeamFx.doneData, target: $team });

export const $prices = createStore<Price[]>([]);

const fetchPricesFx = createEffect(() => {
  return requestFx({ path: "/price/" });
});

sample({ clock: fetchPricesFx.doneData, target: $prices });

export const $posts = createStore<Post[]>([]);

const fetchPostsFx = createEffect<unknown, PaginatedPostList>(() => {
  return requestFx({ path: "/blog/", params: { limit: 3 } });
});

sample({
  clock: fetchPostsFx.doneData,
  fn: (paginated) => paginated.results || [],
  target: $posts,
});

export const $reviews = createStore<Review[]>([]);

const fetchReviewsFx = createEffect(() => {
  return requestFx({ path: "/reviews" });
});

sample({ clock: fetchReviewsFx.doneData, target: $reviews });

sample({
  clock: homePageStared,
  target: [
    fetchFaqFx,
    fetchTeamFx,
    fetchPricesFx,
    fetchPostsFx,
    fetchReviewsFx,
    fetchCategories,
  ],
});
