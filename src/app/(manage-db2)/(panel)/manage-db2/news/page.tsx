import { DemoAction } from "@/components/manage-db2/demo-action";

import styles from "../manage-db2.module.css";

export default function ManageNewsPage() {
    return (
        <>
            <header className={styles.header}>
                <div>
                    <div className={styles.eyebrow}>
                        Aktualności
                    </div>

                    <h1>
                        Aktualności
                    </h1>
                </div>

                <div className={styles.headerAction}>
                    <DemoAction
                        action="add"
                        label="+ Dodaj aktualność"
                    />
                </div>
            </header>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <span className={styles.label}>
                            Publikacje
                        </span>

                        <h2>
                            Wpisy
                        </h2>
                    </div>

                    <span className={styles.count}>
                        0 wpisów
                    </span>
                </div>

                <div className={styles.emptyState}>
                    <div className={styles.emptyStateTitle}>
                        Brak aktualności
                    </div>

                    <p>
                        W pełnej wersji panelu tutaj
                        można dodawać i edytować
                        aktualności pracowni.
                    </p>

                    <DemoAction
                        action="add"
                        label="+ Dodaj aktualność"
                    />
                </div>
            </section>
        </>
    );
}