import styles from "./project-meta.module.css";

export function ProjectMeta({
  credits,
}: {
  credits: Record<string, string>;
}) {
  return (
    <div className={styles.meta}>
      {Object.entries(credits).map(
        ([label, value]) => (
          <span
            key={label}
            className={styles.item}
          >
            <span className={styles.label}>
              {label}
            </span>

            <span className={styles.value}>
              {value}
            </span>
          </span>
        )
      )}
    </div>
  );
}