import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../data/profile";
import MediaFrame from "../components/MediaFrame";
import MagneticButton from "../components/MagneticButton";
import { LineReveal } from "../components/Reveal";
import useFinePointer from "../hooks/useFinePointer";

export default function Hero() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 40, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 40, damping: 18 });
  const driftX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const driftY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const fineRef = useRef(fine);
  const reduceRef = useRef(reduce);
  fineRef.current = fine;
  reduceRef.current = reduce;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageX = useTransform(driftX, (value) => (fineRef.current && !reduceRef.current ? value : 0));
  const imageY = useTransform([parallaxY, driftY], ([scroll, drift]) =>
    reduceRef.current ? 0 : scroll + (fineRef.current ? drift : 0),
  );

  function onMove(event) {
    if (!fine || reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section ref={sectionRef} onMouseMove={onMove} className="relative">
      <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-28 sm:px-6 lg:px-10 lg:pb-12 lg:pt-32">
        <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.28em] text-muted">
          <p>{profile.eyebrow}</p>
          <p className="hidden sm:block">{profile.locationShort}</p>
        </div>

        <h1 className="hero-title mt-5 max-w-full font-display font-extrabold uppercase">
          <LineReveal delay={0.05}>{profile.firstName}</LineReveal>
          <LineReveal delay={0.16} className="text-accent">
            {profile.lastName}
          </LineReveal>
        </h1>

        <div className="mt-8 grid min-w-0 items-start gap-8 lg:mt-6 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <p className="hero-lead font-display font-semibold uppercase">
              {profile.heroLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-[15px]">{profile.heroBio}</p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton to="/#work" magnetic>
                View my work
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost" magnetic>
                Let's talk
              </MagneticButton>
            </div>
          </div>

          <div className="relative min-w-0 overflow-hidden lg:col-span-6 lg:col-start-7">
            <ul className="mb-3 flex flex-wrap gap-2 sm:hidden">
              {profile.meta.map((item) => (
                <li key={item} className="bg-surface px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 bg-accent align-middle" />
                  {item}
                </li>
              ))}
            </ul>
            <motion.div
              style={reduce ? undefined : { x: imageX, y: imageY }}
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.15, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <MediaFrame
                src="/assets/manav-profile.png"
                alt="Portrait of Manav Vaghela"
                portrait
                priority
                label="Portrait"
                pathNote="/assets/manav-profile.png"
                className="aspect-[4/5] w-full max-h-[78vh]"
              />
            </motion.div>

            <div className="pointer-events-none absolute left-5 top-8 hidden flex-col items-start gap-2 sm:flex">
              {profile.meta.map((item, index) => (
                <motion.p
                  key={item}
                  className="bg-bg/90 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ink backdrop-blur-sm"
                  animate={reduce ? undefined : { y: [0, -7, 0] }}
                  transition={{ duration: 5.5 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 bg-accent align-middle" />
                  {item}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-muted">
          <span>Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-line" aria-hidden="true">
            <span className="scroll-cue-bar absolute inset-x-0 top-0 h-1/2 bg-ink" />
          </span>
        </div>
      </div>
    </section>
  );
}
