"use client";

import { useState } from "react";
import { Check, Package, ArrowRight, Globe, FileText, MapPin } from "lucide-react";

/* ── 主题定义 ──────────────────────────────── */

const themes = [
  {
    id: "midnight",
    name: "午夜黑",
    desc: "当前配色，纯黑背景，对比度偏低",
    bg: "#0c0c0c",
    surface: "#141414",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#ffffff",
    textSecondary: "#888888",
    textMuted: "#444444",
    accent: "#ffffff",
    accentText: "#000000",
    tag: "当前",
  },
  {
    id: "charcoal",
    name: "深炭灰",
    desc: "略带暖色的深灰，文字对比更舒适",
    bg: "#111111",
    surface: "#1a1a1a",
    border: "rgba(255,255,255,0.10)",
    textPrimary: "#f0f0f0",
    textSecondary: "#999999",
    textMuted: "#555555",
    accent: "#ffffff",
    accentText: "#000000",
    tag: "推荐",
  },
  {
    id: "navy",
    name: "深海蓝",
    desc: "深蓝色底，科技感强，护眼效果好",
    bg: "#0d1117",
    surface: "#161b22",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#e6edf3",
    textSecondary: "#8b949e",
    textMuted: "#484f58",
    accent: "#58a6ff",
    accentText: "#ffffff",
    tag: "护眼",
  },
  {
    id: "slate",
    name: "石板蓝",
    desc: "蓝灰色调，视觉层次丰富，不刺眼",
    bg: "#0f172a",
    surface: "#1e293b",
    border: "rgba(148,163,184,0.12)",
    textPrimary: "#f1f5f9",
    textSecondary: "#94a3b8",
    textMuted: "#475569",
    accent: "#818cf8",
    accentText: "#ffffff",
    tag: "",
  },
  {
    id: "zinc",
    name: "冷灰",
    desc: "冷调中性灰，现代简洁，字体清晰",
    bg: "#09090b",
    surface: "#18181b",
    border: "rgba(255,255,255,0.09)",
    textPrimary: "#fafafa",
    textSecondary: "#a1a1aa",
    textMuted: "#52525b",
    accent: "#ffffff",
    accentText: "#000000",
    tag: "",
  },
  {
    id: "forest",
    name: "深林绿",
    desc: "暗绿底色，终端风格，独特质感",
    bg: "#0a0f0a",
    surface: "#111a11",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#e8f5e8",
    textSecondary: "#7aa87a",
    textMuted: "#3d5c3d",
    accent: "#4ade80",
    accentText: "#000000",
    tag: "",
  },
  {
    id: "purple",
    name: "暗紫",
    desc: "紫调暗色，有设计感，适合品牌调性",
    bg: "#0e0b14",
    surface: "#17122a",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#ede9fe",
    textSecondary: "#9d8ec4",
    textMuted: "#4c3d6e",
    accent: "#a78bfa",
    accentText: "#ffffff",
    tag: "",
  },
  {
    id: "warm",
    name: "暖黑",
    desc: "略带暖调，亲切柔和，长时间浏览不累",
    bg: "#0f0e0c",
    surface: "#1c1a17",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#f5f0e8",
    textSecondary: "#a09880",
    textMuted: "#5a5245",
    accent: "#f59e0b",
    accentText: "#000000",
    tag: "",
  },
];

/* ── 预览组件 ──────────────────────────────── */

