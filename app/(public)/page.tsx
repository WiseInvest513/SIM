import Link from "next/link";
import {
  ArrowRight, Package, FileText,
  Truck, Clock, Shield, ChevronRight, Globe, Star,
} from "lucide-react";

/* ── 数据 ───────────────────────────────────── */

const stats = [
  { value: "500+", label: "已售出卡片" },
  { value: "98%",  label: "用户好评率" },
  { value: "3天",  label: "平均到货时间" },
  { value: "24h",  label: "客服响应" },
];

const services = [
  {
    href: "/shop",
    icon: Package,
    badge: "热卖",
    title: "手机卡商城",
    desc: "giffgaff 英国卡、Ultra Mobile 美国卡，正规渠道采购，附激活教程，顺丰直邮到家。",
    cta: "进入商城",
  },
  {
    href: "/guides",
    icon: FileText,
    badge: "图文",
    title: "激活教程",
    desc: "图文教程手把手带你完成激活，不会英文也没关系，客服全程陪同。",
    cta: "看教程",
  },
];

const features = [
  { icon: Package, title: "正规渠道",   desc: "直接从官方渠道采购，非二手翻新，附正规激活教程。" },
  { icon: Truck,   title: "顺丰直邮",   desc: "收到付款当天或次日发货，全程可追踪物流信息。" },
  { icon: Clock,   title: "1-3 天到手", desc: "国内顺丰配送，大部分城市隔天即可签收。" },
  { icon: Shield,  title: "售后保障",   desc: "激活遇到问题，微信客服全程陪同处理，放心购买。" },
];

const reviews = [
  { name: "Alex W.",  role: "留学生",   text: "在国内就能激活，注册 PayPal 和 Wise 都没问题，客服也很耐心。" },
  { name: "林 S.",    role: "自由职业者", text: "顺丰第二天就到了，按教程操作十分钟搞定，强烈推荐！" },
  { name: "Chen M.",  role: "海外工作",  text: "giffgaff 永久免月租真的香，备用号码完全够用。" },
  { name: "张 P.",    role: "跨境电商",  text: "一次买了两张，发货速度很快，激活也顺利，下次还会来。" },
  { name: "Sarah K.", role: "旅行博主",  text: "出境前提前买好，省去了很多麻烦，服务很专业。" },
  { name: "刘 H.",    role: "程序员",    text: "注册 GitHub Copilot 用上了，卡质量很好，号码正常收验证码。" },
];

