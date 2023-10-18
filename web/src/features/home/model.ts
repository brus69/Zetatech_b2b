import { createEvent, createEffect, createStore, sample } from "effector";
import { requestFx } from "@/shared/api";
import { FAQ, Team } from "@/api/codegen";

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
