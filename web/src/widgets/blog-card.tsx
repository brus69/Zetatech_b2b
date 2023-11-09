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
      className="flex flex-col-2 w-[340px] h-[482px] box-border hover:bg-light"
    >
      <Link href={`/blog/${post.slug}`} className="px-5 py-2">
        <div className="px-2 mb-7">
          <p className="p-0 m-0 text-base text-gray">{post.pub_date}</p>
          <p
            className="my-2 mx-0 text-lg font-medium line-clamp-2 h-[45px]"
            style={{ lineHeight: "130%" }}
          >
            {post.title}
          </p>
          <p className="m-0 text-dark line-clamp-3 h-[68px]">
            {post.description}
          </p>
        </div>
        <img
          src={post.image}
          alt="Image from post"
          className="w-full h-[249px] object-cover object-center m-auto flex my-5"
        />
      </Link>
    </li>
  );
};
