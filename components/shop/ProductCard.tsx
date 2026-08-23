import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { PROMOTION_ORIGINAL_PRICE, PROMOTION_REGULAR_PRICE } from "@/lib/products";
import { PromotionCountdown } from "@/components/shop/PromotionCountdown";
import type { Product } from "@/lib/supabase/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;
  const isEconomy = product.slug === "giffgaff";

  return (
    <div className={`rounded-xl border overflow-hidden card-hover group relative transition-all duration-300 hover:-translate-y-2 ${
      isEconomy
        ? "border-orange-500/45 bg-gradient-to-br from-orange-500/[0.07] via-slate-800/60 to-red-500/[0.06] shadow-md shadow-orange-950/20 hover:border-orange-400/70 hover:shadow-lg hover:shadow-orange-500/10"
        : "border-slate-700/60 bg-slate-800/50 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50"
    }`}>
      {/* 标签 */}
      {isEconomy && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-orange-300/40 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
          <span>🔥</span>
          <span>限时 ¥59</span>
        </div>
      )}

      {/* 商品图片 */}
      <div className="relative h-48 bg-gradient-to-br from-slate-700/50 to-slate-800 flex items-center justify-center">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Package className="w-12 h-12" />
            <span className="text-xs">{product.category}</span>
          </div>
        )}

        {/* 缺货标签 */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              暂时缺货
            </Badge>
          </div>
        )}
      </div>

      {/* 商品信息 */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white text-base group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <Badge variant="default" className="ml-2 flex-shrink-0 text-xs">
            {product.category}
          </Badge>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* 限时活动 */}
        {isEconomy && (
          <div className="mb-4 rounded-xl border border-orange-500/25 bg-gradient-to-r from-orange-500/12 to-red-500/10 p-3 transition-all duration-300 group-hover:border-orange-400/40">
            <PromotionCountdown compact />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            {isEconomy && (
              <div className="mb-1 flex items-center gap-2 text-xs text-slate-400">
                <span className="line-through">原价 {formatPrice(PROMOTION_ORIGINAL_PRICE)}</span>
                <span className="line-through">日常价 {formatPrice(PROMOTION_REGULAR_PRICE)}</span>
              </div>
            )}
            <span className="text-3xl font-bold tracking-tight text-orange-300">
              {formatPrice(product.price)}
            </span>
            <span className="ml-1 rounded bg-red-500/20 px-1.5 py-0.5 text-xs font-bold text-red-300">活动价</span>
          </div>

          <Link href={`/shop/${product.slug}`}>
            <Button
              size="sm"
              disabled={isOutOfStock}
              className="gap-1.5 bg-orange-500 px-4 font-semibold text-white shadow-md shadow-orange-500/15 hover:bg-orange-400"
            >
              {isOutOfStock ? (
                "缺货中"
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  立即购买
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </Button>
          </Link>
        </div>

        {/* 库存提示 */}
        {product.stock > 0 && product.stock <= 10 && (
          <p className="text-yellow-400 text-xs mt-2.5">
            ⚠️ 仅剩 {product.stock} 件，请尽快下单
          </p>
        )}
      </div>
    </div>
  );
});
