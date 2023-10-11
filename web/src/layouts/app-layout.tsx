import { Header } from "@/widgets";
import React from "react";

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
