"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import { urlFor } from "@/sanity/lib/image";

interface ProjectGalleryProps {
  gallery: any[];
  projectTitle: string;
}

export default function ProjectGallery({ gallery, projectTitle }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[5px]">
        {gallery.map((item: any, index: number) => {
          // URL original sin recorte para el Lightbox
          const rawUrl =
            item?.url ||
            item?.asset?.url ||
            (typeof item === "string" ? item : null);

          // URL con crop/hotspot de Sanity para la grilla cuadrada
          let thumbUrl = rawUrl;
          if (item?.asset?._id || item?.asset?._ref) {
            try {
              thumbUrl = urlFor(item).width(1200).height(1200).fit("crop").quality(90).url();
            } catch {
              thumbUrl = rawUrl;
            }
          }

          if (!rawUrl) return null;

          return (
            <div
              key={item?._key || index}
              onClick={() => setSelectedImage(rawUrl)}
              className="relative aspect-square w-full cursor-pointer overflow-hidden group active:opacity-70 transition-opacity duration-300 ease-in-out"
            >
              <Image
                src={thumbUrl || rawUrl}
                alt={`${projectTitle} gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox a pantalla completa con imagen original */}
      <Lightbox
        isOpen={!!selectedImage}
        imageUrl={selectedImage}
        alt={projectTitle}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
