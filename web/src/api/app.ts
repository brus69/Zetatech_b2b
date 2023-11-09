import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { NextRouter } from "next/router";

export const appStaredGate = createGate();

export const $router = createStore<NextRouter | null>(null);

export const routerChanged = createEvent<NextRouter | null>();

sample({ clock: routerChanged, target: $router });
