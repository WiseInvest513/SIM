import type { Metadata } from "next";
import Link from "next/link";
import { User, Package, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "用户中心" };

export default async function AccountPage() {
  // getSession 读本地 cookie，无网络请求
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

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
          className="flex items-center gap-4 p-5 rounded-xl border border-[#2a2a2a] bg-[#111111] hover:bg-[#161616] hover:border-[#3a3a3a] transition-all group"
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
      </div>
    </div>
  );
}
