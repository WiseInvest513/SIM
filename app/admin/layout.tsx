import { redirect } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Globe, LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // getSession 读本地 cookie，无网络请求；middleware 已验证 admin 角色
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const isDev = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";
  const isAdmin = session?.user?.user_metadata?.role === "admin";
  if (!isAdmin && !isDev) redirect("/");

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      {/* 侧边栏 */}
      <aside className="w-52 border-r border-[#1a1a1a] bg-[#0d0d0d] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-[#1a1a1a]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Globe className="text-white" style={{ width: 18, height: 18 }} />
            </div>
            <span className="text-sm font-bold text-white">管理后台</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <p className="text-xs font-medium text-gray-600 px-3 py-2">管理功能</p>
          {[
            { href: "/admin", label: "订单管理", icon: ShoppingBag },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-[#1a1a1a]">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            返回前台
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
