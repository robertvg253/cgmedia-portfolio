import type { Metadata } from 'next';
import type { Viewport } from "next";
import { Work_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ThemeController from "@/components/ThemeController";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cgmediaproductions.com'),
  title: {
    default: 'CG Media | Production House',
    template: '%s | CG Media',
  },
  description: 'Miami-based production house specializing in photography and film, focusing on hospitality and lifestyle.',
  icons: {
    icon: '/icon.png?v=3',
    shortcut: '/icon.png?v=3',
    apple: '/icon.png?v=3',
  },
  openGraph: {
    title: 'CG Media | Production House',
    description: 'Miami-based production house specializing in photography and film, focusing on hospitality and lifestyle.',
    url: 'https://cgmediaproductions.com',
    siteName: 'CG Media',
    images: [
      {
        url: '/icon.png?v=3',
        alt: 'CG Media',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CG Media | Production House',
    description: 'Miami-based production house specializing in photography and film.',
    images: ['/icon.png?v=3'],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-white" suppressHydrationWarning>
        <ThemeController />
        <Header />
        {children}
      </body>
    </html>
  );
}
