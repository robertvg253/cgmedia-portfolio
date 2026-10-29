"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adapt header text color according to page background (light on /work, white on dark pages)
  const isLightPage = pathname?.startsWith('/work');
  const textClass = isLightPage ? "text-black" : "text-white";

  const linkClass = (path: string) => {
    const base = "inline-block text-xs font-semibold tracking-[0.2em] uppercase active:scale-95 transition-transform duration-200";
    if (pathname === path || (path === "/connect" && pathname === "/contact")) {
      return `${base} text-gray-400`;
    }
    return `${base} hover:opacity-60`;
  };

  if (pathname.startsWith('/studio')) return null;

  return (
    <header className={`fixed top-0 inset-x-0 w-full z-50 bg-transparent py-8 transition-transform duration-300 ease-in-out ${isVisible || isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Desktop */}
      <nav className={`hidden md:flex w-full items-center justify-center gap-12 px-8 ${textClass} relative z-50 transition-colors duration-300`}>
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/work" className={linkClass("/work")}>Work</Link>
        <Link href="/" className="inline-block text-2xl font-extrabold tracking-tighter hover:opacity-80 active:scale-95 transition-transform duration-200">
          CG.
        </Link>
        <Link href="/about" className={linkClass("/about")}>About</Link>
        <Link href="/connect" className={linkClass("/connect")}>Connect</Link>
      </nav>

      {/* Mobile */}
      <div className={`flex md:hidden justify-between items-center px-4 w-full ${textClass} relative z-50 transition-colors duration-300`}>
        <Link href="/" className="inline-block text-2xl font-extrabold tracking-tighter active:scale-95 transition-transform duration-200">
          CG.
        </Link>
        <button 
          aria-label="Menu" 
          className="p-2 w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative active:scale-95 transition-transform duration-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${isOpen ? "bg-black rotate-45 translate-y-2" : "bg-current"}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${isOpen ? "bg-black opacity-0" : "bg-current"}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${isOpen ? "bg-black -rotate-45 -translate-y-2" : "bg-current"}`}></span>
        </button>
      </div>

      {/* Full Screen Overlay Menu */}
      <div 
        className={`fixed inset-0 h-screen w-screen bg-white z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-8 text-2xl text-black uppercase tracking-widest text-center items-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="inline-block active:scale-95 transition-transform duration-200 hover:opacity-60">Home</Link>
          <Link href="/work" onClick={() => setIsOpen(false)} className="inline-block active:scale-95 transition-transform duration-200 hover:opacity-60">Work</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="inline-block active:scale-95 transition-transform duration-200 hover:opacity-60">About</Link>
          <Link href="/connect" onClick={() => setIsOpen(false)} className="inline-block active:scale-95 transition-transform duration-200 hover:opacity-60">Connect</Link>
        </nav>
      </div>
    </header>
  );
}
