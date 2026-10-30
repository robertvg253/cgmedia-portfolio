"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-disabled={isLoading}
      className={`group inline-flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] uppercase font-normal text-black hover:opacity-50 active:scale-95 active:opacity-50 transition-all duration-200 mb-12 cursor-pointer ${
        isLoading ? "pointer-events-none opacity-50" : ""
      }`}
    >
      {label}
    </a>
  );
}
