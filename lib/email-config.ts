export const EMAIL_CONFIG = {
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "465"),
  SMTP_USER: process.env.SMTP_USER || "noreply@wisesim.com",
  SMTP_PASS: process.env.SMTP_PASS,
  SENDER_NAME: "WiseSIM 客服",
  SENDER_EMAIL: "noreply@wisesim.com",
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
      "2. 添加必要的 SMTP 环境变量",
      "3. 保存文件并重启开发服务器",
    ],
  },
  TROUBLESHOOTING: {
    title: "❌ 邮件发送失败",
    steps: [
      "1️⃣ 检查 .env.local 中的 SMTP_PASS 是否正确（去掉空格）",
      "2️⃣ 确保 Gmail 账户启用了两步验证",
      "3️⃣ 重新生成应用密码",
      "4️⃣ 确保应用密码复制正确，去掉所有空格",
      "5️⃣ 如果还不行，重启开发服务器",
    ],
  },
};
