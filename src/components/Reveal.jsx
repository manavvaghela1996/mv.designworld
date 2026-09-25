import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function LineReveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
