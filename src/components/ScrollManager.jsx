import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
        });
      }, 70);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    return undefined;
  }, [pathname, hash, reduce]);

  return null;
}
