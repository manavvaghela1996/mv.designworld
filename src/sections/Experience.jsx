import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { experience } from "../data/experience";
import SectionLabel from "../components/SectionLabel";
import ExperienceTimeline from "../components/ExperienceTimeline";

export default function Experience() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const onActive = useCallback((index) => setActive(index), []);
  const current = experience[active];

  return (
    <section id="experience" className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <SectionLabel index="03">Experience</SectionLabel>
      <h2 className="mt-4 max-w-full font-display text-[clamp(3rem,8vw,6.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em]">
        Experience
      </h2>
      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="hidden lg:sticky lg:top-28 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.company}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-display text-4xl leading-none xl:text-5xl">{current.duration}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted">
                  {current.period || current.location}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-9">
          <ExperienceTimeline active={active} onActive={onActive} />
        </div>
      </div>
    </section>
  );
}
