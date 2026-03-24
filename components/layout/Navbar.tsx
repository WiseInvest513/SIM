"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ShoppingBag, User, LogOut, Menu, X, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/shop", label: "手机卡" },
  { href: "/guides", label: "教程" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const isAdmin = user?.user_metadata?.role === "admin";

  return (
    /* 透明固定容器，负责定位和水平居中 */
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      {/* 浮动 island：滚动后缩窄 + 加阴影 */}
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out overflow-visible",
          scrolled
            ? "max-w-3xl rounded-2xl bg-[#1a1a1a]/95 backdrop-blur-xl border border-[#383838] shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
            : "max-w-7xl rounded-2xl bg-[#161616]/85 backdrop-blur-sm border border-[#2a2a2a]"
        )}
      >
        <div className="flex items-center justify-between h-14 px-5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <Globe className="w-4 h-4 text-gray-900" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">
              Wise<span className="text-gray-500 font-normal">SIM</span>
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm transition-colors",
                  pathname === href
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* 右侧 */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] truncate">{user.email?.split("@")[0]}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] shadow-lg py-1.5 text-sm">
                    <Link href="/account" className="flex items-center gap-2 px-3.5 py-2 text-gray-300 hover:text-white hover:bg-[#252525] transition-colors">
                      <User className="w-3.5 h-3.5" /> 用户中心
                    </Link>
                    <Link href="/account/orders" className="flex items-center gap-2 px-3.5 py-2 text-gray-300 hover:text-white hover:bg-[#252525] transition-colors">
                      <ShoppingBag className="w-3.5 h-3.5" /> 我的订单
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" className="flex items-center gap-2 px-3.5 py-2 text-gray-300 hover:text-white hover:bg-[#252525] transition-colors">
                        管理后台
                      </Link>
                    )}
                    <div className="h-px bg-[#2a2a2a] my-1" />
                    <button onClick={handleLogout} className="flex items-center gap-2 px-3.5 py-2 text-gray-400 hover:text-gray-200 hover:bg-[#252525] transition-colors w-full text-left">
                      <LogOut className="w-3.5 h-3.5" /> 退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-1.5 text-sm bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                登录
              </Link>
            )}
          </div>

          {/* 移动端汉堡 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* 移动端菜单 */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#2a2a2a] py-4 px-2 space-y-0.5">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors",
                  pathname === href ? "text-white bg-[#282828]" : "text-gray-400 hover:text-white"
                )}
              >
                {label}
              </Link>
            ))}
            <div className="h-px bg-[#2a2a2a] my-2" />
            {user ? (
              <>
                <Link href="/account" className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                  <User className="w-4 h-4" /> 用户中心
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-300 transition-colors w-full">
                  <LogOut className="w-4 h-4" /> 退出登录
                </button>
              </>
            ) : (
              <div className="px-3 pt-2">
                <Link href="/auth/login" className="block text-center py-2 text-sm bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">登录</Link>
              </div>
            )}
          </div>
        )}
      </div>

      {userMenuOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setUserMenuOpen(false)} />
      )}
    </header>
  );
}
