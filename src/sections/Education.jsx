import { motion, useReducedMotion } from "framer-motion";
import { education } from "../data/education";
import SectionLabel from "../components/SectionLabel";

export default function Education() {
  const reduce = useReducedMotion();

  return (
    <section id="education" className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <SectionLabel>Education</SectionLabel>
      <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
        Education
      </h2>
      <ol className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-4 md:gap-6">
        {education.map((item, index) => (
          <motion.li
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <span className="mb-6 block h-px w-10 bg-accent" aria-hidden="true" />
            <p className="font-display text-3xl leading-none sm:text-4xl">{item.years}</p>
            <h3 className="mt-4 max-w-[12ch] text-lg leading-snug">{item.title}</h3>
            <span className="mt-6 block text-[11px] uppercase tracking-[0.2em] text-muted">0{index + 1}</span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
