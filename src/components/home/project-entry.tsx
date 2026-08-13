import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";

import styles from "./project-entry.module.css";

type ProjectEntryProps = {
  project: Project;
  index: number;
  language: "pl" | "en";
};

export function ProjectEntry({
  project,
  index,
  language,
}: ProjectEntryProps) {
  return (
    <article className={styles.entry}>
      <Link
        href={
          language === "en"
            ? `/en/${project.slug}`
            : `/${project.slug}`
        }
        className={styles.link}
      >
        <div className={styles.image}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            priority={index < 2}
          />
        </div>

        <div className={styles.caption}>
          <span>{project.title}</span>

          <span>
            {project.location} · {project.year}
          </span>
        </div>
      </Link>
    </article>
  );
}