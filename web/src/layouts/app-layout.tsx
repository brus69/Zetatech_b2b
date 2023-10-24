import React from "react";
import { Header } from "@/widgets";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex flex-col grow">{children}</main>
    </>
  );
};
