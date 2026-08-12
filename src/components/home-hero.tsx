"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Project } from "@/data/projects";

import styles from "./home-hero.module.css";

type HomeHeroProps = {
  projects: Project[];
  language: "pl" | "en";
};

const AUTOPLAY_DELAY = 6000;

export function HomeHero({
  projects,
  language,
}: HomeHeroProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [displayIndex, setDisplayIndex] =
    useState(0);

  useEffect(() => {
    if (projects.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next =
          (current + 1) % projects.length;

        setDisplayIndex(next);

        return next;
      });
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [projects.length]);

  if (!projects.length) {
    return null;
  }

  const project = projects[displayIndex];

  function selectProject(index: number) {
    if (index === activeIndex) {
      return;
    }

    setActiveIndex(index);
    setDisplayIndex(index);
  }

  return (
    <section className={styles.hero}>
      <div className={styles.images}>
        {projects.map((item, index) => (
          <div
            key={item.slug}
            className={`${styles.image} ${
              index === displayIndex
                ? styles.imageActive
                : ""
            }`}
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className={styles.overlay}>
        <div className={styles.info}>
          <h1>{project.title}</h1>

          <div className={styles.meta}>
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <div
            className={styles.dots}
            aria-label={
              language === "en"
                ? "Project selection"
                : "Wybór projektu"
            }
          >
            {projects.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                className={
                  index === activeIndex
                    ? styles.dotActive
                    : styles.dot
                }
                aria-label={
                  language === "en"
                    ? `Project ${
                        index + 1
                      }: ${item.title}`
                    : `Projekt ${
                        index + 1
                      }: ${item.title}`
                }
                aria-current={
                  index === activeIndex
                    ? "true"
                    : undefined
                }
                onClick={() =>
                  selectProject(index)
                }
              />
            ))}
          </div>

          <Link
            href={
              language === "en"
                ? `/en/${project.slug}`
                : `/${project.slug}`
            }
            className={styles.link}
          >
            {language === "en"
              ? "view project"
              : "zobacz projekt"}
          </Link>
        </div>
      </div>
    </section>
  );
}