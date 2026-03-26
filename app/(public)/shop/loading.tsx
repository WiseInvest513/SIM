export default function ShopLoading() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-20 bg-[#1a1a1a] rounded-xl animate-pulse mb-10" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden">
              <div className="h-48 bg-[#2a2a2a] animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-[#2a2a2a] rounded animate-pulse" />
                <div className="h-3 bg-[#2a2a2a] rounded w-3/4 animate-pulse" />
                <div className="h-8 bg-[#2a2a2a] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
