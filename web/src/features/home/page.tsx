import { fork, allSettled, serialize } from "effector";
import { GetStaticProps } from "next";
import { Promo } from "./ui/promo";
import { Preview } from "./ui/preview";
import { Prices } from "./ui/prices";
import { Form } from "./ui/form";
import { Questions } from "./ui/questions";
import { Blog } from "./ui/blog";
import { Newsletter } from "./ui/newsletter";
import { homePageStared } from "./model";

export const getStaticPropsHomePage: GetStaticProps = async () => {
  const scope = fork();

  await allSettled(homePageStared, { scope });

  return {
    props: {
      values: serialize(scope),
      revalidate: 60 * 5, // 5 minutes
    },
  };
};

const HomePage = () => {
  return (
    <>
      <Promo />
      <Preview />
      <Prices />
      <Form />
      <Questions />
      <Blog />
      <Newsletter />
    </>
  );
};

export { HomePage };
