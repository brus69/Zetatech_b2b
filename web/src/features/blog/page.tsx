/* eslint-disable @typescript-eslint/no-unused-vars */
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";
import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import { Title, Pagination } from "@mantine/core";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { $blogTags, pageStarted, $items, $page, $totalPages, pageChanged } from "./model";
import { Newsletter } from "@/widgets/newsletter";
import { BlogCard } from "@/widgets/blog-card";

export const getServerSidePropsBlogPosts: GetServerSideProps = async ({
  query,
}) => {
  const scope = fork();

  const { category, mark } = query;

  await allSettled(pageStarted, {
    scope,
    params: {
      category,
      mark,
    },
  });

  return {
    props: {
      values: serialize(scope),
      revalidate: 60 * 5, // 5 minutes
    },
  };
};

function NextButton() {
  return <p className="text-gray text-xs cursor-pointer pl-5">Следующая</p>;
}

function PrevButton() {
  return <div className="hidden cursor-none"></div>;
}

export const BlogPostsPage = () => {
  const { blogTags, posts, page, totalPages, onPageChanged } = useUnit({
    posts: $items,
    page: $page,
    totalPages: $totalPages,
    onPageChanged: pageChanged,
    blogTags: $blogTags,
  });

  return (
    <>
      <div className="container max-w-6xl mb-24">
        <Title
          order={2}
          classNames={{
            root: "mb-4 mt-12 px-8",
          }}
        >
          Блог
        </Title>
        <p className="px-8 max-w-2xl m-0 text-xl text-black">
          Всё о нашей работе в парсинг-мире: полезные статьи, бизнес-кейсы и
          личные размышления, пишем легко и по делу
        </p>

        <div className="flex flex-wrap gap-2 mb-8 mt-5 px-8">
          {blogTags.map((blogTag) => (
            <Link
              className="text-gray lowercase text-base"
              key={blogTag.slug}
              href={`/blog/category/${blogTag.slug}`}
            >
              #{blogTag.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-x-12 gap-y-10 items-center mb-5">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post}></BlogCard>
          ))}
          <div className="pt-3 px-7 box-border bg-light h-96">
            <Newsletter details={`bg-light`} />
          </div>
        </div>

        <Pagination
          gap="0"
          withControls={true}
          classNames={{
            root: "text-gray pl-[24px]",
            control: "p-0 text-gray border-0 bg-transparent text-base",
          }}
          nextIcon={NextButton}
          previousIcon={PrevButton}
          value={page}
          total={totalPages}
          onChange={onPageChanged}
        />
      </div>
    </>
  );
};
