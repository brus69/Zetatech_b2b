import { fork, allSettled, serialize } from "effector";
import { GetServerSideProps } from "next";
import { useUnit } from "effector-react";
import { NextSeo } from "next-seo";
import { $product, pageStarted } from "./model";

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
  const { product } = useUnit({ product: $product });

  return (
    <>
      <NextSeo title={product.title} />
      <div className="container">
        <div className="flex gap-32 mt-28">
          {/* {product.img_product && (
              <img
                src={product.img_product}
                width={111}
                height={112}
                alt={product.title}
              />
            )} */}
          <div className="h-28">
            <img
              src="https://polyakovdmitriy.ru/wp-content/uploads/2020/09/Getting-Started-with-NextJS.jpg"
              alt={product.title}
              height="100%"
              width="100%"
            />
          </div>

          <div>
            <h1 className="font-medium">{product.h1}</h1>

            <p className="font-normal">
              Категория: <span className="uppercase">одежда</span>
            </p>

            <div className="flex">
              <p className="font-normal">
                Метка:{" "}
                <span className="px-2 py-1 text-center rounded-md bg-lilac">
                  Ламода
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
