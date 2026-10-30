import type { Metadata, Viewport } from "next";
import { Work_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
  title: {
    default: 'CG Media | Production House',
    template: '%s | CG Media'
  },
  description: 'Miami-based production house specializing in photography and film, focusing on hospitality and lifestyle.',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'CG Media | Production House',
    description: 'Miami-based production house specializing in photography and film, focusing on hospitality and lifestyle.',
    url: 'https://cgmediaproductions.com',
    siteName: 'CG Media',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CG Media | Production House',
    description: 'Miami-based production house specializing in photography and film.',
  }
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
      <body className="min-h-full flex flex-col font-sans bg-black text-white" suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  );
}
