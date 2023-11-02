import React from "react";
import { Button, Input, Menu, rem } from "@mantine/core";
import Link from "next/link";
import {
  IconBaselineDensityMedium,
  IconHeart,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const ITEMS = [
  { url: "/", name: "О нас" },
  { url: "/", name: "Тарифы" },
  { url: "/", name: "Отзывы" },
  { url: "/", name: "Вопросы и ответы" },
  { url: "/", name: "Блог" },
];

export const Header = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <header>
      <div className="container flex items-center py-2">
        <Link href="/">
          <img className="h-12" src="/logo.svg" alt="Логотип" />
        </Link>

        <ul className="flex gap-2 ml-auto mr-8 md:gap-6">
          {ITEMS.map(({ url, name }) => (
            <li key={name} className="hover:underline">
              <Link href={url}>{name}</Link>
            </li>
          ))}
        </ul>

        <ul className="ml-auto font-bold">
          <li>
            <a href="mailto:info@zetatech.ru">info@zetatech.ru</a>
          </li>
          <li>
            <a href="tel:8 800 500 50 80">8 800 500 50 80</a>
          </li>
        </ul>
      </div>

      <div className="container flex">
        <Menu
          classNames={{
            dropdown: "max-w-[400px] w-full",
          }}
          offset={0}
          shadow="md"
          width={"100%"}
          position="bottom-start"
        >
          <Menu.Target>
            <Button
              className="rounded-none max-w-[400px] w-full px-4"
              color="black"
              classNames={{
                label: "flex items-center gap-2",
              }}
              onClick={toggle}
            >
              {opened ? <IconX /> : <IconBaselineDensityMedium />}
              Каталог
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="rounded-none">
            <Menu.Item
              leftSection={
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconMessageCircle
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Messages
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconPhoto style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Gallery
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSearch style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Search
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Input
          className="grow"
          classNames={{
            input: "rounded-none border-black",
          }}
          placeholder="Поиск"
          rightSection={<IconSearch />}
        />
        <Button
          className="rounded-none border-x-0"
          color="black"
          variant="outline"
        >
          <IconHeart />
        </Button>
        <Button
          className="border-r-0 rounded-none"
          color="black"
          variant="outline"
        >
          <IconUserCircle />
        </Button>
        <Button className="rounded-none" color="black" variant="outline">
          <IconShoppingCart />
        </Button>
      </div>
    </header>
  );
};
