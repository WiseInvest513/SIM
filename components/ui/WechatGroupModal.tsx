"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const STORAGE_KEY = "community_modal_dismissed_date";
const COOLDOWN_KEY = "community_modal_last_closed";
const COOLDOWN_MS = 4 * 60 * 60 * 1000;

type Tab = "telegram" | "wechat";

export function WechatGroupModal() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("telegram");

  useEffect(() => {
    const today = new Date().toDateString();
    if (localStorage.getItem(STORAGE_KEY) === today) return;

    const lastClosed = localStorage.getItem(COOLDOWN_KEY);
    if (lastClosed && Date.now() - parseInt(lastClosed, 10) < COOLDOWN_MS) return;

    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-community-modal", handler);
    return () => window.removeEventListener("open-community-modal", handler);
  }, []);

  function close() {
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
    setOpen(false);
  }

  function dismissToday() {
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={close}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <p className="text-[10px] text-blue-500 font-semibold tracking-widest uppercase mb-0.5">
              WISEINVEST 社区
            </p>
            <h2 className="text-base font-bold text-gray-900">加入我们的社群</h2>
          </div>
          <button
            onClick={close}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab 切换 */}
        <div className="px-5 pb-3">
          <div className="flex rounded-xl bg-gray-100 p-1 gap-1">
            <button
              onClick={() => setTab("telegram")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "telegram"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              电报群聊
            </button>
            <button
              onClick={() => setTab("wechat")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "wechat"
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              微信群聊
            </button>
          </div>
        </div>

        {/* 内容区 */}
        {tab === "telegram" ? (
          <>
            <div className="px-5 pb-2">
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <Image
                  src="/电报图片.png"
                  alt="电报群二维码"
                  width={600}
                  height={600}
                  className="w-full object-contain"
                />
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                扫码或点击按钮加入 Telegram 群，与全球投资者交流
              </p>
            </div>
            <div className="px-5 pb-5 flex flex-col gap-2 mt-1">
              <a
                href="https://t.me/WiseInvest513Chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm text-center"
              >
                点击加入群聊 →
              </a>
              <button
                onClick={dismissToday}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
              >
                今天不再展示
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="px-5 pb-2 text-center">
              <div className="rounded-xl overflow-hidden border-2 border-green-400">
                <Image
                  src="/草料图片.png"
                  alt="微信群二维码"
                  width={600}
                  height={600}
                  className="w-full object-contain"
                />
              </div>
            </div>
            <div className="px-5 pb-5 flex flex-col gap-2 mt-2">
              <button
                onClick={dismissToday}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
              >
                今天不再展示
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
