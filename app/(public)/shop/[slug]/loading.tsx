export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/60 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        {/* 返回按钮骨架 */}
        <div className="h-4 w-16 bg-[#1a1a1a] rounded mb-8 animate-pulse" />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* 左侧：商品详情 */}
          <div className="lg:col-span-3 space-y-4">
            {/* 图片占位 */}
            <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] h-56 animate-pulse" />

            {/* 标题 */}
            <div className="space-y-2">
              <div className="h-6 w-20 bg-[#2a2a2a] rounded animate-pulse" />
              <div className="h-8 w-full bg-[#2a2a2a] rounded animate-pulse" />
              <div className="h-10 w-32 bg-[#2a2a2a] rounded animate-pulse" />
            </div>

            {/* 介绍部分 */}
            <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-5 space-y-3">
              <div className="h-4 w-16 bg-[#2a2a2a] rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-[#2a2a2a] rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-[#2a2a2a] rounded animate-pulse" />
              </div>
            </div>

            {/* 场景部分 */}
            <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-5 space-y-3">
              <div className="h-4 w-16 bg-[#2a2a2a] rounded animate-pulse" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-3 w-full bg-[#2a2a2a] rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：购买入口 */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 space-y-5">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-[#2a2a2a] rounded animate-pulse" />
                <div className="h-10 w-full bg-[#2a2a2a] rounded animate-pulse" />
                <div className="h-2 w-32 bg-[#2a2a2a] rounded animate-pulse" />
              </div>

              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-3 w-full bg-[#2a2a2a] rounded animate-pulse" />
                ))}
              </div>

              {/* 按钮 */}
              <div className="h-10 w-full bg-[#2a2a2a] rounded-lg animate-pulse" />

              <div className="h-2 w-full bg-[#2a2a2a] rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
