"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ShoppingBag, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/supabase/types";
import { formatPrice } from "@/lib/utils";

const orderSchema = z.object({
  recipient_name: z.string().min(2, "姓名至少 2 个字符").max(50, "姓名过长"),
  recipient_phone: z
    .string()
    .min(11, "请输入有效的手机号")
    .max(20, "手机号格式有误")
    .regex(/^1[3-9]\d{9}$|^\+\d{7,15}$/, "请输入有效的手机号"),
  address: z.string().min(10, "请填写详细收货地址").max(200, "地址过长"),
  remark: z.string().max(300, "备注内容过长").optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  product: Product;
  userId: string | null;
}

export function OrderForm({ product, userId }: OrderFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  async function onSubmit(data: OrderFormData) {
    // 未登录时跳转登录
    if (!userId) {
      router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          product_id: product.id,
          quantity: 1,
          recipient_name: data.recipient_name,
          recipient_phone: data.recipient_phone,
          address: data.address,
          remark: data.remark || null,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      router.push(`/shop/order-success?orderId=${order.id}`);
    } catch (err) {
      console.error("下单失败:", err);
      setError("下单失败，请稍后重试或联系客服");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* 商品摘要 */}
      <div className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-4">
        <p className="text-xs text-gray-500 mb-2">你正在购买</p>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-white text-sm">{product.name}</p>
          <p className="text-xl font-bold text-white">{formatPrice(product.price)}</p>
        </div>
        <p className="text-gray-500 text-xs mt-1">含快递运费 · × 1</p>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm font-medium text-gray-300">收货信息</p>

        {/* 姓名 */}
        <div className="space-y-1.5">
          <Label htmlFor="recipient_name">收货人姓名 *</Label>
          <Input
            id="recipient_name"
            placeholder="真实姓名（快递需要）"
            {...register("recipient_name")}
          />
          {errors.recipient_name && (
            <p className="text-red-400 text-xs">{errors.recipient_name.message}</p>
          )}
        </div>

        {/* 手机号 */}
        <div className="space-y-1.5">
          <Label htmlFor="recipient_phone">联系手机号 *</Label>
          <Input
            id="recipient_phone"
            type="tel"
            placeholder="用于客服联系 & 快递通知"
            {...register("recipient_phone")}
          />
          {errors.recipient_phone && (
            <p className="text-red-400 text-xs">{errors.recipient_phone.message}</p>
          )}
        </div>

        {/* 收货地址 */}
        <div className="space-y-1.5">
          <Label htmlFor="address">详细收货地址 *</Label>
          <Textarea
            id="address"
            placeholder="省市区 + 详细地址 + 邮编&#10;例：广东省深圳市南山区 XX 路 XX 号 518000"
            rows={3}
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-400 text-xs">{errors.address.message}</p>
          )}
        </div>

        {/* 备注 */}
        <div className="space-y-1.5">
          <Label htmlFor="remark">备注（选填）</Label>
          <Textarea
            id="remark"
            placeholder="如有特殊需求请说明"
            rows={2}
            {...register("remark")}
          />
        </div>

        {/* 支付提示 */}
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3.5">
          <p className="text-yellow-400 text-xs font-medium mb-1">💡 支付方式</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            提交后客服会在 1 个工作日内联系您，发送微信/支付宝收款码完成付款后安排发货。
          </p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* 提交按钮 */}
        {userId ? (
          <Button type="submit" size="lg" disabled={submitting} className="w-full gap-2">
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                提交中...
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                确认下单
              </>
            )}
          </Button>
        ) : (
          <Button type="submit" size="lg" className="w-full gap-2">
            <LogIn className="w-4 h-4" />
            登录后下单
          </Button>
        )}

        <p className="text-gray-600 text-xs text-center">
          提交即代表您同意我们的服务条款
        </p>
      </form>
    </div>
  );
}
