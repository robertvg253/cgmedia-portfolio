"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string | null;
  alt?: string;
  onClose: () => void;
}

export default function Lightbox({
  isOpen,
  imageUrl,
  alt = "Preview",
  onClose,
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showClose, setShowClose] = useState(true);
  const prevScale = useRef(1);

  // Reiniciar estados al abrir o cambiar de imagen
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setShowClose(true);
      prevScale.current = 1;
    }
  }, [isOpen, imageUrl]);

  // Manejo de tecla Escape y bloqueo de scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none overflow-hidden"
    >
      {/* Botón 'X' Dinámico e Inteligente estrictamente fixed y fuera de TransformWrapper */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Cerrar vista completa"
        className={`fixed top-6 right-6 text-white text-3xl font-light hover:opacity-70 z-[150] cursor-pointer transition-opacity duration-300 ${
          showClose ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        ✕
      </button>

      {/* Indicador de Carga Minimalista (Spinner) fuera de TransformComponent */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-8 h-8 rounded-full border border-white/20 border-t-white animate-spin" />
        </div>
      )}

      {/* Wrapper de Zoom, Pan y Pinch */}
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={6}
        centerOnInit={true}
        centerZoomedOut={true}
        limitToBounds={true}
        smooth={false}
        wheel={{ step: 0.3 }}
        zoomAnimation={{ animationTime: 180, animationType: "easeOut" }}
        pinch={{ step: 5 }}
        doubleClick={{ mode: "toggle", step: 1.5 }}
        onTransform={(ref, state) => {
          const scale = state?.scale ?? ref.state.scale;
          if (scale > prevScale.current) {
            setShowClose(false);
          } else if (scale < prevScale.current || scale === 1) {
            setShowClose(true);
          }
          prevScale.current = scale;
        }}
      >
        <TransformComponent
          wrapperClass="!w-screen !h-screen flex items-center justify-center"
          contentClass="!w-screen !h-screen flex items-center justify-center"
        >
          <div className="relative w-[90vw] h-[85vh] flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              priority
              quality={90}
              sizes="100vw"
              onLoad={() => setIsLoading(false)}
              className={`object-contain transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
