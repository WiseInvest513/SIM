import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminProductManager } from "./ProductManager";

export const metadata: Metadata = {
  title: "商品管理 - 后台",
};

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: rawProducts, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  const products = rawProducts as import("@/lib/supabase/types").Product[] | null;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">商品管理</h1>
        <p className="text-slate-400 text-sm mt-1">
          管理手机卡商品，共 {products?.length || 0} 件
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
          <p className="text-red-400">加载商品失败：{error.message}</p>
        </div>
      )}

      {!error && <AdminProductManager products={products || []} />}
    </div>
  );
}
