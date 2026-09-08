import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.published === false) {
    notFound();
  }

  return (
    <article>
      <div className="post-header">
        <Link className="post-back" href="/blog">
          ← Volver al blog
        </Link>
        <div className="post-header-meta">
          <span className="post-row-tag">{post.tag}</span>
          <span>{formatDate(post.date)}</span>
          <span>· {post.readingMinutes} min de lectura</span>
        </div>
        <h1>{post.title}</h1>
      </div>
      <div className="post-body prose prose-lg max-w-none prose-headings:font-[var(--font-barlow-condensed)]">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
