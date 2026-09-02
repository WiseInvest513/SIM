import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isDev = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";
  const isAdmin = session?.user?.isAdmin;
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
