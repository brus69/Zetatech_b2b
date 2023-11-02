import React from "react";
import { Header, Footer } from "@/widgets";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex flex-col grow">{children}</main>
      <Footer />
    </>
  );
};
