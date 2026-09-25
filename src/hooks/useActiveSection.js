import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const IDS = ["about", "work", "skills", "experience", "contact"];

export default function useActiveSection() {
  const [active, setActive] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const nodes = IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) {
      setActive("");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return active;
}
