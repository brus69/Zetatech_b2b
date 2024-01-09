import React from "react";
import { IconHeart } from "@tabler/icons-react";
import Link from "next/link";
import { Product } from "@/api/codegen";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <Link
      className="flex flex-col box-border border-solid transition-all border rounded border-light hover:border-ruby cursor-pointer relative mb-[30px]"
      href={`/product/${product.slug}`}
    >
      <div className="flex flex-col min-h-[268px] p-4">
        <IconHeart className="absolute top-2 right-2" />
        <img
          src={product.img_product || ""}
          alt="Card image"
          className="object-cover object-center mt-6"
        />
        <div className="my-3 text-base font-bold text-ruby">
          {product.slug}
          <div className="mt-auto text-base font-medium text-black">
            {product.price} руб
          </div>
        </div>
      </div>
    </Link>
  );
};
