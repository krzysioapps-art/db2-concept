import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getProject,
  projects,
} from "@/data/projects";

import { ProjectGallery } from "@/components/project/project-gallery";
import { ProjectMeta } from "@/components/project/project-meta";

import { translations } from "@/data/translations";

import styles from "./project.module.css";

import { PolishText } from "@/components/ui/polish-text";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({
    slug,
  }));
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    lang?: string;
  }>;
}) {
  const { slug } = await params;

  const query = await searchParams;

  const language =
    query.lang === "en"
      ? "en"
      : "pl";

  const t = translations[language];

  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const homeProjectsHref =
    language === "en"
      ? "/en#projects"
      : "/#projects";

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <nav
          className={styles.breadcrumbs}
          aria-label={
            language === "en"
              ? "Breadcrumb"
              : "Okruszki nawigacji"
          }
        >
          <Link href={homeProjectsHref}>
            {t.projects.title}
          </Link>

          <span>/</span>

          <span aria-current="page">
            {project.title}
          </span>
        </nav>

        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            {project.title}
          </h1>

          <div className={styles.location}>
            {project.location}
            <br />
            {project.year}
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <img
          src={project.thumbnail}
          alt={project.title}
        />
      </section>

      <section className={styles.info}>
        <ProjectMeta
          credits={project.credits[language]}
        />

        <div className={styles.description}>
          {project.description[language].map(
            (paragraph, index) => (
              <p key={index}>
                <PolishText>
                  {paragraph}
                </PolishText>
              </p>
            )
          )}
        </div>
      </section>

      <ProjectGallery
        images={project.images.slice(1)}
        title={project.title}
      />
    </main>
  );
}