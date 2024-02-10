import { fork, allSettled, serialize } from "effector";
import { GetServerSideProps } from "next";
import { useUnit } from "effector-react";
import { Anchor, Breadcrumbs, Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { $cart, addToCart } from "../cart/model";
import { $product, pageStarted } from "./model";
import Category from "@/pages/catalog/[category]";
import { isOpenChanged } from "@/widgets/brief-modal/model";
import { BriefModal } from "@/widgets/brief-modal";

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
  const { openBriefModal } = useUnit({ openBriefModal: isOpenChanged });
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
      <Anchor className="text-base text-gray" href={item.href} key={index}>
        {item.title}
      </Anchor>
    );
  });

  return (
    <>
      <NextSeo title={product?.title} />

      <div className="container">
        <Breadcrumbs
          className="flex-wrap mt-12"
          separator={<IconChevronRight />}
        >
          {items}
        </Breadcrumbs>

        <div className="grid md:grid-cols-[auto,380px] gap-16 mt-9 pb-32 relative">
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
                  <span className="uppercase">{product?.category[0].name}</span>
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
              className="mt-10"
              dangerouslySetInnerHTML={{
                __html: product?.content,
              }}
            />
          </div>

          <div className="flex flex-col gap-7 items-center h-[33rem] sticky top-0  p-10 border border-solid border-slate-400">
            <h3 className="m-0 text-2xl font-medium ">Детали заказа:</h3>

            <ul className="m-0 font-normal text-{28px} leading-9">
              <li className="list-disc">Формат CSV & XML</li>
              <li className="list-disc">Разбивка по регионам и категориям</li>
              <li className="list-disc">Максимально полная база</li>
              <li className="list-disc">Гарантия ежедневных обновлений</li>
              <li className="list-disc">Срок выполнения: готовая база</li>
            </ul>

            <div>
              <span className="text-3xl font-medium">
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

      <div className="mt-auto flex items-center  pb-16 bg-[#FAFAFB]">
        <div className="container">
          <div className="flex flex-col">
            <h2 className="text-5xl font-medium leading-10 text-center">
              Почему выбирают нас?
            </h2>

            <div className="relative flex flex-col items-center gap-24 mt-32 lg:flex-row">
              <div className="relative">
                <p className=" text-9xl font-black absolute top-[-70px] text-light m-0">
                  1
                </p>

                <div className="relative z-0">
                  <div className="text-2xl font-medium leading-9 text-ruby">
                    Качество
                  </div>

                  <p>
                    Мы даем вам обзор тысяч поставщиков данных. Вы получите
                    полную картину
                  </p>
                </div>
              </div>
              <div className="relative">
                <p className="text-9xl font-black absolute top-[-70px] text-light m-0">
                  2
                </p>

                <div className="relative z-0">
                  <div className="text-2xl font-medium leading-9 text-ruby">
                    Удобство
                  </div>

                  <p>
                    В кратчайшие сроки получайте результат в удобном для вас
                    формате
                  </p>
                </div>
              </div>
              <div className="relative">
                <p className="text-9xl font-black absolute top-[-70px] text-light m-0">
                  3
                </p>

                <div className="relative z-0">
                  <div className="text-2xl font-medium leading-9 text-ruby">
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
              <Button onClick={() => openBriefModal(true)}>
                {" "}
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BriefModal />
    </>
  );
};
