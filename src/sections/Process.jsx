import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "../data/process";
import SectionLabel from "../components/SectionLabel";

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="process" className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="max-w-3xl">
        <SectionLabel>Process</SectionLabel>
        <h2 className="mega mt-4 font-display font-bold uppercase">
          How I
          <br />
          Design
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
          A portfolio framework for moving through a project. It is not a process quoted from the resume.
        </p>
      </div>
      <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
        {processSteps.map((step, index) => (
          <motion.li
            key={step.number}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-line pt-6"
          >
            <p className="font-display text-5xl leading-none text-ink/25 sm:text-6xl">{step.number}</p>
            <h3 className="mt-6 font-display text-2xl uppercase tracking-tight sm:text-3xl">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
