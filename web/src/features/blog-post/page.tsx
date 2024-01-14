import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import dayjs from "dayjs";
import Link from "next/link";
import { $post, pageStarted } from "./model";
import { Newsletter } from "@/widgets/newsletter";
import { PopularNews } from "@/widgets/popular-news/popular-news";

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
            {dayjs(post.pub_date || new Date()).format("DD MMMM, YYYY")}
          </p>
          <h1 className="mt-0 mb-4">{post.h1}</h1>
          <ul className="gap-2 p-0 m-0 mb-6 text-gray">
            {post.tags.map((tag) => (
              <li className="m-0" key={tag.id}>
                <Link href={`/blog/${tag.slug}`}>#{tag.name}</Link>
              </li>
            ))}
          </ul>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="flex flex-col w-full shrink-0 sm:max-w-[326px]">
          <PopularNews />
          <Newsletter />
        </div>
      </div>
    </>
  );
};
