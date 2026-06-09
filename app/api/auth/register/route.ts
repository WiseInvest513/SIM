import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "请填写完整信息" }, { status: 400 });
    }

    // 邮箱格式校验：必须含 @ 且有合法域名部分
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "请输入有效的邮箱地址（需包含 @ 符号）" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "密码至少 8 位" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // 直接创建用户，跳过邮件确认流程
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // 绕过确认邮件，直接激活账户
      user_metadata: { role: "user" },
    });

    if (error) {
      if (
        error.message.includes("already registered") ||
        error.message.includes("already been registered") ||
        error.message.includes("User already registered")
      ) {
        return NextResponse.json({ error: "该邮箱已注册，请直接登录" }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "注册失败，请稍后重试" }, { status: 500 });
  }
}
