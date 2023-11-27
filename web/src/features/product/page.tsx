import { fork, allSettled, serialize } from "effector";
import { GetServerSideProps } from "next";
import { useUnit } from "effector-react";
import { NextSeo } from "next-seo";
import { Anchor, Breadcrumbs, Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { $cart, addToCart } from "../cart/model";
import { $product, pageStarted } from "./model";
import Category from "@/pages/catalog/[category]";

export const getServerSidePropsProduct: GetServerSideProps = async ({
  query,
}) => {
  const scope = fork();

  await allSettled(pageStarted, { scope, params: { slug: query.slug } });

  if (scope.getState($product) === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      values: serialize(scope),
      revalidate: 60 * 5, // 5 minutes
    },
  };
};

export const ProductPage = () => {
  const { product, cart, onAddToCart } = useUnit({
    product: $product,
    cart: $cart,
    onAddToCart: addToCart,
  });

  const inCart = cart.some((value) => value.id === product.id);

  const breadCrumbs = product?.category.map(
    (itemCategory) => itemCategory.name
  );

  const items = [
    { title: "Главная", href: "/" },
    { title: "Каталог компаний", href: "/catalog" },
    {
      title: "База оптовых компаний в России",
      href: `/catalog/${Category.name}`,
    },
    { title: `${breadCrumbs}`, href: "#" },
  ].map((item, index) => {
    return (
      <Anchor className="text-gray text-base" href={item.href} key={index}>
        {item.title}
      </Anchor>
    );
  });

  return (
    <>
      <NextSeo title={product?.title} />

      <div>
        <div className="container">
          <Breadcrumbs className="mt-12" separator={<IconChevronRight />}>
            {items}
          </Breadcrumbs>

          <div className="grid grid-cols-[auto,380px] gap-16 mt-9 relative">
            <div>
              <div className="flex gap-32 ">
                {product.img_product && (
                  <img
                    src={product.img_product}
                    width={111}
                    height={112}
                    alt={product.title}
                  />
                )}

                <div>
                  <h1 className="font-medium">{product?.h1}</h1>

                  <p className="font-normal">
                    Категория:{" "}
                    <span className="uppercase">
                      {product?.category[0].name}
                    </span>
                  </p>

                  <div className="flex">
                    <p className="font-normal">
                      Метка:{" "}
                      <span className="px-2 py-1 text-center rounded-md bg-lilac">
                        {product?.mark[0].name}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mt-9"
                dangerouslySetInnerHTML={{
                  __html: product?.annotation,
                }}
              />

              <div
                className="mt-10 mb-32"
                dangerouslySetInnerHTML={{
                  __html: product?.content,
                }}
              />
            </div>

            <div className="flex flex-col gap-7 items-center h-[33rem] sticky top-0  p-10 border border-solid border-slate-400">
              <h3 className="m-0 font-medium text-2xl ">Детали заказа:</h3>

              <ul className="m-0 font-normal text-{28px} leading-9">
                <li className="list-disc">Формат CSV & XML</li>
                <li className="list-disc">Разбивка по регионам и категориям</li>
                <li className="list-disc">Максимально полная база</li>
                <li className="list-disc">Гарантия ежедневных обновлений</li>
                <li className="list-disc">Срок выполнения: готовая база</li>
              </ul>

              <div>
                <span className="font-medium text-3xl">
                  {product?.price} руб.
                </span>
              </div>

              <Button
                onClick={() => onAddToCart(product)}
                variant="outline"
                color="rgba(0, 103, 108, 1)"
                className={inCart ? "hidden" : ""}
              >
                Добавить в корзину
              </Button>

              {inCart && (
                <Button component={Link} href="/cart">
                  В корзине. Оплатить
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center h-[40rem] bg-[#FAFAFB]">
          <div className="flex  flex-col mx-auto w-[61rem]">
            <h2 className="text-5xl font-medium leading-10 text-center">
              Почему выбирают нас?
            </h2>

            <div className="flex items-center relative gap-24 mt-32">
              <div>
                <p className=" text-9xl font-black absolute top-[-70px] text-light m-0">
                  1
                </p>

                <div className="z-0 relative">
                  <div className="text-ruby text-2xl font-medium leading-9">
                    Качество
                  </div>

                  <p>
                    Мы даем вам обзор тысяч поставщиков данных. Вы получите
                    полную картину
                  </p>
                </div>
              </div>
              <div>
                <p className="text-9xl font-black absolute top-[-70px] text-light m-0">
                  2
                </p>

                <div className="z-0 relative">
                  <div className="text-ruby text-2xl font-medium leading-9">
                    Удобство
                  </div>

                  <p>
                    В кратчайшие сроки получайте результат в удобном для вас
                    формате
                  </p>
                </div>
              </div>
              <div>
                <p className="text-9xl font-black absolute top-[-70px] text-light m-0">
                  3
                </p>

                <div className="z-0 relative">
                  <div className="text-ruby text-2xl font-medium leading-9">
                    Надежность
                  </div>
                  <p>
                    Получите бесплатную консультацию по выбору источников от
                    нашей команды
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-16">
              <Button component={Link} href="/login">
                {" "}
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
