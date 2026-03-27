import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-service";

interface SendEmailBody {
  to: string;
  templateType: string;
  data: Record<string, string | number | boolean>;
}

/**
 * POST /api/email/send
 * 发送邮件
 */
export async function POST(request: NextRequest) {
  try {
    const body: SendEmailBody = await request.json();

    // 验证必要参数
    if (!body.to || !body.templateType) {
      return NextResponse.json(
        {
          success: false,
          error: "缺少必要参数：to（收件人） 和 templateType（邮件类型）",
        },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    if (!body.to.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          error: "无效的邮箱地址",
        },
        { status: 400 }
      );
    }

    // 发送邮件
    const result = await sendEmail({
      to: body.to,
      templateType: body.templateType,
      data: body.data || {},
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "邮件发送成功",
        messageId: result.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[邮件 API 错误]", errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/send
 * 获取可用的邮件模板列表
 */
export async function GET() {
  const availableTemplates = [
    {
      type: "signupConfirm",
      name: "注册确认邮件",
      description: "用户注册时发送的确认邮件",
      requiredFields: ["userName", "confirmUrl"],
    },
    {
      type: "orderConfirm",
      name: "订单确认邮件",
      description: "订单创建时发送的确认邮件",
      requiredFields: [
        "userName",
        "orderId",
        "productName",
        "price",
        "total",
        "estimatedDelivery",
        "orderUrl",
      ],
    },
    {
      type: "shipmentNotice",
      name: "发货通知邮件",
      description: "订单发货时发送的通知邮件",
      requiredFields: [
        "userName",
        "orderId",
        "courier",
        "trackingNumber",
        "estimatedArrival",
        "trackingUrl",
      ],
    },
    {
      type: "notification",
      name: "通用通知邮件",
      description: "通用的通知邮件模板",
      requiredFields: ["userName", "title", "content", "subject"],
      optionalFields: ["actionUrl", "actionText"],
    },
  ];

  return NextResponse.json(
    {
      success: true,
      templates: availableTemplates,
      message: "使用 POST 请求发送邮件，在 body 中指定 to（收件人）、templateType（模板类型）和 data（数据）",
      example: {
        to: "user@example.com",
        templateType: "signupConfirm",
        data: {
          userName: "张三",
          confirmUrl: "https://your-website.com/confirm?token=xxx",
        },
      },
    },
    { status: 200 }
  );
}
