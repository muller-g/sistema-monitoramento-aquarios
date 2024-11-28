'use client';
import { useRouter } from "next/navigation";
import styles from "./actionButtons.module.css";

export default function ActionButtons({icon, title, link}: any) {
  const router = useRouter();

  return (
    <div className={styles.action_button} onClick={() => router.push(link)}>
        <div className={styles.action_icon}>{icon}</div>
        <span className={styles.action_title}>{title}</span>
    </div>
  );
}
