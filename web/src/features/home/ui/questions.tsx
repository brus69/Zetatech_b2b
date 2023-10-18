import { IconPlus } from "@tabler/icons-react";
import { Accordion, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { $faqs } from "../model";

// TODO: анимация иконки +-

export const Questions = () => {
  const { faqs } = useUnit({ faqs: $faqs });

  const items = faqs.map((faq) => (
    <Accordion.Item key={faq.question} id={faq.id} value={faq.question}>
      <Accordion.Control>{faq.question}</Accordion.Control>
      <Accordion.Panel>{faq.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <section className="w-full pt-[105px] pb-[50px] bg-white">
      <div className="flex flex-col max-w-[250px] sm:max-w-[350px] md:max-w-[988px] p-0 m-auto">
        <Title
          order={2}
          classNames={{ root: "m-0 p-0 text-black text-center" }}
        >
          Вопросы и ответы
        </Title>
        <Accordion
          classNames={{
            root: "flex flex-col gap-[10px] p-[30px] pt-[8px] mt-[50px]",
            item: "flex flex-col gap-[10px] pb-[20px] box-border border-solid border-b-slate-300 border-0 border-b-[1px]",
            label: "text-lg font-[18px] font-[500] p-0",
            content: "p-0 pl-[60px] text-[#9B9BAB] text-[14px]",
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
