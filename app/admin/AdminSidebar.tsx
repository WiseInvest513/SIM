"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Globe, LayoutDashboard, Menu, X } from "lucide-react";

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 移动端顶部导航栏 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[#0d0d0d] border-b border-[#1a1a1a]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Globe className="text-white" style={{ width: 15, height: 15 }} />
          </div>
          <span className="text-sm font-bold text-white">管理后台</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 移动端抽屉遮罩 */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-14 left-0 bottom-0 w-52 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex-1 p-3 space-y-0.5 pt-4">
              <p className="text-xs font-medium text-gray-600 px-3 py-2">管理功能</p>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                订单管理
              </Link>
            </nav>
            <div className="p-3 border-t border-[#1a1a1a]">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                返回前台
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 桌面端侧边栏 */}
      <aside className="hidden md:flex w-52 border-r border-[#1a1a1a] bg-[#0d0d0d] flex-col flex-shrink-0">
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
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            订单管理
          </Link>
        </nav>

        <div className="p-3 border-t border-[#1a1a1a]">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            返回前台
          </Link>
        </div>
      </aside>
    </>
  );
}
