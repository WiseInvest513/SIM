import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductById } from "@/lib/products";
import { AdminOrderTable } from "./OrderTable";

export const metadata: Metadata = { title: "订单管理 - 后台" };

export default async function AdminOrdersPage() {
  let orders: import("./OrderTable").Order[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) console.error("admin orders error:", error);
    // 关联商品信息
    orders = ((data ?? []) as import("./OrderTable").Order[]).map((o) => ({
      ...o,
      products: o.product_id ? (getProductById(o.product_id) ?? null) : null,
    }));
  } catch (e) { console.error("admin page error:", e); }

  return (
    <div className="p-6 lg:p-8 bg-[#0a0a0a] min-h-screen">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white">订单管理</h1>
        <p className="text-gray-500 text-sm mt-1">管理所有用户订单，发货后填写快递单号</p>
      </div>
      <AdminOrderTable orders={orders} />
    </div>
  );
}
