import React from "react";
import { Title, Input, Button } from "@mantine/core";

export const Newsletter = () => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    console.log('сабмит формы');
    evt.preventDefault();
  }

  return (
    <section className="w-full -mt-[2px] pb-[170px] bg-gray-300">
        <div className="flex flex-col p-0 container max-w-[1180px]">
          <Title order={2} classNames={{ root: 'm-0 p-0' }}>Подпишитесь на нашу рассылку</Title>
          <p className="text-[28px] mt-[36px] mb-[74px]">Интересные новости и бесплатные загрузки каждую неделю</p>
          <form className="flex flex-row" onSubmit={handleSubmit}>
            <Input variant="unstyled" placeholder="Введите ваш email" 
                classNames={{ input: 'placeholder:text-[#574F6D] text-[15px] border-[#574F6D] max-w-[256px] p-[20px] h-[58px]' }}
            />
            <Button
                type="submit"
                classNames={{ 
                    root: "bg-[#140B27] w-[233px] p-[20px] box-border h-[58px] disabled:bg-transparent ",
                    inner: 'text-[15px] font-[400] text-white'
                }}
            >Подписаться на рассылку</Button>
          </form>
        </div>
    </section>
  );
};
