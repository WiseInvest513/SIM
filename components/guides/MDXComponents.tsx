import type { MDXComponents } from "mdx/types";
import { AlertCircle, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// 提示框组件
interface CalloutProps {
  type?: "info" | "warning" | "success" | "danger";
  children: React.ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/5",
      icon: Info,
      iconColor: "text-blue-400",
    },
    warning: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/5",
      icon: AlertTriangle,
      iconColor: "text-yellow-400",
    },
    success: {
      border: "border-green-500/30",
      bg: "bg-green-500/5",
      icon: CheckCircle2,
      iconColor: "text-green-400",
    },
    danger: {
      border: "border-red-500/30",
      bg: "bg-red-500/5",
      icon: AlertCircle,
      iconColor: "text-red-400",
    },
  };

  const { border, bg, icon: Icon, iconColor } = styles[type];

  return (
    <div className={cn("flex gap-3 rounded-xl border p-4 my-5", border, bg)}>
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", iconColor)} />
      <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

// MDX 组件映射
export function getMDXComponents(): MDXComponents {
  return {
    // 标题
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-white mt-8 mb-4 pb-3 border-b border-slate-700/60">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-slate-200 mt-5 mb-2">{children}</h4>
    ),

    // 段落
    p: ({ children }) => (
      <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
    ),

    // 列表
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1.5 mb-4 text-slate-300 pl-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1.5 mb-4 text-slate-300 pl-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),

    // 引用
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500/60 pl-4 py-1 my-5 text-slate-400 italic">
        {children}
      </blockquote>
    ),

    // 代码块
    code: ({ children, className }) => {
      const isBlock = className?.startsWith("language-");
      if (isBlock) {
        return (
          <code className={cn("block text-sm", className)}>{children}</code>
        );
      }
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-slate-700/60 text-blue-300 text-sm font-mono">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="rounded-xl border border-slate-700/60 bg-slate-900 p-5 overflow-x-auto mb-5 text-sm">
        {children}
      </pre>
    ),

    // 分割线
    hr: () => <hr className="border-slate-700/60 my-8" />,

    // 链接
    a: ({ children, href }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),

    // 图片
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        className="rounded-xl border border-slate-700/60 my-5 w-full"
      />
    ),

    // 表格
    table: ({ children }) => (
      <div className="overflow-x-auto mb-5">
        <table className="w-full text-sm border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-slate-700">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left font-semibold text-slate-200">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 text-slate-300 border-b border-slate-800">
        {children}
      </td>
    ),

    // 自定义组件
    Callout,
  };
}
