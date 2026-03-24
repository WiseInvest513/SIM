import { createClient } from "@supabase/supabase-js";

// 服务端管理员 Supabase 实例（使用 service_role key，绕过 RLS）
// 仅在服务端使用，绝不暴露给客户端
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
