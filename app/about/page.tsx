import Image from "next/image";
import { client } from "@/sanity/lib/client";
import DynamicText from "@/components/DynamicText";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  let data = null;
  try {
    data = await client.fetch(
      `*[_type == "aboutSettings"][0]{ 
        aboutText,
        aboutTypography {
          fontFamily,
          fontSize,
          isUppercase
        },
        "aboutImageDesktopUrl": aboutImageDesktop.asset->url,
        "aboutImageMobileUrl": aboutImageMobile.asset->url
      }`
    );
  } catch (error) {
    console.error("Error fetching about images:", error);
  }

  const aboutImageDesktopUrl = data?.aboutImageDesktopUrl;
  const aboutImageMobileUrl = data?.aboutImageMobileUrl;

  const defaultAboutText =
    "CG Media Productions is a Miami based production house specializing in photography and film, with a focus on hospitality and lifestyle. Through thoughtful storytelling, creative collaboration, and refined execution, we create compelling visuals that capture the essence of each brand.";

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12 max-w-5xl mx-auto">
        {/* Bloque de Texto (Top) */}
        <div className="mb-16 md:mb-24">
          <DynamicText
            as="p"
            text={data?.aboutText || defaultAboutText}
            typography={data?.aboutTypography}
            className="text-[10px] md:text-[11px] font-normal tracking-[0.2em] uppercase leading-relaxed text-center max-w-3xl mx-auto"
          />
        </div>

        {/* Bloque de Imágenes (Responsive Desktop / Mobile) */}
        {aboutImageDesktopUrl && (
          <div className="hidden md:block relative w-full h-[60vh] overflow-hidden">
            <Image
              src={aboutImageDesktopUrl}
              alt="CG Media Productions - About Desktop"
              fill
              priority
              quality={100}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        )}

        {aboutImageMobileUrl && (
          <div className="block md:hidden relative w-full h-[60vh] overflow-hidden">
            <Image
              src={aboutImageMobileUrl}
              alt="CG Media Productions - About Mobile"
              fill
              priority
              quality={100}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        )}

        {!aboutImageDesktopUrl && !aboutImageMobileUrl && (
          <div className="relative w-full h-[60vh] bg-zinc-950 border border-white/10 flex items-center justify-center">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              About Image
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
