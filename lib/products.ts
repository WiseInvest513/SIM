import type { Product } from "@/lib/supabase/types";

// 所有商品定义（代码维护，不存数据库）
export const PRODUCTS: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "giffgaff - 纯卡 3-5 天发货",
    slug: "giffgaff",
    description: "英国 O2 旗下虚拟运营商，永久免月租，国内可直接购买激活。可用于注册 PayPal、WhatsApp、海外 App Store 等。需自己充值余额后才能使用。",
    price: 8900,
    stock: 99,
    category: "英国手机卡",
    image_url: "/giffgaff-logo.png",
    is_active: true,
    created_at: "2024-01-01",
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "giffgaff 英国手机卡（含 £15 余额）",
    slug: "giffgaff-plus",
    description: "英国 O2 旗下虚拟运营商，永久免月租，预充 £15 英镑，收到当天激活即用。无需自己充值，即买即用体验更佳。",
    price: 19900,
    stock: 30,
    category: "英国手机卡",
    image_url: "/giffgaff-logo.png",
    is_active: true,
    created_at: "2024-01-03",
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
