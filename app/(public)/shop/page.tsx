import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "手机卡商城",
  description: "购买海外手机卡，giffgaff 英国手机卡等，国内直邮，快速发货。",
};

// 测试用 mock 商品（数据库无商品时展示）
const MOCK_PRODUCTS: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "giffgaff 英国手机卡",
    slug: "giffgaff",
    description: "英国 O2 旗下虚拟运营商，永久免月租，国内可直接购买激活。可用于注册 PayPal、WhatsApp、海外 App Store 等。",
    price: 6900,
    stock: 99,
    category: "英国手机卡",
    image_url: null,
    is_active: true,
    created_at: "2024-01-01",
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Ultra Mobile 美国手机卡",
    slug: "ultra-mobile",
    description: "美国 T-Mobile 网络，月租低，可保号，适合注册美区账户、接收美国验证码。",
    price: 9900,
    stock: 50,
    category: "美国手机卡",
    image_url: null,
    is_active: true,
    created_at: "2024-01-02",
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "giffgaff 英国手机卡（含 £10 余额）",
    slug: "giffgaff-plus",
    description: "英国 O2 旗下虚拟运营商，永久免月租，含首充 £10 余额，开卡即可使用，适合有漫游需求的用户。",
    price: 11900,
    stock: 30,
    category: "英国手机卡",
    image_url: null,
    is_active: true,
    created_at: "2024-01-03",
  },
];

export default async function ShopPage() {
  let dbProducts: Product[] | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    dbProducts = data as Product[] | null;
  } catch {
    // Supabase 未配置，使用 mock 数据
  }
  // 数据库有商品用真实数据，否则用 mock（方便本地测试）
  const products = dbProducts && dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-950/40 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* 页头 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">手机卡商城</h1>
              <p className="text-gray-400 text-sm">正规渠道，品质保障，快速发货</p>
            </div>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <span>📦 正规渠道进货</span>
              <span>🚚 1-3 个工作日发货</span>
              <span>✅ 激活教程全程指导</span>
              <span>💬 购后问题售后支持</span>
            </div>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 购买须知 */}
        <div className="mt-12 rounded-xl border border-[#2a2a2a] bg-[#111111] p-6">
          <h2 className="text-base font-semibold text-white mb-4">购买须知</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p className="text-gray-200 font-medium mb-1">下单流程</p>
              <p>选择商品 → 登录账号 → 填写收货信息 → 提交订单 → 客服联系付款 → 发货</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium mb-1">支付方式</p>
              <p>目前支持微信/支付宝转账支付，下单后客服会主动联系您</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium mb-1">发货说明</p>
              <p>收到付款后 1-3 个工作日安排发货，顺丰快递</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium mb-1">激活支持</p>
              <p>附带详细激活教程，提供全程微信技术支持</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
