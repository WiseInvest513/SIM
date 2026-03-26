"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// router.refresh() triggers revalidation after server action
import { Loader2, Truck, Check, X, Package, Clock, CheckCircle, XCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateOrderStatus } from "./actions";
import { formatPrice, formatDate } from "@/lib/utils";
import type { OrderStatus } from "@/lib/supabase/types";

export interface Order {
  id: string;
  user_id: string;
  product_id?: string | null;
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

const MOCK_ORDERS: Order[] = [
  {
    id: "a1b2c3d4-0001-0000-0000-000000000001",
    user_id: "u1",
    quantity: 1,
    recipient_name: "张三",
    recipient_phone: "13800138001",
    address: "广东省深圳市南山区科技园南路 88 号",
    remark: null,
    status: "pending",
    tracking_number: null,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    products: { id: "00000000-0000-0000-0000-000000000001", name: "giffgaff 英国手机卡", price: 8900, category: "英国手机卡" },
    profiles: { email: "zhangsan@example.com", display_name: "张三" },
  },
  {
    id: "a1b2c3d4-0002-0000-0000-000000000002",
    user_id: "u2",
    quantity: 1,
    recipient_name: "李四",
    recipient_phone: "13900139002",
    address: "北京市朝阳区三里屯路 19 号",
    remark: "尽快发货，急用",
    status: "pending",
    tracking_number: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    products: { id: "00000000-0000-0000-0000-000000000003", name: "giffgaff 英国手机卡（含 £10）", price: 11900, category: "英国手机卡" },
    profiles: { email: "lisi@example.com", display_name: "李四" },
  },
  {
    id: "a1b2c3d4-0003-0000-0000-000000000003",
    user_id: "u3",
    quantity: 1,
    recipient_name: "王五",
    recipient_phone: "13700137003",
    address: "上海市浦东新区陆家嘴环路 1000 号",
    remark: null,
    status: "shipped",
    tracking_number: "SF1234567890",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    products: { id: "00000000-0000-0000-0000-000000000001", name: "giffgaff 英国手机卡", price: 8900, category: "英国手机卡" },
    profiles: { email: "wangwu@example.com", display_name: "王五" },
  },
  {
    id: "a1b2c3d4-0004-0000-0000-000000000004",
    user_id: "u4",
    quantity: 1,
    recipient_name: "赵六",
    recipient_phone: "13600136004",
    address: "浙江省杭州市西湖区文三路 478 号",
    remark: null,
    status: "completed",
    tracking_number: "SF9876543210",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    products: { id: "00000000-0000-0000-0000-000000000003", name: "giffgaff 英国手机卡（含 £10）", price: 11900, category: "英国手机卡" },
    profiles: { email: "zhaoliu@example.com", display_name: "赵六" },
  },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending:   { label: "待处理", color: "text-amber-400",  bg: "bg-amber-500/15 border border-amber-500/30",  icon: <Clock className="w-3 h-3" /> },
  shipped:   { label: "已发货", color: "text-blue-400",   bg: "bg-blue-500/15 border border-blue-500/30",   icon: <Truck className="w-3 h-3" /> },
  completed: { label: "已完成", color: "text-green-400",  bg: "bg-green-500/15 border border-green-500/30",  icon: <CheckCircle className="w-3 h-3" /> },
  cancelled: { label: "已取消", color: "text-red-400",    bg: "bg-red-500/15 border border-red-500/30",    icon: <XCircle className="w-3 h-3" /> },
};

const FILTERS = [
  { key: "all",       label: "全部" },
  { key: "pending",   label: "待处理" },
  { key: "shipped",   label: "已发货" },
  { key: "completed", label: "已完成" },
  { key: "cancelled", label: "已取消" },
];

/* ── 发货弹窗 ── */
function ShipModal({ order, onClose, onConfirm }: {
  order: Order;
  onClose: () => void;
  onConfirm: (tracking: string) => Promise<void>;
}) {
  const [tracking, setTracking] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!tracking.trim()) return;
    setLoading(true);
    await onConfirm(tracking.trim());
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-semibold text-base">填写快递单号</h3>
            <p className="text-gray-500 text-xs mt-0.5">填写后订单状态自动更新为已发货</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 订单信息 */}
        <div className="rounded-xl bg-[#0d0d0d] border border-[#1a1a1a] p-4 mb-5 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">商品</span>
            <span className="text-white">{order.products?.name || "-"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">收货人</span>
            <span className="text-white">{order.recipient_name} · {order.recipient_phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">地址</span>
            <span className="text-white text-right max-w-[240px] text-xs leading-relaxed">{order.address}</span>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <label className="text-sm text-gray-400">快递单号</label>
          <Input
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="请输入快递单号"
            className="font-mono"
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
            autoFocus
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>取消</Button>
          <Button
            className="flex-1 gap-2 bg-blue-600 hover:bg-blue-500 text-white"
            disabled={!tracking.trim() || loading}
            onClick={handleConfirm}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
            确认发货
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── 主组件 ── */
export function AdminOrderTable({ orders: dbOrders }: { orders: Order[] }) {
  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";
  const orders = dbOrders.length > 0 ? dbOrders : (isDev ? MOCK_ORDERS : []);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [shipTarget, setShipTarget] = useState<Order | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      o.recipient_name.toLowerCase().includes(q) ||
      o.recipient_phone.includes(q) ||
      o.id.includes(q) ||
      (o.products?.name ?? "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  async function updateStatus(orderId: string, newStatus: OrderStatus, trackingNumber?: string) {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus, trackingNumber);
      router.refresh();
    } finally {
      setUpdating(null);
      setShipTarget(null);
    }
  }

  return (
    <>
      {shipTarget && (
        <ShipModal
          order={shipTarget}
          onClose={() => setShipTarget(null)}
          onConfirm={(tracking) => updateStatus(shipTarget.id, "shipped", tracking)}
        />
      )}

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "全部订单", count: counts.all, icon: Package, color: "text-gray-400", bg: "bg-[#1a1a1a]" },
          { label: "待处理", count: counts.pending, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "已发货", count: counts.shipped, icon: Truck, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "已完成", count: counts.completed, icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
        ].map(({ label, count, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-xl border border-[#2a2a2a] ${bg} p-4 flex items-center gap-3`}>
            <div className={`w-9 h-9 rounded-lg bg-[#111111] flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{count}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 搜索 + 过滤 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索姓名 / 手机号 / 订单号"
            className="pl-8 h-8 text-xs bg-[#111111] border-[#2a2a2a]"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                statusFilter === key
                  ? "bg-blue-600 text-white"
                  : "bg-[#1a1a1a] text-slate-400 hover:text-white border border-[#2a2a2a]"
              }`}
            >
              {label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === key ? "bg-blue-500/40" : "bg-[#2a2a2a]"}`}>
                {counts[key as keyof typeof counts]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 表格 */}
      <div className="rounded-xl border border-[#2a2a2a] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-[#2a2a2a] bg-[#0d0d0d]">
            <tr>
              {["订单号", "商品", "金额", "收货人", "地址", "状态", "下单时间", "主操作", "取消"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center">
                  <Package className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">暂无订单</p>
                </td>
              </tr>
            ) : (
              filtered.map((order) => {
                const sc = STATUS_CONFIG[order.status];
                const isUpdating = updating === order.id;
                return (
                  <tr key={order.id} className="border-b border-[#1a1a1a] hover:bg-[#0f0f0f] transition-colors last:border-0">
                    {/* 订单号 */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-mono text-gray-400">{order.id.slice(0, 8)}…</p>
                      {order.profiles?.email && (
                        <p className="text-[10px] text-gray-600 mt-0.5 truncate max-w-[100px]">{order.profiles.email}</p>
                      )}
                    </td>

                    {/* 商品 */}
                    <td className="px-4 py-3 min-w-[140px]">
                      <p className="text-white text-xs font-medium">{order.products?.name || "-"}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5">{order.products?.category} × {order.quantity}</p>
                    </td>

                    {/* 金额 */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-white font-semibold text-sm">
                        {order.products?.price ? formatPrice(order.products.price * order.quantity) : "-"}
                      </p>
                    </td>

                    {/* 收货人 */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-white text-sm">{order.recipient_name}</p>
                      <p className="text-gray-500 text-xs">{order.recipient_phone}</p>
                    </td>

                    {/* 地址 */}
                    <td className="px-4 py-3 max-w-[180px]">
                      <p className="text-gray-300 text-xs leading-relaxed line-clamp-2" title={order.address}>
                        {order.address}
                      </p>
                      {order.remark && (
                        <p className="text-amber-500/70 text-[10px] mt-0.5">备注: {order.remark}</p>
                      )}
                    </td>

                    {/* 状态 */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.color}`}>
                        {sc.icon}
                        {sc.label}
                      </span>
                      {order.tracking_number && (
                        <p className="text-[10px] font-mono text-gray-500 mt-1">{order.tracking_number}</p>
                      )}
                    </td>

                    {/* 时间 */}
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                      {formatDate(order.created_at)}
                    </td>

                    {/* 主操作列 */}
                    <td className="px-4 py-3 w-[110px]">
                      {isUpdating ? (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      ) : order.status === "pending" ? (
                        <Button
                          size="sm"
                          className="h-7 w-full text-xs gap-1.5 bg-blue-600 hover:bg-blue-500 text-white border-0"
                          onClick={() => setShipTarget(order)}
                        >
                          <Truck className="w-3 h-3" />
                          发货
                        </Button>
                      ) : order.status === "shipped" ? (
                        <Button
                          size="sm"
                          className="h-7 w-full text-xs gap-1.5 bg-green-600 hover:bg-green-500 text-white border-0"
                          onClick={() => updateStatus(order.id, "completed")}
                        >
                          <Check className="w-3 h-3" />
                          确认完成
                        </Button>
                      ) : order.status === "completed" ? (
                        <span className="text-xs text-gray-600">已完成</span>
                      ) : (
                        <span className="text-xs text-gray-600">已取消</span>
                      )}
                    </td>

                    {/* 取消列 */}
                    <td className="px-4 py-3 w-[72px]">
                      {(order.status === "pending" || order.status === "shipped") && !isUpdating && (
                        <button
                          className="h-7 w-full text-xs rounded-md bg-red-500/15 hover:bg-red-500/30 text-red-400 transition-colors border border-red-500/30"
                          onClick={() => updateStatus(order.id, "cancelled")}
                        >
                          取消
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {isDev && dbOrders.length === 0 && (
        <p className="text-center text-xs text-gray-600 mt-3">
          当前显示 Mock 数据（仅开发环境可见）
        </p>
      )}
    </>
  );
}
