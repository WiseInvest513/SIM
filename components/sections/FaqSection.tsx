"use client";

import { ChevronRight } from "lucide-react";

const faqs = [
  {
    q: "giffgaff 卡在国内能用吗？",
    a: "可以接收国际短信和电话，主要用于注册海外 App、接验证码（PayPal、WhatsApp、Wise 等）。不含国内通话流量套餐，需额外充值才可漫游上网。",
  },
  {
    q: "购买后多久发货？",
    a: "收到付款后，一般当天或次日通过快递发出，大部分城市 1-3 个工作日签收。",
  },
  {
    q: "怎么激活 giffgaff 卡？",
    a: "收到卡后通过 Wi-Fi 在手机上按教程操作，全程约 5-10 分钟。我们提供详细图文教程，客服全程陪同，不会英文也没关系。",
  },
  {
    q: "如果激活失败怎么办？",
    a: "联系微信客服，我们全程协助排查。如确属卡片质量问题，提供免费补发或全额退款。",
  },
  {
    q: "支持什么支付方式？",
    a: "支持微信支付、支付宝等主流国内支付方式，下单后客服会发送收款码。",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">常见问题</p>
          <h2 className="text-3xl font-bold text-white">你可能想知道</h2>
        </div>

        <div className="space-y-2">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group border border-[#2a2a2a] rounded-2xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer text-gray-200 hover:text-white transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-sm">{q}</span>
                <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-[#1a1a1a] pt-4">
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
