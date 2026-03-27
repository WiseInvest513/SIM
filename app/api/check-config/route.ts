import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    smtpHost: process.env.SMTP_HOST || "smtp.sendgrid.net",
    smtpPort: process.env.SMTP_PORT || "465",
    smtpUser: process.env.SMTP_USER || "apikey",
    hasSmtpPass: !!process.env.SMTP_PASS,
    smtpPassLength: process.env.SMTP_PASS?.length || 0,
    senderEmail: process.env.SENDER_EMAIL || "未配置",
    contactEmail: process.env.CONTACT_EMAIL || "未配置",
    nodeEnv: process.env.NODE_ENV,
  });
}
