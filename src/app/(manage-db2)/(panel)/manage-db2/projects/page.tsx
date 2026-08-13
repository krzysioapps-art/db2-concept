import { projects } from "@/data/projects";

import { DemoAction } from "@/components/manage-db2/demo-action";

import styles from "../manage-db2.module.css";

export default function ManageProjectsPage() {
    return (
        <>
            <header className={styles.header}>
                <div>
                    <div className={styles.eyebrow}>
                        Projekty
                    </div>

                    <h1>
                        Realizacje
                    </h1>
                </div>

                <div className={styles.headerAction}>
                    <DemoAction
                        action="add"
                        label="+ Dodaj projekt"
                    />
                </div>
            </header>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <span className={styles.label}>
                            Wszystkie projekty
                        </span>
                    </div>

                    <span className={styles.count}>
                        {projects.length} projekty
                    </span>
                </div>

                <div className={styles.projectList}>
                    {projects.map((project) => (
                        <article
                            key={project.slug}
                            className={styles.project}
                        >
                            <div className={styles.projectImage}>
                                <img
                                    src={project.thumbnail}
                                    alt=""
                                />
                            </div>

                            <div className={styles.projectInfo}>
                                <div>
                                    <h3>
                                        {project.title}
                                    </h3>

                                    <p>
                                        {project.location}
                                    </p>
                                </div>

                                <div className={styles.projectMeta}>
                                    <span>
                                        {project.year}
                                    </span>

                                    <span>
                                        {project.slug}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.projectActions}>
                                <DemoAction
                                    action="edit"
                                    projectTitle={project.title}
                                />

                                <DemoAction
                                    action="delete"
                                    projectTitle={project.title}
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}