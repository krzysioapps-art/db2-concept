"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ProjectImage } from "@/data/projects";

import { ImageViewer } from "@/components/project/image-viewer";

import styles from "./project-gallery.module.css";

type ProjectGalleryProps = {
  images: ProjectImage[];
  title: string;
};

type ImageRatio = {
  src: string;
  ratio: number;
  index: number;
};

type GalleryRow = {
  images: ImageRatio[];
  height: number;
};

const DESKTOP_GAP = 8;
const MOBILE_GAP = 6;

const DESKTOP_ROW_HEIGHT = 250;
const MOBILE_ROW_HEIGHT = 170;

const MIN_IMAGES_PER_ROW = 2;
const MAX_IMAGES_PER_ROW = 4;

export function ProjectGallery({
  images,
  title,
}: ProjectGalleryProps) {
  const galleryRef =
    useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] =
    useState(0);

  const [ratios, setRatios] = useState<
    Record<string, number>
  >({});

  const [viewerIndex, setViewerIndex] =
    useState<number | null>(null);

  /*
   * Szerokość galerii
   */
  useEffect(() => {
    const element =
      galleryRef.current;

    if (!element) {
      return;
    }

    const update = () => {
      setContainerWidth(
        element.getBoundingClientRect().width
      );
    };

    update();

    const observer =
      new ResizeObserver(update);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Rzeczywiste proporcje zdjęcia.
   */
  function handleImageLoad(
    event: React.SyntheticEvent<HTMLImageElement>,
    src: string
  ) {
    const image =
      event.currentTarget;

    if (
      !image.naturalWidth ||
      !image.naturalHeight
    ) {
      return;
    }

    const ratio =
      image.naturalWidth /
      image.naturalHeight;

    setRatios((current) => {
      if (current[src] === ratio) {
        return current;
      }

      return {
        ...current,
        [src]: ratio,
      };
    });
  }

  const imageRatios =
    useMemo<ImageRatio[]>(
      () =>
        images.map(
          (image, index) => ({
            src: image.src,
            index,
            ratio:
              ratios[image.src] ??
              (image.orientation ===
              "portrait"
                ? 3 / 4
                : 3 / 2),
          })
        ),
      [images, ratios]
    );

  /*
   * JUSTIFIED GALLERY
   */
  const rows =
    useMemo<GalleryRow[]>(() => {
      if (!containerWidth) {
        return [];
      }

      const isMobile =
        containerWidth < 800;

      const targetHeight =
        isMobile
          ? MOBILE_ROW_HEIGHT
          : DESKTOP_ROW_HEIGHT;

      /*
       * Musi odpowiadać gapowi
       * z CSS:
       *
       * desktop: 8px
       * mobile: 6px
       */
      const gap =
        isMobile
          ? MOBILE_GAP
          : DESKTOP_GAP;

      const result: GalleryRow[] = [];

      let index = 0;

      while (
        index < imageRatios.length
      ) {
        const remaining =
          imageRatios.length -
          index;

        /*
         * OSTATNI RZĄD
         */
        if (
          remaining <=
          MAX_IMAGES_PER_ROW
        ) {
          result.push({
            images:
              imageRatios.slice(
                index
              ),
            height:
              targetHeight,
          });

          break;
        }

        let bestCount =
          MIN_IMAGES_PER_ROW;

        let bestHeight =
          targetHeight;

        let bestDifference =
          Infinity;

        for (
          let count =
            MIN_IMAGES_PER_ROW;
          count <=
          MAX_IMAGES_PER_ROW;
          count++
        ) {
          if (
            index + count >
            imageRatios.length
          ) {
            break;
          }

          const imagesAfter =
            imageRatios.length -
            (index + count);

          /*
           * Nie zostawiamy pojedynczego
           * zdjęcia w kolejnym rzędzie.
           */
          if (
            imagesAfter === 1 &&
            count >
              MIN_IMAGES_PER_ROW
          ) {
            continue;
          }

          const rowImages =
            imageRatios.slice(
              index,
              index + count
            );

          const ratioSum =
            rowImages.reduce(
              (sum, image) =>
                sum + image.ratio,
              0
            );

          /*
           * Naturalna wysokość rzędu.
           */
          const height =
            (containerWidth -
              (count - 1) * gap) /
            ratioSum;

          const difference =
            Math.abs(
              height -
                targetHeight
            );

          if (
            difference <
            bestDifference
          ) {
            bestDifference =
              difference;

            bestCount = count;

            bestHeight =
              height;
          }
        }

        result.push({
          images:
            imageRatios.slice(
              index,
              index +
                bestCount
            ),
          height:
            bestHeight,
        });

        index += bestCount;
      }

      return result;
    }, [
      containerWidth,
      imageRatios,
    ]);

  /*
   * SCROLL REVEAL
   */
  useEffect(() => {
    const gallery =
      galleryRef.current;

    if (
      !gallery ||
      !rows.length
    ) {
      return;
    }

    let observer:
      | IntersectionObserver
      | undefined;

    const frame =
      requestAnimationFrame(() => {
        const items =
          gallery.querySelectorAll<HTMLElement>(
            "[data-gallery-item]"
          );

        observer =
          new IntersectionObserver(
            (entries) => {
              entries.forEach(
                (entry) => {
                  if (
                    !entry.isIntersecting
                  ) {
                    return;
                  }

                  const item =
                    entry.target as HTMLElement;

                  item.classList.add(
                    styles.visible
                  );

                  observer?.unobserve(
                    item
                  );
                }
              );
            },
            {
              threshold: 0.12,
              rootMargin: "0px",
            }
          );

        items.forEach((item) => {
          if (
            item.classList.contains(
              styles.visible
            )
          ) {
            return;
          }

          observer?.observe(item);
        });
      });

    return () => {
      cancelAnimationFrame(frame);

      observer?.disconnect();
    };
  }, [rows]);

  /*
   * Aktualny gap.
   */
  const gap =
    containerWidth < 800
      ? MOBILE_GAP
      : DESKTOP_GAP;

  return (
    <>
      <div
        ref={galleryRef}
        className={styles.gallery}
      >
        {rows.map(
          (row, rowIndex) => {
            const isLastRow =
              rowIndex ===
              rows.length - 1;

            return (
              <div
                key={`row-${rowIndex}`}
                className={styles.row}
                style={{
                  height: `${row.height}px`,
                }}
              >
                {row.images.map(
                  (image) => (
                    <figure
                      key={image.src}
                      data-gallery-item
                      className={
                        styles.item
                      }
                      style={{
                        width:
                          isLastRow
                            ? `calc(
                                (100% - ${
                                  (row.images.length -
                                    1) *
                                  gap
                                }px) /
                                ${row.images.length}
                              )`
                            : `${
                                image.ratio *
                                row.height
                              }px`,
                      }}
                      onClick={() => {
                        setViewerIndex(
                          image.index
                        );
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={`${title} — fotografia ${
                          image.index + 1
                        }`}
                        fill
                        sizes="(max-width: 800px) 100vw, 50vw"
                        onLoad={(event) =>
                          handleImageLoad(
                            event,
                            image.src
                          )
                        }
                      />
                    </figure>
                  )
                )}
              </div>
            );
          }
        )}
      </div>

      {viewerIndex !== null && (
        <ImageViewer
          images={images}
          title={title}
          startIndex={viewerIndex}
          onClose={() =>
            setViewerIndex(null)
          }
        />
      )}
    </>
  );
}
