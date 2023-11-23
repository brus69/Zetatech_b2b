import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import Link from "next/link";
import { useEffect } from "react";
import { $marks, $products, pageStarted } from "./model";
import { requestFx } from "@/shared/api";

export const getServerSidePropsCatalog = async () => {
  const scope = fork();

  await allSettled(pageStarted, { scope });

  return {
    props: {
      values: serialize(scope),
      revalidate: 60 * 5, // 5 minutes
    },
  };
};

export const CatalogPage = () => {
  const { products, marks } = useUnit({
    products: $products,
    marks: $marks,
  });

  useEffect(() => {
    requestFx({
      path: "/cart/",
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="mb-8">Catalog</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {marks.map((mark) => (
            <Link
              className="p-1 px-2 text-black rounded bg-lilac"
              key={mark.slug}
              href={`/catalog/mark/${mark.slug}`}
            >
              {mark.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {products.map((product) => (
            <div
              key={product.slug}
              className="flex gap-1 p-2 border border-black border-solid rounded"
            >
              <Link href={`/product/${product.slug}`}>{product.h1}</Link>

              <button
                onClick={() => {
                  requestFx({
                    path: `/cart/`,
                    method: "POST",
                    body: {
                      product_id: product.id,
                    },
                  });
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  requestFx({
                    path: `/cart/${product.id}/`,
                    method: "delete",
                    body: {
                      product_id: product.id,
                    },
                  });
                }}
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
