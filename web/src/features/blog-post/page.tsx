import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import { GetServerSideProps } from "next";
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
      <div className="container">
        <h1 className="mb-8">{post.h1}</h1>

        <p>{post.description}</p>

        <Newsletter />
      </div>
    </>
  );
};
