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

    playVideo(desktopVideoRef.current);
  }, [desktopVideoUrl]);

  return (
    <div className="fixed inset-0 -z-10 w-full h-screen bg-black">
      {mobileVideoUrl && (
        <div
          className="w-full h-full md:hidden"
          dangerouslySetInnerHTML={{
            __html: `<video autoplay loop muted playsinline defaultMuted preload="auto" class="block md:hidden w-full h-full object-cover opacity-80" src="${mobileVideoUrl}"></video>`,
          }}
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
