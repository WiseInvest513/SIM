import Link from "next/link";
import { LogIn, ShieldCheck } from "lucide-react";
import { signIn } from "@/auth";

const allowedRedirects = ["/account", "/account/orders", "/shop", "/guides"];
function safeRedirect(value?: string) {
  if (!value?.startsWith("/") || value.startsWith("//")) return "/account";
  return allowedRedirects.some((path) => value === path || value.startsWith(`${path}/`)) ? value : "/account";
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ redirect?: string; error?: string }> }) {
  const params = await searchParams;
  const redirectTo = safeRedirect(params.redirect);
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-950/50 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6"><div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center"><span className="text-gray-900 font-bold text-sm">W</span></div><span className="font-bold text-lg text-white">Wise SIM</span></Link>
          <h1 className="text-2xl font-bold text-white">使用 Wise ID 登录</h1>
          <p className="text-gray-500 text-sm mt-2">一个 Wise ID，即可登录 Wise 系列产品</p>
        </div>
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 space-y-5">
          {params.error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">登录未完成，请重新尝试；如仍有问题请联系站长。</div>}
          <form action={async () => { "use server"; await signIn("wise", { redirectTo }); }}>
            <button className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-3.5 text-sm font-semibold text-white transition-colors"><LogIn className="w-4 h-4" />使用 Wise ID 登录</button>
          </form>
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm leading-6"><p className="font-medium text-amber-100">原网站账户说明</p><p className="text-gray-400 mt-1">原账户的订单均已完结，请使用新的 Wise ID 登录。新旧双方数据库不进行同步，如有问题请联系站长。</p></div>
          </div>
          <p className="text-center text-xs text-gray-600">登录将跳转至 Wise Invest 完成安全认证与授权</p>
        </div>
      </div>
    </div>
  );
}
