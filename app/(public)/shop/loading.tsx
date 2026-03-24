export default function ShopLoading() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-20 bg-slate-800/50 rounded-xl animate-pulse mb-10" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-700/60 bg-slate-800/50 overflow-hidden">
              <div className="h-48 bg-slate-700/50 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-700/50 rounded animate-pulse" />
                <div className="h-3 bg-slate-700/50 rounded w-3/4 animate-pulse" />
                <div className="h-8 bg-slate-700/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
