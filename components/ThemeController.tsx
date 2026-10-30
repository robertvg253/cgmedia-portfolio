"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ThemeController() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/work")) {
      document.body.style.backgroundColor = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#000000";
    }
  }, [pathname]);

  return null;
}

