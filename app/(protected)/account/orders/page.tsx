import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Package, Truck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { OrderStatusBadge, OrderStatusTimeline } from "@/components/shop/OrderStatus";
import { formatPrice, formatDate } from "@/lib/utils";
import type { OrderStatus } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "我的订单" };

// mock 商品信息（product_id → 商品名/价格）
const MOCK_PRODUCTS: Record<string, { name: string; slug: string; price: number; category: string }> = {
  "00000000-0000-0000-0000-000000000001": { name: "giffgaff 英国手机卡",          slug: "giffgaff",       price: 6900,  category: "英国手机卡" },
  "00000000-0000-0000-0000-000000000002": { name: "Ultra Mobile 美国手机卡",       slug: "ultra-mobile",   price: 9900,  category: "美国手机卡" },
  "00000000-0000-0000-0000-000000000003": { name: "giffgaff 英国手机卡（含 £10）", slug: "giffgaff-plus",  price: 11900, category: "英国手机卡" },
};

interface OrderWithProduct {
  id: string;
  quantity: number;
  recipient_name: string;
  recipient_phone: string;
  address: string;
  remark: string | null;
  status: string;
  tracking_number: string | null;
  created_at: string;
  product_id: string | null;
  products: { id: string; name: string; slug: string; image_url: string | null; price: number; category: string } | null;
}

export default async function OrdersPage() {
  let orders: OrderWithProduct[] | null = null;

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;
    if (user) {
      // 用 admin client 绕过 RLS，服务端已验证用户身份
      const adminSupabase = createAdminClient();
      const { data, error } = await adminSupabase
        .from("orders")
        .select("id, quantity, recipient_name, recipient_phone, address, remark, status, tracking_number, created_at, product_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) console.error("orders query error:", error);
      // 将 product_id 映射到商品信息
      orders = (data ?? []).map((o: OrderWithProduct) => ({
        ...o,
        products: o.product_id ? (MOCK_PRODUCTS[o.product_id] ? { id: o.product_id, image_url: null, ...MOCK_PRODUCTS[o.product_id] } : null) : null,
      }));
    }
  } catch (e) { console.error("orders page error:", e); }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-950/40 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/account" className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">我的订单</h1>
            <p className="text-gray-500 text-sm">共 {orders?.length || 0} 笔订单</p>
          </div>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-16 text-center">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">还没有订单</p>
            <p className="text-gray-600 text-sm mb-6">快去手机卡商城选购吧</p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors">
              去商城看看
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const product = order.products;
              return (
                <div key={order.id} className="rounded-xl border border-[#2a2a2a] bg-[#111111] overflow-hidden">
                  {/* 订单头 */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-[#1a1a1a] bg-[#0d0d0d]">
                    <p className="text-xs text-gray-600 font-mono">
                      订单号：{order.id.slice(0, 8)}...
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-600">{formatDate(order.created_at)}</span>
                      <OrderStatusBadge status={order.status as OrderStatus} />
                    </div>
                  </div>

                  {/* 内容 */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{product?.name || "商品已下架"}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{product?.category} × {order.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-white">
                        {product?.price ? formatPrice(product.price * order.quantity) : "-"}
                      </p>
                    </div>

                    <div className="mb-4">
                      <OrderStatusTimeline currentStatus={order.status as OrderStatus} />
                    </div>

                    {/* 快递单号 */}
                    {order.tracking_number && (
                      <div className="flex items-center gap-2 text-sm bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3 mb-3">
                        <Truck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-400">快递单号：</span>
                        <span className="font-mono text-blue-400 select-all">{order.tracking_number}</span>
                      </div>
                    )}

                    {/* 收货信息 */}
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>收货人：{order.recipient_name} · {order.recipient_phone}</p>
                      <p>地址：{order.address}</p>
                      {order.remark && <p>备注：{order.remark}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
