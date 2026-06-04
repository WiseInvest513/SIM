"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit2, Trash2, Loader2, Package, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/supabase/types";

// 商品表单 Schema
const productSchema = z.object({
  name: z.string().min(2, "商品名称至少 2 个字符"),
  slug: z.string().min(2, "Slug 至少 2 个字符").regex(/^[a-z0-9-]+$/, "Slug 只能包含小写字母、数字和连字符"),
  description: z.string().min(10, "描述至少 10 个字符"),
  price: z.number().min(1, "价格不能为 0").max(100000, "价格异常"),
  stock: z.number().min(0, "库存不能为负数"),
  category: z.string().min(1, "请填写分类"),
  image_url: z.string().url("请输入有效的图片 URL").optional().or(z.literal("")),
});

type ProductForm = z.infer<typeof productSchema>;

interface AdminProductManagerProps {
  products: Product[];
}

// 编辑/创建表单
function ProductFormModal({
  product,
  onClose,
}: {
  product?: Product | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price / 100,
          stock: product.stock,
          category: product.category,
          image_url: product.image_url || "",
        }
      : {
          stock: 100,
          category: "手机卡",
          price: 89,
        },
  });

  async function onSubmit(data: ProductForm) {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    // 价格以分存储
    const priceInCents = Math.round(data.price * 100);

    try {
      if (product) {
        // 更新
        const { error } = await supabase
          .from("products")
          .update({
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: priceInCents,
            stock: data.stock,
            category: data.category,
            image_url: data.image_url || null,
          })
          .eq("id", product.id);
        if (error) throw error;
      } else {
        // 创建
        const { error } = await supabase.from("products").insert({
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: priceInCents,
          stock: data.stock,
          category: data.category,
          image_url: data.image_url || null,
          is_active: true,
        });
        if (error) throw error;
      }

      router.refresh();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "操作失败";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">
            {product ? "编辑商品" : "新增商品"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>商品名称</Label>
              <Input placeholder="giffgaff 英国手机卡" {...register("name")} />
              {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Slug（URL 标识）</Label>
              <Input placeholder="giffgaff" {...register("slug")} />
              {errors.slug && <p className="text-red-400 text-xs">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>商品描述</Label>
            <Textarea
              placeholder="请填写商品详细描述..."
              rows={4}
              {...register("description")}
            />
            {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>价格（元）</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="89.00"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && <p className="text-red-400 text-xs">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>库存</Label>
              <Input
                type="number"
                placeholder="100"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && <p className="text-red-400 text-xs">{errors.stock.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>分类</Label>
              <Input placeholder="手机卡" {...register("category")} />
              {errors.category && <p className="text-red-400 text-xs">{errors.category.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>商品图片 URL（选填）</Label>
            <Input
              placeholder="https://..."
              {...register("image_url")}
            />
            {errors.image_url && <p className="text-red-400 text-xs">{errors.image_url.message}</p>}
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              取消
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> 保存中...</>
              ) : (
                "保存"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminProductManager({ products }: AdminProductManagerProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function toggleActive(product: Product) {
    const supabase = createClient();
    await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);
    router.refresh();
  }

  async function deleteProduct(id: string) {
    if (!confirm("确定要删除该商品吗？删除后不可恢复。")) return;
    setDeleting(id);
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", id);
    router.refresh();
    setDeleting(null);
  }

  return (
    <>
      {/* 操作栏 */}
      <div className="flex justify-end mb-4">
        <Button
          className="gap-2"
          onClick={() => {
            setEditProduct(null);
            setShowForm(true);
          }}
        >
          <Plus className="w-4 h-4" />
          新增商品
        </Button>
      </div>

      {/* 商品表格 */}
      <div className="rounded-xl border border-slate-700/60 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-700 bg-slate-900/50">
            <tr>
              {["商品", "分类", "价格", "库存", "状态", "操作"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <Package className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">暂无商品</p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{product.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{product.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-white">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock === 0 ? "text-red-400" : product.stock <= 10 ? "text-yellow-400" : "text-white"}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(product)}
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                        product.is_active
                          ? "bg-green-400/10 text-green-400 hover:bg-green-400/20"
                          : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                      }`}
                    >
                      {product.is_active ? (
                        <><Eye className="w-3 h-3" /> 已上架</>
                      ) : (
                        <><EyeOff className="w-3 h-3" /> 已下架</>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditProduct(product);
                          setShowForm(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        disabled={deleting === product.id}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                      >
                        {deleting === product.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 表单弹窗 */}
      {showForm && (
        <ProductFormModal
          product={editProduct}
          onClose={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
        />
      )}
    </>
  );
}
