import React from "react";
import { Title } from "@mantine/core";
import { LkNavigation } from "./lk-navigation";
import { Layout } from "@/layouts";

type Props = { children: React.ReactNode };

export const LkLayout = ({ children }: Props) => {
  return (
    <Layout className="container py-16">
      <Title className="mb-16 text-5xl">Личные кабинет</Title>
      <div className="flex gap-10">
        <LkNavigation />
        {children}
      </div>
    </Layout>
  );
};
