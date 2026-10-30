"use client";

import { usePathname } from "next/navigation";

export default function Loading() {
  const pathname = usePathname();
  const isLightPage = pathname?.startsWith("/work");
  const blockColor = isLightPage ? "bg-gray-200" : "bg-neutral-900";

  return (
    <div className={`min-h-screen w-full pt-28 px-[5px] pb-[5px] ${isLightPage ? "bg-white" : "bg-black"}`}>
      <div className="flex flex-col items-center mb-8 px-4">
        <div className={`h-4 w-48 rounded ${blockColor} animate-pulse`} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[5px]">
        <div className={`aspect-square w-full ${blockColor} animate-pulse`} />
        <div className={`aspect-square w-full ${blockColor} animate-pulse`} />
        <div className={`aspect-square w-full ${blockColor} animate-pulse`} />
      </div>
    </div>
  );
}
