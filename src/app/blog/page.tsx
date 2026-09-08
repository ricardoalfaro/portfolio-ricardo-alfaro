import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostGrid from "@/components/PostGrid";
import SplitHeading from "@/components/SplitHeading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos sobre producto, pagos, billeteras digitales, Open Finance y estrategia fintech.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags(posts);

  return (
    <>
      <div className="blog-header">
        <div className="section-label">Blog</div>
        <SplitHeading
          as="h1"
          lead="Pensamiento e investigación"
          strong="sobre evolución financiera digital."
        />
      </div>
      <div className="blog-list">
        <PostGrid posts={posts} tags={tags} />
      </div>
    </>
  );
}
