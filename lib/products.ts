import type { Product } from "@/lib/supabase/types";

// ── 全站配置（改价格/发货时间只需改这里）──────────────────
export const SHIPPING_DAYS = "当天";
export const SHIPPING_DAYS_SHORT = "当天";
export const DELIVERY_DAYS = "1-3 天";
export const PROMOTION_ORIGINAL_PRICE = 8900;
export const PROMOTION_REGULAR_PRICE = 6900;
export const PROMOTION_END = "2026-09-07T00:00:00+08:00";
export const PROMOTION_END_LABEL = "9 月 6 日 24:00";

// 所有商品定义（代码维护，不存数据库）
export const PRODUCTS: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "giffgaff - 纯卡 当天发货",
    slug: "giffgaff",
    description: "英国 O2 旗下虚拟运营商，永久免月租，国内可直接购买激活。可用于注册 PayPal、WhatsApp、海外 App Store 等。需自己充值余额后才能使用。",
    price: 5900,
    stock: 99,
    category: "英国手机卡",
    image_url: "/giffgaff-logo.png",
    is_active: true,
    created_at: "2024-01-01",
  },
];

// 通过 slug 查找商品
export function getProductBySlug(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

// 通过 id 查找商品
export function getProductById(id: string): Product | null {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}
