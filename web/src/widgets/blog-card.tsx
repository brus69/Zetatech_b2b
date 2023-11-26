import Link from "next/link";
import React from "react";
import { Post } from "@/api/codegen";

type Props = {
  post: Post;
};

export const BlogCard = ({ post }: Props) => {
  return (
    <li
      key={post.title}
      className="box-border flex h-full flex-col-2 hover:bg-light"
    >
      <Link href={`/blog/${post.slug}`} className="w-full px-5 py-2">
        <div className="px-2 mb-7">
          <p className="p-0 m-0 text-base text-gray">{post.pub_date}</p>
          <p className="mx-0 my-2 text-lg font-medium line-clamp-2">
            {post.title}
          </p>
          <p className="m-0 text-dark line-clamp-3">{post.description}</p>
        </div>
        <img
          src={post.image}
          alt={post.title}
          className="object-cover h-auto my-5 max-h-[250px] grow mt-auto w-full"
        />
      </Link>
    </li>
  );
};
