import type { BlitzPage } from "@blitzjs/next";
import { useStringParam } from "@/utils/utils";

const BlogPostPage: BlitzPage = () => {
  const slug = useStringParam("slug");
  return <div>Blog post: {slug}</div>;
};

export default BlogPostPage;
