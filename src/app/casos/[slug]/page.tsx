import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCases, getCaseBySlug } from "@/lib/cases";

export function generateStaticParams() {
  return getAllCases().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
    },
  };
}

export default async function CasoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item || item.published === false) {
    notFound();
  }

  return (
    <article>
      <div className="post-header">
        <Link className="post-back" href="/casos">
          ← Volver a casos
        </Link>
        <div className="post-header-meta">
          <span className="post-row-tag">{item.tag}</span>
          <span>{item.company}</span>
          <span>· {item.role}</span>
          <span>· {item.period}</span>
        </div>
        <h1>{item.title}</h1>
      </div>
      <div className="post-body prose prose-lg max-w-none prose-headings:font-[var(--font-barlow-condensed)]">
        <MDXRemote source={item.content} />
      </div>
    </article>
  );
}
