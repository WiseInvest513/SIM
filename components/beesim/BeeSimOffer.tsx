import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { BEESIM } from "@/lib/beesim";
import { BeeSimCode } from "./BeeSimCode";
import styles from "./beesim.module.css";

export function BeeSimOffer({ inGuide = false }: { inGuide?: boolean }) {
  return (
    <aside id={inGuide ? "beesim-referral" : "beesim"} className={`${styles.offer} ${inGuide ? styles.inGuide : ""}`} aria-label="BeeSIM 工具卡与旅行 eSIM 推荐优惠">
      {!inGuide && (
        <Link href={BEESIM.guideUrl} className={styles.cover}>
          <Image src={BEESIM.cover} alt="BeeSIM 开通与使用教程" width={640} height={360} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" unoptimized />
        </Link>
      )}
      <div className={styles.body}>
        <div className={styles.brand}>
          <Image src="/beesim/logo.jpg" alt="" width={32} height={32} />
          <span>BeeSIM</span>
          <span className={styles.badge}>官网购买</span>
        </div>
        <h3 className={styles.title}>工具卡与旅行 eSIM</h3>
        <p className={styles.description}>按目的地购买旅行流量；手机原生支持时直接安装，需要工具卡时先确认设备与套餐兼容。</p>
        <div className={styles.benefit}>
          <div className={styles.discount}><strong>9 折</strong><span>eSIM 流量套餐减免 {BEESIM.discount}</span></div>
          <p>注册绑定推荐码后，后续购买 eSIM 流量套餐均享推荐优惠。</p>
          <BeeSimCode />
        </div>
        <p className={styles.note}>工具卡单独计价：单卡结算示例为 $19.90 减 $3，实付 $16.90。与流量九折分开核对。</p>
        <div className={styles.actions}>
          <a href={BEESIM.registerUrl} target="_blank" rel="noopener noreferrer sponsored" className={styles.primary}>注册享九折 <ArrowUpRight size={16} /></a>
          {!inGuide && <Link href={BEESIM.guideUrl} className={styles.secondary}><BookOpen size={16} />使用教程</Link>}
        </div>
        <div className={styles.purchaseLinks}>
          <a href={BEESIM.cardUrl} target="_blank" rel="noopener noreferrer sponsored">购买工具卡 <ArrowUpRight size={13} /></a>
          <a href={BEESIM.plansUrl} target="_blank" rel="noopener noreferrer sponsored">选旅行套餐 <ArrowUpRight size={13} /></a>
        </div>
        <p className={styles.note}>商品在 BeeSIM 官网下单、付款和交付。请先注册绑定推荐码，再进入购买页。</p>
      </div>
    </aside>
  );
}
