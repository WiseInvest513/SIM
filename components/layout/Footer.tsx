import Link from "next/link";
import { Globe, ExternalLink } from "lucide-react";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2a2a2a] mt-auto bg-[#111111]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col md:flex-row md:justify-between gap-10">

          {/* 左：品牌介绍 */}
          <div className="md:max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                <Globe className="w-4 h-4 text-gray-900" />
              </div>
              <span className="font-bold text-white">Wise SIM</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              正规渠道海外手机卡，giffgaff 英国卡、Ultra Mobile 美国卡，国内快递直邮。
            </p>
          </div>

          {/* 右：两列导航，靠右对齐 */}
          <div className="flex gap-24">
            {/* 快速导航 */}
            <div>
              <h3 className="text-base font-semibold text-white mb-4">快速导航</h3>
              <ul className="space-y-2.5">
                {[
                  { href: "/shop",           label: "手机卡商城" },
                  { href: "/guides",         label: "激活教程" },
                  { href: "/account/orders", label: "我的订单" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 其他 */}
            <div>
              <h3 className="text-base font-semibold text-white mb-4">其他</h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://wise-invest.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    Wise 投资主站
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/WiseInvest513"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <XIcon />
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@WiseInvest513"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-red-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <YouTubeIcon />
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* 版权 */}
        <div className="border-t border-[#2a2a2a] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">© {currentYear} Wise SIM. 保留所有权利.</p>
          <p className="text-gray-700 text-xs">本站部分链接含联盟推广参数，不影响价格与体验。</p>
        </div>

      </div>
    </footer>
  );
}
