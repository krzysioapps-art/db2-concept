import styles from "./login-layout.module.css";

export default function ManageLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}