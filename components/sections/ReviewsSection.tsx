"use client";

import { Star } from "lucide-react";

const reviews = [
  { name: "Alex W.",  role: "留学生",   text: "在国内就能激活，注册 PayPal 和 Wise 都没问题，客服也很耐心。" },
  { name: "林 S.",    role: "自由职业者", text: "快递第二天就到了，按教程操作十分钟搞定，强烈推荐！" },
  { name: "Chen M.",  role: "海外工作",  text: "giffgaff 永久免月租真的香，备用号码完全够用。" },
  { name: "张 P.",    role: "跨境电商",  text: "一次买了两张，发货速度很快，激活也顺利，下次还会来。" },
  { name: "Sarah K.", role: "旅行博主",  text: "出境前提前买好，省去了很多麻烦，服务很专业。" },
  { name: "刘 H.",    role: "程序员",    text: "注册 GitHub Copilot 用上了，卡质量很好，号码正常收验证码。" },
];

export function ReviewsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a] overflow-hidden">
      <div className="max-w-7xl mx-auto mb-14">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">用户评价</p>
        <h2 className="text-3xl font-bold text-white">他们都在用</h2>
      </div>

      {/* 滚动评价卡片 */}
      <div className="relative">
        <div className="flex gap-4 animate-[marquee_40s_linear_infinite] w-max">
          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="w-72 flex-shrink-0 border border-[#2a2a2a] bg-[#282828] rounded-2xl p-6"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">{r.text}</p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs text-gray-400 font-medium">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-xs text-gray-100 font-medium">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 两侧渐变遮罩 */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
