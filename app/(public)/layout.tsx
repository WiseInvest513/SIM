import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { WechatGroupModal } from "@/components/ui/WechatGroupModal";

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
      <ChatWidget />
      <WechatGroupModal />
      <Script id="wise-global-popup-script" src="/wise-popup.js" strategy="afterInteractive" data-site="sim" data-config-url={process.env.NODE_ENV === "development" ? "http://127.0.0.1:3002/api/public/popup" : "https://www.wise-invest.org/api/public/popup"} />
    </>
  );
}
