import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticle, getAllArticles } from "@/lib/guides";
import { getMDXComponents } from "@/components/guides/MDXComponents";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getArticle(slug);
  if (!result) return { title: "文章不存在" };

  const { meta } = result;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.ogImage ? [meta.ogImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(({ slug }) => ({ slug }));
}

const categoryLabels: Record<string, string> = {
  "sim-card": "手机卡",
  vpn: "VPN",
  bank: "海外银行",
  broker: "出海券商",
};

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getArticle(slug);

  if (!result) notFound();

  const { meta, content } = result;
  const components = getMDXComponents();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* 面包屑 */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回教程列表
        </Link>

        {/* 文章头部 */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="default">
              {categoryLabels[meta.category] || meta.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {meta.readTime || "5 分钟"}阅读
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {formatDate(meta.date)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {meta.title}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed">{meta.description}</p>

          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <article className="prose-container">
          <MDXRemote source={content} components={components} />
        </article>

        {/* 底部导航 */}
        <div className="mt-12 pt-8 border-t border-[#2a2a2a]">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            查看更多教程
          </Link>
        </div>
      </div>
    </div>
  );
}
