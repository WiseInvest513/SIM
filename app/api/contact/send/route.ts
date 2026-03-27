import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-service";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    // 验证必要字段
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: "缺少必要字段",
        },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    if (!body.email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          error: "邮箱格式不正确",
        },
        { status: 400 }
      );
    }

    // 发送邮件给管理员（你的邮箱）
    const adminResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || "noreply@wise-sim.com",
      templateType: "notification",
      data: {
        userName: "WiseSIM 管理员",
        title: `📧 新的用户联系`,
        subject: `来自 ${body.name} 的问题`,
        content: `
          <p><strong>用户信息：</strong></p>
          <p>名字: ${body.name}</p>
          <p>邮箱: ${body.email}</p>
          <hr style="border: none; border-top: 1px solid #3a3a3a; margin: 20px 0;">
          <p><strong>问题内容：</strong></p>
          <p>${body.message.replace(/\n/g, "<br>")}</p>
        `,
      },
    });

    // 发送确认邮件给用户
    const userResult = await sendEmail({
      to: body.email,
      templateType: "notification",
      data: {
        userName: body.name,
        title: "我已收到你的邮件",
        subject: "WiseSIM 客服回复确认",
        content: `
          <p>感谢你的联系！我已经收到你的问题：</p>
          <blockquote style="border-left: 3px solid #FFD700; padding-left: 15px; margin: 20px 0; color: #a0a0a0;">
            ${body.message.replace(/\n/g, "<br>")}
          </blockquote>
          <p>我会尽快回复你的邮件，请留意你的邮箱。</p>
        `,
      },
    });

    if (!adminResult.success || !userResult.success) {
      console.error("[邮件发送详细错误]", {
        adminResult,
        userResult,
        contactEmail: process.env.CONTACT_EMAIL,
      });
      return NextResponse.json(
        {
          success: false,
          error: "邮件发送失败",
          details: {
            adminError: adminResult.error,
            userError: userResult.error,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "邮件发送成功，我会尽快回复",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[联系邮件 API 错误]", errorMessage);
    console.error("[环境变量检查]", {
      hasSmtpPass: !!process.env.SMTP_PASS,
      contactEmail: process.env.CONTACT_EMAIL,
      senderEmail: process.env.SENDER_EMAIL,
    });

    return NextResponse.json(
      {
        success: false,
        error: "发送失败，请重试",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
