"use client";

import { flushSync } from "react-dom";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

import styles from "./project-navigation-loader.module.css";

const MINIMUM_DISPLAY_TIME = 800;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function waitForFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

export function ProjectNavigationLoader() {
  const pathname = usePathname();

  const [loading, setLoading] =
    useState(false);

  const startedAt = useRef<number | null>(
    null
  );

  useEffect(() => {
    if (!loading) {
      return;
    }

    let cancelled = false;

    const finish = async () => {
      await waitForFrame();

      if (cancelled) {
        return;
      }

      const start =
        startedAt.current ??
        performance.now();

      const elapsed =
        performance.now() - start;

      const remaining = Math.max(
        0,
        MINIMUM_DISPLAY_TIME - elapsed
      );

      if (remaining > 0) {
        await wait(remaining);
      }

      if (cancelled) {
        return;
      }

      setLoading(false);
      startedAt.current = null;
    };

    void finish();

    return () => {
      cancelled = true;
    };
  }, [pathname, loading]);

  useEffect(() => {
    const handleClick = (
      event: MouseEvent
    ) => {
      const target =
        event.target as HTMLElement | null;

      const link =
        target?.closest("a");

      if (!link) {
        return;
      }

      const href =
        link.getAttribute("href");

      if (!href) {
        return;
      }

      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      if (
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      if (!href.startsWith("/")) {
        return;
      }

      const targetPath =
        href.split("#")[0];

      const currentPath =
        window.location.pathname;

      /*
       * Ta sama podstrona:
       * hash navigation nie pokazuje loadera.
       */
      if (
        targetPath === currentPath
      ) {
        return;
      }

      /*
       * Nie uruchamiamy drugiego loadera.
       */
      if (loading) {
        return;
      }

      startedAt.current =
        performance.now();

      flushSync(() => {
        setLoading(true);
      });
    };

    document.addEventListener(
      "click",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick
      );
    };
  }, [loading]);

  if (!loading) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      aria-hidden="true"
    >
      <div className={styles.loader}>
        <div
          className={styles.track}
        >
          <div
            className={styles.progress}
          />
        </div>
      </div>
    </div>
  );
}