import type { Viewport } from "next";
import { client } from "@/sanity/lib/client";
import DynamicText from "@/components/DynamicText";
import ConnectForm from "@/components/ConnectForm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default async function ConnectPage() {
  let data = null;
  try {
    data = await client.fetch(
      `*[_type == "connectSettings"][0]{ 
        connectText, 
        connectTypography {
          fontFamily,
          fontSize,
          isUppercase
        }
      }`
    );
  } catch (error) {
    console.error("Error fetching connect settings:", error);
  }

  const defaultConnectText =
    "WE COLLABORATE WITH VISIONARY BRANDS AND CREATORS WORLDWIDE. TELL US ABOUT YOUR PROJECT OR UPCOMING PRODUCTION.";

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Columna Izquierda: Información de Contacto */}
        <div className="flex flex-col justify-between space-y-12">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap font-bold uppercase tracking-tighter leading-none mb-8">
              CONNECT WITH US
            </h1>
            <DynamicText
              as="p"
              text={data?.connectText || defaultConnectText}
              typography={data?.connectTypography}
              className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400 font-light max-w-md leading-relaxed"
            />
          </div>

          <div className="space-y-8">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                Direct Contact
              </span>
              <a
                href="mailto:cgmediaproductions1@gmail.com"
                className="text-xs uppercase tracking-[0.2em] font-medium hover:opacity-60 transition-opacity"
              >
                CGMEDIAPRODUCTIONS1@GMAIL.COM
              </a>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                Social
              </span>
              <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] font-medium">
                <a
                  href="https://instagram.com/cg.mediaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario Web3Forms */}
        <ConnectForm />
      </div>
    </main>
  );
}
