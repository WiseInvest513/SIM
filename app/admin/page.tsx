import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductById } from "@/lib/products";
import { AdminOrderTable } from "./OrderTable";

export const metadata: Metadata = { title: "订单管理 - 后台" };

const fetchAllOrders = unstable_cache(
  async () => {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) console.error("admin orders error:", error);
    return (data ?? []) as import("./OrderTable").Order[];
  },
  ["admin-orders"],
  { revalidate: 30, tags: ["admin-orders"] }
);

export default async function AdminOrdersPage() {
  let orders: import("./OrderTable").Order[] = [];

  try {
    const raw = await fetchAllOrders();
    orders = raw.map((o) => ({
      ...o,
      products: o.product_id ? (getProductById(o.product_id) ?? null) : null,
    }));
  } catch (e) { console.error("admin page error:", e); }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#0a0a0a] min-h-screen">
      <div className="mb-5 sm:mb-7">
        <h1 className="text-xl sm:text-2xl font-bold text-white">订单管理</h1>
        <p className="text-gray-500 text-sm mt-1">管理所有用户订单，发货后填写快递单号</p>
      </div>
      <AdminOrderTable orders={orders} />
    </div>
  );
}
