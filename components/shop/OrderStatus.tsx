import { Package, Truck, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn, orderStatusMap } from "@/lib/utils";
import type { OrderStatus } from "@/lib/supabase/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

// 订单状态徽标
export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const { label, color } = orderStatusMap[status] || { label: status, color: "text-slate-400 bg-slate-400/10" };

  const icons = {
    pending: Clock,
    shipped: Truck,
    completed: CheckCircle2,
    cancelled: XCircle,
  };

  const Icon = icons[status] || Clock;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        color,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

// 订单状态时间轴
const statusSteps = [
  { status: "pending", label: "待处理", icon: Package },
  { status: "shipped", label: "已发货", icon: Truck },
  { status: "completed", label: "已完成", icon: CheckCircle2 },
];

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
}

export function OrderStatusTimeline({ currentStatus }: OrderStatusTimelineProps) {
  if (currentStatus === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-red-400">
        <XCircle className="w-5 h-5" />
        <span className="text-sm">订单已取消</span>
      </div>
    );
  }

  const currentIndex = statusSteps.findIndex((s) => s.status === currentStatus);

  return (
    <div className="flex items-center gap-0">
      {statusSteps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.status} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                  isCompleted
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-600 text-slate-500",
                  isCurrent && "ring-2 ring-blue-500/30 ring-offset-2 ring-offset-slate-900"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={cn(
                  "text-xs mt-1.5 whitespace-nowrap",
                  isCompleted ? "text-blue-400" : "text-slate-500"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* 连接线 */}
            {index < statusSteps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-16 mx-1 mb-5 transition-colors",
                  index < currentIndex ? "bg-blue-600" : "bg-slate-700"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
