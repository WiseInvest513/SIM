"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath, revalidateTag } from "next/cache";
import type { OrderStatus } from "@/lib/supabase/types";

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  trackingNumber?: string
) {
  const supabase = createAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: any = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };
  if (trackingNumber) payload.tracking_number = trackingNumber;

  const { error } = await supabase
    .from("orders")
    .update(payload)
    .eq("id", orderId);

  if (error) {
    console.error("updateOrderStatus error:", error);
    return { success: false, error: error.message };
  }

  revalidateTag("admin-orders"); // 清除 admin 订单缓存
  revalidatePath("/admin");
  return { success: true };
}
