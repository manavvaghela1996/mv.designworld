import { profile } from "../data/profile";
import { getActiveSocialLinks } from "../data/socialLinks";
import SectionLabel from "../components/SectionLabel";
import MagneticButton from "../components/MagneticButton";
import Reveal from "../components/Reveal";

export default function Contact() {
  const socials = getActiveSocialLinks();

  return (
    <section id="contact" className="mx-auto max-w-[1600px] px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <Reveal>
        <SectionLabel index="04">Contact</SectionLabel>
        <h2 className="mega mt-5 max-w-5xl font-display font-bold uppercase">
          {profile.contactLines.map((line) => (
            <span key={line} className="block">
              {line === "memorable." ? (
                <span className="bg-accent px-2 text-on-accent">memorable.</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-3xl uppercase leading-none sm:text-4xl">{profile.name}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">{profile.role}</p>
          <p className="mt-6 text-sm text-muted">{profile.location}</p>
        </div>
        <div className="lg:col-span-7">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-muted">Phone</dt>
              <dd className="mt-2 text-lg">
                <a data-cursor="link" href={profile.phoneHref} className="underline-offset-4 hover:underline">
                  {profile.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-muted">Email</dt>
              <dd className="mt-2 break-all text-lg">
                <a data-cursor="link" href={profile.emailHref} className="underline-offset-4 hover:underline">
                  {profile.email}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={profile.emailHref} magnetic>
              Email me
            </MagneticButton>
            <MagneticButton href={profile.phoneHref} variant="ghost" magnetic>
              Call me
            </MagneticButton>
          </div>
          {socials.length ? (
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((item) => (
                <li key={item.key}>
                  <a
                    data-cursor="link"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] uppercase tracking-[0.18em] underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
