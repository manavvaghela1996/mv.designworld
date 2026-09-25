import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import MediaFrame from "./MediaFrame";

const LAYOUT = {
  featured: "md:col-span-7",
  tall: "md:col-span-5",
  wide: "md:col-span-12",
  editorial: "md:col-span-12",
  portrait: "md:col-span-5",
  landscape: "md:col-span-7",
  full: "md:col-span-12",
  reverse: "md:col-span-12",
};

const FRAME = {
  featured: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  wide: "aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/7]",
  editorial: "aspect-[4/5] md:aspect-[5/4]",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[5/4] md:aspect-[16/11]",
  full: "aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/8]",
  reverse: "aspect-[4/5] md:aspect-[5/4]",
};

function Meta({ project, light = false }) {
  return (
    <div className={`flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] ${light ? "text-white/75" : "text-muted"}`}>
      <span className={light ? "text-white" : "text-ink"}>{project.number}</span>
      <span>{project.placeholder ? "Placeholder" : project.category}</span>
      <span>{project.year || "—"}</span>
    </div>
  );
}

function Frame({ project, className }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="media-zoom h-full w-full">
        <MediaFrame
          src={project.image}
          alt={project.imageAlt}
          label={project.title}
          index={project.number}
          pathNote={project.image}
          className="h-full w-full"
        />
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <span className="pointer-events-none absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/50 text-white transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </div>
  );
}

export default function ProjectCard({ project }) {
  const editorial = project.layout === "editorial" || project.layout === "reverse";
  const overlay = project.layout === "featured" || project.layout === "wide" || project.layout === "full";

  if (editorial) {
    const reversed = project.layout === "reverse";
    return (
      <article className={`${LAYOUT[project.layout]} border-t border-line pt-8`}>
        <Link
          to={`/work/${project.slug}`}
          data-cursor="view"
          className="group grid items-end gap-6 md:grid-cols-12 md:gap-8"
        >
          <div className={reversed ? "md:order-2 md:col-span-7" : "md:col-span-7"}>
            <Frame project={project} className={FRAME[project.layout]} />
          </div>
          <div className={`flex flex-col gap-5 ${reversed ? "md:order-1 md:col-span-5" : "md:col-span-5"}`}>
            <Meta project={project} />
            <h3 className="font-display text-4xl uppercase leading-[0.92] transition-transform duration-500 group-hover:-translate-y-1 sm:text-5xl">
              {project.title}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">
              {project.summary}
            </p>
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted">{project.category}</span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={LAYOUT[project.layout]}>
      <Link to={`/work/${project.slug}`} data-cursor="view" className="group block">
        <div className="relative">
          <Frame project={project} className={FRAME[project.layout]} />
          {overlay ? (
            <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-5 sm:p-7">
              <Meta project={project} light />
              <h3 className="mt-3 max-w-[12ch] font-display text-4xl uppercase leading-[0.9] text-white transition-transform duration-500 group-hover:-translate-y-1 sm:text-6xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/75 opacity-0 transition duration-500 group-hover:opacity-100 max-md:opacity-100">
                {project.summary}
              </p>
            </div>
          ) : null}
        </div>
        {overlay ? null : (
          <div className="mt-4 space-y-3">
            <Meta project={project} />
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-display text-3xl uppercase leading-[0.95] transition-transform duration-500 group-hover:-translate-y-1 sm:text-4xl">
                {project.title}
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">{project.summary}</p>
          </div>
        )}
      </Link>
    </article>
  );
}
