import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { EMAIL_CONFIG, EMAIL_TEMPLATES, VALIDATION_MESSAGES } from "@/lib/email-config";

const TRANSPORTER_CONFIG = {
  host: EMAIL_CONFIG.SMTP_HOST,
  port: EMAIL_CONFIG.SMTP_PORT,
  secure: EMAIL_CONFIG.SMTP_PORT === 465,
  requireTLS: EMAIL_CONFIG.SMTP_PORT === 587,
  auth: {
    user: EMAIL_CONFIG.SMTP_USER,
    pass: EMAIL_CONFIG.SMTP_PASS,
  },
  connectionTimeout: 15000,
  socketTimeout: 15000,
  ...(process.env.NODE_ENV === "development" && {
    logger: true,
    debug: true,
  }),
};

export async function GET(request: Request) {
  try {
    // 验证必要配置
    if (!EMAIL_CONFIG.SMTP_PASS) {
      return NextResponse.json(
        {
          success: false,
          ...VALIDATION_MESSAGES.MISSING_CONFIG,
        },
        { status: 400 }
      );
    }

    // 创建 SMTP 传输
    const transporter = nodemailer.createTransport(TRANSPORTER_CONFIG);

    // 测试连接
    await transporter.verify();

    // 获取接收者邮箱（默认为发件人邮箱）
    const url = new URL(request.url);
    const recipientEmail = url.searchParams.get("email") || EMAIL_CONFIG.SENDER_EMAIL;

    // 发送测试邮件
    const info = await transporter.sendMail({
      from: `${EMAIL_CONFIG.SENDER_NAME} <${EMAIL_CONFIG.SENDER_EMAIL}>`,
      to: recipientEmail,
      subject: EMAIL_TEMPLATES.TEST_SUBJECT,
      html: EMAIL_TEMPLATES.TEST_HTML(EMAIL_CONFIG.SMTP_HOST, EMAIL_CONFIG.SMTP_PORT),
    });

    return NextResponse.json(
      {
        success: true,
        message: "✅ 邮件测试成功！",
        messageId: info.messageId,
        details: `邮件已发送到 ${recipientEmail}，请检查邮箱（包括垃圾箱）`,
        provider: "SendGrid",
        config: {
          host: EMAIL_CONFIG.SMTP_HOST,
          port: EMAIL_CONFIG.SMTP_PORT,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "";

    return NextResponse.json(
      {
        success: false,
        ...VALIDATION_MESSAGES.TROUBLESHOOTING,
        error: errorMessage,
        debug: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}
