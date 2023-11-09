import React from "react";
import { Header, Footer } from "@/widgets";
import { cn } from "@/shared/lib";

type Props = {
  children: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <main {...props} className={cn("flex flex-col grow", props.className)} />
      <Footer />
    </>
  );
};
