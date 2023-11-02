import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUnit } from "effector-react";
import { routerChanged } from "@/api/app";

type Props = {
  children: React.ReactNode;
};

export const CoreLayout = ({ children }: Props) => {
  const router = useRouter();

  const onRouter = useUnit(routerChanged);

  useEffect(() => {
    if (router) onRouter(router);
  }, []);

  return children;
};
