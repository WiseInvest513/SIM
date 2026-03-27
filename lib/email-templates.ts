// 邮件模板系统 - 支持自定义各种邮件样式

interface EmailTemplateData {
  [key: string]: string | number | boolean;
}

interface EmailTemplate {
  subject: string;
  html: (data: EmailTemplateData) => string;
}

// 邮件基础样式
const baseStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
`;

const containerStyle = `
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
`;

const headerStyle = `
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 30px;
  text-align: center;
`;

const bodyStyle = `
  padding: 40px 30px;
`;

const footerStyle = `
  background: #f9f9f9;
  border-top: 1px solid #e5e5e5;
  padding: 30px;
  text-align: center;
  font-size: 12px;
  color: #666;
`;

const buttonStyle = `
  display: inline-block;
  padding: 12px 30px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  margin: 20px 0;
`;

// 邮件模板库
export const emailTemplates: Record<string, EmailTemplate> = {
  // 注册确认邮件
  signupConfirm: {
    subject: "欢迎加入 WiseSIM - 请确认您的邮箱",
    html: (data: EmailTemplateData) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>注册确认</title>
        </head>
        <body style="${baseStyle} background: #f5f5f5; padding: 20px;">
          <div style="${containerStyle}">
            <!-- 头部 -->
            <div style="${headerStyle}">
              <h1 style="margin: 0; font-size: 28px;">✨ WiseSIM</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">英国虚拟号码服务</p>
            </div>

            <!-- 主内容 -->
            <div style="${bodyStyle}">
              <p style="margin: 0 0 20px 0; font-size: 16px;">
                您好 <strong>${data.userName || "用户"}</strong>，
              </p>

              <p style="margin: 0 0 20px 0;">
                感谢您注册 WiseSIM！请点击下方按钮确认您的邮箱地址，激活账户。
              </p>

              <div style="text-align: center;">
                <a href="${data.confirmUrl}" style="${buttonStyle}">
                  ✅ 确认邮箱
                </a>
              </div>

              <p style="margin: 20px 0; color: #666; font-size: 13px;">
                或复制以下链接到浏览器：<br>
                <code style="background: #f0f0f0; padding: 5px 8px; border-radius: 3px; word-break: break-all;">
                  ${data.confirmUrl}
                </code>
              </p>

              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

              <p style="margin: 0; color: #666; font-size: 13px;">
                此邮件有效期为 24 小时。如您没有请求此邮件，请忽略。
              </p>
            </div>

            <!-- 页脚 -->
            <div style="${footerStyle}">
              <p style="margin: 0 0 10px 0;">© 2026 WiseSIM. 保留所有权利。</p>
              <p style="margin: 0;">
                <a href="${data.websiteUrl}" style="color: #667eea; text-decoration: none;">官方网站</a> |
                <a href="${data.supportUrl}" style="color: #667eea; text-decoration: none;">联系我们</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  },

  // 订单确认邮件
  orderConfirm: {
    subject: "订单确认 - WiseSIM #${orderId}",
    html: (data: EmailTemplateData) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>订单确认</title>
        </head>
        <body style="${baseStyle} background: #f5f5f5; padding: 20px;">
          <div style="${containerStyle}">
            <!-- 头部 -->
            <div style="${headerStyle}">
              <h1 style="margin: 0; font-size: 28px;">🎉 订单已确认</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">订单号: #${data.orderId}</p>
            </div>

            <!-- 主内容 -->
            <div style="${bodyStyle}">
              <p style="margin: 0 0 20px 0;">
                您好 <strong>${data.userName}</strong>，
              </p>

              <p style="margin: 0 0 20px 0;">
                感谢您的订单！我们已收到您的购买请求，将尽快为您处理。
              </p>

              <!-- 订单详情 -->
              <div style="background: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h3 style="margin: 0 0 15px 0; color: #333;">📦 订单详情</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">
                      <strong>产品</strong>
                    </td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
                      ${data.productName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">
                      <strong>价格</strong>
                    </td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
                      ¥${data.price}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong>总计</strong>
                    </td>
                    <td style="padding: 8px 0; text-align: right; font-size: 16px; color: #667eea;">
                      <strong>¥${data.total}</strong>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center;">
                <a href="${data.orderUrl}" style="${buttonStyle}">
                  📋 查看订单
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

              <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">
                <strong>预计发货时间：</strong>${data.estimatedDelivery}
              </p>
              <p style="margin: 0; color: #666; font-size: 13px;">
                <strong>联系我们：</strong>有任何问题，请回复此邮件或访问我们的支持中心。
              </p>
            </div>

            <!-- 页脚 -->
            <div style="${footerStyle}">
              <p style="margin: 0 0 10px 0;">© 2026 WiseSIM. 保留所有权利。</p>
              <p style="margin: 0;">
                <a href="${data.websiteUrl}" style="color: #667eea; text-decoration: none;">官方网站</a> |
                <a href="${data.supportUrl}" style="color: #667eea; text-decoration: none;">联系我们</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  },

  // 发货通知邮件
  shipmentNotice: {
    subject: "您的订单已发货 - WiseSIM #${orderId}",
    html: (data: EmailTemplateData) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>发货通知</title>
        </head>
        <body style="${baseStyle} background: #f5f5f5; padding: 20px;">
          <div style="${containerStyle}">
            <!-- 头部 -->
            <div style="${headerStyle}">
              <h1 style="margin: 0; font-size: 28px;">🚚 您的订单已发货</h1>
            </div>

            <!-- 主内容 -->
            <div style="${bodyStyle}">
              <p style="margin: 0 0 20px 0;">
                您好 <strong>${data.userName}</strong>，
              </p>

              <p style="margin: 0 0 20px 0;">
                您的订单已由快递公司揽收，正在路上。请妥善保管，谢谢！
              </p>

              <!-- 物流信息 -->
              <div style="background: #f0f8ff; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="margin: 0 0 15px 0; color: #333;">📍 物流信息</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0;"><strong>快递公司</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${data.courier}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;"><strong>快递单号</strong></td>
                    <td style="padding: 8px 0; text-align: right;">
                      <code style="background: #fff; padding: 4px 8px; border-radius: 3px;">
                        ${data.trackingNumber}
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;"><strong>预计到达</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${data.estimatedArrival}</td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center;">
                <a href="${data.trackingUrl}" style="${buttonStyle}">
                  🔍 追踪物流
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

              <p style="margin: 0; color: #666; font-size: 13px;">
                如有任何问题，请随时<a href="${data.supportUrl}" style="color: #667eea;">联系我们</a>。
              </p>
            </div>

            <!-- 页脚 -->
            <div style="${footerStyle}">
              <p style="margin: 0 0 10px 0;">© 2026 WiseSIM. 保留所有权利。</p>
              <p style="margin: 0;">
                <a href="${data.websiteUrl}" style="color: #667eea; text-decoration: none;">官方网站</a> |
                <a href="${data.supportUrl}" style="color: #667eea; text-decoration: none;">联系我们</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  },

  // 通用消息邮件
  notification: {
    subject: "${subject}",
    html: (data: EmailTemplateData) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>通知</title>
        </head>
        <body style="${baseStyle} background: #f5f5f5; padding: 20px;">
          <div style="${containerStyle}">
            <!-- 头部 -->
            <div style="${headerStyle}">
              <h1 style="margin: 0; font-size: 28px;">📬 ${data.title}</h1>
            </div>

            <!-- 主内容 -->
            <div style="${bodyStyle}">
              <p style="margin: 0 0 20px 0;">
                您好 <strong>${data.userName}</strong>，
              </p>

              <div style="margin: 20px 0;">
                ${data.content}
              </div>

              ${data.actionUrl ? `
                <div style="text-align: center;">
                  <a href="${data.actionUrl}" style="${buttonStyle}">
                    ${data.actionText || "点击查看"}
                  </a>
                </div>
              ` : ""}

              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

              <p style="margin: 0; color: #666; font-size: 13px;">
                如有任何问题，请随时<a href="${data.supportUrl}" style="color: #667eea;">联系我们</a>。
              </p>
            </div>

            <!-- 页脚 -->
            <div style="${footerStyle}">
              <p style="margin: 0 0 10px 0;">© 2026 WiseSIM. 保留所有权利。</p>
              <p style="margin: 0;">
                <a href="${data.websiteUrl}" style="color: #667eea; text-decoration: none;">官方网站</a> |
                <a href="${data.supportUrl}" style="color: #667eea; text-decoration: none;">联系我们</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
};

// 获取邮件模板
export function getEmailTemplate(type: string): EmailTemplate | null {
  return emailTemplates[type] || null;
}

// 渲染邮件 HTML
export function renderEmailTemplate(
  type: string,
  data: EmailTemplateData
): { subject: string; html: string } | null {
  const template = getEmailTemplate(type);
  if (!template) return null;

  // 替换 subject 中的变量
  let subject = template.subject;
  Object.entries(data).forEach(([key, value]) => {
    subject = subject.replace(`\${${key}}`, String(value));
  });

  return {
    subject,
    html: template.html(data),
  };
}
