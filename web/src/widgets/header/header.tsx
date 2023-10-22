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
    <header className="py-2 shadow-lg">
      <div className="container flex items-center">
        <Link href="/">
          <img className="h-12" src="/logo.svg" alt="Логотип" />
        </Link>

        <ul className="flex gap-4 ml-auto mr-8">
          {ITEMS.map(({ url, name }) => (
            <li key={name} className="hover:underline">
              <Link href={url}>{name}</Link>
            </li>
          ))}
        </ul>

        <ul className="mr-auto font-bold">
          <li>
            <a href="mailto:info@zetatech.ru">info@zetatech.ru</a>
          </li>
          <li>
            <a href="tel:8 800 500 50 80">8 800 500 50 80</a>
          </li>
        </ul>

        <Button variant="outline" component={Link} href="/login">
          Войти в лк
        </Button>
      </div>
    </header>
  );
};
