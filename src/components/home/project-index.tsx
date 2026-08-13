import type { Project } from "@/data/projects";
import { ProjectEntry } from "./project-entry";

type ProjectIndexProps = {
  projects: Project[];
  language: "pl" | "en";
  className?: string;
};

export function ProjectIndex({
  projects,
  language,
  className,
}: ProjectIndexProps) {
  return (
    <div className={className}>
      {projects.map((project, index) => (
        <ProjectEntry
          key={project.slug}
          project={project}
          index={index}
          language={language}
        />
      ))}
    </div>
  );
}