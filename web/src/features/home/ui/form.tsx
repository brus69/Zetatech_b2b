import { useState } from "react";
import { Button, Title } from '@mantine/core';
import { BEFORE_SUBMIT_TEXT, AFTER_SUBMIT_TEXT } from '../../../shared/constants';

export const Form = () => {
  const [values, setValues] = useState({
    name: '', 
    phone: '',
    email: '',
    text: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    console.log('сабмит формы');
    evt.preventDefault();
    setIsSubmit(true);
  }

  const inputStyle = 'text-white bg-transparent pl-[10px] outline outline-1 outline-white w-full placeholder:text-[#858585] placeholder:text-[15px] p-y-[10px] box-border border-none';

  return (
    <section className="w-full pt-[80px] pb-[132px] bg-[#140B27]">
        <div className="flex flex-col max-w-[250px] sm:max-w-[350px] md:max-w-[580px] p-0 m-auto">
          <Title order={2} classNames={{ root: 'md:text-[58px] font-medium m-0 p-0 text-white text-center' }}>Связаться с нами</Title>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[19px] mt-[46px]">
            <div className="flex flex-col md:flex-row gap-[21px] w-full">
                <input type="text" placeholder="Введите имя" name="name" value={values.name} onChange={handleChange} required={true} className={`${inputStyle} h-[38px]`}/>
                <input type="tel" placeholder="Номер телефона" name="phone" pattern="\+[0-9]{11}" value={values.phone} onChange={handleChange} required={true} className={`${inputStyle} h-[38px]`}/>
            </div>
            <input type="email" placeholder="Электронная почта" name="email" pattern="^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$" value={values.email} onChange={handleChange} required={true} className={`${inputStyle} h-[38px]`}/>
            <textarea  placeholder="Задайте вопрос, укажите другую информацию" name="text" value={values.text} onChange={handleChange} className={`${inputStyle} min-h-[99px] pt-[10px] placeholder:text-left placeholder:align-text-top`}></textarea>
            <div className="flex flex-col md:flex-row gap-[20px]">
                <Button type="submit" className="bg-transparent text-white border-white w-[180px] h-[38px]">Заказать</Button>
                <p className="text-white text-sm max-w-[330px] m-0">{!isSubmit ? BEFORE_SUBMIT_TEXT : AFTER_SUBMIT_TEXT}</p>
            </div>
          </form>
        </div>
    </section>
  );
};