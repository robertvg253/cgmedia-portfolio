import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
