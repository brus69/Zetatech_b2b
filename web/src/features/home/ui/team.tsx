/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";
import { Title } from "@mantine/core";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useUnit } from "effector-react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { $team } from "../model";
import { cn } from "@/shared/lib";

function Arrow(props: {
  left?: boolean;
  onClick: (event: React.MouseEvent) => void;
}) {
  const className =
    "absolute top-[180px] cursor-pointer bg-ruby border-none text-white center rounded-full w-8 h-8";

  return (
    <>
      {props.left ? (
        <button
          aria-label="Стрелка назад"
          onClick={props.onClick}
          className={cn(className, "-left-2 md:-left-6 z-30")}
        >
          <IconArrowLeft />
        </button>
      ) : (
        <button
          aria-label="Стрелка вперед"
          onClick={props.onClick}
          className={cn(className, "-right-2 md:-right-6 z-30")}
        >
          <IconArrowRight />
        </button>
      )}
    </>
  );
}

export const Team = () => {
  const { team } = useUnit({ team: $team });
  const [currentSlide, setCurrentSlide] = useState(3);
  const [, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 3,
    loop: true,
    slides: {
      origin: "center",
      perView: 5,
    },
    breakpoints: {
      "(max-width: 938px)": {
        slides: {
          origin: "center",
          perView: 3,
        },
      },
      "(max-width: 600px)": {
        slides: {
          origin: "center",
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

  const getScale = useCallback(
    (index: number) => {
      if (Math.abs(index - currentSlide) === 0) return "1";
      if (Math.abs(index - currentSlide) === 1) return "0.8";
      if (Math.abs(index - currentSlide) === 3) return "0";
      return "0.6";
    },
    [currentSlide]
  );

  const getWidth = useCallback(
    (index: number) => {
      if (Math.abs(index - currentSlide) === 0) return 380;
      if (Math.abs(index - currentSlide) === 1) return 300;
      return 250;
    },
    [currentSlide]
  );

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="container">
        <Title
          id="team"
          order={2}
          classNames={{
            root: "m-0 p-0 text-center mb-20 text-3xl sm:text-[50px]",
          }}
        >
          Наша команда
        </Title>
        <div className="relative max-w-[1200px] m-auto">
          <div
            ref={sliderRef}
            className="keen-slider !overflow-visible !select-auto"
          >
            {team.map((member, index) => (
              <div
                key={index}
                style={{
                  zIndex: currentSlide === index ? 1 : "initial",
                }}
                className="keen-slider__slide min-w-[320px] !overflow-visible flex items-center flex-col"
              >
                <img
                  src={"/assets/img.png"}
                  alt={member.name}
                  className="rounded-[50%] aspect-square transition-[scale]"
                  style={{
                    scale: getScale(index),
                    minWidth: getWidth(index),
                  }}
                />
                <div
                  className="flex flex-col items-center text-center transition-all"
                  style={{
                    opacity: currentSlide === index ? 1 : 0,
                  }}
                >
                  <p className="m-0 mt-12 text-2xl font-bold text-ruby">
                    {member.name}
                  </p>
                  <p className="my-4 text-lg text-black">{member.name}</p>
                  <p className="text-gray text-base m-0 max-w-[210px]">
                    {member.description.substring(0, 100)}
                  </p>
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
      </div>
    </section>
  );
};
