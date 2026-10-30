"use client";

import { useEffect, useRef } from "react";

interface HeroVideoProps {
  mobileVideoUrl?: string | null;
  desktopVideoUrl?: string | null;
}

export default function HeroVideo({
  mobileVideoUrl,
  desktopVideoUrl,
}: HeroVideoProps) {
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = (video: HTMLVideoElement | null) => {
      if (video) {
        video.defaultMuted = true;
        video.muted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.play().catch((error) => console.log("Autoplay impedido:", error));
      }
    };

    playVideo(mobileVideoRef.current);
    playVideo(desktopVideoRef.current);
  }, [mobileVideoUrl, desktopVideoUrl]);

  return (
    <div className="fixed inset-0 -z-10 w-full h-screen bg-black">
      {mobileVideoUrl && (
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={mobileVideoUrl}
          className="block md:hidden w-full h-full object-cover opacity-80"
        />
      )}
      {desktopVideoUrl && (
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={desktopVideoUrl}
          className="hidden md:block w-full h-full object-cover opacity-80"
        />
      )}
    </div>
  );
}
