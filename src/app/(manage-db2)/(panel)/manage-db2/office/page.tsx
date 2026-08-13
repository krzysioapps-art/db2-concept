import { DemoAction } from "@/components/manage-db2/demo-action";

import styles from "../manage-db2.module.css";

const team = [
    "Iwona Wilczek",
    "Mariusz Tenczyński",
    "Joanna Maseli",
];

export default function ManageOfficePage() {
    return (
        <>
            <header className={styles.header}>
                <div>
                    <div className={styles.eyebrow}>
                        Pracownia
                    </div>

                    <h1>
                        Informacje
                    </h1>
                </div>
            </header>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <span className={styles.label}>
                            Dane
                        </span>

                        <h2>
                            Pracownia
                        </h2>
                    </div>

                    <DemoAction action="edit" />
                </div>

                <div className={styles.officeGrid}>
                    <div className={styles.field}>
                        <span>Nazwa</span>
                        <strong>db2 architekci</strong>
                    </div>

                    <div className={styles.field}>
                        <span>Adres</span>

                        <strong>
                            ul. Andrzeja Struga 18
                            <br />
                            45-073 Opole
                            <br />
                            Polska
                        </strong>
                    </div>

                    <div className={styles.field}>
                        <span>E-mail</span>

                        <strong>
                            biuro@db2.pl
                        </strong>
                    </div>

                    <div className={styles.field}>
                        <span>Telefon</span>

                        <strong>
                            +48 517 958 935
                        </strong>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <span className={styles.label}>
                            Zespół
                        </span>

                        <h2>
                            Osoby
                        </h2>
                    </div>

                    <DemoAction
                        action="add"
                        label="+ Dodaj osobę"
                    />
                </div>

                <div className={styles.teamList}>
                    {team.map((person) => (
                        <div
                            key={person}
                            className={styles.teamRow}
                        >
                            <span>{person}</span>

                            <DemoAction action="edit" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}