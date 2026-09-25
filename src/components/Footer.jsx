import { useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";
import { getActiveSocialLinks } from "../data/socialLinks";

export default function Footer() {
  const reduce = useReducedMotion();
  const socials = getActiveSocialLinks();

  function toTop() {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-16">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2 font-display text-3xl font-bold">
            <span className="h-2.5 w-2.5 bg-accent" aria-hidden="true" />
            MV.
          </p>
          <p className="mt-6 font-display text-2xl uppercase leading-none sm:text-3xl">{profile.name}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted">{profile.role}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Studio</p>
            <p className="mt-3 text-sm">{profile.location}</p>
            <a data-cursor="link" href={profile.emailHref} className="mt-3 inline-block text-sm underline-offset-4 hover:underline">
              {profile.email}
            </a>
          </div>
          {socials.length ? (
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Social</p>
              <ul className="mt-3 space-y-2">
                {socials.map((item) => (
                  <li key={item.key}>
                    <a
                      data-cursor="link"
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 border-t border-line px-4 py-5 text-[11px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <p>© 2026 Manav Vaghela. All rights reserved.</p>
        <button type="button" data-cursor="link" onClick={toTop} className="min-h-11 text-left uppercase tracking-[0.18em] text-ink">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
