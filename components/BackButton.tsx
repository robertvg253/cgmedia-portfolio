"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface BackButtonProps {
  className?: string;
  label?: string;
  href?: string;
}

export default function BackButton({
  className = "",
  label = "BACK",
  href,
}: BackButtonProps) {
  const router = useRouter();

  const buttonClasses = `group inline-flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] uppercase font-normal text-black hover:opacity-50 active:scale-95 transition-transform duration-200 cursor-pointer ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        ← {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={buttonClasses}
    >
      ← {label}
    </button>
  );
}
