import { createEvent, createStore, sample } from "effector";

export const $isOpen = createStore(false);
export const isOpenChanged = createEvent<boolean>();

sample({ clock: isOpenChanged, target: $isOpen });
