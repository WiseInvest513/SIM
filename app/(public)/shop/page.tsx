import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, Layers, Route, ArrowRight, CreditCard, CircleDollarSign, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { XesimCard } from "@/components/shop/XesimCard";
import { PRODUCTS, SHIPPING_DAYS } from "@/lib/products";
import { PromotionCountdown } from "@/components/shop/PromotionCountdown";

export const metadata: Metadata = {
  title: "手机卡商城",
  description: "购买海外手机卡，giffgaff 英国手机卡等，国内直邮，快速发货。",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-950/40 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* 页头 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">手机卡商城</h1>
              <p className="text-gray-400 text-sm">正规渠道，品质保障，快速发货</p>
            </div>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <span>📦 正规渠道进货</span>
              <span>🚚 {SHIPPING_DAYS}发货</span>
              <span>✅ 激活教程全程指导</span>
              <span>💬 购后问题售后支持</span>
            </div>
          </div>
        </div>

        <div className="relative mb-7 w-full overflow-hidden rounded-2xl border border-orange-500/35 bg-gradient-to-r from-orange-500/25 via-red-500/20 to-[#151014] px-5 py-2.5 shadow-lg shadow-orange-950/20 sm:px-6">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-orange-300/10 blur-3xl" />
          <div className="relative grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-bold text-orange-300">
                <Sparkles className="h-4 w-4" /> 8 月限时促销
              </div>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">现在购买，只要 ¥59</h2>
                <span className="mb-0.5 rounded-full border border-orange-400/30 bg-orange-500/15 px-2.5 py-1 text-xs font-bold text-orange-200">立省 ¥30</span>
              </div>
              <p className="mt-1.5 text-sm text-orange-100">giffgaff 英国白卡 · 含国内运费 · 当天发货</p>
            </div>
            <div className="rounded-xl border border-orange-300/15 bg-black/15 px-3.5 py-2 backdrop-blur-sm">
              <PromotionCountdown />
            </div>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          <Link
            href="/shop/activation-guide"
            className="group rounded-xl border border-violet-500/35 bg-gradient-to-br from-violet-500/10 via-[#111111] to-blue-500/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/70 hover:shadow-lg hover:shadow-violet-500/15"
          >
            <div className="h-48 px-6 flex flex-col justify-center bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_55%)]">
              <div className="flex items-center gap-3 mb-5">
                {[ShoppingBag, CreditCard, CircleDollarSign].map((Icon, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-300" />
                    </div>
                    {index < 2 && <ArrowRight className="w-4 h-4 text-gray-600" />}
                  </div>
                ))}
              </div>
              <p className="w-fit rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-base font-semibold tracking-wide text-violet-200 shadow-sm shadow-violet-500/10">
                完整激活链路
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Route className="w-4 h-4 text-violet-400" />
                <h2 className="font-semibold text-white group-hover:text-violet-300 transition-colors">购买后如何充值激活？</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                购买白卡 → 注册 StarryBlu → 准备外币余额 → 支付并激活 giffgaff。
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">含自助换汇与站长协助方案</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-300">
                  查看流程 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* 其他资源 */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-5">
            <Layers className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest">其他资源</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <XesimCard />
          </div>
        </div>

        {/* 购买须知 */}
        <div className="mt-12 rounded-xl border border-[#2a2a2a] bg-[#111111] p-6">
          <h2 className="text-base font-semibold text-white mb-4">购买须知</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p className="text-gray-200 font-medium mb-1">下单流程</p>
              <p>选择商品 → 登录账号 → 填写收货信息 → 提交订单 → 客服联系付款 → 发货</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium mb-1">支付方式</p>
              <p>目前支持微信/支付宝转账支付，下单后客服会主动联系您</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium mb-1">发货说明</p>
              <p>收到付款后 {SHIPPING_DAYS}安排发货，快递邮寄到家</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium mb-1">激活支持</p>
              <p>附带详细激活教程，提供全程微信技术支持</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
