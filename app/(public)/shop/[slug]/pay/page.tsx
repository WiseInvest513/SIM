import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { PaymentFlow } from "@/components/shop/PaymentFlow";

// mock 商品（Supabase 未配置时用）
const MOCK: Record<string, { id: string; name: string; slug: string; price: number; category: string }> = {
  giffgaff:        { id: "mock-giffgaff",       name: "giffgaff 英国手机卡",          slug: "giffgaff",       price: 6900,  category: "英国手机卡" },
  "ultra-mobile":  { id: "mock-ultramobile",     name: "Ultra Mobile 美国手机卡",       slug: "ultra-mobile",   price: 9900,  category: "美国手机卡" },
  "giffgaff-plus": { id: "mock-giffgaff-plus",   name: "giffgaff 英国手机卡（含 £10）", slug: "giffgaff-plus",  price: 11900, category: "英国手机卡" },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PayPage({ params }: Props) {
  const { slug } = await params;

  let product: { id: string; name: string; slug: string; price: number; category: string } | null = null;
  let userId: string | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("id, name, slug, price, category")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();
    product = data ?? MOCK[slug] ?? null;

    const { data: authData } = await supabase.auth.getUser();
    userId = authData.user?.id ?? null;
  } catch {
    product = MOCK[slug] ?? null;
  }

  if (!product) notFound();

  // 未登录跳到登录页（本地开发环境跳过，直接用 dev-user）
  const isDev = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";
  if (!userId) {
    if (isDev) {
      userId = "dev-user";
    } else {
      redirect(`/auth/login?redirect=/shop/${slug}/pay`);
    }
  }

  const alipayQr = process.env.NEXT_PUBLIC_ALIPAY_QR_URL ?? null;
  const wechatId = process.env.NEXT_PUBLIC_WECHAT_ID ?? "请联系客服";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-emerald-950/40 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="w-full max-w-sm">
        <PaymentFlow
          product={{ id: product.id, name: product.name, slug: product.slug, price: product.price }}
          userId={userId}
          alipayQr={alipayQr}
          wechatId={wechatId}
          priceLabel={formatPrice(product.price)}
        />
      </div>
    </div>
  );
}
