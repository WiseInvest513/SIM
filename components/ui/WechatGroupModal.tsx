"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const STORAGE_KEY = "wechat_modal_dismissed_date";

export function WechatGroupModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    if (dismissed !== today) {
      // 稍微延迟，等页面渲染完
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function close() {
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
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <div>
            <p className="text-[10px] text-green-600 font-semibold tracking-widest uppercase mb-0.5">
              WiseSIM 社区
            </p>
            <h2 className="text-base font-bold text-gray-900">欢迎加入官方微信群聊</h2>
          </div>
          <button
            onClick={close}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 二维码区 */}
        <div className="px-5 py-6">
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <Image
              src="/草料图片.png"
              alt="微信群二维码"
              width={600}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            扫码加入群聊，与志同道合的出海人一起交流
          </p>
        </div>

        {/* 底部按钮 */}
        <div className="px-5 pb-5 flex flex-col gap-2">
          <button
            onClick={close}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            进入平台
          </button>
          <button
            onClick={dismissToday}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            今日不再显示
          </button>
        </div>
      </div>
    </div>
  );
}
