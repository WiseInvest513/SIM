import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminOrderTable } from "./OrderTable";

export const metadata: Metadata = { title: "订单管理 - 后台" };

export default async function AdminOrdersPage() {
  let orders: import("./OrderTable").Order[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("admin orders error:", error);
    const MOCK_PRODUCTS: Record<string, { name: string; price: number; category: string }> = {
      "00000000-0000-0000-0000-000000000001": { name: "giffgaff 英国手机卡",          price: 6900,  category: "英国手机卡" },
      "00000000-0000-0000-0000-000000000002": { name: "Ultra Mobile 美国手机卡",       price: 9900,  category: "美国手机卡" },
      "00000000-0000-0000-0000-000000000003": { name: "giffgaff 英国手机卡（含 £10）", price: 11900, category: "英国手机卡" },
    };
    orders = ((data as import("./OrderTable").Order[]) || []).map((o) => ({
      ...o,
      products: o.product_id && MOCK_PRODUCTS[o.product_id]
        ? { id: o.product_id, ...MOCK_PRODUCTS[o.product_id] }
        : o.products ?? null,
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
