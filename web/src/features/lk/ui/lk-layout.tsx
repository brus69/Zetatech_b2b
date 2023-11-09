import React from "react";
import { LkNavigation } from "./lk-navigation";
import { Layout } from "@/layouts";

type Props = { children: React.ReactNode };

export const LkLayout = ({ children }: Props) => {
  return (
    <Layout className="container flex-row pt-8">
      <LkNavigation />
      {children}
    </Layout>
  );
};
