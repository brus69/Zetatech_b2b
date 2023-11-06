import { fork, allSettled, serialize } from "effector";
import { GetServerSideProps } from "next";
import { useUnit } from "effector-react";
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

  return <div className="container">{JSON.stringify(product)}</div>;
};
