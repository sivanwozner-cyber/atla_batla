"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// עטיפת scroll-reveal (PRD §5): fade+rise כשהאלמנט נכנס ל-viewport.
// מכבד prefers-reduced-motion — אם מכובה, מרנדר בלי אנימציה.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
