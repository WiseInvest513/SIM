import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "下单成功",
};

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        {/* 成功图标 */}
        <div className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">
          下单成功！
        </h1>

        {orderId && (
          <p className="text-slate-400 text-sm mb-2">
            订单号：<span className="text-white font-mono font-medium">{orderId}</span>
          </p>
        )}

        {/* 提示信息 */}
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-6 my-6 text-left space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">📱</span>
            <p className="text-slate-300 text-sm">
              我们会在 <strong className="text-white">1-3 个工作日</strong> 内安排发货，请留意手机短信通知。
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">💰</span>
            <p className="text-slate-300 text-sm">
              客服会主动联系您确认订单并发送付款方式，支持微信/支付宝。
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">🚚</span>
            <p className="text-slate-300 text-sm">
              收到货物后，可在「我的订单」查看快递单号和配送状态。
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">🎁</span>
            <p className="text-slate-300 text-sm">
              随货附带详细激活教程，如有问题可联系客服微信获取支持。
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/account/orders" className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Package className="w-4 h-4" />
              查看我的订单
            </Button>
          </Link>
          <Link href="/shop" className="flex-1">
            <Button className="w-full gap-2">
              <ShoppingBag className="w-4 h-4" />
              继续购物
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
