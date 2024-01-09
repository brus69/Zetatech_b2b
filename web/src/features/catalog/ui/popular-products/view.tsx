import { useUnit } from "effector-react";
import { ProductCard } from "../card/card";
import { $products } from "./model";

export const PopularProducts = () => {
  const products = useUnit($products);

  return (
    <>
      <h1 className="font-medium text-center">Больше всего скачивают</h1>
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        {products.slice(-4).map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
    </>
  );
};
