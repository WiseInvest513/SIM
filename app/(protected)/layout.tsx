import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

// 受保护页面布局（需要登录）
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // getSession 读本地 cookie，无网络请求；middleware 已验证登录
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/auth/login");

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
