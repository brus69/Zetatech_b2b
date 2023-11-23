import Link from "next/link";
import React from "react";
import { Post } from "@/api/codegen";

type Props = {
  post: Post;
};

export const BlogCard = ({ post }: Props) => {
  return (
    <li key={post.title} className="box-border flex flex-col-2 hover:bg-light">
      <Link href={`/blog/${post.slug}`} className="px-5 py-2">
        <div className="px-2 mb-7">
          <p className="p-0 m-0 text-base text-gray">{post.pub_date}</p>
          <p className="my-2 mx-0 text-lg font-medium line-clamp-2 h-[45px]">
            {post.title}
          </p>
          <p className="m-0 text-dark line-clamp-3 h-[68px]">
            {post.description}
          </p>
        </div>
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-auto my-5 max-h-[250px]"
        />
      </Link>
    </li>
  );
};
