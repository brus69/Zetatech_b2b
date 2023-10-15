import React from "react";
import { Button } from "@mantine/core";
import Link from "next/link";

const ITEMS = [
  { url: "/", name: "О нас" },
  { url: "/", name: "Тарифы" },
  { url: "/", name: "Отзывы" },
  { url: "/", name: "Вопросы и ответы" },
  { url: "/", name: "Блог" },
];

export const Header = () => {
  return (
    <header className="py-2">
      <div className="container flex items-center">
        <Link href="/">
          <img className="h-12" src="/logo.svg" alt="Логотип" />
        </Link>

        <ul className="flex gap-4 m-auto">
          {ITEMS.map(({ url, name }) => (
            <li key={name}>
              <Link href={url}>{name}</Link>
            </li>
          ))}
        </ul>

        <Button variant="filled" component={Link} href="/login">
          Войти в лк
        </Button>
      </div>
    </header>
  );
};
