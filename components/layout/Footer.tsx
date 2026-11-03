import Link from "next/link";
import Image from "next/image";
import s from "./network-footer.module.css";

const links = [
  [
    "手机卡商城",
    "/shop"
  ],
  [
    "激活与使用教程",
    "/guides"
  ],
  [
    "完整激活流程",
    "/shop/activation-guide"
  ],
  [
    "我的订单",
    "/account/orders"
  ]
];
const socials = [
  [
    "home",
    "Wise 主站",
    "https://www.wise-invest.org/"
  ],
  [
    "x",
    "Twitter / X",
    "https://x.com/WiseInvest513"
  ],
  [
    "youtube",
    "YouTube",
    "https://www.youtube.com/@WiseInvest513"
  ],
  [
    "book",
    "小红书",
    "https://www.xiaohongshu.com/user/profile/6373a8ba0000000024014988"
  ]
] as const;

type FooterIconName = "home" | "x" | "youtube" | "book";
function FooterIcon({name}: {name: FooterIconName}) {
  return <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "home" && <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z"/></>}
    {name === "x" && <><path d="M4 3h4l12 18h-4L4 3Zm16 0L4 21"/></>}
    {name === "youtube" && <><rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z"/></>}
    {name === "book" && <><path d="M5 3h12a2 2 0 0 1 2 2v16H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm-1 15a3 3 0 0 1 3-3h12M8 7h7M8 11h5"/></>}
  </svg>;
}

export function Footer() {
  return (
    <footer className={s.footer} data-wise-footer="sim">
      <div className={s.inner}>
        <div className={s.intro}>
          <Link href="/" className={s.brand} aria-label="SIM 首页">
            <Image className={s.brandImage} src="/wordmark.svg?v=platinum-2" alt="SIM" width={64} height={28} unoptimized />
          </Link>
          <p className={s.description}>海外手机卡选购、激活与使用教程，帮助你做好通信准备。</p>
          <p className={s.note}>本站部分链接含联盟推广参数，不影响价格与体验。套餐与资费以运营商公布为准。</p>
        </div>
        <div role="navigation" aria-label="本站功能导航">
          <h2 className={s.heading}>功能导航</h2>
          <ul className={s.links}>{links.map(([label, href]) => <li key={href}><Link href={href} prefetch={false} className={s.link}>{label}</Link></li>)}</ul>
        </div>
        <div role="navigation" aria-label="关注 Wise">
          <h2 className={s.heading}>关注 Wise</h2>
          <ul className={s.links}>{socials.map(([icon, label, href]) => <li key={href}>
            <a href={href} className={s.link} target="_blank" rel="noopener noreferrer">
              <FooterIcon name={icon} /><span>{label}</span>
              <svg className={s.arrow} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" /></svg>
            </a>
          </li>)}</ul>
        </div>
      </div>
      <div className={s.bottom}>
        <p className={s.copyright}>© {new Date().getFullYear()} Wise-SIM · 海外手机卡</p>
        <p className={s.disclaimer}>内容仅供参考，不构成任何投资建议。</p>
      </div>
    </footer>
  );
}
