import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // getSession 读本地 cookie，无网络请求；middleware 已验证 admin 角色
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const isDev = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";
  const isAdmin = session?.user?.user_metadata?.role === "admin";
  if (!isAdmin && !isDev) redirect("/");

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      <AdminSidebar />
      {/* 移动端顶部占位（防止内容被固定顶栏遮挡） */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
