import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./beesim.module.css";

export function GuideTable({ children }: { children: ReactNode }) {
  return <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="教程对照表，可横向滚动"><table>{children}</table></div>;
}

export function GuideImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <figure className={styles.figure}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`查看完整图片：${alt}`} style={{ maxWidth: width }}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 100vw, 768px" unoptimized />
      </a>
      <figcaption>{alt} · 点击查看完整图片</figcaption>
    </figure>
  );
}
