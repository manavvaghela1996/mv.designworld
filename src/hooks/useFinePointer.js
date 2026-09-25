import { useEffect, useState } from "react";

export default function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setFine(pointer.matches && !reduce.matches);
    update();
    pointer.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return fine;
}
