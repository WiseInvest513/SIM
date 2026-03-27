export const EMAIL_CONFIG = {
  SMTP_HOST: process.env.SMTP_HOST || "smtp.sendgrid.net",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "465"),
  SMTP_USER: process.env.SMTP_USER || "apikey",
  SMTP_PASS: process.env.SMTP_PASS,
  SENDER_NAME: process.env.SENDER_NAME || "WiseSIM 客服",
  SENDER_EMAIL: process.env.SENDER_EMAIL || "noreply@wise-sim.com",
};

export const EMAIL_TEMPLATES = {
  TEST_SUBJECT: "✅ WiseSIM 邮件配置测试",
  TEST_HTML: (smtpHost: string, smtpPort: number) => `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; border-radius: 8px;">
      <h2 style="color: #0066cc;">✅ 邮件配置成功！</h2>
      <p>恭喜，你的邮件配置已正确！</p>
      <p style="color: #666;">
        主机: ${smtpHost}<br>
        端口: ${smtpPort}<br>
        发送时间: ${new Date().toLocaleString("zh-CN")}
      </p>
    </div>
  `,
};

export const VALIDATION_MESSAGES = {
  MISSING_CONFIG: {
    title: "❌ 缺少环境变量配置",
    steps: [
      "1. 打开 .env.local 文件",
      "2. 添加 SendGrid API Key：SMTP_PASS=你的SendGrid_API_Key",
      "3. 保存文件并重启开发服务器",
      "获取 API Key：https://app.sendgrid.com/settings/api_keys",
    ],
  },
  TROUBLESHOOTING: {
    title: "❌ 邮件发送失败",
    steps: [
      "1️⃣ 确保 SMTP_PASS 填写的是 SendGrid API Key（不是邮箱密码）",
      "2️⃣ 验证 API Key 是否有效和活跃状态",
      "3️⃣ 检查发件人邮箱是否已在 SendGrid 中验证",
      "4️⃣ 确保 API Key 复制完整，去掉多余空格",
      "5️⃣ 在 SendGrid 仪表板检查发送限制和配额",
      "6️⃣ 重启开发服务器重新连接",
    ],
  },
};
