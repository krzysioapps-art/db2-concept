"use client";

import { useEffect } from "react";

type Section = "start" | "contact";

type StudioScrollStateProps = {
  language: "pl" | "en";
};

export function StudioScrollState({
  language,
}: StudioScrollStateProps) {
  useEffect(() => {
    const start =
      document.getElementById("start");

    const contact =
      document.getElementById("contact");

    if (!start || !contact) {
      return;
    }

    let currentSection: Section =
      window.location.hash === "#contact"
        ? "contact"
        : "start";

    let initialized = false;

    let pendingTarget: Section | null =
      window.location.hash === "#contact"
        ? "contact"
        : null;

    const emitSection = (
      section: Section
    ) => {
      window.dispatchEvent(
        new CustomEvent(
          "studiosectionchange",
          {
            detail: section,
          }
        )
      );
    };

    const updateSection = (
      section: Section
    ) => {
      if (section === currentSection) {
        return;
      }

      currentSection = section;

      emitSection(section);

      const nextHash =
        section === "contact"
          ? "#contact"
          : "#start";

      const prefix =
        language === "en"
          ? "/en"
          : "";

      const nextUrl =
        `${prefix}/office${nextHash}`;

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
    };

    /*
     * Początkowy stan.
     */
    emitSection(currentSection);

    /*
     * Dajemy przeglądarce czas na
     * wykonanie natywnej kotwicy.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initialized = true;
      });
    });

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (!initialized) {
            return;
          }

          /*
           * Jeżeli użytkownik kliknął
           * konkretną kotwicę, czekamy aż
           * przeglądarka rzeczywiście
           * do niej dojedzie.
           */
          if (pendingTarget) {
            const target =
              pendingTarget === "contact"
                ? contact
                : start;

            const headerHeight =
              window.innerWidth <= 800
                ? 50
                : 55;

            const targetTop =
              target.getBoundingClientRect()
                .top;

            const reached =
              Math.abs(
                targetTop -
                  headerHeight
              ) < 12;

            if (!reached) {
              return;
            }

            pendingTarget = null;
          }

          const visible =
            entries.filter(
              (entry) =>
                entry.isIntersecting
            );

          if (!visible.length) {
            return;
          }

          const closest =
            visible.reduce(
              (closest, entry) => {
                const distance =
                  Math.abs(
                    entry.boundingClientRect
                      .top
                  );

                const closestDistance =
                  Math.abs(
                    closest.boundingClientRect
                      .top
                  );

                return distance <
                  closestDistance
                  ? entry
                  : closest;
              }
            );

          const section =
            closest.target === contact
              ? "contact"
              : "start";

          updateSection(section);
        },
        {
          root: null,

          /*
           * Konkretne wartości px/%.
           * IntersectionObserver wymaga
           * prawidłowego rootMargin.
           */
          rootMargin:
            "-55px 0px -55% 0px",

          threshold: 0,
        }
      );

    observer.observe(start);
    observer.observe(contact);

    /*
     * Reakcja na kliknięcie
     * w link zawierający hash.
     */
    const onHashChange = () => {
      const hash =
        window.location.hash;

      if (hash === "#contact") {
        pendingTarget = "contact";
        currentSection = "contact";

        emitSection("contact");
      } else {
        pendingTarget = "start";
        currentSection = "start";

        emitSection("start");
      }
    };

    window.addEventListener(
      "hashchange",
      onHashChange
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "hashchange",
        onHashChange
      );
    };
  }, [language]);

  return null;
}