import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useFinePointer from "../hooks/useFinePointer";

export default function MagneticButton({
  children,
  href,
  to,
  variant = "solid",
  className = "",
  magnetic = false,
}) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const enabled = magnetic && fine && !reduce;

  function onMove(event) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const classes =
    variant === "solid"
      ? "bg-ink text-bg hover:bg-accent hover:text-on-accent"
      : "border border-ink/20 bg-transparent text-ink hover:border-accent hover:bg-accent hover:text-on-accent";

  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </>
  );

  const shared =
    "group inline-flex min-h-11 items-center justify-center gap-3 px-5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 " +
    classes +
    " " +
    className;

  const style = enabled ? { x: springX, y: springY } : undefined;
  const handlers = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (to) {
    return (
      <motion.div ref={ref} style={style} className="inline-flex" {...handlers}>
        <Link to={to} data-cursor="link" className={shared}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={style}
      data-cursor="link"
      className={shared}
      {...handlers}
    >
      {content}
    </motion.a>
  );
}
