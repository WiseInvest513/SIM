import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// 公开页面布局（带导航栏和底部）
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
