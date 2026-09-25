import { languages } from "../data/education";

function Marks({ count }) {
  return (
    <span className="flex gap-1.5" aria-label={`${count} of 5 marks on the resume`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`h-2.5 w-2.5 ${index < count ? "bg-accent" : "bg-ink/15"}`}
        />
      ))}
    </span>
  );
}

export default function Languages() {
  return (
    <section id="languages" aria-labelledby="languages-title" className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <h2 id="languages-title" className="text-[11px] uppercase tracking-[0.28em] text-muted">
        Languages
      </h2>
      <ul className="mt-6">
        {languages.map((language) => (
          <li key={language.name} className="flex items-center justify-between gap-6 border-b border-line py-5 sm:py-6">
            <p className="font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-none tracking-[-0.04em]">
              {language.name}
            </p>
            <Marks count={language.marks} />
          </li>
        ))}
      </ul>
    </section>
  );
}
