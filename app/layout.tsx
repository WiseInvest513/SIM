import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wise SIM - SIM 卡商城",
    template: "%s | Wise SIM",
  },
  description: "正规渠道购买海外 SIM 卡，giffgaff 英国卡、Ultra Mobile 美国卡，国内快递直邮，快速激活。",
  keywords: ["海外手机卡", "giffgaff", "Ultra Mobile", "英国手机卡", "美国手机卡", "SIM卡购买"],
  authors: [{ name: "Wise SIM" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://wise-sim.org",
    siteName: "Wise SIM",
    title: "Wise SIM - 海外手机卡商城",
    description: "正规渠道购买海外 SIM 卡，giffgaff 英国卡、Ultra Mobile 美国卡，国内快递直邮，快速激活。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
