import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-y-16">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
