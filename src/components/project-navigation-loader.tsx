"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import styles from "./project-navigation-loader.module.css";

export function ProjectNavigationLoader() {
  const pathname = usePathname();

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    // Nowa strona została załadowana.
    // Ukrywamy loader.
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target =
        event.target as HTMLElement | null;

      const link =
        target?.closest("a");

      if (!link) {
        return;
      }

      const href =
        link.getAttribute("href");

      if (!href) {
        return;
      }

      /*
       * Projekty:
       *
       * /project
       * /en/project
       *
       * Nie łapiemy:
       *
       * /
       * /en
       * /office
       * /en/office
       * /#projects
       */
      const isProjectLink =
        /^\/(?:en\/)?[^/#?]+$/.test(
          href
        );

      if (!isProjectLink) {
        return;
      }

      /*
       * Jeżeli kliknięto już aktualną
       * stronę, nie pokazujemy loadera.
       */
      const targetPath =
        href.split("#")[0];

      if (
        targetPath === pathname
      ) {
        return;
      }

      setLoading(true);
    };

    document.addEventListener(
      "click",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick
      );
    };
  }, [pathname]);

  if (!loading) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      aria-hidden="true"
    >
      <div className={styles.label}>
        db2 architekci
      </div>
    </div>
  );
}