import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, CheckCircle, ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const MOCK: Record<string, import("@/lib/supabase/types").Product> = {
  giffgaff:        { id: "mock-giffgaff",      name: "giffgaff 英国手机卡",           slug: "giffgaff",       description: "英国 O2 旗下虚拟运营商，永久免月租，国内可直接购买激活。可用于注册 PayPal、WhatsApp、海外 App Store 等。", price: 6900,  stock: 99, category: "英国手机卡", image_url: null, is_active: true, created_at: "2024-01-01" },
  "ultra-mobile":  { id: "mock-ultramobile",    name: "Ultra Mobile 美国手机卡",        slug: "ultra-mobile",   description: "美国 T-Mobile 网络，月租低，可保号，适合注册美区账户、接收美国验证码。",                                   price: 9900,  stock: 50, category: "美国手机卡", image_url: null, is_active: true, created_at: "2024-01-02" },
  "giffgaff-plus": { id: "mock-giffgaff-plus",  name: "giffgaff 英国手机卡（含 £10）",  slug: "giffgaff-plus",  description: "英国 O2 旗下虚拟运营商，永久免月租，含首充 £10 余额，开卡即可使用。",                                       price: 11900, stock: 30, category: "英国手机卡", image_url: null, is_active: true, created_at: "2024-01-03" },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("products").select("name, description").eq("slug", slug).single();
    if (data) return { title: (data as { name: string }).name, description: (data as { description: string }).description };
  } catch {}
  const mock = MOCK[slug];
  return mock ? { title: mock.name, description: mock.description } : { title: "商品不存在" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  let product: import("@/lib/supabase/types").Product | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("products").select("*").eq("slug", slug).eq("is_active", true).single();
    product = (data as import("@/lib/supabase/types").Product | null) ?? MOCK[slug] ?? null;
  } catch {
    product = MOCK[slug] ?? null;
  }

  if (!product) notFound();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/60 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回商城
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* 左侧：商品详情 */}
          <div className="lg:col-span-3 space-y-4">
            {/* 图片 */}
            <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] h-56 flex items-center justify-center overflow-hidden">
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-600">
                  <Package className="w-14 h-14" />
                  <span className="text-sm">{product.category}</span>
                </div>
              )}
            </div>

            {/* 基本信息 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="default">{product.category}</Badge>
                {product.stock <= 10 && product.stock > 0 && <Badge variant="warning">库存紧张</Badge>}
                {product.stock === 0 && <Badge variant="secondary">暂时缺货</Badge>}
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
                <span className="text-gray-500 text-sm">含顺丰运费</span>
              </div>
            </div>

            {/* 商品介绍 */}
            <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">商品介绍</p>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            {/* 适用场景 */}
            <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">适用场景</p>
              <ul className="space-y-2">
                {[
                  "注册海外 App Store / Google Play 账户",
                  "注册 PayPal、Wise 等海外支付账户",
                  "注册 Telegram、WhatsApp 等通讯软件",
                  "接收海外平台短信验证码",
                  "海外旅行备用号码",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右侧：购买入口 */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-xl border border-[#2a2a2a] bg-[#111111] p-6 space-y-5">
              <div>
                <p className="text-gray-500 text-sm mb-1">{product.name}</p>
                <p className="text-3xl font-bold text-white">{formatPrice(product.price)}</p>
                <p className="text-gray-600 text-xs mt-1">含顺丰运费</p>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                {["正规渠道采购，品质保障", "1-3 个工作日顺丰发货", "附详细激活教程", "微信客服全程支持"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>

              {product.stock === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-3">该商品暂时缺货</p>
                  <Link href="/shop" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                    查看其他商品
                  </Link>
                </div>
              ) : (
                <Link
                  href={`/shop/${product.slug}/pay`}
                  className="flex items-center justify-center gap-2 w-full bg-white text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  立即购买
                </Link>
              )}

              <p className="text-gray-600 text-xs text-center">
                支付宝付款 · 付款后填写地址 · 快速发货
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
