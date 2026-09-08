"use client";

import { useState } from "react";
import Link from "next/link";
import type { Case } from "@/lib/cases";

export default function CaseList({ cases, tags }: { cases: Case[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState("Todos");

  const visibleCases = cases.filter((item) => activeTag === "Todos" || item.tag === activeTag);

  return (
    <>
      <div className="filter-bar" aria-label="Filtrar casos">
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
        {visibleCases.map((item) => (
          <Link className="post-row" href={`/casos/${item.slug}`} key={item.slug}>
            <span className="post-row-date">{item.period}</span>
            <span className="post-row-main">
              <span className="post-row-tag">{item.company}</span>
              <span className="post-row-title">{item.title}</span>
            </span>
            <span className="post-row-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
        {visibleCases.length === 0 && <p>No hay casos para este filtro todavía.</p>}
      </div>
    </>
  );
}
