import React, { useState } from "react";
import { Button, Input, Menu } from "@mantine/core";
import Link from "next/link";
import {
  IconBaselineDensityMedium,
  IconChevronRight,
  IconHeart,
  IconPointFilled,
  IconSearch,
  IconShoppingCart,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { $categories } from "@/api/categories";

const ITEMS = [
  { url: "/", name: "О нас" },
  { url: "/", name: "Тарифы" },
  { url: "/", name: "Отзывы" },
  { url: "/", name: "Вопросы и ответы" },
  { url: "/", name: "Блог" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);

  const { categories } = useUnit({
    categories: $categories,
  });

  const [slug, setSlug] = useState<string | null>(null);

  const parentCategory = categories.find((category) => category.slug === slug);

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
          offset={0}
          shadow="md"
          position="bottom-start"
          onClose={() => setOpen(false)}
        >
          <Menu.Target>
            <Button
              className="rounded-none min-w-[400px] max-w-[400px] px-4"
              color="black"
              classNames={{
                label: "flex items-center gap-2",
              }}
              onClick={() => setOpen((p) => !p)}
            >
              {open ? <IconX /> : <IconBaselineDensityMedium />}
              Каталог
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="p-0 rounded-none shadow-md">
            <div className="flex">
              <div className="flex flex-col min-w-[400px] max-w-[400px]">
                {categories.map((category) => (
                  <Menu.Item
                    key={category.slug}
                    leftSection={<IconPointFilled className="w-3" />}
                    rightSection={<IconChevronRight />}
                    onMouseOver={() => setSlug(category.slug)}
                    component={Link}
                    href={`/catalog/${category.slug}`}
                  >
                    {category.name}
                  </Menu.Item>
                ))}

                <Menu.Item className="mt-8" component={Link} href="/catalog">
                  Все категории
                </Menu.Item>
              </div>

              <div className="flex flex-col min-w-[350px] max-w-[350px] border-l border-solid border-0">
                {parentCategory &&
                  parentCategory.subcategories.map((category) => (
                    <Menu.Item
                      key={category.slug}
                      component={Link}
                      href={`/catalog/${category.slug}`}
                    >
                      {category.name}
                    </Menu.Item>
                  ))}
              </div>
            </div>
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
          component={Link}
          // TODO or go to lk/favorites
          href="/login"
          className="rounded-none border-x-0"
          color="black"
          variant="outline"
        >
          <IconHeart />
        </Button>
        <Button
          component={Link}
          // TODO or go to lk
          href="/login"
          className="border-r-0 rounded-none"
          color="black"
          variant="outline"
        >
          <IconUserCircle />
        </Button>
        <Button
          component={Link}
          href="/cart"
          className="rounded-none"
          color="black"
          variant="outline"
        >
          <IconShoppingCart />
        </Button>
      </div>
    </header>
  );
};
