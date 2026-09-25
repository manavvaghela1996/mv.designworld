import { profile } from "../data/profile";
import SectionLabel from "../components/SectionLabel";
import Reveal from "../components/Reveal";

function Mark() {
  return (
    <svg viewBox="0 0 240 280" className="h-full w-full" aria-hidden="true">
      <rect x="18" y="24" width="140" height="180" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="92" y="78" width="120" height="150" fill="var(--accent)" />
      <circle cx="70" cy="210" r="36" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M20 250 H200" stroke="currentColor" strokeWidth="1" />
      <text x="28" y="58" fill="currentColor" fontFamily="Syne, sans-serif" fontSize="28" fontWeight="700">
        MV
      </text>
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1600px] px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <SectionLabel index="01">About me</SectionLabel>
          <h2 className="sr-only">About me</h2>
          <p className="mega mt-6 font-display font-bold uppercase">
            {profile.aboutLines.map((line) => (
              <span key={line} className="block">
                {line === "how it looks." ? (
                  <>
                    how it <span className="bg-accent px-1 text-on-accent">looks.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5 lg:pt-16">
          <p className="text-base leading-relaxed text-muted md:text-lg">{profile.aboutBio}</p>
          <div className="mt-8 h-44 w-44 text-ink sm:h-52 sm:w-52">
            <Mark />
          </div>
          <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-muted">Based in</dt>
              <dd className="mt-2 text-lg">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-muted">Role</dt>
              <dd className="mt-2 text-lg">{profile.role}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
