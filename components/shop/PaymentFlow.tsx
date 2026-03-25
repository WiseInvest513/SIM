"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, QrCode, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

const addressSchema = z.object({
  recipient_name:  z.string().min(2, "姓名至少 2 个字"),
  recipient_phone: z.string().regex(/^1[3-9]\d{9}$/, "请输入有效手机号"),
  address:         z.string().min(10, "请填写详细地址"),
  remark:          z.string().max(200).optional(),
});
type AddressForm = z.infer<typeof addressSchema>;

interface Props {
  product:    { id: string; name: string; slug: string; price: number };
  userId:     string;
  alipayQr:   string | null;
  wechatId:   string;
  priceLabel: string;
}

type Step = "payment" | "address" | "done";

export function PaymentFlow({ product, userId, alipayQr, wechatId, priceLabel }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("payment");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  async function onSubmit(data: AddressForm) {
    setSubmitting(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.from("orders").insert({
        user_id:         userId,
        product_id:      product.id,
        quantity:        1,
        recipient_name:  data.recipient_name,
        recipient_phone: data.recipient_phone,
        address:         data.address,
        remark:          data.remark || null,
        status:          "pending",
      });
      if (err) throw err;
      setStep("done");
    } catch {
      setError("提交失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── 第一步：扫码付款 ── */
  if (step === "payment") {
    return (
      <div className="space-y-5">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">你正在购买</p>
          <p className="text-white font-semibold">{product.name}</p>
          <p className="text-3xl font-bold text-white mt-1">{priceLabel}</p>
        </div>

        {/* 支付宝二维码 */}
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-6 flex flex-col items-center gap-4">
          {alipayQr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={alipayQr} alt="支付宝收款码" className="w-48 h-48 rounded-lg" />
          ) : (
            <div className="w-48 h-48 rounded-lg bg-[#1a1a1a] border border-dashed border-[#3a3a3a] flex flex-col items-center justify-center gap-2 text-gray-600">
              <QrCode className="w-10 h-10" />
              <p className="text-xs text-center">支付宝收款码<br/>（待配置）</p>
            </div>
          )}
          <div className="text-center">
            <p className="text-white text-sm font-medium">支付宝扫码付款</p>
            <p className="text-gray-500 text-xs mt-0.5">请确认金额为 {priceLabel}</p>
          </div>
        </div>

        <Button
          onClick={() => setStep("address")}
          size="lg"
          className="w-full gap-2 bg-blue-600 hover:bg-blue-500 text-white"
        >
          <CheckCircle2 className="w-4 h-4" />
          我已付款，填写收货地址
        </Button>

        <p className="text-gray-600 text-xs text-center">
          付款完成后点击上方按钮，填写收货地址即完成下单
        </p>
      </div>
    );
  }

  /* ── 第二步：填写地址 ── */
  if (step === "address") {
    return (
      <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-6 space-y-5">
        <div>
          <h2 className="text-white font-semibold text-lg">填写收货地址</h2>
          <p className="text-gray-500 text-sm mt-0.5">付款完成后填写，我们将尽快安排发货</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="recipient_name">收货人姓名 *</Label>
            <Input id="recipient_name" placeholder="真实姓名（快递需要）" {...register("recipient_name")} />
            {errors.recipient_name && <p className="text-red-400 text-xs">{errors.recipient_name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="recipient_phone">手机号 *</Label>
            <Input id="recipient_phone" type="tel" placeholder="用于快递通知" {...register("recipient_phone")} />
            {errors.recipient_phone && <p className="text-red-400 text-xs">{errors.recipient_phone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">详细收货地址 *</Label>
            <Textarea
              id="address"
              placeholder={"省 + 市 + 区 + 详细地址\n例：广东省深圳市南山区 XX 路 XX 号"}
              rows={3}
              {...register("address")}
            />
            {errors.address && <p className="text-red-400 text-xs">{errors.address.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="remark">备注（选填）</Label>
            <Input id="remark" placeholder="如有特殊需求请说明" {...register("remark")} />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button type="submit" size="lg" disabled={submitting} className="w-full gap-2">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />提交中...</> : "确认提交"}
          </Button>
        </form>
      </div>
    );
  }

  /* ── 第三步：完成 ── */
  function handleCopy() {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8 text-green-400" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">下单成功！</h2>
        <p className="text-gray-400 text-sm">地址已收到，我们会尽快核实付款并安排发货</p>
      </div>

      {/* 微信联系 */}
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 text-left space-y-3">
        <p className="text-white text-sm font-medium">添加微信，确认付款后发货</p>
        <div className="flex items-center justify-between gap-3 bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-xl">💬</span>
            <div>
              <p className="text-gray-500 text-xs">微信号</p>
              <p className="text-white font-mono font-semibold text-base select-all">{wechatId}</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copied
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a] hover:border-[#3a3a3a]"
            }`}
          >
            {copied ? <><Check className="w-3.5 h-3.5" />已复制</> : <><Copy className="w-3.5 h-3.5" />复制</>}
          </button>
        </div>
        <p className="text-gray-500 text-xs">
          添加微信后告知已下单，核实付款后当天安排发货，并回传快递单号。
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={() => router.push("/account/orders")} className="w-full" variant="outline">
          查看我的订单
        </Button>
        <Button onClick={() => router.push("/shop")} className="w-full" variant="ghost">
          继续购物
        </Button>
      </div>
    </div>
  );
}
