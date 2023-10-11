import React from "react";
import { Button } from "@mantine/core";
import Link from "next/link";

type Props = {};

const ITEMS = [
  { url: "/", name: "О нас" },
  { url: "/", name: "Отзывы" },
  { url: "/", name: "Блог" },
  { url: "/", name: "Контакты" },
  { url: "/", name: "Реквизиты" },
  { url: "/", name: "Вопросы" },
  { url: "/", name: "Закон и парсинг" },
  { url: "/", name: "Оферта" },
  { url: "/", name: "Глосарий" },
];

export const Header = (props: Props) => {
  return (
    <header className="py-2 text-white bg-black">
      <div className="container flex items-center">
        <ul className="flex gap-4 mr-auto">
          {ITEMS.map(({ url, name }) => (
            <li key={name}>
              <Link href={url}>{name}</Link>
            </li>
          ))}
        </ul>

        <Button
          className="mr-4"
          radius={"xs"}
          variant="default"
          component={Link}
          href="/register"
        >
          Регистрация
        </Button>
        <Button radius={"xs"} variant="default" component={Link} href="/login">
          Вход
        </Button>
      </div>
    </header>
  );
};
