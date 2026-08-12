import styles from "./project-meta.module.css";

export function ProjectMeta({
  credits,
}: {
  credits: Record<string, string>;
}) {
  return (
    <dl className={styles.meta}>
      {Object.entries(credits).map(([label, value]) => (
        <div key={label} className={styles.row}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}