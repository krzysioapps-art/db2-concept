"use client";

import { useEffect } from "react";

type SectionConfig = {
  id: string;
  hash: string;
};

type SectionScrollStateProps = {
  language: "pl" | "en";
  basePath: string;
  sections: SectionConfig[];
};

export function SectionScrollState({
  language,
  basePath,
  sections,
}: SectionScrollStateProps) {
  useEffect(() => {
    let cancelled = false;
    let initialized = false;
    let ticking = false;

    const elements = sections
      .map((section) => ({
        ...section,
        element: document.getElementById(
          section.id
        ),
      }))
      .filter(
        (
          section
        ): section is SectionConfig & {
          element: HTMLElement;
        } => Boolean(section.element)
      );

    if (!elements.length) {
      return;
    }

    const getHeaderHeight = () => {
      return (
        Number(
          getComputedStyle(
            document.documentElement
          )
            .getPropertyValue(
              "--header-height"
            )
            .replace("px", "")
        ) || 55
      );
    };

    const getSectionFromHash = (
      hash = window.location.hash
    ) => {
      return (
        elements.find(
          (section) =>
            section.hash === hash
        )?.id ?? elements[0].id
      );
    };

    const getSectionUrl = (
      sectionId: string
    ) => {
      const section = elements.find(
        (item) =>
          item.id === sectionId
      );

      if (!section) {
        return null;
      }

      return `${basePath}${section.hash}`;
    };

    const emitSection = (
      sectionId: string
    ) => {
      window.dispatchEvent(
        new CustomEvent(
          "sectionchange",
          {
            detail: {
              section: sectionId,
            },
          }
        )
      );
    };

    const scrollToSection = (
      sectionId: string
    ) => {
      const section = elements.find(
        (item) =>
          item.id === sectionId
      );

      if (!section) {
        return;
      }

      const headerHeight =
        getHeaderHeight();

      const top =
        section.element.getBoundingClientRect()
          .top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "auto",
      });
    };

    const updateUrl = (
      sectionId: string
    ) => {
      const nextUrl =
        getSectionUrl(sectionId);

      if (!nextUrl) {
        return;
      }

      const currentUrl =
        window.location.pathname +
        window.location.hash;

      if (currentUrl === nextUrl) {
        return;
      }

      window.history.replaceState(
        null,
        "",
        nextUrl
      );

      emitSection(sectionId);
    };

    let currentSection =
      getSectionFromHash();

    /*
     * Hash obecny przy wejściu na stronę
     * jest nadrzędny.
     *
     * Nie pozwalamy observerowi wybrać
     * pierwszej sekcji, dopóki nie
     * ustawimy właściwego scrolla.
     */
    let pendingHash =
      window.location.hash || null;

    emitSection(currentSection);

    const updateSection = () => {
      if (
        cancelled ||
        !initialized
      ) {
        ticking = false;
        return;
      }

      /*
       * Jeżeli mamy konkretną kotwicę,
       * nie pozwalamy jeszcze observerowi
       * zmienić aktywnej sekcji.
       */
      if (pendingHash) {
        const targetSection =
          elements.find(
            (section) =>
              section.hash ===
              pendingHash
          );

        if (targetSection) {
          currentSection =
            targetSection.id;

          ticking = false;
          return;
        }

        pendingHash = null;
      }

      const headerHeight =
        getHeaderHeight();

      let active =
        elements[0];

      for (
        const section of elements
      ) {
        const top =
          section.element.getBoundingClientRect()
            .top;

        if (
          top <=
          headerHeight + 1
        ) {
          active = section;
        } else {
          break;
        }
      }

      if (
        active.id !==
        currentSection
      ) {
        currentSection =
          active.id;

        updateUrl(
          active.id
        );
      }

      ticking = false;
    };

    const scheduleUpdate = () => {
      if (
        ticking ||
        !initialized
      ) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(
        updateSection
      );
    };

    const waitForLayout = async () => {
      if (
        document.fonts?.ready
      ) {
        try {
          await document.fonts.ready;
        } catch {
          // Fonty nie blokują inicjalizacji.
        }
      }

      if (cancelled) {
        return;
      }

      /*
       * Kilka klatek pozwala:
       *
       * - zakończyć render Reacta,
       * - ustabilizować fonty,
       * - ustabilizować wysokość hero,
       * - pozwolić przeglądarce wykonać
       *   ewentualną natywną kotwicę.
       */
      await new Promise<void>(
        (resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                resolve();
              });
            });
          });
        }
      );

      if (cancelled) {
        return;
      }

      const currentHash =
        window.location.hash;

      /*
       * Jeżeli hash istnieje,
       * ustawiamy scroll RĘCZNIE po
       * ustabilizowaniu layoutu.
       *
       * To jest zabezpieczenie przed
       * sytuacją:
       *
       * /#projects
       *
       * ale ekran nadal pokazuje hero.
       */
      if (currentHash) {
        const targetSection =
          getSectionFromHash(
            currentHash
          );

        pendingHash =
          elements.some(
            (section) =>
              section.hash ===
              currentHash
          )
            ? currentHash
            : null;

        currentSection =
          targetSection;

        emitSection(
          targetSection
        );

        if (pendingHash) {
          scrollToSection(
            targetSection
          );
        }
      } else {
        pendingHash = null;
        currentSection =
          elements[0].id;

        emitSection(
          currentSection
        );
      }

      initialized = true;

      /*
       * Dodatkowa korekta po kolejnej
       * klatce. Jest potrzebna szczególnie
       * wtedy, gdy wysokość obrazów zmieni
       * się chwilę po pierwszym layoucie.
       */
      if (currentHash) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cancelled) {
              return;
            }

            const latestHash =
              window.location.hash;

            if (!latestHash) {
              return;
            }

            const targetSection =
              getSectionFromHash(
                latestHash
              );

            currentSection =
              targetSection;

            pendingHash =
              elements.some(
                (section) =>
                  section.hash ===
                  latestHash
              )
                ? latestHash
                : null;

            if (pendingHash) {
              scrollToSection(
                targetSection
              );

              emitSection(
                targetSection
              );

              pendingHash = null;
            }

            scheduleUpdate();
          });
        });
      }
    };

    void waitForLayout();

    const onScroll = () => {
      scheduleUpdate();
    };

    const onResize = () => {
      /*
       * Po resize ponownie pozwalamy
       * observerowi ustalić aktywną sekcję.
       */
      scheduleUpdate();
    };

    const onHashChange = () => {
      const nextHash =
        window.location.hash;

      if (!nextHash) {
        pendingHash = null;
        currentSection =
          elements[0].id;

        emitSection(
          currentSection
        );

        scheduleUpdate();
        return;
      }

      const targetSection =
        getSectionFromHash(
          nextHash
        );

      const isKnownHash =
        elements.some(
          (section) =>
            section.hash ===
            nextHash
        );

      if (!isKnownHash) {
        pendingHash = null;
        currentSection =
          targetSection;

        emitSection(
          targetSection
        );

        scheduleUpdate();
        return;
      }

      /*
       * Kliknięcie w header / okruszek:
       * hash ma pierwszeństwo.
       */
      pendingHash =
        nextHash;

      currentSection =
        targetSection;

      emitSection(
        targetSection
      );

      /*
       * Dajemy przeglądarce chwilę,
       * a potem ustawiamy scroll
       * ponownie ręcznie.
       */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cancelled) {
              return;
            }

            scrollToSection(
              targetSection
            );

            pendingHash = null;

            emitSection(
              targetSection
            );

            scheduleUpdate();
          });
        });
      });
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onResize
    );

    window.addEventListener(
      "hashchange",
      onHashChange
    );

    return () => {
      cancelled = true;
      initialized = false;

      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onResize
      );

      window.removeEventListener(
        "hashchange",
        onHashChange
      );
    };
  }, [
    language,
    basePath,
    sections,
  ]);

  return null;
}