/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { Accordion, Title } from '@mantine/core';
import { useState } from 'react'

// доработка: анимация иконки +-

const tasks = [
    {
        index: '0',
        question: 'Что вы парсите?',
        answer: 'Все то, что в открытом доступе и доступно к сбору руками человека. Например: цены на товары, наличие по магазинам и т. п. Мы не занимаемся парсингом сайтов, где требуется указать логин- пароль',
    },
    {
        index: '1',
        question: 'Как клиенты получают данные?',
        answer: 'Лучше быть последним — первым, чем первым — последним',
    },
    {
        index: '2',
        question: 'Кому будет полезна услуга парсинга?',
        answer: 'Лучше быть последним — первым, чем первым — последним',
    },
    {
        index: '3',
        question: 'Какие типы сайтов вы парсите?',
        answer: 'Лучше быть последним — первым, чем первым — последним',
    },
    {
        index: '4',
        question: 'Парсить законно?',
        answer: 'Лучше быть последним — первым, чем первым — последним',
    },
    {
        index: '5',
        question: 'Вы сильно нагружаете сайты, которые парсите?',
        answer: 'Лучше быть последним — первым, чем первым — последним',
    },
    {
        index: '6',
        question: 'Много у вас конкурентов?',
        answer: 'Лучше быть последним — первым, чем первым — последним',
    },
    {
        index: '7',
        question: 'Сколько человек у вас в команде?',
        answer: 'Лучше быть последним — первым, чем первым — последним',
    },
]

export const Questions = () => {
  const [indexes, setIndexes] = useState([]);
  const handleChange = () => {
        setIndexes((prev, index) => 
            prev.includes(index) ? prev.filter(i => i != index) : [...prev, index]
        )
  }

  const items = tasks.map((item) => (
    <Accordion.Item key={item.question} id={item.index} value={item.question}>
      <Accordion.Control>{item.question}</Accordion.Control>
      <Accordion.Panel>{item.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <section className="w-full pt-[105px] pb-[50px] bg-white">
        <div className="flex flex-col max-w-[250px] sm:max-w-[350px] md:max-w-[988px] p-0 m-auto">
            <Title order={2} classNames={{ root: 'm-0 p-0 text-black text-center' }}>Вопросы и ответы</Title>
            <Accordion
                classNames={{
                    root: 'flex flex-col gap-[10px] p-[30px] pt-[8px] mt-[50px] mb-0',
                    item: 'flex flex-col gap-[10px] pb-[20px] box-border border-solid border-b-slate-300 border-0 border-b-[1px]',
                    label: 'm-0 text-lg font-[18px] font-[500] p-0',
                    panel: 'mt-[10px]',
                    content: 'm-0 m-t-[10px] p-0 pl-[60px] text-[#9B9BAB] text-[14px]',
                }}
                chevronPosition="left"
                chevron={<IconPlus/>} 
                chevronSize='26px'
                onChange={handleChange}
            >
                {items}
            </Accordion>
        </div>
    </section>
  );
};
