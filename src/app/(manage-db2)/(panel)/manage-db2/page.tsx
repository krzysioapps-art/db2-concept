import Link from "next/link";

import { projects } from "@/data/projects";

import styles from "./manage-db2.module.css";

export default function ManageDb2Page() {
  return (
    <>
      <header className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            manage-db2
          </div>

          <h1>
            Zarządzanie treścią
          </h1>
        </div>
      </header>

      <section className={styles.dashboard}>
        <Link
          href="/manage-db2/projects"
          className={styles.dashboardCard}
        >
          <span className={styles.label}>
            Projekty
          </span>

          <strong>
            {projects.length}
          </strong>

          <span>
            realizacje
          </span>
        </Link>

        <Link
          href="/manage-db2/news"
          className={styles.dashboardCard}
        >
          <span className={styles.label}>
            Aktualności
          </span>

          <strong>0</strong>

          <span>
            wpisów
          </span>
        </Link>

        <Link
          href="/manage-db2/office"
          className={styles.dashboardCard}
        >
          <span className={styles.label}>
            Pracownia
          </span>

          <strong>1</strong>

          <span>
            strona
          </span>
        </Link>
      </section>
    </>
  );
}