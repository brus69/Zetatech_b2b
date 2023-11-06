import {
  BlogPostsPage,
  getServerSidePropsBlogPosts,
} from "@/features/blog/page";

export const getServerSideProps = getServerSidePropsBlogPosts;
export default BlogPostsPage;
