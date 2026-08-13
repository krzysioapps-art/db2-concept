"use client";

import { useState } from "react";

import styles from "./demo-action.module.css";

type DemoActionProps = {
  action: "add" | "edit" | "delete";
  projectTitle?: string;
  label?: string;
};

export function DemoAction({
  action,
  projectTitle,
  label,
}: DemoActionProps) {
  const [open, setOpen] = useState(false);

  const title =
    action === "add"
      ? "Dodawanie"
      : action === "edit"
        ? "Edycja"
        : "Usuwanie";

  const description =
    action === "add"
      ? "W wersji demo nie można dodawać nowych elementów."
      : action === "edit"
        ? projectTitle
          ? `Projekt „${projectTitle}" można edytować w pełnej wersji panelu.`
          : "Dane można edytować w pełnej wersji panelu."
        : `Projekt „${projectTitle}" można usunąć w pełnej wersji panelu.`;

  return (
    <>
      <button
        type="button"
        className={
          action === "add"
            ? styles.primary
            : styles.secondary
        }
        onClick={() => setOpen(true)}
      >
        {label ??
          (action === "add"
            ? "+ Dodaj"
            : action === "edit"
              ? "Edytuj"
              : "Usuń")}
      </button>

      {open && (
        <div
          className={styles.backdrop}
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className={styles.modalHeader}>
              <span className={styles.modalLabel}>
                DEMO
              </span>

              <button
                type="button"
                className={styles.close}
                onClick={() => setOpen(false)}
                aria-label="Zamknij"
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <h2>{title}</h2>

              <p>{description}</p>

              <p className={styles.notice}>
                Zmiany nie są zapisywane w
                wersji demonstracyjnej.
              </p>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.confirm}
                onClick={() => setOpen(false)}
              >
                Rozumiem
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}