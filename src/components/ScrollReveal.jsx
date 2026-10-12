import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: d },
  }),
};

export const fade = {
  hidden: { opacity: 0 },
  show: (d = 0) => ({ opacity: 1, transition: { duration: 1.1, ease: "easeOut", delay: d } }),
};

export const clipReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE, delay: d },
  }),
};

export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  show: (d = 0) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 1, ease: EASE, delay: d },
  }),
};

/**
 * Reusable scroll-triggered reveal wrapper.
 * Reverses gracefully on scroll-up (viewport once:false).
 */
export default function ScrollReveal({
  children,
  variant = fadeUp,
  delay = 0,
  amount = 0.05,
  className,
  as = "div",
  style,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  if (reduce) return <div ref={ref} className={className} style={style}>{children}</div>;
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      variants={variant}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount }}
    >
      {children}
    </Tag>
  );
}
