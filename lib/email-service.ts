import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "./email-config";
import { renderEmailTemplate } from "./email-templates";

interface EmailTemplateData {
  [key: string]: string | number | boolean;
}

interface SendEmailOptions {
  to: string;
  templateType: string;
  data: EmailTemplateData;
  cc?: string;
  bcc?: string;
}

// 创建邮件传输器
const createTransporter = () => {
  return nodemailer.createTransport({
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
  });
};

/**
 * 发送邮件
 */
export async function sendEmail({
  to,
  templateType,
  data,
  cc,
  bcc,
}: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // 验证配置
    if (!EMAIL_CONFIG.SMTP_PASS) {
      throw new Error("SMTP 配置不完整：缺少 SMTP_PASS");
    }

    // 渲染邮件模板
    const emailContent = renderEmailTemplate(templateType, data);
    if (!emailContent) {
      throw new Error(`未找到邮件模板：${templateType}`);
    }

    // 创建传输器
    const transporter = createTransporter();

    // 发送邮件
    const info = await transporter.sendMail({
      from: `${EMAIL_CONFIG.SENDER_NAME} <${EMAIL_CONFIG.SENDER_EMAIL}>`,
      to,
      cc,
      bcc,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    // 关闭连接
    transporter.close();

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[邮件发送失败] ${errorMessage}`);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * 批量发送邮件
 */
export async function sendBatchEmails(
  recipients: string[],
  templateType: string,
  data: EmailTemplateData
): Promise<{ success: number; failed: number; errors: string[] }> {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const email of recipients) {
    const result = await sendEmail({
      to: email,
      templateType,
      data,
    });

    if (result.success) {
      results.success++;
    } else {
      results.failed++;
      results.errors.push(`${email}: ${result.error}`);
    }
  }

  return results;
}

/**
 * 发送注册确认邮件
 */
export async function sendSignupConfirmEmail(
  email: string,
  userName: string,
  confirmUrl: string
) {
  return sendEmail({
    to: email,
    templateType: "signupConfirm",
    data: {
      userName,
      confirmUrl,
      websiteUrl: process.env.WEBSITE_URL || "https://wise-sim.com",
      supportUrl: process.env.SUPPORT_URL || "https://wise-sim.com/support",
    },
  });
}

/**
 * 发送订单确认邮件
 */
export async function sendOrderConfirmEmail(
  email: string,
  orderData: {
    userName: string;
    orderId: string;
    productName: string;
    price: number;
    total: number;
    estimatedDelivery: string;
    orderUrl: string;
  }
) {
  return sendEmail({
    to: email,
    templateType: "orderConfirm",
    data: {
      ...orderData,
      websiteUrl: process.env.WEBSITE_URL || "https://wise-sim.com",
      supportUrl: process.env.SUPPORT_URL || "https://wise-sim.com/support",
    },
  });
}

/**
 * 发送发货通知邮件
 */
export async function sendShipmentNoticeEmail(
  email: string,
  shipmentData: {
    userName: string;
    orderId: string;
    courier: string;
    trackingNumber: string;
    estimatedArrival: string;
    trackingUrl: string;
  }
) {
  return sendEmail({
    to: email,
    templateType: "shipmentNotice",
    data: {
      ...shipmentData,
      websiteUrl: process.env.WEBSITE_URL || "https://wise-sim.com",
      supportUrl: process.env.SUPPORT_URL || "https://wise-sim.com/support",
    },
  });
}

/**
 * 发送通用通知邮件
 */
export async function sendNotificationEmail(
  email: string,
  notificationData: {
    userName: string;
    title: string;
    content: string;
    subject: string;
    actionUrl?: string;
    actionText?: string;
  }
) {
  return sendEmail({
    to: email,
    templateType: "notification",
    data: {
      ...notificationData,
      websiteUrl: process.env.WEBSITE_URL || "https://wise-sim.com",
      supportUrl: process.env.SUPPORT_URL || "https://wise-sim.com/support",
    },
  });
}
