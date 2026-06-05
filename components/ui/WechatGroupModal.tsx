"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { community } from "@/lib/community";

const STORAGE_KEY = "community_modal_dismissed_date";

const accent = {
  green: {
    label: "text-green-600",
    button: "bg-green-500 hover:bg-green-600",
    joinButton: "bg-green-500 hover:bg-green-600",
  },
  blue: {
    label: "text-blue-500",
    button: "bg-blue-500 hover:bg-blue-600",
    joinButton: "bg-blue-500 hover:bg-blue-600",
  },
};

export function WechatGroupModal() {
  const [open, setOpen] = useState(false);
  const colors = accent[community.accentColor as keyof typeof accent];

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    if (dismissed !== today) {
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
            <p className={`text-[10px] ${colors.label} font-semibold tracking-widest uppercase mb-0.5`}>
              WiseSIM 社区
            </p>
            <h2 className="text-base font-bold text-gray-900">{community.modalTitle}</h2>
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
              src={community.image}
              alt={community.imageAlt}
              width={600}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">{community.description}</p>
        </div>

        {/* 底部按钮 */}
        <div className="px-5 pb-5 flex flex-col gap-2">
          {community.joinButton && (
            <a
              href={community.joinButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full block ${colors.joinButton} text-white font-semibold py-3 rounded-xl transition-colors text-sm text-center`}
            >
              {community.joinButton.text}
            </a>
          )}
          <button
            onClick={close}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {community.primaryButton}
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
