import { projects } from "@/data/projects";
import { HomeHero } from "@/components/home-hero";
import { ProjectIndex } from "@/components/project-index";
import { HomeScrollState } from "@/components/home-scroll-state";

import styles from "../page.module.css";

export default function EnglishHome() {
  return (
    <main className={styles.page}>
      <HomeScrollState language="en" />

      <section id="start">
        <HomeHero
          projects={projects}
          language="en"
        />
      </section>

      <section
        id="projects"
        className={styles.projects}
        aria-label="Projects"
      >
        <ProjectIndex
          projects={projects}
          language="en"
          className={styles.index}
        />
      </section>
    </main>
  );
}
