import type { Metadata } from "next";
import Link from "next/link";
import { User, Package, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "用户中心" };

interface RecentOrder {
  id: string;
  status: string;
  created_at: string;
  products: { name: string; price: number } | null;
}

export default async function AccountPage() {
  let user = null;
  let recentOrders: RecentOrder[] | null = null;

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    user = authData.user;
    if (user) {
      const { data } = await supabase
        .from("orders")
        .select("id, status, created_at, products(name, price)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(3);
      recentOrders = data as RecentOrder[] | null;
    }
  } catch {}

  const statusMap: Record<string, { label: string; color: string }> = {
    pending:   { label: "待处理", color: "bg-amber-500/15 text-amber-400" },
    shipped:   { label: "已发货", color: "bg-blue-500/15 text-blue-400" },
    completed: { label: "已完成", color: "bg-green-500/15 text-green-400" },
    cancelled: { label: "已取消", color: "bg-red-500/15 text-red-400" },
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-950/40 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-2xl mx-auto">
        {/* 用户信息 */}
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-6 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-white">
                {user?.user_metadata?.display_name || user?.email?.split("@")[0] || "用户"}
              </p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <p className="text-gray-600 text-xs mt-0.5">
                注册于 {user?.created_at ? formatDate(user.created_at) : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* 我的订单入口 */}
        <Link
          href="/account/orders"
          className="flex items-center gap-4 p-5 rounded-xl border border-[#2a2a2a] bg-[#111111] hover:bg-[#161616] hover:border-[#3a3a3a] transition-all group mb-5"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-white group-hover:text-blue-400 transition-colors">我的订单</p>
            <p className="text-gray-500 text-sm">查看订单状态和物流信息</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
        </Link>

        {/* 最近订单 */}
        {recentOrders && recentOrders.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-400">最近订单</p>
              <Link href="/account/orders" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                查看全部
              </Link>
            </div>
            <div className="space-y-2">
              {recentOrders.map((order) => {
                const s = statusMap[order.status] ?? { label: order.status, color: "bg-gray-500/15 text-gray-400" };
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-[#2a2a2a] bg-[#111111]">
                    <div>
                      <p className="text-sm text-white">{order.products?.name || "商品"}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {order.products?.price && (
                        <p className="text-sm text-gray-400">{formatPrice(order.products.price)}</p>
                      )}
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
