import { Ref, useRef } from "react";

export const useFallbackRef = <T>(forwardedRef: Ref<T>) => {
  const fallbackRef = useRef<T>(null);
  const ref = fallbackRef || forwardedRef;

  return ref;
};
