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

  const [officeSection, setOfficeSection] =
    useState<"start" | "contact">("start");

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {
    const updateState = () => {
      const currentHash =
        window.location.hash;

      setHash(currentHash);

      if (
        pathname === "/office" ||
        pathname === "/en/office"
      ) {
        setOfficeSection(
          currentHash === "#contact"
            ? "contact"
            : "start"
        );
      }
    };

    updateState();

    window.addEventListener(
      "hashchange",
      updateState
    );

    window.addEventListener(
      "sectionchange",
      updateState
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        updateState
      );

      window.removeEventListener(
        "sectionchange",
        updateState
      );
    };
  }, [pathname]);

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
    isHome &&
    hash === "#projects";

  const isStudioActive =
    isOffice &&
    officeSection === "start";

  const isContactActive =
    isOffice &&
    officeSection === "contact";

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

    let targetPath: string;

    if (targetLanguage === "en") {
      if (pathname === "/") {
        targetPath = "/en";
      } else if (
        pathname === "/office"
      ) {
        targetPath = "/en/office";
      } else {
        targetPath =
          pathname.startsWith("/en/")
            ? pathname
            : `/en${pathname}`;
      }
    } else {
      if (pathname === "/en") {
        targetPath = "/";
      } else if (
        pathname === "/en/office"
      ) {
        targetPath = "/office";
      } else {
        targetPath =
          pathname.startsWith("/en/")
            ? pathname.slice(3)
            : pathname;
      }
    }

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