import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/supabase/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 overflow-hidden card-hover group">
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

        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            <span className="text-slate-500 text-xs ml-1">起</span>
          </div>

          <Link href={`/shop/${product.slug}`}>
            <Button
              size="sm"
              disabled={isOutOfStock}
              className="gap-1.5"
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
