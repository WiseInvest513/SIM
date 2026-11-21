"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { BEESIM } from "@/lib/beesim";
import styles from "./beesim.module.css";

export function BeeSimCode() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copyCode() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(BEESIM.code);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div>
      <div className={styles.codeRow}>
        <span className={styles.code}>{BEESIM.code}</span>
        <button type="button" onClick={copyCode} className={styles.copy} aria-label="复制 BeeSIM 推荐码">
          {status === "copied" ? <Check size={15} /> : <Copy size={15} />}
          {status === "copied" ? "已复制" : "复制码"}
        </button>
      </div>
      <div className={styles.copyStatus} role="status" aria-live="polite">
        {status === "failed" ? `未能自动复制，请长按或选中 ${BEESIM.code} 复制。` : status === "copied" ? "推荐码已复制，在注册页粘贴即可。" : "填写在注册页的「推荐码（选填）」一栏。"}
      </div>
    </div>
  );
}
