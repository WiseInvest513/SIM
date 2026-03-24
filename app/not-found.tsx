import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-blue-600/30 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">页面不存在</h1>
        <p className="text-slate-400 mb-8">你访问的页面不存在或已被移除</p>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    </div>
  );
}
