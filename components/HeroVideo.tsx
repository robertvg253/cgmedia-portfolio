"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  mobileVideoUrl?: string | null;
  desktopVideoUrl?: string | null;
}

export default function HeroVideo({
  mobileVideoUrl,
  desktopVideoUrl,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Detectar viewport en el cliente y evitar el bug de hidratación SSR de <video> en iOS Safari
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);
    setIsMounted(true);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const activeVideoUrl = isMobile
    ? mobileVideoUrl || desktopVideoUrl
    : desktopVideoUrl || mobileVideoUrl;

  // 2. Forzar propiedades DOM nativas y reproducción apenas se monta el único <video> activo
  useEffect(() => {
    if (!isMounted || !activeVideoUrl) return;

    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const attemptPlay = () => {
      if (video.paused) {
        video.play().catch((e) => {
          console.log("Autoplay bloqueado en carga inicial:", e);
        });
      }
    };

    video.load();
    attemptPlay();

    video.addEventListener("loadedmetadata", attemptPlay);
    video.addEventListener("loadeddata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);

    const handleUserInteraction = () => {
      attemptPlay();
    };

    window.addEventListener("touchstart", handleUserInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("scroll", handleUserInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("click", handleUserInteraction, {
      once: true,
      passive: true,
    });

    return () => {
      video.removeEventListener("loadedmetadata", attemptPlay);
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [isMounted, activeVideoUrl]);

  return (
    <div className="fixed inset-0 -z-10 w-full h-screen bg-black">
      {isMounted && activeVideoUrl && (
        <video
          key={activeVideoUrl}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={activeVideoUrl}
          className="w-full h-full object-cover opacity-80"
        />
      )}
    </div>
  );
}
