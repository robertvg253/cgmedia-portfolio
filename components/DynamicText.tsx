"use client";

import React from "react";

export interface TypographySettings {
  fontFamily?: string;
  fontSize?: number;
  isUppercase?: boolean;
}

interface DynamicTextProps {
  text?: string | null;
  typography?: TypographySettings | null;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  children?: React.ReactNode;
}

export default function DynamicText({
  text,
  typography,
  className = "",
  as: Component = "p",
  children,
}: DynamicTextProps) {
  const content = text ?? children;
  if (!content) return null;

  const rawFont = typography?.fontFamily?.trim();
  const fontSize = typography?.fontSize;
  const isUppercase = typography?.isUppercase ?? true;

  // Inyección de Google Fonts con <link> en el render
  const fontUrl = rawFont
    ? `https://fonts.googleapis.com/css2?family=${rawFont.replace(/ /g, "+")}&display=swap`
    : null;

  const inlineStyle: React.CSSProperties = {
    ...(fontSize ? { fontSize: `${fontSize}px` } : {}),
    ...(rawFont ? { fontFamily: `'${rawFont}', sans-serif` } : {}),
    textTransform: isUppercase ? "uppercase" : "none",
  };

  return (
    <>
      {fontUrl && (
        <link rel="stylesheet" href={fontUrl} precedence="default" />
      )}
      <Component className={className} style={inlineStyle}>
        {content}
      </Component>
    </>
  );
}
