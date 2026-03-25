"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, ExternalLink, BookOpen, Tag } from "lucide-react";

const INVITE_CODE = "WISE666";
const VISIT_URL = "https://xesim.cc/?DIST=RkJHFVg%3D";
const GUIDE_URL = "https://x.com/WiseInvest513/status/2025197514362863835";

export function XesimCard() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INVITE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] overflow-hidden flex flex-col">
      {/* 封面图区域 */}
      <div className="relative h-44 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10" />
        <Image
          src="https://file.xesim.cc/shopImg/homepage_X1.png"
          alt="Xesim X1"
          width={160}
          height={160}
          className="object-contain relative z-10 drop-shadow-2xl"
          unoptimized
        />
        <span className="absolute top-3 right-3 text-[10px] text-gray-400 border border-[#ffffff18] bg-[#00000040] backdrop-blur-sm rounded-full px-2.5 py-0.5">
          其他资源
        </span>
        {/* 9折角标 */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-orange-500/30">
          <Tag className="w-2.5 h-2.5" />
          专属 9 折
        </div>
      </div>

      {/* 内容区 */}
      <div className="px-5 py-4 flex flex-col flex-1">
        {/* 品牌名 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[9px] font-black">X</span>
          </div>
          <span className="text-white font-semibold text-sm">Xesim eSIM 服务</span>
          <span className="ml-auto text-[10px] text-orange-400 border border-orange-500/30 bg-orange-500/10 rounded-full px-2 py-0.5">eSIM</span>
        </div>

        <p className="text-gray-300 text-sm font-medium leading-snug mb-1">
          一站式全球 eSIM，出境上网更省心
        </p>
        <p className="text-gray-500 text-xs leading-relaxed mb-3">
          支持多国家/地区流量方案，适合跨境出行、商务差旅与海外应用注册场景。
        </p>

        {/* 折扣码模块 */}
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-400 text-xs font-medium">🎉 下单立减 10%，专属折扣码</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center justify-between border border-orange-500/30 bg-[#0a0a0a] rounded-lg px-3 py-2">
              <span className="text-orange-400 font-mono text-base font-bold tracking-widest">{INVITE_CODE}</span>
              <span className="text-gray-600 text-xs line-through ml-2">原价</span>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                copied
                  ? "bg-green-500/15 text-green-400 border border-green-500/30"
                  : "bg-orange-500 hover:bg-orange-400 text-white shadow-md shadow-orange-500/20"
              }`}
            >
              {copied
                ? <><Check className="w-3.5 h-3.5" />已复制</>
                : <><Copy className="w-3.5 h-3.5" />复制码</>
              }
            </button>
          </div>
          <p className="text-gray-600 text-[11px] mt-2">
            ↑ 先复制折扣码，再点「立即访问」，结算时粘贴即可享 9 折
          </p>
        </div>

        {/* 按钮 */}
        <div className="flex gap-2 mt-auto">
          <a
            href={VISIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            立即访问 <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white border border-[#2a2a2a] hover:border-[#3a3a3a] px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            教程
          </a>
        </div>
      </div>
    </div>
  );
}
