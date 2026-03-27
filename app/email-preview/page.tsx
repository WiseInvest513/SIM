"use client";

export default function EmailPreview() {
  const emailHTML = `<!DOCTYPE html>
<html style="width: 100%; height: 100%; margin: 0; padding: 0;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border: 1px solid #3a3a3a; border-radius: 16px; overflow: hidden;">
          <!-- Hero Section -->
          <tr>
            <td style="background: #0f0f0f; border-bottom: 1px solid #3a3a3a; padding: 60px 40px; text-align: center; position: relative;">
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; letter-spacing: 2px; font-weight: 500;">
                确认邮箱地址
              </p>
              <h1 style="margin: 0 0 15px 0; font-size: 48px; font-weight: 700; letter-spacing: -1px; color: #ffffff;">
                欢迎加入 <span style="color: #FFD700;">WiseSIM</span>
              </h1>
              <p style="margin: 0; font-size: 16px; color: #a0a0a0; max-width: 500px; margin-left: auto; margin-right: auto;">
                感谢您的注册，请确认您的邮箱地址以激活账户
              </p>
            </td>
          </tr>

          <!-- 主内容区 -->
          <tr>
            <td style="background: #1a1a1a; padding: 60px 40px; text-align: center;">
              <!-- 装饰线 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 40px 0;">
                <tr>
                  <td style="height: 1px; background: linear-gradient(90deg, transparent, #e5e5e5, transparent);"></td>
                </tr>
              </table>

              <!-- 按钮 -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 40px auto; border-collapse: collapse;">
                <tr>
                  <td style="background: #ffffff; border-radius: 12px; padding: 16px 48px; text-align: center;">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; color: #0a0a0a; text-decoration: none; font-weight: 600; font-size: 15px;">
                      ✅ 确认邮箱地址
                    </a>
                  </td>
                </tr>
              </table>

              <!-- 链接复制 -->
              <p style="margin: 40px 0 0 0; font-size: 14px; color: #a0a0a0;">
                或复制链接到浏览器：
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 15px 0 0 0; border-collapse: collapse;">
                <tr>
                  <td style="background: #111111; border: 1px solid #3a3a3a; padding: 12px 16px; border-radius: 8px; font-size: 12px; color: #e5e5e5; font-family: monospace; word-break: break-all;">
                    {{ .ConfirmationURL }}
                  </td>
                </tr>
              </table>

              <!-- 优势展示 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 50px 0 0 0; padding-top: 40px; border-top: 1px solid #3a3a3a; border-collapse: collapse;">
                <tr>
                  <td colspan="3" style="padding: 0 0 25px 0; font-size: 14px; color: #a0a0a0; text-align: center;">
                    为什么选择 WiseSIM？
                  </td>
                </tr>
                <tr>
                  <td style="width: 33%; padding: 0 10px; text-align: center; vertical-align: top;">
                    <p style="font-size: 24px; margin: 0 0 8px 0;">💰</p>
                    <p style="font-size: 13px; color: #e5e5e5; margin: 0 0 5px 0; font-weight: 600;">价格便宜</p>
                    <p style="font-size: 12px; color: #888888; margin: 0;">官方直购，无中间商</p>
                  </td>
                  <td style="width: 33%; padding: 0 10px; text-align: center; vertical-align: top;">
                    <p style="font-size: 24px; margin: 0 0 8px 0;">⚡</p>
                    <p style="font-size: 13px; color: #e5e5e5; margin: 0 0 5px 0; font-weight: 600;">发货极快</p>
                    <p style="font-size: 12px; color: #888888; margin: 0;">1-3 天送达</p>
                  </td>
                  <td style="width: 33%; padding: 0 10px; text-align: center; vertical-align: top;">
                    <p style="font-size: 24px; margin: 0 0 8px 0;">😊</p>
                    <p style="font-size: 13px; color: #e5e5e5; margin: 0 0 5px 0; font-weight: 600;">易用好用</p>
                    <p style="font-size: 12px; color: #888888; margin: 0;">详细教程陪同</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 页脚 -->
          <tr>
            <td style="background: #0f0f0f; border-top: 1px solid #3a3a3a; padding: 40px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #c0c0c0; font-weight: 500;">
                © 2026 WiseSIM · 英国虚拟号码服务
              </p>
              <p style="margin: 0; font-size: 12px; color: #888888;">
                此确认链接有效期为 24 小时
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white">邮件样式预览</h1>
        <p className="text-gray-400 mb-8">100% 还原实际邮件效果 - 所有样式都是 inline，任何邮件客户端都兼容</p>

        {/* 邮件预览容器 */}
        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#2a2a2a] mb-10">
          <iframe
            srcDoc={emailHTML}
            style={{
              width: "100%",
              height: "900px",
              border: "none",
              background: "#1a1a1a",
            }}
            title="邮件预览"
          />
        </div>

        {/* 使用说明 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">📋 使用步骤</h3>
            <ol className="space-y-3 text-gray-400 text-sm">
              <li>
                <span className="text-white font-semibold">1.</span> 复制下面的 HTML 代码
              </li>
              <li>
                <span className="text-white font-semibold">2.</span> 登录 Supabase 后台
              </li>
              <li>
                <span className="text-white font-semibold">3.</span> 进入 Authentication → Emails
              </li>
              <li>
                <span className="text-white font-semibold">4.</span> 选择 "Confirm sign up"
              </li>
              <li>
                <span className="text-white font-semibold">5.</span> 将代码粘贴到 Body 中
              </li>
              <li>
                <span className="text-white font-semibold">6.</span> 点击 Save changes
              </li>
            </ol>
          </div>

          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">✅ 代码说明</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                ✓ <strong>纯 HTML</strong> - 无外部 CSS，所有样式都 inline
              </li>
              <li>
                ✓ <strong>Table 布局</strong> - 所有邮件客户端兼容
              </li>
              <li>
                ✓ <strong>自动变量替换</strong>
                <br />
                <code className="bg-[#1a1a1a] text-white px-2 py-1 rounded text-xs">
                  {`{{ .ConfirmationURL }}`}
                </code>
              </li>
              <li>
                ✓ <strong>响应式设计</strong> - 手机、电脑都好看
              </li>
            </ul>
          </div>
        </div>

        {/* HTML 代码 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">📝 完整 HTML 代码（复制到 Supabase Body）</h3>
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <div className="bg-[#0a0a0a] border-b border-[#2a2a2a] px-6 py-3 flex justify-between items-center">
              <span className="text-gray-400 text-sm">HTML</span>
              <button
                onClick={() => {
                  // 只复制 body 内容部分
                  const bodyContent = emailHTML
                    .split("<body")[1]
                    .split("</body>")[0]
                    .replace(/^[^>]*>/, ""); // 移除 <body> 标签

                  navigator.clipboard.writeText(bodyContent);
                  alert("✅ 已复制到剪贴板！");
                }}
                className="px-3 py-1.5 bg-white text-black text-sm font-medium rounded hover:bg-gray-100 transition-colors"
              >
                复制代码
              </button>
            </div>
            <pre
              style={{
                color: "#f5f5f5",
                padding: "24px",
                margin: 0,
                overflow: "auto",
                fontSize: "12px",
                lineHeight: "1.5",
                background: "#111111",
              }}
            >
{`<!-- Hero Section -->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border: 1px solid #3a3a3a; border-radius: 16px;">
  <tr>
    <td style="background: #0f0f0f; border-bottom: 1px solid #3a3a3a; padding: 60px 40px; text-align: center;">
      <p style="margin: 0 0 20px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; letter-spacing: 2px;">确认邮箱地址</p>
      <h1 style="margin: 0 0 15px 0; font-size: 48px; font-weight: 700; color: #ffffff;">欢迎加入 <span style="color: #FFD700;">WiseSIM</span></h1>
      <p style="margin: 0; font-size: 16px; color: #a0a0a0;">感谢您的注册，请确认您的邮箱地址以激活账户</p>
    </td>
  </tr>

  <!-- 主内容 -->
  <tr>
    <td style="background: #1a1a1a; padding: 60px 40px; text-align: center;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 40px auto;">
        <tr>
          <td style="background: #ffffff; border-radius: 12px; padding: 16px 48px;">
            <a href="{{ .ConfirmationURL }}" style="color: #0a0a0a; text-decoration: none; font-weight: 600;">✅ 确认邮箱地址</a>
          </td>
        </tr>
      </table>

      <p style="margin: 40px 0 0 0; font-size: 14px; color: #a0a0a0;">或复制链接：</p>
      <code style="display: block; background: #111111; border: 1px solid #3a3a3a; padding: 12px 16px; border-radius: 8px; margin: 15px 0; font-size: 12px; color: #e5e5e5; word-break: break-all;">{{ .ConfirmationURL }}</code>

      <!-- 优势展示 -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 50px 0 0 0; padding-top: 40px; border-top: 1px solid #3a3a3a;">
        <tr>
          <td colspan="3" style="padding: 0 0 25px 0; font-size: 14px; color: #a0a0a0; text-align: center;">为什么选择 WiseSIM？</td>
        </tr>
        <tr>
          <td style="width: 33%; padding: 0 10px; text-align: center;">
            <p style="font-size: 24px; margin: 0 0 8px 0;">💰</p>
            <p style="font-size: 13px; color: #e5e5e5; margin: 0 0 5px 0; font-weight: 600;">价格便宜</p>
            <p style="font-size: 12px; color: #888888; margin: 0;">官方直购，无中间商</p>
          </td>
          <td style="width: 33%; padding: 0 10px; text-align: center;">
            <p style="font-size: 24px; margin: 0 0 8px 0;">⚡</p>
            <p style="font-size: 13px; color: #e5e5e5; margin: 0 0 5px 0; font-weight: 600;">发货极快</p>
            <p style="font-size: 12px; color: #888888; margin: 0;">1-3 天送达</p>
          </td>
          <td style="width: 33%; padding: 0 10px; text-align: center;">
            <p style="font-size: 24px; margin: 0 0 8px 0;">😊</p>
            <p style="font-size: 13px; color: #e5e5e5; margin: 0 0 5px 0; font-weight: 600;">易用好用</p>
            <p style="font-size: 12px; color: #888888; margin: 0;">详细教程陪同</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- 页脚 -->
  <tr>
    <td style="background: #0f0f0f; border-top: 1px solid #3a3a3a; padding: 40px; text-align: center;">
      <p style="margin: 0 0 10px 0; font-size: 13px; color: #c0c0c0; font-weight: 500;">© 2026 WiseSIM · 英国虚拟号码服务</p>
      <p style="margin: 0; font-size: 12px; color: #888888;">此确认链接有效期为 24 小时</p>
    </td>
  </tr>
</table>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
