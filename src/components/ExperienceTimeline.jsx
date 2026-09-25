import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experience } from "../data/experience";

export default function ExperienceTimeline({ active, onActive }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.4 });

  useEffect(() => {
    const nodes = ref.current?.querySelectorAll("[data-index]");
    if (!nodes?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) onActive(Number(visible.target.dataset.index));
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.25, 0.5, 0.75] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [onActive]);

  return (
    <div ref={ref} className="relative pl-6 sm:pl-8">
      <div className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden="true" />
      <motion.div
        style={reduce ? { scaleY: 1 } : { scaleY }}
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
        aria-hidden="true"
      />
      <ol className="space-y-0">
        {experience.map((item, index) => {
          const selected = active === index;
          return (
            <motion.li
              key={item.company}
              data-index={index}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-b border-line py-8 sm:py-10"
            >
              <span
                className={`absolute -left-6 top-10 h-2.5 w-2.5 -translate-x-1/2 sm:-left-8 ${
                  selected ? "bg-accent" : "bg-ink"
                }`}
                aria-hidden="true"
              />
              <p className="font-display text-3xl leading-none lg:hidden">{item.duration}</p>
              {item.period ? (
                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted lg:hidden">{item.period}</p>
              ) : null}
              <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] sm:text-4xl lg:mt-0">
                {item.company}
              </h3>
              <p className="mt-3 text-base">{item.role}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.16em] text-muted">{item.location}</p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
