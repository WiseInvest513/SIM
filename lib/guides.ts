import fs from "fs";
import path from "path";
import matter from "gray-matter";

// MDX 文章元信息类型
export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime?: string;
  tags?: string[];
  ogImage?: string;
}

const contentDir = path.join(process.cwd(), "content/guides");

// 生产环境缓存，开发环境每次重新读取
let _articlesCache: ArticleMeta[] | null = null;

// 获取所有文章元信息（用于列表页）
export function getAllArticles(): ArticleMeta[] {
  if (_articlesCache && process.env.NODE_ENV === "production") return _articlesCache;
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const filePath = path.join(contentDir, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "general",
      date: data.date || new Date().toISOString(),
      readTime: data.readTime,
      tags: data.tags || [],
      ogImage: data.ogImage,
    } as ArticleMeta;
  });

  _articlesCache = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return _articlesCache;
}

// 获取单篇文章内容和元信息
export async function getArticle(slug: string): Promise<{
  meta: ArticleMeta;
  content: string;
} | null> {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const meta: ArticleMeta = {
    slug,
    title: data.title || slug,
    description: data.description || "",
    category: data.category || "general",
    date: data.date || new Date().toISOString(),
    readTime: data.readTime,
    tags: data.tags || [],
    ogImage: data.ogImage,
  };

  return { meta, content };
}
