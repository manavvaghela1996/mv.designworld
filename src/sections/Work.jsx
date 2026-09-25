import SectionLabel from "../components/SectionLabel";
import ProjectGrid from "../components/ProjectGrid";
import Reveal from "../components/Reveal";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="02">Work</SectionLabel>
          <h2 className="mega mt-4 font-display font-bold uppercase">
            Selected
            <br />
            Work
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-base leading-relaxed text-muted">
            A collection of visual systems, interfaces and creative work.
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted">
            Editable placeholders until real projects are added.
          </p>
        </div>
      </Reveal>
      <ProjectGrid />
    </section>
  );
}
