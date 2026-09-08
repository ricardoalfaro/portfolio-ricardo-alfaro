import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  type: string;
  published?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingMinutes: number;
};

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllPosts({ includeDrafts = false } = {}): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));
  const posts = files.map(readPostFile);

  return posts
    .filter((post) => includeDrafts || post.published !== false)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const fileName = `${slug}.mdx`;
  if (!fs.existsSync(path.join(POSTS_DIR, fileName))) return undefined;
  return readPostFile(fileName);
}

export function getAllTags(posts: Post[]): string[] {
  const tags = new Set(posts.map((post) => post.tag));
  return ["Todos", ...Array.from(tags)];
}
