"use server";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({ id: z.string().optional(), name: z.string().min(2), slug: z.string().regex(/^[a-z0-9-]+$/), description: z.string().min(10), price: z.number().int().min(1), stock: z.number().int().min(0), category: z.string().min(1), image_url: z.string().url().nullable() });
async function requireAdmin() { const session = await auth(); if (!session?.user?.isAdmin) throw new Error("Unauthorized"); }

export async function saveProduct(input: z.infer<typeof productSchema>) {
  await requireAdmin();
  const data = productSchema.parse(input);
  const supabase = createAdminClient();
  const payload = { name: data.name, slug: data.slug, description: data.description, price: data.price, stock: data.stock, category: data.category, image_url: data.image_url };
  const result = data.id ? await supabase.from("products").update(payload).eq("id", data.id) : await supabase.from("products").insert({ ...payload, is_active: true });
  if (result.error) throw new Error(result.error.message);
  revalidatePath("/admin/products");
}
export async function setProductActive(id: string, isActive: boolean) { await requireAdmin(); const { error } = await createAdminClient().from("products").update({ is_active: isActive }).eq("id", id); if (error) throw new Error(error.message); revalidatePath("/admin/products"); }
export async function removeProduct(id: string) { await requireAdmin(); const { error } = await createAdminClient().from("products").delete().eq("id", id); if (error) throw new Error(error.message); revalidatePath("/admin/products"); }
