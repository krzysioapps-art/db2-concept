import { projects } from "@/data/projects";
import { HomeHero } from "@/components/home-hero";
import { ProjectIndex } from "@/components/project-index";
import { HomeScrollState } from "@/components/home-scroll-state";

import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
  }>;
}) {
  const params = await searchParams;

  const language =
    params.lang === "en"
      ? "en"
      : "pl";

  return (
    <main className={styles.page}>
      <HomeScrollState
        language={language}
      />

      <section id="start">
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