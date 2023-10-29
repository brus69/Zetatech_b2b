import { createEvent, createStore, sample } from "effector";

export const $isSent = createStore(false);

export const isSentChanged = createEvent<boolean>();

sample({ clock: isSentChanged, target: $isSent });
