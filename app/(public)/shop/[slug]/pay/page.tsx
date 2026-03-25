import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { PaymentFlow } from "@/components/shop/PaymentFlow";
import { getProductBySlug } from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PayPage({ params }: Props) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) notFound();

  // getSession 读本地 cookie，无网络请求
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  let userId: string | null = session?.user?.id ?? null;

  const isDev = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";
  if (!userId) {
    if (isDev) {
      userId = "00000000-0000-0000-0000-000000000000";
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
