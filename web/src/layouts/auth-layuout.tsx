import React from "react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <header className="py-2">
        <div className="container flex items-center">
          <Link href="/">
            <img className="h-12" src="/logo.svg" alt="Логотип" />
          </Link>
        </div>
      </header>

      <main className="flex flex-col grow">{children}</main>
    </>
  );
};