const faqs = [
  {
    q: "giffgaff 卡在国内能用吗？",
    a: "可以接收国际短信和电话，主要用于注册海外 App、接验证码（PayPal、WhatsApp、Wise 等）。不含国内通话流量套餐，需额外充值才可漫游上网。",
  },
  {
    q: "购买后多久发货？",
    a: "收到付款后，一般当天或次日通过顺丰快递发出，大部分城市 1-3 个工作日签收。",
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

/* ── 页面 ────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* 背景光晕 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-blue-500/[0.04] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* 状态标签 */}
          <div className="inline-flex items-center gap-2 border border-[#2a2a2a] bg-[#111111] rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400 tracking-wide">正在接单 · 1-3 个工作日发货</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            <span className="text-white">出海，</span>
            <span className="text-gray-600">从一张</span>
            <br />
            <span className="text-white">手机卡开始</span>
          </h1>

          {/* 副标题 */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            在国内就能拿到英国/美国真实手机号，注册 PayPal、WhatsApp、海外银行，无需出境，顺丰直邮，按教程几分钟激活。
          </p>

          {/* CTA 按钮 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-colors text-sm"
            >
              <Package className="w-4 h-4" />
              立即选购手机卡
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center gap-2 border border-[#2a2a2a] text-gray-400 font-medium px-7 py-3.5 rounded-xl hover:bg-[#111111] hover:text-white transition-colors text-sm"
            >
              查看出海教程
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ 滚动跑马灯 ═══════════ */}
      <div className="border-y border-[#1a1a1a] bg-[#111111] py-3 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[
            "giffgaff 英国手机卡", "永久免月租", "顺丰直邮",
            "1-3 天发货", "国内激活", "Ultra Mobile 美国卡",
            "真实海外号码", "接收 PayPal 验证码", "接收 WhatsApp 验证码",
            "giffgaff 英国手机卡", "永久免月租", "顺丰直邮",
            "1-3 天发货", "国内激活", "Ultra Mobile 美国卡",
            "真实海外号码", "接收 PayPal 验证码", "接收 WhatsApp 验证码",
          ].map((item, i) => (
            <span key={i} className="text-xs text-gray-500 flex-shrink-0 tracking-widest uppercase">
              {item}
              <span className="mx-6 text-gray-600">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ 数据统计 ═══════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center md:text-left">
              <p className="text-4xl font-bold text-white mb-1 tabular-nums">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 三大服务入口 ═══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">我们提供</p>
            <h2 className="text-3xl font-bold text-white">我们提供什么</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map(({ href, icon: Icon, badge, title, desc, cta }) => (
              <Link
                key={href}
                href={href}
                className="group relative border border-[#2a2a2a] bg-[#282828] hover:bg-[#303030] rounded-2xl p-7 flex flex-col justify-between min-h-56 transition-all duration-200 hover:border-[#3a3a3a]"
              >
                {/* 角标 */}
                <span className="absolute top-5 right-5 text-[10px] text-gray-500 border border-[#2a2a2a] rounded-full px-2 py-0.5 tracking-wider">
                  {badge}
                </span>

                <div>
                  <div className="w-10 h-10 border border-[#2a2a2a] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-500 group-hover:text-gray-200 transition-colors mt-6">
                  {cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 产品特性 ═══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="md:sticky md:top-24">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">为什么选我们</p>
              <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
                省去繁琐流程
                <br />
                <span className="text-gray-600">专注出海这一件事</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm max-w-md">
                我们只做手机卡这件事，从选货、发货到激活教程，每个环节都经过打磨。你不需要懂英文，不需要出境，收到卡按教程操作即可。
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 mt-8 text-sm text-gray-400 hover:text-white border border-[#2a2a2a] hover:border-[#3a3a3a] px-5 py-2.5 rounded-xl transition-colors"
              >
                立即购买 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="border border-[#2a2a2a] bg-[#282828] rounded-2xl p-6 hover:bg-[#303030] transition-colors"
                >
                  <div className="w-9 h-9 border border-[#2a2a2a] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="font-semibold text-white text-sm mb-1.5">{title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 产品聚焦 ═══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-14">本月热卖</p>
          <div className="border border-[#2a2a2a] rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* 左侧 */}
              <div className="flex-1 p-8 md:p-12 bg-[#282828]">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">英国 O2 旗下运营商</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">giffgaff 英国手机卡</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg">
                  永久免月租，账户有余额号码就不会被注销。国内顺丰直邮，几分钟按教程完成激活，即可注册 PayPal、WhatsApp、海外 App Store 等。
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
                  {["永久免月租", "英国真实号码", "接收国际短信", "全程教程支持", "顺丰直邮"].map(t => (
                    <span key={t} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-gray-300" />{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 右侧 */}
              <div className="md:w-60 border-t md:border-t-0 md:border-l border-[#2a2a2a] p-8 md:p-12 flex flex-col justify-between bg-[#111111]">
                <div>
                  <p className="text-xs text-gray-500 mb-2">到手价格</p>
                  <p className="text-5xl font-bold text-white">¥69</p>
                  <p className="text-xs text-gray-500 mt-1.5">含 SIM 卡 + 首充余额</p>
                </div>
                <Link
                  href="/shop/giffgaff"
                  className="mt-8 flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm"
                >
                  立即购买
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 用户评价 ═══════════ */}
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

      {/* ═══════════ FAQ ═══════════ */}
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

      {/* ═══════════ 底部 CTA ═══════════ */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            准备好出海了吗？
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            从一张手机号开始，打开出海第一步。
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-base"
          >
            立即选购手机卡
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
