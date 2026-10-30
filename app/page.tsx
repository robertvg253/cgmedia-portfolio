import type { Viewport } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import DynamicText from '@/components/DynamicText'
import HeroVideo from '@/components/HeroVideo'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default async function Home() {
  const query = groq`*[_type == "homeSettings"][0]{ 
    "mobileVideoUrl": mobileVideo.asset->url,
    "desktopVideoUrl": desktopVideo.asset->url,
    footerText,
    footerTypography {
      fontFamily,
      fontSize,
      isUppercase
    }
  }`
  let data = null
  try {
    data = await client.fetch(query)
  } catch (error) {
    console.error("Error fetching home page data from Sanity:", error)
  }
  const mobileVideoUrl = data?.mobileVideoUrl
  const desktopVideoUrl = data?.desktopVideoUrl

  const defaultFooterText =
    "We invite you to contact us with any questions or inquiries about your project, and we will respond as soon as possible. Thank you."

  return (
    <>
      {/* Capa de Fondo Fija con Autoplay Forzado para iOS */}
      <HeroVideo
        mobileVideoUrl={mobileVideoUrl}
        desktopVideoUrl={desktopVideoUrl}
      />

      {/* Capa de Contenido */}
      <main className="relative z-10 w-full">
        {/* Espacio del Hero: 100vh para que empuje el contenido de abajo "below the fold" */}
        <div className="w-full h-screen flex flex-col justify-between">
          {/* El div inferior vacío para empujar contenido hacia abajo, si fuera necesario algo antes del fold */}
          <div></div>
        </div>

        {/* Área de Contacto que aparece al hacer scroll */}
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-white space-y-6">
          <div className="flex gap-6 items-center">
            {/* Instagram */}
            <a
              href="https://instagram.com/cg.mediaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] font-medium hover:opacity-60 active:scale-95 transition-transform duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>INSTAGRAM</span>
            </a>
          </div>

          <DynamicText
            text={data?.footerText || defaultFooterText}
            typography={data?.footerTypography}
            className="text-xs md:text-sm font-semibold tracking-[0.2em] leading-relaxed max-w-md text-gray-400"
          />

          <a
            href="mailto:cgmediaproductions1@gmail.com"
            className="inline-block text-xs uppercase tracking-[0.2em] font-medium hover:opacity-60 active:scale-95 transition-transform duration-200"
          >
            EMAIL: CGMEDIAPRODUCTIONS1@GMAIL.COM
          </a>
        </div>
      </main>
    </>
  )
}
