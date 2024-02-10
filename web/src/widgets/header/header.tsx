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
import { useRouter } from "next/router";
import { $categories } from "@/api/categories";
import { cn } from "@/shared/lib";

const ITEMS = [
  { url: "/", name: "О нас" },
  { url: "/#pricing", name: "Тарифы" },
  { url: "/contacts", name: "Контакты" },
  { url: "/#reviews", name: "Отзывы" },
  { url: "/#faq", name: "Вопросы и ответы" },
  { url: "/blog", name: "Блог" },
];

export const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { categories } = useUnit({
    categories: $categories,
  });

  const [slug, setSlug] = useState<string | null>(null);

  const parentCategory = categories.find((category) => category.slug === slug);

  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/catalog?search=${search}`);
  };

  return (
    <header>
      <div className="container flex items-center py-2">
        <Link className="mr-auto max-sm:hidden" href="/">
          <img className="h-12" src="/logo.svg" alt="Логотип" />
        </Link>

        <ul className="flex flex-wrap p-0 mr-8 gap-x-2 md:gap-x-4">
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

      <div className="container flex flex-col md:flex-row">
        <Menu
          offset={0}
          shadow="md"
          position="bottom-start"
          onClose={() => setOpen(false)}
          keepMounted
        >
          <Menu.Target>
            <Button
              className="rounded-none  lg:min-w-[400px] md:max-w-[400px] px-4"
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
          <Menu.Dropdown className="p-0 rounded-none shadow-md ">
            <div className="flex">
              <div
                className={cn(
                  "flex flex-col min-w-[400px] max-w-[400px] sm:max-h-[500px] overflow-auto",
                  parentCategory && "max-md:hidden"
                )}
              >
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

              <div
                className={cn(
                  "md:flex flex-col min-w-[350px] max-w-[350px] border-l border-solid border-0 bg-silver sm:max-h-[500px] overflow-auto",
                  !parentCategory && "hidden"
                )}
              >
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

        <div className="flex grow">
          <form className="grow" onSubmit={handleSubmit}>
            <Input
              className="grow"
              classNames={{
                input: "rounded-none border-black",
              }}
              placeholder="Поиск"
              rightSection={<IconSearch className="!text-black" />}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </form>
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
      </div>
    </header>
  );
};
