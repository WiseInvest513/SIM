"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { SuccessModal } from "@/components/ui/success-modal";

const loginSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少 6 位"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const ALLOWED_REDIRECTS = ["/account", "/shop", "/guides", "/account/orders"];

function validateRedirectUrl(url: string | null): string {
  if (!url) return "/account";
  // 只允许以 / 开头的相对路径
  if (!url.startsWith("/")) return "/account";
  // 白名单校验
  if (ALLOWED_REDIRECTS.includes(url)) return url;
  return "/account";
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = validateRedirectUrl(searchParams.get("redirect"));
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });
      if (error) setError("Google 登录失败，请稍后重试");
    } catch {
      setError("Google 登录失败，请稍后重试");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        if (error.message.includes("Invalid login")) {
          setError("邮箱或密码不正确，请检查后重试");
        } else if (error.message.includes("Email not confirmed")) {
          setError("请先验证邮箱，检查您的收件箱");
        } else {
          setError(error.message);
        }
        return;
      }
      setShowSuccessModal(true);
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1000);
    } catch {
      setError("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-950/50 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-lg text-white">Wise SIM</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">欢迎回来</h1>
          <p className="text-gray-500 text-sm mt-1">登录你的账户</p>
        </div>

        <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-6 space-y-4">
          {/* Google 登录 */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#222222] hover:border-[#3a3a3a] transition-colors text-sm font-medium text-white disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            使用 Google 账号登录
          </button>

          {/* 分割线 */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#2a2a2a]" />
            <span className="text-gray-600 text-xs">或使用邮箱登录</span>
            <div className="flex-1 h-px bg-[#2a2a2a]" />
          </div>

          {/* 邮箱密码表单 */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  autoComplete="current-password"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />登录中...</>
              ) : "登录"}
            </Button>
          </form>

          {/* 创建账户 */}
          <p className="text-center text-sm text-gray-500">
            还没有账户？{" "}
            <Link
              href={`/auth/register${redirectTo !== "/account" ? `?redirect=${redirectTo}` : ""}`}
              className="text-white hover:text-gray-300 font-medium transition-colors"
            >
              创建账户
            </Link>
          </p>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="恭喜登录成功！🎉"
          message="正在为您跳转..."
          duration={1000}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
}
