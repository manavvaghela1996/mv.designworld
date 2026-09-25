import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";

export default function Marquee() {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const offset = useRef(0);
  const paused = useRef(false);
  const drag = useRef(null);
  const [hot, setHot] = useState(false);

  function wrap(value, half) {
    if (!half) return 0;
    let next = value % half;
    if (next > 0) next -= half;
    return next;
  }

  useEffect(() => {
    if (reduce) return undefined;
    let frame;

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2;
        if (!drag.current && half > 0) {
          offset.current = wrap(offset.current - (paused.current ? 0.18 : 0.7), half);
        }
        track.style.transform = `translate3d(${offset.current}px,0,0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  function onPointerDown(event) {
    if (reduce || event.pointerType !== "mouse") return;
    drag.current = { x: event.clientX, origin: offset.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (!drag.current) return;
    const next = drag.current.origin + (event.clientX - drag.current.x);
    const track = trackRef.current;
    const half = track ? track.scrollWidth / 2 : 0;
    offset.current = wrap(next, half);
  }

  function onPointerUp() {
    drag.current = null;
  }

  const items = [...profile.marquee, ...profile.marquee];

  if (reduce) {
    return (
      <section className="border-y border-line bg-ink text-bg" aria-label="Disciplines">
        <ul className="mx-auto flex max-w-[1600px] flex-wrap gap-x-6 gap-y-3 px-4 py-6 sm:px-6 lg:px-10">
          {profile.marquee.map((item) => (
            <li key={item} className="font-display text-xl uppercase tracking-tight">
              {item}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      aria-label="Disciplines"
      data-cursor="drag"
      onMouseEnter={() => {
        paused.current = true;
        setHot(true);
      }}
      onMouseLeave={() => {
        paused.current = false;
        setHot(false);
        drag.current = null;
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`touch-pan-y overflow-hidden border-y border-line bg-ink py-5 text-bg transition-colors duration-500 sm:py-7 ${hot ? "text-accent" : ""}`}
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="px-4 font-display text-[clamp(1.8rem,4vw,3.6rem)] font-bold uppercase leading-none tracking-[-0.04em] sm:px-6">
              {item}
            </span>
            <span className="text-accent" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
