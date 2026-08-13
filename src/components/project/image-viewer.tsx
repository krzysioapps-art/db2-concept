"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type { ProjectImage } from "@/data/projects";

import styles from "./image-viewer.module.css";

type ImageViewerProps = {
  images: ProjectImage[];
  title: string;
  startIndex: number;
  onClose: () => void;
};

export function ImageViewer({
  images,
  title,
  startIndex,
  onClose,
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] =
    useState(startIndex);

  const [touchStartX, setTouchStartX] =
    useState<number | null>(null);

  const total = images.length;

  const currentImage =
    images[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((current) =>
      current + 1 >= total
        ? 0
        : current + 1
    );
  }, [total]);

  const goPrevious = useCallback(() => {
    setCurrentIndex((current) =>
      current - 1 < 0
        ? total - 1
        : current - 1
    );
  }, [total]);

  /*
   * Klawiatura + blokada scrolla strony.
   */
  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    goNext,
    goPrevious,
    onClose,
  ]);

  /*
   * Swipe na mobile.
   */
  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    setTouchStartX(
      event.touches[0]?.clientX ?? null
    );
  };

  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (touchStartX === null) {
      return;
    }

    const endX =
      event.changedTouches[0]?.clientX ??
      touchStartX;

    const difference =
      touchStartX - endX;

    const threshold = 50;

    if (difference > threshold) {
      goNext();
    }

    if (difference < -threshold) {
      goPrevious();
    }

    setTouchStartX(null);
  };

  if (!currentImage || !total) {
    return null;
  }

  return (
    <div
      className={styles.viewer}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — podgląd zdjęć`}
      onClick={onClose}
    >
      <button
        type="button"
        className={`${styles.control} ${styles.close}`}
        onClick={onClose}
        aria-label="Zamknij viewer"
      >
        <X
          size={22}
          strokeWidth={1.5}
        />
      </button>

      <button
        type="button"
        className={`${styles.control} ${styles.previous}`}
        onClick={(event) => {
          event.stopPropagation();
          goPrevious();
        }}
        aria-label="Poprzednie zdjęcie"
      >
        <ChevronLeft
          size={28}
          strokeWidth={1.25}
        />
      </button>

      <div
        className={styles.imageWrap}
        onClick={(event) =>
          event.stopPropagation()
        }
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={currentImage.src}
          src={currentImage.src}
          alt={`${title} — fotografia ${
            currentIndex + 1
          }`}
          fill
          sizes="100vw"
          priority
          className={styles.image}
        />
      </div>

      <button
        type="button"
        className={`${styles.control} ${styles.next}`}
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        aria-label="Następne zdjęcie"
      >
        <ChevronRight
          size={28}
          strokeWidth={1.25}
        />
      </button>

      <div
        className={styles.counter}
        aria-live="polite"
      >
        {currentIndex + 1} / {total}
      </div>
    </div>
  );
}