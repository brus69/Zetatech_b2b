import React from "react";
import { Title } from '@mantine/core';

const points = [
  {src: '/assets/preview/icon1.svg', text: 'контент с закрытых разделов сайта или страниц с каптчей', class: 'max-w-[466px]'},
  {src: '/assets/preview/icon2.svg', text: 'цены и наличие из прайсов поставщиков', class: 'max-w-[378px]'},
  {src: '/assets/preview/icon3.svg', text: 'телефоны и email-адреса организаций', class: 'max-w-[466px]'},
  {src: '/assets/preview/icon4.svg', text: 'каталог товаров с изображениями, артикул, категория, название, производитель, описание', class: 'max-w-[378px]'},
]

export const Preview = () => {
  return (
    <section className="mb-[284px]">
        <div className="flex flex-col container max-w-[1180px]">
          <Title order={2} classNames={{ root: 'm-0 mt-[140px] p-0' }}>Что мы парсим</Title>
          <ul className="grid md:grid-cols-2 gap-y-16 gap-x-0 sm:gap-x-3 md:gap-x-36 p-0 mb-0 mt-24 ">
            {points.map((el) => 
              <li key={el.text} className="flex gap-x-9">
                <img src={el.src} alt='icon' width="64px"/>
                <p className={`text-base w-full ${el.class}`}>{el.text}</p>
              </li>
            )}
          </ul>
        </div>
    </section>
  );
};
