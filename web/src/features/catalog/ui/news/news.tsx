import dayjs from "dayjs";
import { Post } from "@/api/codegen";

type Props = {
  post: Post;
};

export const NewsCard = ({ post }: Props) => {
  return (
    <div className="w-[287px] h-[78px] mb-[20px] box-border relative flex items-center">
      <img src={post.image} alt={post.title} />
      <div className="ml-[14px]">
        <div className="text-lg font-medium leading-5">{post.title}</div>
        <div className="text-gray mt-[10px]">
          {dayjs(post.pub_date || new Date()).format("DD MMM YYYY")}
        </div>
      </div>
    </div>
  );
};
