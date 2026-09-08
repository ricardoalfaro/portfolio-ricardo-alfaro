import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostGrid from "@/components/PostGrid";
import SplitHeading from "@/components/SplitHeading";

export default function IdeasTeaser() {
  const posts = getAllPosts().slice(0, 6);
  const tags = getAllTags(posts);

  return (
    <section className="section ideas" id="ideas" aria-labelledby="ideas-title">
      <div className="section-heading">
        <span>Thought leadership</span>
        <SplitHeading id="ideas-title" lead="Pensamiento e investigación" strong="sobre evolución financiera digital." />
      </div>
      <PostGrid posts={posts} tags={tags} />
      <p style={{ marginTop: 28 }}>
        <Link className="button button-dark" href="/blog">
          Ver todos los artículos
        </Link>
      </p>
    </section>
  );
}
