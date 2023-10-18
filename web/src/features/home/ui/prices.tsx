import React from "react";
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { Button, Title } from "@mantine/core";

const rates = [
    {
        name: 'Тариф "Начальный"',
        price: 500,
        points: [
            'Скорость парсинга: Средняя',
            'Количество запросов в месяц: Ограничено',
            'Поддержка: Базовая (email)',
        ],
        buttonColor: 'bg-transparent',
    },
    {
        name: 'Тариф "Стандарт"',
        price: 1000,
        points: [
            'Скорость парсинга: Высокая',
            'Количество запросов в месяц: Увеличенное',
            'Поддержка: Расширенная',
        ],
        buttonColor: 'bg-indigo-950 text-white',
    },
    {
        name: 'Тариф "Премиум"',
        price: 1500,
        points: [
            'Скорость парсинга: Очень высокая',
            'Количество запросов в месяц: Неограниченное',
            'Поддержка: Приоритетная',
            'Дополнительные функции: полная настройка парсинга, возможность работы с сложными структурами данных, автоматизация задач парсинга',
        ],
        buttonColor: 'bg-transparent',
    },
]

export const Prices = () => {
  const handleClick = () => {
    console.log('добавлено в корзину');
  }

  return (
    <section className="w-full pt-[80px] pb-[102px] bg-gray-300">
        <div className="flex flex-col w-full container p-0 max-w-[1180px]">
          <Title order={2} classNames={{ root: 'm-0 p-0' }}>Тарифы</Title>
          <ul className="flex flex-col lg:flex-row p-0 m-auto mt-[77px] gap-[50px]">
            {rates.map(({ name, price, points, buttonColor }) => 
                <li key={name} className="flex flex-col w-[280px] items-center pt-[40px] bg-white min-h-[512px] gap-[20px]">
                    <p className="text-[22px] font-medium m-0">{name}</p>
                    <p className="text-[28px] font-bold m-0">{price} руб.</p>
                    <ul className="p-0 flex flex-col gap-[15px] max-w-[245px]">
                        {points.map((el) => {
                            return (
                            <li key={el} className="flex flex-row items-center p-0 gap-[10px]">
                                <IconCircleCheckFilled width="17px"/>
                                <p className="m-0 text-sm max-w-[219px]">{el}</p>
                            </li>
                            )
                        })}
                    </ul>
                    <Button onClick={handleClick} className={`${buttonColor} border-indigo-950 text-indigo-950 w-[107px] h-[38px]`}>Заказать</Button>
                </li>
            )}
          </ul>
        </div>
    </section>
  );
};
