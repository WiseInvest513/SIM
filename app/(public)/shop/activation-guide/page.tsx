import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  ExternalLink,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  WalletCards,
} from "lucide-react";

export const metadata: Metadata = {
  title: "giffgaff 白卡充值与激活流程",
  description: "购买 giffgaff 白卡、注册 StarryBlu、准备外币余额并完成支付激活的完整操作链路。",
};

const steps = [
  {
    number: "01",
    icon: ShoppingBag,
    eyebrow: "先拿到实体卡",
    title: "购买 giffgaff 白卡",
    description: "商城限时促销价 ¥59，基础白卡当天发货。收到卡后再开始注册和激活。",
    points: ["正规渠道实体白卡", "国内快递邮寄到家", "收到卡后再进行充值激活"],
    action: { label: "促销价 ¥59 购买白卡", href: "/shop/giffgaff", external: false },
  },
  {
    number: "02",
    icon: WalletCards,
    eyebrow: "准备支付工具",
    title: "注册并准备 StarryBlu",
    description: "按照教程注册 StarryBlu，申请虚拟卡并查看卡号、有效期和 CVV，为后续支付做好准备。",
    points: ["完成 StarryBlu 注册", "申请并查看虚拟卡资料", "向账户准备可支付的美元余额"],
    action: { label: "查看 StarryBlu 注册教程", href: "https://www.wise-invest.org/articles/vcard/uQfN0J0j", external: true },
  },
  {
    number: "03",
    icon: CreditCard,
    eyebrow: "完成官方激活",
    title: "支付 giffgaff 并激活",
    description: "进入 giffgaff 官方激活流程，选择 Pay As You Go，使用 StarryBlu 虚拟卡完成最低 £10 充值。",
    points: ["选择 Pay As You Go", "giffgaff 最低充值 £10", "邮箱验证后等待激活成功"],
    action: { label: "查看 giffgaff 完整教程", href: "/guides/giffgaff-complete-guide", external: false },
  },
];

export default function ActivationGuidePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/shop" className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          返回商城
        </Link>

        <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-[#111111] to-blue-500/10 px-6 py-12 text-center sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_48%)]" />
          <div className="relative">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
              <PackageCheck className="h-4 w-4" />
              白卡购买后的完整操作链路
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">从一张白卡，到成功激活</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              这里只销售 giffgaff 基础白卡。收到卡后，跟着下面三步准备支付工具、充值并激活，无需再购买所谓的“预充版本”。
            </p>
          </div>
        </section>

        <section className="relative mt-10 grid gap-5 lg:grid-cols-3">
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gradient-to-r from-violet-500/20 via-violet-400/60 to-blue-500/20 lg:block" />
          {steps.map(({ number, icon: Icon, eyebrow, title, description, points, action }) => (
            <article key={number} className="relative flex flex-col rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/10">
                  <Icon className="h-7 w-7 text-violet-300" />
                </div>
                <span className="text-4xl font-black text-white/[0.06]">{number}</span>
              </div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-violet-400">{eyebrow}</p>
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">{description}</p>
              <ul className="my-6 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                {action.label}
                {action.external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                <BadgeDollarSign className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-amber-400">方案 A</p>
                <h2 className="font-semibold text-white">自行入金与换汇</h2>
              </div>
            </div>
            <p className="text-sm leading-6 text-gray-400">
              如果没有香港银行卡，可以从国内向 StarryBlu 准备资金。这个过程中可能产生汇率差、手续费或换汇损耗，实际到账金额以服务方显示为准。
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/15 bg-black/20 p-3 text-xs leading-5 text-amber-200/80">
              <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
              StarryBlu 中需准备可支付的美元余额；giffgaff 结算时按英镑扣款，请预留汇率波动空间。
            </div>
          </div>

          <div className="rounded-2xl border border-green-500/25 bg-green-500/[0.06] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                <MessageCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-green-400">方案 B</p>
                <h2 className="font-semibold text-white">联系站长协助转入</h2>
              </div>
            </div>
            <p className="text-sm leading-6 text-gray-400">
              如果不想自行承担换汇损耗，可以联系站长说明所需金额。站长可通过 StarryBlu 协助转入对应资金，£10、£15 或更高金额均可，再由你完成官方支付。
            </p>
            <a
              href="https://t.me/WiseInvest513Chat"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-400"
            >
              联系站长咨询 <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-7 w-7 flex-shrink-0 text-blue-400" />
              <div>
                <h2 className="font-semibold text-white">请通过 giffgaff 官方页面完成最终支付</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">站长协助的是 StarryBlu 账户资金准备，不代替你登录账户或提交 giffgaff 的最终支付。</p>
              </div>
            </div>
            <Link href="/guides/giffgaff-complete-guide" className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-500/30 px-5 py-3 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-500/10">
              阅读完整教程 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
