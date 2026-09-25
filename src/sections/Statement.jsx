import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/profile";

function StatementLine({ progress, index, total, children, accent = false }) {
  const reduce = useReducedMotion();
  const start = index / total;
  const end = Math.min((index + 0.85) / total, 1);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  return (
    <motion.span style={reduce ? undefined : { opacity }} className={`block ${accent ? "mt-2" : ""}`}>
      {accent ? <span className="bg-accent px-2 text-on-accent">{children}</span> : children}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const lines = profile.statementLines;

  return (
    <section ref={ref} className="relative h-[165vh]" aria-label="Design statement">
      <div className="sticky top-0 flex h-[100svh] items-center bg-ink text-bg">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-bg/60">Note</p>
          <p className="mega mt-6 font-display font-bold uppercase">
            {lines.map((line, index) => (
              <StatementLine
                key={line}
                progress={scrollYProgress}
                index={index}
                total={lines.length}
                accent={index === lines.length - 1}
              >
                {line}
              </StatementLine>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
