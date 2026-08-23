"use client";

import { useEffect, useState } from "react";
import { Clock3, Flame } from "lucide-react";
import { PROMOTION_END, PROMOTION_END_LABEL } from "@/lib/products";

function getRemaining() {
  const distance = Math.max(0, new Date(PROMOTION_END).getTime() - Date.now());
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance % 86_400_000) / 3_600_000);
  const minutes = Math.floor((distance % 3_600_000) / 60_000);
  const seconds = Math.floor((distance % 60_000) / 1_000);
  return { distance, days, hours, minutes, seconds };
}

export function PromotionCountdown({ compact = false }: { compact?: boolean }) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (remaining?.distance === 0) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
        <Clock3 className="h-4 w-4" /> 本期促销活动已结束
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-1.5" : "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-orange-300" />
        <span className={compact ? "text-xs font-semibold text-orange-200" : "text-sm font-semibold text-orange-100"}>
          限时促销 · {PROMOTION_END_LABEL} 截止
        </span>
      </div>
      <div className="flex items-center gap-1.5" aria-label="促销活动剩余时间">
        {remaining ? (
          <>
            {[
              [remaining.days, "天"],
              [remaining.hours, "时"],
              [remaining.minutes, "分"],
              [remaining.seconds, "秒"],
            ].map(([value, unit]) => (
              <span key={unit} className={compact ? "rounded-md border border-orange-300/25 bg-black/25 px-2 py-1 font-mono text-xs font-bold text-white" : "rounded-md border border-orange-300/20 bg-black/20 px-2 py-1 font-mono text-xs font-bold text-white"}>
                {String(value).padStart(2, "0")}<span className="ml-0.5 font-sans font-normal text-yellow-100/80">{unit}</span>
              </span>
            ))}
          </>
        ) : (
          <span className="text-xs text-orange-200/70">正在计算剩余时间…</span>
        )}
      </div>
    </div>
  );
}
