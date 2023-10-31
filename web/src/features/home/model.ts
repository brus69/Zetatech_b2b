import { createEvent, createEffect, createStore, sample } from "effector";
import { requestFx } from "@/shared/api";
import { FAQ, PaginatedPostList, Post, Team } from "@/api/codegen";

export const homePageStared = createEvent();

export const $faqs = createStore<FAQ[]>([]);

const fetchFaqFx = createEffect(() => {
  return requestFx({
    path: "/faqs",
  });
});

sample({ clock: homePageStared, target: fetchFaqFx });
sample({ clock: fetchFaqFx.doneData, target: $faqs });

export const $team = createStore<Team[]>([]);

const fetchTeamFx = createEffect(() => {
  return requestFx({
    path: "/team",
  });
});

sample({ clock: homePageStared, target: fetchTeamFx });
sample({ clock: fetchTeamFx.doneData, target: $team });

// TODO
export const $prices = createStore<[]>([]);

const fetchPricesFx = createEffect(() => {
  return requestFx({
    path: "/team",
  });
});

sample({ clock: homePageStared, target: fetchPricesFx });
sample({ clock: fetchPricesFx.doneData, target: $team });

export const $posts = createStore<Post[]>([]);

const fetchPostsFx = createEffect<unknown, PaginatedPostList>(() => {
  return requestFx({
    path: "/blog/",
    params: {
      limit: 3,
    },
  });
});

sample({ clock: homePageStared, target: fetchPostsFx });
sample({
  clock: fetchPostsFx.doneData,
  fn: (paginated) => paginated.results || [],
  target: $posts,
});