function ThemePreview({ theme }: { theme: typeof themes[0] }) {
  return (
    <div
      className="rounded-xl overflow-hidden border text-[11px]"
      style={{ background: theme.bg, borderColor: theme.border }}
    >
      {/* Navbar mock */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: theme.border, background: theme.surface }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded" style={{ background: theme.accent }} />
          <span style={{ color: theme.textPrimary }} className="font-bold text-[11px]">Wise SIM</span>
        </div>
        <div className="flex gap-3">
          {["首页", "手机卡", "工具", "教程"].map(t => (
            <span key={t} style={{ color: theme.textSecondary }}>{t}</span>
          ))}
        </div>
        <div
          className="px-2.5 py-1 rounded-md font-medium"
          style={{ background: theme.accent, color: theme.accentText }}
        >
          注册
        </div>
      </div>

      {/* Hero mock */}
      <div className="px-5 pt-5 pb-4">
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 mb-3 text-[10px]"
          style={{ border: `1px solid ${theme.border}`, color: theme.textSecondary }}
        >
          <span className="w-1 h-1 rounded-full bg-green-400" />
          正在接单 · 1-3 个工作日发货
        </div>
        <div className="mb-1 font-bold text-base leading-tight" style={{ color: theme.textPrimary }}>
          出海，从一张手机卡开始
        </div>
        <div className="mb-3 text-[10px] leading-relaxed" style={{ color: theme.textSecondary }}>
          在国内就能拿到英国真实手机号，注册 PayPal、WhatsApp
        </div>
        <div className="flex gap-2">
          <div
            className="px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
            style={{ background: theme.accent, color: theme.accentText }}
          >
            <Package className="w-2.5 h-2.5" /> 立即选购
          </div>
          <div
            className="px-3 py-1.5 rounded-lg"
            style={{ border: `1px solid ${theme.border}`, color: theme.textSecondary }}
          >
            查看教程
          </div>
        </div>
      </div>

      {/* Cards mock */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-4">
        {[
          { icon: Package, label: "手机卡商城" },
          { icon: MapPin, label: "工具导航" },
          { icon: FileText, label: "出海教程" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="rounded-lg p-2.5"
            style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
          >
            <Icon className="w-3 h-3 mb-1.5" style={{ color: theme.textSecondary }} />
            <div className="font-medium" style={{ color: theme.textPrimary }}>{label}</div>
            <div className="mt-0.5 flex items-center gap-0.5" style={{ color: theme.textMuted }}>
              进入 <ArrowRight className="w-2 h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 主页面 ──────────────────────────────── */

export default function ThemesPage() {
  const [selected, setSelected] = useState("midnight");
  const current = themes.find(t => t.id === selected)!;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      {/* 标题 */}
      <div className="mb-12">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-3">配色方案</p>
        <h1 className="text-3xl font-bold text-white mb-2">选择你喜欢的风格</h1>
        <p className="text-white/40 text-sm">点击任意配色方案，右侧实时预览整站效果</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">

        {/* 左侧：主题列表 */}
        <div className="lg:col-span-2 space-y-2">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setSelected(theme.id)}
              className="w-full text-left rounded-xl border px-4 py-3.5 transition-all flex items-center gap-4"
              style={{
                background: selected === theme.id ? theme.surface : "transparent",
                borderColor: selected === theme.id ? theme.accent : "rgba(255,255,255,0.08)",
                outline: "none",
              }}
            >
              {/* 颜色圆圈 */}
              <div className="flex gap-1 flex-shrink-0">
                <div className="w-5 h-5 rounded-full border border-white/10" style={{ background: theme.bg }} />
                <div className="w-5 h-5 rounded-full border border-white/10" style={{ background: theme.surface }} />
                <div className="w-5 h-5 rounded-full border border-white/10" style={{ background: theme.accent }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-white">{theme.name}</span>
                  {theme.tag && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{
                        background: theme.tag === "当前" ? "rgba(255,255,255,0.08)" : `${theme.accent}22`,
                        color: theme.tag === "当前" ? "rgba(255,255,255,0.4)" : theme.accent,
                      }}
                    >
                      {theme.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/35 mt-0.5 truncate">{theme.desc}</p>
              </div>

              {selected === theme.id && (
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: theme.accent }} />
              )}
            </button>
          ))}
        </div>

        {/* 右侧：预览 */}
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            {/* 预览标题 */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/50">预览：{current.name}</span>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span>背景</span>
                <div className="w-4 h-4 rounded border border-white/10" style={{ background: current.bg }} />
                <span>卡片</span>
                <div className="w-4 h-4 rounded border border-white/10" style={{ background: current.surface }} />
                <span>强调</span>
                <div className="w-4 h-4 rounded border border-white/10" style={{ background: current.accent }} />
              </div>
            </div>

            <ThemePreview theme={current} />

            {/* 色值信息 */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "背景色", value: current.bg },
                { label: "卡片色", value: current.surface },
                { label: "主文字", value: current.textPrimary },
                { label: "次要文字", value: current.textSecondary },
                { label: "边框色", value: current.border },
                { label: "强调色", value: current.accent },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg px-3 py-2.5 border border-white/8 bg-white/[0.02]"
                >
                  <p className="text-[10px] text-white/30 mb-1">{label}</p>
                  <p className="text-xs text-white/70 font-mono">{value}</p>
                </div>
              ))}
            </div>

            {/* 告知用户如何应用 */}
            <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-xs text-white/40 leading-relaxed">
              喜欢这个配色？告诉我「用 <span className="text-white/60 font-medium">{current.name}</span> 配色」，我直接帮你应用到整站。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
