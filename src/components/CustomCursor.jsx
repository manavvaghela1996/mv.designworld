import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useFinePointer from "../hooks/useFinePointer";

export default function CustomCursor() {
  const enabled = useFinePointer();
  const [kind, setKind] = useState("default");
  const [visible, setVisible] = useState(false);
  const kindRef = useRef("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 700, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 700, damping: 40, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.45 });

  useEffect(() => {
    if (!enabled) return undefined;
    document.documentElement.classList.add("has-cursor");

    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const zone =
        event.target instanceof Element
          ? event.target.closest("[data-cursor]")?.dataset.cursor || "default"
          : "default";
      if (zone !== kindRef.current) {
        kindRef.current = zone;
        setKind(zone);
      }
    };

    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", hide);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const expanded = kind === "view" || kind === "drag";
  const size = expanded ? 112 : kind === "link" ? 68 : 40;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80]"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      >
        <span className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center ${
            expanded
              ? "bg-accent text-on-accent"
              : "border border-white mix-blend-difference"
          }`}
        >
          {kind === "view" ? (
            <span className="text-[10px] font-semibold uppercase leading-tight tracking-[0.16em]">
              View
              <br />
              Project ↗
            </span>
          ) : null}
          {kind === "drag" ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Drag</span>
          ) : null}
        </motion.div>
      </motion.div>
    </>
  );
}
