import { IconPlus } from "@tabler/icons-react";
import { Accordion, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { $faqs } from "../model";

// TODO: анимация иконки +-

export const Questions = () => {
  const { faqs } = useUnit({ faqs: $faqs });

  const items = faqs.map((faq) => (
    <Accordion.Item key={faq.question} value={faq.question}>
      <Accordion.Control>{faq.question}</Accordion.Control>
      <Accordion.Panel>{faq.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <section className="w-full pt-24 pb-12">
      <div className="flex flex-col  md:max-w-[880px] p-0 m-auto">
        <Title
          id="faq"
          order={2}
          classNames={{
            root: "m-0 p-0 text-black text-center text-3xl sm:text-[50px]",
          }}
        >
          Вопросы и ответы
        </Title>
        <Accordion
          classNames={{
            root: "flex flex-col gap-2 p-7 pt-2 mt-10",
            item: "flex flex-col gap-2 pb-5 box-border border-solid border-b-gray border-0 border-b",
            label: "text-lg font-medium p-0 pl-8 text-black",
            content: "p-0 pl-14 text-gray text-sm",
          }}
          chevronPosition="left"
          chevron={<IconPlus />}
          chevronSize="26px"
        >
          {items}
        </Accordion>
      </div>
    </section>
  );
};
