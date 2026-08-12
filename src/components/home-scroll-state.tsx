"use client";

import { useEffect } from "react";

export function HomeScrollState({
  language,
}: {
  language: "pl" | "en";
}) {
  useEffect(() => {
    const projects =
      document.getElementById("projects");

    if (!projects) {
      return;
    }

    let ticking = false;
    let currentSection: "start" | "projects" =
      window.location.hash === "#projects"
        ? "projects"
        : "start";

    const updateSection = () => {
      const headerHeight =
        Number(
          getComputedStyle(
            document.documentElement
          )
            .getPropertyValue(
              "--header-height"
            )
            .replace("px", "")
        ) || 55;

      const scrollPoint =
        window.scrollY +
        headerHeight +
        40;

      const projectsTop =
        projects.getBoundingClientRect().top +
        window.scrollY;

      const nextSection =
        scrollPoint >= projectsTop
          ? "projects"
          : "start";

      if (nextSection === currentSection) {
        ticking = false;
        return;
      }

      currentSection = nextSection;

      const prefix =
        language === "en"
          ? "/en"
          : "";

      const nextHash =
        nextSection === "projects"
          ? "#projects"
          : "#start";

      const nextUrl =
        `${prefix}${nextHash}`;

      const currentUrl =
        window.location.pathname +
        window.location.hash;

      if (currentUrl !== nextUrl) {
        window.history.replaceState(
          null,
          "",
          nextUrl
        );

        window.dispatchEvent(
          new Event("sectionchange")
        );
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(
        updateSection
      );
    };

    updateSection();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateSection
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        updateSection
      );
    };
  }, [language]);

  return null;
}