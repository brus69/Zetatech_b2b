import { useUnit } from "effector-react";
import Link from "next/link";
import { $blogPosts } from "./model";
import { NewsCard } from "@/features/catalog/ui/news/news";
import { cn } from "@/shared/lib";

type Props = {
  className?: string;
};

export const PopularNews = (props: Props) => {
  const { posts } = useUnit({
    posts: $blogPosts,
  });

  return (
    <div className={cn("flex flex-col", props.className)}>
      <h1 className="text-3xl font-medium">Популярные новости</h1>
      {posts.slice(-3).map((post) => (
        <div key={post.slug} className="mb-[20px]">
          <Link href={`/blog/${post.slug}`}>
            <NewsCard key={post.title} post={post} />
          </Link>
        </div>
      ))}
    </div>
  );
};
