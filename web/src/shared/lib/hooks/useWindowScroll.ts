import { useEffect } from "react";

export const useWindowScroll = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener("scroll", callback);

    return () => {
      window.removeEventListener("scroll", callback);
    };
  }, []);
};
