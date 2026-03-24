import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime?: string;
  tags?: string[];
}

interface ArticleCardProps {
  article: ArticleMeta;
}

// 分类颜色映射
const categoryColors: Record<string, string> = {
  "sim-card": "text-blue-400 bg-blue-400/10",
  vpn: "text-purple-400 bg-purple-400/10",
  bank: "text-emerald-400 bg-emerald-400/10",
  broker: "text-orange-400 bg-orange-400/10",
};

const categoryLabels: Record<string, string> = {
  "sim-card": "手机卡",
  vpn: "VPN",
  bank: "海外银行",
  broker: "出海券商",
};

export function ArticleCard({ article }: ArticleCardProps) {
  const categoryColor = categoryColors[article.category] || "text-slate-400 bg-slate-400/10";
  const categoryLabel = categoryLabels[article.category] || article.category;

  return (
    <Link
      href={`/guides/${article.slug}`}
      className="group block rounded-xl border border-slate-700/60 bg-slate-800/50 p-6 card-hover"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColor}`}
        >
          {categoryLabel}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Clock className="w-3 h-3" />
          {article.readTime || "5 分钟"}
        </span>
      </div>

      <h2 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
        {article.title}
      </h2>

      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
        {article.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{formatDate(article.date)}</span>
        <span className="flex items-center gap-1 text-xs text-blue-400 group-hover:gap-2 transition-all">
          阅读全文
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
