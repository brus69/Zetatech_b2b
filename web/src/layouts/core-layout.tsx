import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useGate, useUnit } from "effector-react";
import { appStaredGate, routerChanged } from "@/api/app";

type Props = {
  children: React.ReactNode;
};

export const CoreLayout = ({ children }: Props) => {
  useGate(appStaredGate);

  const router = useRouter();

  const onRouter = useUnit(routerChanged);

  useEffect(() => {
    if (router) onRouter(router);
  }, []);

  return children;
};
