import React from "react";
import { Title } from "@mantine/core";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useUnit } from "effector-react";
import { IconStarFilled } from "@tabler/icons-react";
import { $reviews } from "../model";
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
        ></button>
      ) : (
        <button
          aria-label="Стрелка вперед"
          onClick={props.onClick}
          className={cn(className, "right-0 z-30 bg-center")}
          style={{ backgroundImage: `url("/assets/comments/arrow-next.svg")` }}
        ></button>
      )}
    </>
  );
}

export const Reviews = () => {
  const { reviews } = useUnit({
    reviews: $reviews,
  });

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
  });

  return (
    <section className="flex flex-col justify-center pt-20 bg-silver pb-14">
      <div className="container">
        <Title
          id="reviews"
          order={2}
          classNames={{
            root: "m-0 p-0 text-left mb-32 text-black text-3xl sm:text-[50px]",
          }}
        >
          Отзывы наших клиентов
        </Title>
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {reviews.map((review, index) => (
              <div key={index} className="px-5 keen-slider__slide">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, index) => {
                    if (review.rating <= index) return null;
                    return <IconStarFilled className="text-ruby" key={index} />;
                  })}
                </div>
                <div className="flex flex-col gap-5 px-2 py-5 border-t border-b-0 border-black border-solid border-x-0">
                  <p className="p-0 m-0 text-black text-md">{review.text}</p>
                  <p className="p-0 m-0 text-md text-gray">{review.author}</p>
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
