"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./manage-sidebar.module.css";

import { ManageLogout } from "./manage-logout";

export function ManageSidebar() {
  const pathname = usePathname();

  const isProjects =
    pathname === "/manage-db2/projects" ||
    pathname.startsWith("/manage-db2/projects/");

  const isNews =
    pathname === "/manage-db2/news" ||
    pathname.startsWith("/manage-db2/news/");

  const isOffice =
    pathname === "/manage-db2/office" ||
    pathname.startsWith("/manage-db2/office/");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        db2 architekci
      </div>

      <nav
        className={styles.nav}
        aria-label="Panel zarządzania"
      >
        <Link
          href="/manage-db2/projects"
          className={
            isProjects
              ? styles.active
              : undefined
          }
        >
          Projekty
        </Link>

        <Link
          href="/manage-db2/news"
          className={
            isNews
              ? styles.active
              : undefined
          }
        >
          Aktualności
        </Link>

        <Link
          href="/manage-db2/office"
          className={
            isOffice
              ? styles.active
              : undefined
          }
        >
          Pracownia
        </Link>
      </nav>

      <div className={styles.logout}>
  <ManageLogout />
</div>

      <div className={styles.demoNotice}>
        <span>DEMO</span>

        <p>
          Panel prezentacyjny.
          Zapisywanie zmian jest
          wyłączone.
        </p>
      </div>
    </aside>
  );
}