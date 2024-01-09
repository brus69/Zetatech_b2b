import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import dayjs from "dayjs";
import { $post, pageStarted } from "./model";
import { Newsletter } from "@/widgets/newsletter";

export const getServerSidePropsPost: GetServerSideProps = async ({ query }) => {
  const scope = fork();

  await allSettled(pageStarted, { scope, params: { slug: query.slug } });

  if (scope.getState($post) === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      values: serialize(scope),
    },
  };
};

export const PostPage = () => {
  const { post } = useUnit({
    post: $post,
  });

  return (
    <>
      <NextSeo title={post.title} description={post.description} />
      <div className="container flex flex-col justify-between gap-16 my-12 sm:flex-row">
        <div className="flex flex-col">
          <p className="text-gray">
            {dayjs(post.pub_date).format("DD MMMM, YYYY")}
          </p>
          <h1 className="mt-0 mb-8">{post.h1}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="flex flex-col w-full shrink-0 sm:max-w-[326px]">
          <Newsletter />
        </div>
      </div>
    </>
  );
};
