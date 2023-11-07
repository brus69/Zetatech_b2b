import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { $blogPosts, $blogTags, pageStarted } from "./model";
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

export const BlogPostsPage = () => {
  const { blogPosts, blogTags } = useUnit({
    blogPosts: $blogPosts,
    blogTags: $blogTags,
  });

  return (
    <>
      <div className="container">
        <h1 className="mb-8">Catalog</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {blogTags.map((blogTag) => (
            <Link
              className="text-gray"
              key={blogTag.slug}
              href={`/blog/category/${blogTag.slug}`}
            >
              #{blogTag.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {blogPosts.map((blogPost) => (
            <BlogCard key={blogPost.slug} post={blogPost}></BlogCard>
          ))}
        </div>
      </div>
    </>
  );
};
