"use client";

import { useState } from "react";
import styles from "./FaqAccordion.module.css";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`${styles.item}${openIndex === i ? " " + styles.open : ""}`}
        >
          <button
            className={styles.btn}
            aria-expanded={openIndex === i}
            onClick={() => toggle(i)}
          >
            {item.q}
            <span className={styles.icon} aria-hidden="true">+</span>
          </button>
          <div className={styles.answer}>
            {item.a}
          </div>
        </div>
      ))}
    </div>
  );
}
