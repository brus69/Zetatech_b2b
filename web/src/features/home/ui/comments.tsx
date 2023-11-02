/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Title } from "@mantine/core";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { cn } from "@/shared/lib";

function Arrow(props: {
  left?: boolean;
  onClick: (event: React.MouseEvent) => void;
}) {
  const className =
    "absolute top-[-60px] cursor-pointer bg-transparent outline-none border-none text-transparent center rounded-full w-8 h-8";

  return (
    <>
      {props.left ? (
        <button
          aria-label="Стрелка назад"
          onClick={props.onClick}
          className={cn(className, "right-[35px] z-30 bg-center")}
          style={{ backgroundImage: `url("/assets/comments/arrow-back.svg")` }}
        >
        </button>
      ) : (
        <button
          aria-label="Стрелка вперед"
          onClick={props.onClick}
          className={cn(className, "right-0 z-30 bg-center")}
          style={{ backgroundImage: `url("/assets/comments/arrow-next.svg")` }}
        >
        </button>
      )}
    </>
  );
}

// пробный массив! для вёрстки
const comments = [
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

export const Comments = () => {
  const [currentSlide, setCurrentSlide] = useState(3);
  const [, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 1,
    loop: true,
    slides: {
      perView: 4,
    },
    breakpoints: {
      "(max-width: 938px)": {
        slides: {
          perView: 3,
        },
      },
      "(max-width: 600px)": {
        slides: {
          perView: 2,
        },
      },
      "(max-width: 500px)": {
        slides: {
          perView: 1,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <section className="flex flex-col justify-center bg-silver pt-20 pb-14">
      <div className="container">
        <Title
          order={2}
          classNames={{
            root: "m-0 p-0 text-left mb-32 text-black text-3xl sm:text-[50px]",
          }}
        >
          Отзывы наших клиентов
        </Title>
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {comments.map((comment, index) => (
              <div key={index} className="keen-slider__slide px-5">
                <img
                  src={`/assets/comments/grades-${comment.grade}.png`}
                  alt="Grade"
                  className="pb-4"
                />
                <div className="flex flex-col py-5 px-2 gap-5 border-black border-solid border-x-0 border-b-0 border-t">
                  <p className="text-md p-0 m-0 text-black">{comment.text}</p>
                  <p className="text-md p-0 m-0 text-gray">{comment.author}</p>
                </div>
              </div>
            ))}
          </div>
          <Arrow
            left
            onClick={(event) => {
              event.stopPropagation();
              instanceRef.current?.prev();
            }}
          />
          <Arrow
            onClick={(event) => {
              event.stopPropagation();
              instanceRef.current?.next();
            }}
          />
        </div>

        {/* <Slider {...settings}>
          {comments.map((comment, index) => (
            <div key={index} className=" px-5">
              <img
                src={`/assets/comments/grades-${comment.grade}.png`}
                alt="Grade"
                className="pb-4"
              />
              <div className="flex flex-col py-5 px-2 gap-5 border-black border-solid border-x-0 border-b-0 border-t">
                <p className="text-md p-0 m-0 text-black">{comment.text}</p>
                <p className="text-md p-0 m-0 text-gray">{comment.author}</p>
              </div>
            </div>
          ))}
        </Slider> */}
      </div>
    </section>
  );
};
