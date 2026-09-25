import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import useActiveSection from "../hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function goTo(id) {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  function onLogoClick(event) {
    setOpen(false);
    if (location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        open
          ? "border-b border-line bg-bg"
          : solid
            ? "border-b border-line bg-bg/80 backdrop-blur-md"
            : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10" aria-label="Primary">
        <Link
          to="/"
          onClick={onLogoClick}
          data-cursor="link"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <span className="h-2.5 w-2.5 bg-accent" aria-hidden="true" />
          MV.
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                data-cursor="link"
                onClick={() => goTo(link.id)}
                className={`text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  active === link.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            data-cursor="link"
            onClick={() => goTo("contact")}
            className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.2em] sm:inline-flex"
          >
            Let's Talk
            <span aria-hidden="true">↗</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            className="fixed inset-0 top-[4.5rem] z-50 bg-bg lg:hidden"
          >
            <ul className="flex flex-col px-6 py-8">
              {LINKS.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={reduce ? false : { y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="border-b border-line"
                >
                  <button
                    type="button"
                    onClick={() => goTo(link.id)}
                    className="flex w-full items-baseline justify-between py-5 text-left font-display text-4xl uppercase tracking-tight"
                  >
                    {link.label}
                    <span className="text-xs tracking-[0.2em] text-muted">0{index + 1}</span>
                  </button>
                </motion.li>
              ))}
              <li className="pt-8">
                <button
                  type="button"
                  onClick={() => goTo("contact")}
                  className="inline-flex min-h-11 items-center gap-2 bg-ink px-5 text-[11px] uppercase tracking-[0.2em] text-bg"
                >
                  Let's Talk ↗
                </button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
