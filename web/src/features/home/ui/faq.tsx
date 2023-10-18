import React, { useEffect } from "react";
import { requestFx } from "@/shared/api";

export const FAQ = () => {
  useEffect(() => {
    requestFx({ path: "/faq" });
  }, []);
  return <section className="container"></section>;
};
