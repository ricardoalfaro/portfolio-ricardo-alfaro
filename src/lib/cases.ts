import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASES_DIR = path.join(process.cwd(), "content/casos");

export type CaseFrontmatter = {
  title: string;
  company: string;
  role: string;
  period: string;
  excerpt: string;
  tag: string;
  order: number;
  published?: boolean;
};

export type Case = CaseFrontmatter & {
  slug: string;
  content: string;
};

function readCaseFile(fileName: string): Case {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(CASES_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as CaseFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
  };
}

export function getAllCases({ includeDrafts = false } = {}): Case[] {
  if (!fs.existsSync(CASES_DIR)) return [];

  const files = fs.readdirSync(CASES_DIR).filter((file) => file.endsWith(".mdx"));
  const cases = files.map(readCaseFile);

  return cases
    .filter((item) => includeDrafts || item.published !== false)
    .sort((a, b) => a.order - b.order);
}

export function getCaseBySlug(slug: string): Case | undefined {
  const fileName = `${slug}.mdx`;
  if (!fs.existsSync(path.join(CASES_DIR, fileName))) return undefined;
  return readCaseFile(fileName);
}
