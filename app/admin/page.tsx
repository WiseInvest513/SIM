import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminOrderTable } from "./OrderTable";

export const metadata: Metadata = { title: "订单管理 - 后台" };

export default async function AdminOrdersPage() {
  let orders: import("./OrderTable").Order[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, products(id, name, price, category), profiles:user_id(email, display_name)")
      .order("created_at", { ascending: false });
    orders = (data as import("./OrderTable").Order[]) || [];
  } catch {}

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">订单管理</h1>
        <p className="text-gray-500 text-sm mt-1">共 {orders.length} 笔订单</p>
      </div>
      <AdminOrderTable orders={orders} />
    </div>
  );
}
