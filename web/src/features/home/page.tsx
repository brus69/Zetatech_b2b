import { fork, allSettled, serialize } from "effector";
import { GetStaticProps } from "next";
import { Promo } from "./ui/promo";
import { Preview } from "./ui/preview";
import { Prices } from "./ui/prices";
import { Questions } from "./ui/questions";
import { Blog } from "./ui/blog";
import { Newsletter } from "./ui/newsletter";
import { Principles } from "./ui/principles";
import { Reviews } from "./ui/reviews";
import { Team } from "./ui/team";
import { homePageStared } from "./model";
import { BriefModal } from "@/widgets/brief-modal";

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
      <div className="flex flex-col gap-36">
        <Promo />
        <Preview />
        <Team />
        <Principles />
        <Newsletter />
        <Prices />
        <Questions />
        <Reviews />
        <Blog />
      </div>
      <BriefModal />
    </>
  );
};

export { HomePage };
