import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getNeighbors, getProject } from "../data/projects";
import { processSteps } from "../data/process";
import MediaFrame from "../components/MediaFrame";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (!project) return undefined;
    const previous = document.title;
    document.title = `${project.title} — Manav Vaghela`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) return <NotFound />;

  const { prev, next } = getNeighbors(project.slug);
  const steps = project.process?.length ? project.process : processSteps;
  const usingFramework = !project.process?.length;
  const gallery = project.gallery?.length
    ? project.gallery
    : [{ src: "", alt: `${project.title} gallery placeholder`, label: "Gallery" }];

  return (
    <main id="main" className="pt-28">
      <article className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-10">
        <Link
          to="/#work"
          data-cursor="link"
          className="text-[11px] uppercase tracking-[0.22em] text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          ← All work
        </Link>

        <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-muted">
          {project.number} / {project.category}
          {project.placeholder ? " / Placeholder" : ""}
        </p>
        <h1 className="mega mt-4 max-w-5xl font-display font-bold uppercase">
          {project.title}
        </h1>

        {project.placeholder ? (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            This case study is an editable slot. Replace the copy and images in src/data/projects.js. It does not
            describe a completed project.
          </p>
        ) : null}

        <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.22em] text-muted">Year</dt>
            <dd className="mt-2 text-lg">{project.year || "—"}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.22em] text-muted">Role</dt>
            <dd className="mt-2 text-lg">{project.role || "—"}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.22em] text-muted">Tools</dt>
            <dd className="mt-2 text-lg">{project.tools?.length ? project.tools.join(", ") : "—"}</dd>
          </div>
        </dl>

        <MediaFrame
          src={project.image}
          alt={project.imageAlt}
          label={project.title}
          index={project.number}
          pathNote={project.image}
          priority
          className="mt-10 aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[16/8]"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <h2 className="font-display text-3xl uppercase lg:col-span-4">Overview</h2>
          <p className="text-base leading-relaxed text-muted lg:col-span-7 lg:col-start-6">{project.overview}</p>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl uppercase">Creative process</h2>
          {usingFramework ? (
            <p className="mt-3 max-w-xl text-sm text-muted">
              Shown as a general framework until this case study is written.
            </p>
          ) : null}
          <ol className="mt-8 grid gap-8 md:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number} className="border-t border-line pt-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{step.number}</p>
                <h3 className="mt-3 font-display text-2xl uppercase">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl uppercase">Gallery</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {gallery.map((image, index) => (
              <figure key={`${image.src}-${index}`} className={index === 0 && gallery.length === 1 ? "md:col-span-2" : ""}>
                <MediaFrame
                  src={image.src}
                  alt={image.alt || `${project.title} image ${index + 1}`}
                  label={image.label || "Gallery"}
                  index={String(index + 1).padStart(2, "0")}
                  pathNote={image.src || project.image}
                  className="aspect-[16/10] w-full"
                />
                {image.caption ? (
                  <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </article>

      <nav aria-label="More work" className="grid border-t border-line md:grid-cols-2">
        {[
          { item: prev, label: "Previous" },
          { item: next, label: "Next" },
        ].map(({ item, label }) =>
          item ? (
            <Link
              key={label}
              to={`/work/${item.slug}`}
              data-cursor="view"
              className="group flex min-h-36 flex-col justify-between border-b border-line px-4 py-8 transition-colors hover:bg-ink hover:text-bg sm:px-6 md:border-b-0 md:px-10 md:odd:border-r"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted group-hover:text-bg/60">{label}</span>
              <span className="mt-6 flex items-end justify-between gap-4 font-display text-3xl uppercase leading-none sm:text-4xl">
                {item.title}
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ) : null,
        )}
      </nav>
    </main>
  );
}
