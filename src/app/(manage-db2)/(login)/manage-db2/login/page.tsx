"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

import styles from "./login.module.css";

import { MANAGE_AUTH_KEY } from "@/components/manage-db2/manage-auth";

const DEMO_LOGIN = "demo";
const DEMO_PASSWORD = "db2demo";

export default function ManageLoginPage() {
  const searchParams = useSearchParams();

  const next =
    searchParams.get("next") ||
    "/manage-db2";

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      login === DEMO_LOGIN &&
      password === DEMO_PASSWORD
    ) {
      sessionStorage.setItem(
        MANAGE_AUTH_KEY,
        "true"
      );

      window.location.href = next;

      return;
    }

    setError(
      "Nieprawidłowy login lub hasło."
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            manage-db2
          </span>

          <h1>
            Logowanie
          </h1>

          <p>
            Panel zarządzania treścią
            pracowni.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <label>
            Login

            <input
              value={login}
              onChange={(event) =>
                setLogin(event.target.value)
              }
              autoComplete="username"
            />
          </label>

          <label>
            Hasło

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <button type="submit">
            Zaloguj się
          </button>
        </form>

        <div className={styles.demo}>
          <span>DEMO</span>

          <p>
            Login: <strong>demo</strong>
            <br />
            Hasło: <strong>db2demo</strong>
          </p>

          <small>
            Dane logowania są stałe i służą
            wyłącznie do prezentacji.
          </small>
        </div>
      </div>
    </main>
  );
}