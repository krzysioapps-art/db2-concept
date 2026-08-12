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

    const updateSection = () => {
      const headerHeight = Number(
        getComputedStyle(
          document.documentElement
        )
          .getPropertyValue(
            "--header-height"
          )
          .replace("px", "")
      );

      const scrollPoint =
        window.scrollY +
        headerHeight +
        40;

      const projectsTop =
        projects.getBoundingClientRect().top +
        window.scrollY;

      const isProjects =
        scrollPoint >= projectsTop;

      const prefix =
        language === "en"
          ? "/en"
          : "";

      const nextUrl = isProjects
        ? `${prefix}#projects`
        : `${prefix}#start`;

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
      if (!ticking) {
        window.requestAnimationFrame(
          updateSection
        );

        ticking = true;
      }
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