// 切换此处来切换群聊系统: "domestic" | "telegram"
export const ACTIVE_COMMUNITY = "telegram" as const;

export type CommunityKey = "domestic" | "telegram";

export const COMMUNITY_CONFIG = {
  domestic: {
    label: "国内群聊",
    accentColor: "green",
    modalTitle: "欢迎加入官方微信群聊",
    image: "/草料图片.png",
    imageAlt: "微信群二维码",
    description: "扫码加入群聊，与志同道合的出海人一起交流",
    joinButton: null,
    primaryButton: "进入平台",
  },
  telegram: {
    label: "电报群聊",
    accentColor: "blue",
    modalTitle: "欢迎加入官方 Telegram 群",
    image: "/电报图片.png",
    imageAlt: "电报群二维码",
    description: "扫码加入 Telegram 群，与志同道合的出海人一起交流",
    joinButton: { text: "点击加入群聊", url: "https://t.me/WiseInvest513Chat" },
    primaryButton: "进入平台",
  },
} satisfies Record<CommunityKey, object>;

export const community = COMMUNITY_CONFIG[ACTIVE_COMMUNITY];
