import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getAllArticles } from "@/lib/guides";
import { ArticleCard } from "@/components/guides/ArticleCard";

export const metadata: Metadata = {
  title: "实操教程",
  description: "详细的实操教程，手机卡激活、海外账户开户，手把手带你一步步搞定。",
};

// 分类配置
const categories = [
  { value: "all", label: "全部" },
  { value: "sim-card", label: "手机卡激活" },
  { value: "usage", label: "使用技巧" },
];

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function GuidesPage({ searchParams }: Props) {
  const { category = "all" } = await searchParams;
  const allArticles = getAllArticles();

  // 按分类过滤
  const articles =
    category === "all"
      ? allArticles
      : allArticles.filter((a) => a.category === category);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 页头 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">实操教程</h1>
              <p className="text-gray-400 text-sm">图文教程，一步一步带你搞定每个操作</p>
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-2">
            {categories.map(({ value, label }) => (
              <a
                key={value}
                href={value === "all" ? "/guides" : `/guides?category=${value}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === value || (value === "all" && !category)
                    ? "bg-white text-gray-900"
                    : "border border-[#2a2a2a] text-gray-400 hover:border-[#3a3a3a] hover:text-gray-200"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        {articles.length === 0 ? (
          <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-16 text-center">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">暂无教程</p>
            <p className="text-gray-500 text-sm">该分类的教程正在撰写中，敬请期待</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
