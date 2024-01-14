import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import { Title, Pagination } from "@mantine/core";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  $blogTags,
  pageStarted,
  $items,
  $page,
  $totalPages,
  pageChanged,
} from "./model";
import { Newsletter } from "@/widgets/newsletter";
import { BlogCard } from "@/widgets/blog-card";

export const getServerSidePropsBlogPosts: GetServerSideProps = async ({
  query,
}) => {
  const scope = fork();

  const { category, mark, page } = query;

  await allSettled(pageStarted, {
    scope,
    params: {
      category,
      mark,
      page: Number.isNaN(Number(page)) ? 1 : Number(page),
    },
  });

  return {
    props: {
      values: serialize(scope),
      revalidate: 60 * 5, // 5 minutes
    },
  };
};

export const BlogPostsPage = () => {
  const router = useRouter();

  const { blogTags, posts, page, totalPages, onPageChanged } = useUnit({
    posts: $items,
    page: $page,
    totalPages: $totalPages,
    onPageChanged: pageChanged,
    blogTags: $blogTags,
  });

  return (
    <>
      <div className="container mb-24">
        <Title
          order={2}
          classNames={{
            root: "mb-4 mt-12",
          }}
        >
          Блог
        </Title>
        <p className="max-w-2xl m-0 text-xl text-black">
          Всё о нашей работе в парсинг-мире: полезные статьи, бизнес-кейсы и
          личные размышления, пишем легко и по делу
        </p>

        <div className="flex flex-wrap gap-2 mt-5 mb-8">
          {blogTags.map((blogTag) => (
            <Link
              className="text-base lowercase text-gray"
              key={blogTag.slug}
              href={`/blog/category/${blogTag.slug}`}
            >
              #{blogTag.name}
            </Link>
          ))}
        </div>

        <div className="grid items-center gap-4 mb-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post}></BlogCard>
          ))}
          <div className="box-border h-full bg-light">
            <Newsletter details={`bg-light`} />
          </div>
        </div>

        <Pagination
          gap="0"
          withControls={true}
          classNames={{
            control: "border-none text-base mr-2",
          }}
          value={page}
          total={totalPages}
          onChange={(value) => {
            router.push(`${router.pathname}?page=${value}`, undefined, {
              shallow: false,
            });
            onPageChanged(value);
          }}
        />
      </div>
    </>
  );
};
