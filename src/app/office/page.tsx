import { StudioScrollState } from "@/components/studio-scroll-state";

import { translations } from "@/data/translations";

import styles from "./studio.module.css";

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
  }>;
}) {
  const params = await searchParams;

  const language =
    params.lang === "en"
      ? "en"
      : "pl";

  const t = translations[language];

  return (
    <main className={styles.page}>
      <StudioScrollState
        language={language}
      />

      <section
        id="start"
        className={styles.content}
      >
        <div className={styles.heading}>
          <h1>{t.studio.title}</h1>
        </div>

        <section className={styles.intro}>
          <p>{t.studio.intro}</p>
        </section>

        <section className={styles.team}>
          <div className={styles.sectionLabel}>
            {t.studio.team}
          </div>

          <div className={styles.teamList}>
            <div>Iwona Wilczek</div>
            <div>Mariusz Tenczyński</div>
            <div>Joanna Maseli</div>
          </div>
        </section>
      </section>

      <section
        id="contact"
        className={styles.contact}
      >
        <div>
          <div className={styles.sectionLabel}>
            {t.studio.contact}
          </div>

          <h2>db2 architekci</h2>

          <address>
            ul. Andrzeja Struga 18
            <br />
            45-073 Opole
            <br />
            {t.studio.country}
          </address>

          <div className={styles.contactLinks}>
            <a href="mailto:biuro@db2.pl">
              biuro@db2.pl
            </a>

            <a href="tel:+48517958935">
              +48 517 958 935
            </a>

            <a href="#">
              instagram
            </a>
          </div>
        </div>

        <form className={styles.form}>
          <label>
            {t.studio.name}

            <input
              name="name"
              placeholder={
                t.studio.namePlaceholder
              }
            />
          </label>

          <label>
            {t.studio.email}

            <input
              type="email"
              name="email"
              placeholder={
                t.studio.emailPlaceholder
              }
            />
          </label>

          <label>
            {t.studio.message}

            <textarea
              name="message"
              rows={6}
              placeholder={
                t.studio.messagePlaceholder
              }
            />
          </label>

          <button type="submit">
            {t.studio.send}
          </button>
        </form>
      </section>
    </main>
  );
}