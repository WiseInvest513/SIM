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
    <div className="p-6 lg:p-8 bg-[#0a0a0a] min-h-screen">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white">订单管理</h1>
        <p className="text-gray-500 text-sm mt-1">管理所有用户订单，发货后填写快递单号</p>
      </div>
      <AdminOrderTable orders={orders} />
    </div>
  );
}
