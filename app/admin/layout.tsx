import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingBag, Globe, LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let isAdmin = false;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    isAdmin = user?.user_metadata?.role === "admin";
  } catch {}

  if (!isAdmin) redirect("/");

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      {/* 侧边栏 */}
      <aside className="w-52 border-r border-[#1a1a1a] bg-[#0d0d0d] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-[#1a1a1a]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-gray-900" />
            </div>
            <span className="text-sm font-bold text-white">管理后台</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <p className="text-xs font-medium text-gray-600 px-3 py-2">管理功能</p>
          {[
            { href: "/admin", label: "订单管理", icon: ShoppingBag },
            { href: "/admin/products", label: "商品管理", icon: Package },
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
