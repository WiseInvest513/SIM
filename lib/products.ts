import type { Product } from "@/lib/supabase/types";

// 所有商品定义（代码维护，不存数据库）
export const PRODUCTS: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "giffgaff 英国手机卡-未激活",
    slug: "giffgaff",
    description: "英国 O2 旗下虚拟运营商，永久免月租，国内可直接购买激活。可用于注册 PayPal、WhatsApp、海外 App Store 等。",
    price: 6900,
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
    description: "英国 O2 旗下虚拟运营商，永久免月租，含首充 £15 余额，开卡即可使用，适合有漫游需求的用户。",
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
