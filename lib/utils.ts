import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 合并 Tailwind CSS 类名的工具函数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化价格（分转元）
export function formatPrice(price: number): string {
  return `¥${(price / 100).toFixed(2)}`;
}

// 格式化日期
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// 订单状态映射
export const orderStatusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "待处理", color: "text-yellow-400 bg-yellow-400/10" },
  shipped: { label: "已发货", color: "text-blue-400 bg-blue-400/10" },
  completed: { label: "已完成", color: "text-green-400 bg-green-400/10" },
  cancelled: { label: "已取消", color: "text-red-400 bg-red-400/10" },
};
