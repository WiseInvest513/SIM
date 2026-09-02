import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductById } from "@/lib/products";

const schema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
  recipient_name: z.string().min(2).max(80),
  recipient_phone: z.string().regex(/^1[3-9]\d{9}$/),
  address: z.string().min(10).max(500),
  remark: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.wiseSubject) return NextResponse.json({ error: "请先使用 Wise ID 登录" }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "订单信息不完整或格式不正确" }, { status: 400 });
  if (!getProductById(parsed.data.productId)) return NextResponse.json({ error: "商品不存在或已下架" }, { status: 400 });

  const { data, error } = await createAdminClient().from("orders").insert({
    wise_subject: session.user.wiseSubject,
    product_id: parsed.data.productId,
    quantity: parsed.data.quantity,
    recipient_name: parsed.data.recipient_name,
    recipient_phone: parsed.data.recipient_phone,
    address: parsed.data.address,
    remark: parsed.data.remark || null,
    status: "pending",
  }).select("id").single();
  if (error) {
    console.error("Order creation failed:", error.message);
    return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
  }
  return NextResponse.json({ id: data.id }, { status: 201 });
}
