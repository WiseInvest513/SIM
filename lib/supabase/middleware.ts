import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Middleware 中使用的 Supabase 客户端
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createServerClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 刷新用户 session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 受保护路由：需要登录
  const protectedRoutes = ["/account", "/account/orders"];
  // 管理员路由：需要 admin 角色
  const adminRoutes = ["/admin", "/admin/products"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  const isDev = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";

  if ((isProtectedRoute || isAdminRoute) && !user && !isDev) {
    // 未登录，重定向到登录页（开发环境跳过）
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && user && !isDev) {
    // 检查 admin 角色（开发环境跳过）
    const role = user.user_metadata?.role;
    if (role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
