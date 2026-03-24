"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderStatusBadge } from "@/components/shop/OrderStatus";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, formatDate } from "@/lib/utils";
import type { OrderStatus } from "@/lib/supabase/types";

export interface Order {
  id: string;
  user_id: string;
  quantity: number;
  recipient_name: string;
  recipient_phone: string;
  address: string;
  remark: string | null;
  status: OrderStatus;
  tracking_number: string | null;
  created_at: string;
  products?: { id: string; name: string; price: number; category: string } | null;
  profiles?: { email: string; display_name: string | null } | null;
}

interface AdminOrderTableProps {
  orders: Order[];
}

// 订单行组件
function OrderRow({ order }: { order: Order }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [trackingInput, setTrackingInput] = useState(order.tracking_number || "");
  const [showTracking, setShowTracking] = useState(false);

  async function updateStatus(newStatus: OrderStatus, trackingNumber?: string) {
    setUpdating(true);
    const supabase = createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      status: newStatus,
      updated_at: new Date().toISOString(),
    };

    if (trackingNumber) {
      updateData.tracking_number = trackingNumber;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("orders") as any).update(updateData).eq("id", order.id);

    router.refresh();
    setUpdating(false);
    setShowTracking(false);
  }

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
      {/* 订单号 */}
      <td className="px-4 py-3 text-xs font-mono text-slate-400">
        {order.id.slice(0, 8)}
      </td>

      {/* 商品 */}
      <td className="px-4 py-3">
        <p className="text-sm text-white">{order.products?.name || "-"}</p>
        <p className="text-xs text-slate-500">{order.products?.category} × {order.quantity}</p>
      </td>

      {/* 金额 */}
      <td className="px-4 py-3 text-sm text-white">
        {order.products?.price ? formatPrice(order.products.price * order.quantity) : "-"}
      </td>

      {/* 收货人 */}
      <td className="px-4 py-3">
        <p className="text-sm text-white">{order.recipient_name}</p>
        <p className="text-xs text-slate-500">{order.recipient_phone}</p>
      </td>

      {/* 地址 */}
      <td className="px-4 py-3 max-w-[200px]">
        <p className="text-xs text-slate-300 truncate" title={order.address}>
          {order.address}
        </p>
        {order.remark && (
          <p className="text-xs text-slate-500 mt-0.5">备注: {order.remark}</p>
        )}
      </td>

      {/* 状态 */}
      <td className="px-4 py-3">
        <OrderStatusBadge status={order.status} />
      </td>

      {/* 下单时间 */}
      <td className="px-4 py-3 text-xs text-slate-500">
        {formatDate(order.created_at)}
      </td>

      {/* 操作 */}
      <td className="px-4 py-3">
        {updating ? (
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
        ) : order.status === "pending" ? (
          <div className="flex flex-col gap-2">
            {showTracking ? (
              <div className="flex items-center gap-2">
                <Input
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="快递单号"
                  className="h-7 text-xs w-32"
                />
                <button
                  onClick={() => updateStatus("shipped", trackingInput)}
                  className="p-1 rounded text-green-400 hover:bg-green-400/10 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1"
                onClick={() => setShowTracking(true)}
              >
                <Truck className="w-3 h-3" />
                发货
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10"
              onClick={() => updateStatus("cancelled")}
            >
              取消
            </Button>
          </div>
        ) : order.status === "shipped" ? (
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1"
            onClick={() => updateStatus("completed")}
          >
            <Check className="w-3 h-3" />
            确认完成
          </Button>
        ) : (
          <span className="text-xs text-slate-500">-</span>
        )}
      </td>
    </tr>
  );
}

export function AdminOrderTable({ orders }: AdminOrderTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  return (
    <div>
      {/* 过滤器 */}
      <div className="flex gap-2 mb-4">
        {["all", "pending", "shipped", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            }`}
          >
            {{
              all: "全部",
              pending: "待处理",
              shipped: "已发货",
              completed: "已完成",
              cancelled: "已取消",
            }[status]}
          </button>
        ))}
      </div>

      {/* 表格 */}
      <div className="rounded-xl border border-slate-700/60 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-700 bg-slate-900/50">
            <tr>
              {["订单号", "商品", "金额", "收货人", "地址", "状态", "下单时间", "操作"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-400"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-slate-500 text-sm">
                  暂无订单
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
