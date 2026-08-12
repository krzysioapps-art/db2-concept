"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { translations } from "@/data/translations";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  const pathname = usePathname();

  const language =
    pathname === "/en" ||
    pathname.startsWith("/en/")
      ? "en"
      : "pl";

  const t = translations[language];

  const privacyHref =
    language === "en"
      ? "/en/privacy-policy"
      : "/privacy-policy";

  const termsHref =
    language === "en"
      ? "/en/terms"
      : "/terms";

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.row}>

            <span className={styles.copyright}>
            © {new Date().getFullYear()} db2 architekci
          </span>
          <div className={styles.label}>
            {t.footer.description}
          </div>

        

          <nav
            className={styles.legal}
            aria-label={
              language === "en"
                ? "Legal information"
                : "Informacje prawne"
            }
          >
            <Link href={privacyHref}>
              {t.footer.privacy}
            </Link>

            <Link href={termsHref}>
              {t.footer.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}