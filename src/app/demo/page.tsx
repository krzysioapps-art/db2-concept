"use client";

import Link from "next/link";
import { useEffect } from "react";

import styles from "./demo.module.css";

export default function DemoPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.label}>
          db2 architekci
        </div>

        <h1>
          wersja demonstracyjna
        </h1>

        <p>
          Ta strona jest wersją demonstracyjną
          projektu strony internetowej db2
          architekci.
        </p>

        <p>
          Prezentowana wersja służy do
          przedstawienia układu, funkcjonalności
          oraz sposobu prezentacji treści.
        </p>

        <Link
          href="/"
          className={styles.back}
        >
          wróć na stronę główną
        </Link>
      </section>
    </main>
  );
}