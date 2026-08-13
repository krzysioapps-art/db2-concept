import { ManageAuth } from "@/components/manage-db2/manage-auth";
import { ManageSidebar } from "@/components/manage-db2/manage-sidebar";

import styles from "./manage-db2.module.css";

export default function ManageDb2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ManageAuth>
      <div className={styles.layout}>
        <div className={styles.page}>
          <ManageSidebar />

          <main className={styles.main}>
            {children}
          </main>
        </div>
      </div>
    </ManageAuth>
  );
}