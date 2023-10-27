/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Title } from "@mantine/core";
import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
import "./team.css";

const people = [
  {
    name: "Семен Рыбалкин",
    about:
      "Картельные сговоры не допускают ситуации, при которой многие известные личности, инициированные исключительно синтетически обуславливают знакомое течение",
    position: "Создатель и светлая голова Zetatech",
    image: "/assets/img.png",
  },
  {
    name: "Семен Рыбалкин",
    about:
      "Картельные сговоры не допускают ситуации, при которой многие известные личности, инициированные исключительно синтетически обуславливают знакомое течение",
    position: "Создатель и светлая голова Zetatech",
    image: "/assets/img.png",
  },
  {
    name: "Семен Рыбалкин",
    about:
      "Картельные сговоры не допускают ситуации, при которой многие известные личности, инициированные исключительно синтетически обуславливают знакомое течение",
    position: "Создатель и светлая голова Zetatech",
    image: "/assets/img.png",
  },
  {
    name: "Семен Рыбалкин",
    about:
      "Картельные сговоры не допускают ситуации, при которой многие известные личности, инициированные исключительно синтетически обуславливают знакомое течение",
    position: "Создатель и светлая голова Zetatech",
    image: "/assets/img.png",
  },
  {
    name: "Семен Рыбалкин",
    about:
      "Картельные сговоры не допускают ситуации, при которой многие известные личности, инициированные исключительно синтетически обуславливают знакомое течение",
    position: "Создатель и светлая голова Zetatech",
    image: "/assets/img.png",
  },
  {
    name: "Семен Рыбалкин",
    about:
      "Картельные сговоры не допускают ситуации, при которой многие известные личности, инициированные исключительно синтетически обуславливают знакомое течение",
    position: "Создатель и светлая голова Zetatech",
    image: "/assets/img.png",
  },
];

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <>
      {props.left ? (
        <img src="/assets/team/prev.svg" alt="Стрелка назад" onClick={props.onClick} className="absolute top-[50%] left-0 cursor-pointer" />
      ) : (
        <img src="/assets/team/next.svg" alt="Стрелка вперед" onClick={props.onClick} className="absolute top-[50%] right-0 cursor-pointer" />
      )}
    </>
  );
}

export const Team = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 3,
    slides: {
      origin: "center",
      perView: 5,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="container">
        <Title order={2} classNames={{ root: "m-0 p-0 text-center mb-20" }}>
          Наша команда
        </Title>
        <div className="navigation-wrapper relative">
          <div ref={sliderRef} className="keen-slider">
            {people.map((el, index) => (
              <div
                key={index}
                style={{
                  scale: currentSlide !== index && "0.7",
                  transition: "scale 0.3s",
                  zIndex: currentSlide === index && "1",
                  maxWidth: "380px",
                }}
                className="keen-slider__slide w-[380px]"
              >
                <img
                  src={el.image}
                  alt={el.name}
                  className="rounded-[50%] object-contain w-[380px]"
                />
                <div
                  className="text-center flex flex-col items-center w-[380px]"
                  style={{
                    opacity: currentSlide !== index && "0",
                  }}
                >
                  <p className="text-[#00676C] text-2xl font-bold m-0 mt-12">
                    {el.name}
                  </p>
                  <p className="text-lg my-4">{el.about}</p>
                  <p className="text-[#9B9BAB] text-base m-0 max-w-[210px]">
                    {el.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />
          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            // disabled={
            //   currentSlide ===
            //   instanceRef.current.track.details.slides.length - 1
            // }
          />
        </div>
      </div>
    </section>
  );
};
