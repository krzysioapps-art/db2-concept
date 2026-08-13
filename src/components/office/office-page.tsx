import { SectionScrollState } from "@/components/navigation/section-scroll-state";
import { translations } from "@/data/translations";

import styles from "@/app/(site)/office/studio.module.css";

import { PolishText } from "@/components/ui/polish-text";

type OfficePageProps = {
  language: "pl" | "en";
};

export function OfficePage({
  language,
}: OfficePageProps) {
  const t = translations[language];

  const basePath =
    language === "en"
      ? "/en/office"
      : "/office";

  return (
    <main className={styles.page}>
      <SectionScrollState
        language={language}
        basePath={basePath}
        sections={[
          {
            id: "start",
            hash: "#start",
          },
          {
            id: "contact",
            hash: "#contact",
          },
        ]}
      />

      <section
        id="start"
        className={styles.content}
      >
        <div className={styles.heading}>
          <h1>{t.studio.title}</h1>
        </div>

        <section className={styles.intro}>
          <p>
            <PolishText>
              {t.studio.intro}
            </PolishText>
          </p>
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
              
            />
          </label>

          <label>
            {t.studio.email}

            <input
              type="email"
              name="email"
              
            />
          </label>

          <label>
            {t.studio.message}

            <textarea
              name="message"
              rows={6}
              
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
