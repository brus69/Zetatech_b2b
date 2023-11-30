import React from "react";
import Image from "next/image";
import salony from "../../../../public/assets/catalog/salony.svg";
import favorite from "../../../../public/assets/catalog/favorite.svg";
import { Product } from "@/api/codegen";

type Props = { product: Product };

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="flex flex-col w-[178px] box-border border-solid transition-colors duration-300 ease-in-out border rounded border-light hover:border-ruby cursor-pointer relative mr-[42px] mb-[20px]">
      <div className="flex flex-col items-center min-h-[268px]">
        <Image
          src={favorite}
          alt="favorite"
          className="absolute top-0 right-0 mr-[15px] mt-[20px]"
        />
        <img
          src={product.img_product || ""}
          alt="Card image"
          className="object-cover object-center mt-[33px] mr-[2px]"
        />
        <div className="mt-[10px] text-base text-ruby font-bold">
          САЛОНЫ КРАСОТЫ
          <div className="mt-[10px] ml-[5px] absolute text-base font-medium text-black">
            1 499 руб.
          </div>
        </div>
      </div>
    </div>
  );
};
