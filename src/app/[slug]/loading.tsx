import styles from "./project-loading.module.css";

export default function ProjectLoading() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <span />
          <i />
          <span />
        </div>

        <div className={styles.titleRow}>
          <div className={styles.title} />

          <div className={styles.location}>
            <span />
            <span />
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.shimmer} />
      </section>

      <section className={styles.info}>
        <div className={styles.meta}>
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.description}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryItem} />
        <div className={styles.galleryItem} />
      </section>
    </main>
  );
}