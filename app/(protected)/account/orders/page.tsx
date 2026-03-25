import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Package, Truck } from "lucide-react";
import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { OrderStatusBadge, OrderStatusTimeline } from "@/components/shop/OrderStatus";
import { formatPrice, formatDate } from "@/lib/utils";
import { getProductById } from "@/lib/products";
import type { OrderStatus } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "我的订单" };

interface RawOrder {
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
}

// 带缓存的订单查询，60 秒内重复访问直接返回缓存
function fetchUserOrders(userId: string) {
  return unstable_cache(
    async () => {
      const adminSupabase = createAdminClient();
      const { data, error } = await adminSupabase
        .from("orders")
        .select("id, quantity, recipient_name, recipient_phone, address, remark, status, tracking_number, created_at, product_id")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) console.error("orders query error:", error);
      return (data as RawOrder[]) ?? [];
    },
    [`orders-${userId}`],
    { revalidate: 60, tags: [`orders-${userId}`] }
  )();
}

export default async function OrdersPage() {
  let rawOrders: RawOrder[] = [];

  try {
    // getSession 读本地 cookie，无网络请求
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      rawOrders = await fetchUserOrders(session.user.id);
    }
  } catch (e) { console.error("orders page error:", e); }

  // 关联商品信息（从代码里匹配）
  const orders = rawOrders.map((o) => ({
    ...o,
    product: o.product_id ? getProductById(o.product_id) : null,
  }));

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-950/40 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/account" className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">我的订单</h1>
            <p className="text-gray-500 text-sm">共 {orders.length} 笔订单</p>
          </div>
        </div>

        {orders.length === 0 ? (
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
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-[#2a2a2a] bg-[#111111] overflow-hidden">
                {/* 订单头 */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#1a1a1a] bg-[#0d0d0d]">
                  <p className="text-xs text-gray-600 font-mono">订单号：{order.id.slice(0, 8)}...</p>
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
                        <p className="font-medium text-white text-sm">{order.product?.name || "商品信息"}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{order.product?.category} × {order.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-white">
                      {order.product?.price ? formatPrice(order.product.price * order.quantity) : "-"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <OrderStatusTimeline currentStatus={order.status as OrderStatus} />
                  </div>

                  {order.tracking_number && (
                    <div className="flex items-center gap-2 text-sm bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3 mb-3">
                      <Truck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-400">快递单号：</span>
                      <span className="font-mono text-blue-400 select-all">{order.tracking_number}</span>
                    </div>
                  )}

                  <div className="text-xs text-gray-600 space-y-1">
                    <p>收货人：{order.recipient_name} · {order.recipient_phone}</p>
                    <p>地址：{order.address}</p>
                    {order.remark && <p>备注：{order.remark}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
