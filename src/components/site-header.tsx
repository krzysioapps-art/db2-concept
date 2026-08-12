"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getLanguageFromPath } from "@/data/language";

export function SiteHeader() {
  const pathname = usePathname();

  const language =
    getLanguageFromPath(pathname);

  const [hash, setHash] = useState("");

  const [studioSection, setStudioSection] =
    useState<"start" | "contact">("start");

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();

    window.addEventListener(
      "hashchange",
      updateHash
    );

    window.addEventListener(
      "sectionchange",
      updateHash
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        updateHash
      );

      window.removeEventListener(
        "sectionchange",
        updateHash
      );
    };
  }, []);

  useEffect(() => {
    const handleStudioSection = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<
          "start" | "contact"
        >;

      setStudioSection(
        customEvent.detail
      );
    };

    window.addEventListener(
      "studiosectionchange",
      handleStudioSection
    );

    return () => {
      window.removeEventListener(
        "studiosectionchange",
        handleStudioSection
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isHome =
    language === "en"
      ? pathname === "/en"
      : pathname === "/";

  const isOffice =
    language === "en"
      ? pathname === "/en/office"
      : pathname === "/office";

  const isProjectsActive =
    isHome && hash === "#projects";

  const isStudioActive =
    isOffice &&
    studioSection === "start";

  const isContactActive =
    isOffice &&
    studioSection === "contact";

  const homeHref =
    language === "en"
      ? "/en"
      : "/";

  const projectsHref =
    language === "en"
      ? "/en#projects"
      : "/#projects";

  const officeHref =
    language === "en"
      ? "/en/office#start"
      : "/office#start";

  const contactHref =
    language === "en"
      ? "/en/office#contact"
      : "/office#contact";

  const switchLanguage = (
    targetLanguage: "pl" | "en"
  ) => {
    if (targetLanguage === language) {
      return;
    }

    const currentHash =
      window.location.hash;

    const currentPath =
      pathname === "/en"
        ? "/"
        : pathname.startsWith("/en/")
          ? pathname.slice(3)
          : pathname;

    const targetPath =
      targetLanguage === "en"
        ? currentPath === "/"
          ? "/en"
          : `/en${currentPath}`
        : currentPath;

    window.location.href =
      `${targetPath}${currentHash}`;
  };

  return (
    <>
      <header className="site-header">
        <Link
          href={homeHref}
          className="brand"
          onClick={closeMenu}
        >
          db2 architekci
        </Link>

        <nav
          className="site-header__nav"
          aria-label="Główna nawigacja"
        >
          <a
            href={projectsHref}
            className={
              isProjectsActive
                ? "is-active"
                : undefined
            }
            onClick={closeMenu}
          >
            {language === "en"
              ? "projects"
              : "projekty"}
          </a>

          <a
            href={officeHref}
            className={
              isStudioActive
                ? "is-active"
                : undefined
            }
            onClick={closeMenu}
          >
            {language === "en"
              ? "office"
              : "pracownia"}
          </a>

          <a
            href={contactHref}
            className={
              isContactActive
                ? "is-active"
                : undefined
            }
            onClick={closeMenu}
          >
            {language === "en"
              ? "contact"
              : "kontakt"}
          </a>

          <div
            className="language-switcher"
            aria-label="Wybór języka"
          >
            <button
              type="button"
              className={
                language === "pl"
                  ? "language-switcher__active"
                  : undefined
              }
              onClick={() =>
                switchLanguage("pl")
              }
            >
              PL
            </button>

            <span>/</span>

            <button
              type="button"
              className={
                language === "en"
                  ? "language-switcher__active"
                  : undefined
              }
              onClick={() =>
                switchLanguage("en")
              }
            >
              EN
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={
            menuOpen
              ? language === "en"
                ? "Close menu"
                : "Zamknij menu"
              : language === "en"
                ? "Open menu"
                : "Otwórz menu"
          }
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(
              (value) => !value
            )
          }
        >
          {menuOpen ? (
            <X
              size={22}
              strokeWidth={1.5}
            />
          ) : (
            <Menu
              size={22}
              strokeWidth={1.5}
            />
          )}
        </button>
      </header>

      <div
        className={`mobile-menu ${
          menuOpen
            ? "mobile-menu--open"
            : ""
        }`}
      >
        <nav className="mobile-menu__nav">
          <a
            href={projectsHref}
            className={
              isProjectsActive
                ? "is-active"
                : undefined
            }
            onClick={closeMenu}
          >
            {language === "en"
              ? "projects"
              : "projekty"}
          </a>

          <a
            href={officeHref}
            className={
              isStudioActive
                ? "is-active"
                : undefined
            }
            onClick={closeMenu}
          >
            {language === "en"
              ? "office"
              : "pracownia"}
          </a>

          <a
            href={contactHref}
            className={
              isContactActive
                ? "is-active"
                : undefined
            }
            onClick={closeMenu}
          >
            {language === "en"
              ? "contact"
              : "kontakt"}
          </a>
        </nav>

        <div className="mobile-menu__language">
          <button
            type="button"
            className={
              language === "pl"
                ? "language-switcher__active"
                : undefined
            }
            onClick={() =>
              switchLanguage("pl")
            }
          >
            PL
          </button>

          <span>/</span>

          <button
            type="button"
            className={
              language === "en"
                ? "language-switcher__active"
                : undefined
            }
            onClick={() =>
              switchLanguage("en")
            }
          >
            EN
          </button>
        </div>
      </div>
    </>
  );
}