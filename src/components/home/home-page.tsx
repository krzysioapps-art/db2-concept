import { projects } from "@/data/projects";
import { HomeHero } from "@/components/home/home-hero";
import { ProjectIndex } from "@/components/home/project-index";
import { SectionScrollState } from "@/components/navigation/section-scroll-state";

import styles from "@/app/page.module.css";

type HomePageProps = {
  language: "pl" | "en";
};

export function HomePage({
  language,
}: HomePageProps) {
  return (
    <main className={styles.page}>
      <SectionScrollState
        language={language}
        basePath={
          language === "en"
            ? "/en"
            : ""
        }
        sections={[
          {
            id: "start",
            hash: "#start",
          },
          {
            id: "projects",
            hash: "#projects",
          },
        ]}
      />

      <section
        id="start"
        className={styles.start}
      >
        <HomeHero
          projects={projects}
          language={language}
        />
      </section>

      <section
        id="projects"
        className={styles.projects}
        aria-label={
          language === "en"
            ? "Projects"
            : "Projekty"
        }
      >
        <ProjectIndex
          projects={projects}
          language={language}
          className={styles.index}
        />
      </section>
    </main>
  );
}
