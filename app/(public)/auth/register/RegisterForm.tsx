"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Globe, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuccessModal } from "@/components/ui/success-modal";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "请输入邮箱地址")
      .refine((v) => v.includes("@"), { message: "邮箱必须包含 @ 符号" })
      .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), { message: "请输入有效的邮箱地址" }),
    password: z.string().min(8, "密码至少 8 位").max(72, "密码过长"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);
    setError(null);

    try {
      // ----------------------------------------------------------------
      // 旧逻辑（已注释）：直接调用 supabase.auth.signUp()，会触发确认邮件
      // 保留备用，后续其他业务可复用此流程
      //
      // const supabase = createClient();
      // const { error } = await supabase.auth.signUp({
      //   email: data.email,
      //   password: data.password,
      //   options: {
      //     emailRedirectTo: `${window.location.origin}/auth/callback`,
      //     data: { role: "user" },
      //   },
      // });
      // if (error) {
      //   if (error.message.includes("already registered")) {
      //     setError("该邮箱已注册，请直接登录");
      //   } else {
      //     setError(error.message);
      //   }
      //   return;
      // }
      // ----------------------------------------------------------------

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "注册失败，请稍后重试");
        return;
      }

      setShowSuccessModal(true);
      setTimeout(() => setSuccess(true), 1000);
    } catch {
      setError("注册失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-indigo-950/50 via-[#0a0a0a] to-[#0a0a0a]">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">注册成功！</h1>
            <p className="text-gray-400 mb-6">
              🎉 恭喜您注册成功！账户已激活，可以直接登录。
            </p>
            <Link href="/auth/login">
              <Button className="w-full">前往登录</Button>
            </Link>
          </div>
        </div>
        {showSuccessModal && (
          <SuccessModal
            title="注册成功！🎉"
            message="账户已激活，请前往登录"
            duration={1000}
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-indigo-950/50 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">
              Wise <span className="text-blue-600">Wise SIM</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">创建账户</h1>
          <p className="text-gray-400 text-sm mt-2">
            已有账户？
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 ml-1">
              立即登录
            </Link>
          </p>
        </div>

        <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">设置密码</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="至少 8 位字符"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="再次输入密码"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs">{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> 注册中...</>
              ) : (
                "创建账户"
              )}
            </Button>

            <p className="text-gray-500 text-xs text-center">
              注册即代表您同意我们的服务条款与隐私政策
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
