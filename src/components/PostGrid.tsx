"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short", timeZone: "UTC" })
    .format(new Date(date))
    .replace(".", "");
}

export default function PostGrid({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState("Todos");

  const visiblePosts = posts.filter((post) => activeTag === "Todos" || post.tag === activeTag);

  return (
    <>
      <div className="filter-bar" aria-label="Filtrar publicaciones">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`filter-button${tag === activeTag ? " is-active" : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="post-list">
        {visiblePosts.map((post) => (
          <Link className="post-row" href={`/blog/${post.slug}`} key={post.slug}>
            <span className="post-row-date">{formatShortDate(post.date)}</span>
            <span className="post-row-main">
              <span className="post-row-tag">{post.tag}</span>
              <span className="post-row-title">{post.title}</span>
            </span>
            <span className="post-row-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
        {visiblePosts.length === 0 && <p>No hay publicaciones para este filtro todavía.</p>}
      </div>
    </>
  );
}
