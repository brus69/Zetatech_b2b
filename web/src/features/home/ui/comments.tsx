import React from "react";
import Slider from "react-slick";
import "../../../app/styles/slick.css";
import { Title } from "@mantine/core";

// пробный массив! для вёрстки
const comms = [
  {
    grade: 5,
    text: "Благодарим команду  за весьма чуткую и подробную поддержку. Этого очень не хватает в нашем менталитете. Можно сказать европейский уровень обслуживания.Особо удивил момент доработки конкретных файлов по нашему запросу",
    author: "Маркетолог ПАО “Сбербанк”",
  },
  {
    grade: 4,
    text: "Компания, оказывающая услуги парсинга, превзошла мои ожидания. Их эффективный и безошибочный парсер позволяет быстро и точно извлекать необходимую информацию из различных источников. Профессионализм, скорость и качество работы - вот что отличает эту компанию от других. Рекомендую!",
    author: "Светлана Мельникова",
  },
  {
    grade: 5,
    text: "Супер! Случайно наткнулся на Ваш сайт - это просто праздник какойто! Спасибо, ребята, офигенно удобный и нужный сервис.",
    author: "Константин, ООО “Рога и копыта”",
  },
  {
    grade: 5,
    text: "Многие брались и не могли сделать, а вы спарсили то, что нужно.",
    author: "Дмитрий",
  },
  {
    grade: 5,
    text: "Многие брались и не могли сделать, а вы спарсили то, что нужно.",
    author: "Дмитрий",
  },
  {
    grade: 5,
    text: "Многие брались и не могли сделать, а вы спарсили то, что нужно.",
    author: "Дмитрий",
  },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "transparent",
        backgroundImage: `url("/assets/comments/arrow-next.svg")`,
        backgroundSize: "contain",
        width: "32px",
        height: "32px",
        position: "absolute",
        top: "-60px",
        cursor: "pointer",
        right: "0",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "transparent",
        backgroundImage: `url("/assets/comments/arrow-back.svg")`,
        backgroundSize: "contain",
        width: "32px",
        height: "32px",
        position: "absolute",
        top: "-60px",
        cursor: "pointer",
        right: "32px",
      }}
      onClick={onClick}
    />
  );
}

export const Comments = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="flex flex-col justify-center bg-[#FAFAFB] pt-20 pb-14">
      <div className="container">
        <Title order={2} classNames={{ root: "m-0 p-0 text-left mb-32" }}>
          Отзывы наших клиентов
        </Title>
        <Slider {...settings}>
          {comms.map((el, index) => (
            <div key={index} className=" px-5">
              <img
                src={`/assets/comments/grades-${el.grade}.png`}
                alt="Grade"
                className="pb-4"
              />
              <div className="flex flex-col py-5 px-2 gap-5 border-black border-solid border-x-0 border-b-0 border-t">
                <p className="text-md p-0 m-0">{el.text}</p>
                <p className="text-md p-0 m-0 text-[#9B9BAB]">{el.author}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
