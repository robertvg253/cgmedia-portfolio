import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import DynamicText from "@/components/DynamicText";
import BackButton from "@/components/BackButton";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProjectPage({ params }: { params: Promise<{ categorySlug: string, projectSlug: string }> }) {
  const { categorySlug, projectSlug } = await params;
  let project: any = null;
  let globalSettings: any = null;

  try {
    const [projectRes, settingsRes] = await Promise.all([
      client.fetch(
        `*[_type == "portfolioProject" && slug.current == $projectSlug][0]{ 
          title, 
          description,
          "videoUrl": projectVideo.asset->url, 
          "coverImageUrl": coverImage.asset->url,
          gallery[]{
            _key,
            hotspot,
            crop,
            asset->{
              _id,
              url
            },
            "url": asset->url
          }
        }`,
        { projectSlug }
      ),
      client.fetch(
        `*[_type == "categoryGlobalSettings"][0]{
          descriptionTypography {
            fontFamily,
            fontSize,
            isUppercase
          }
        }`
      ),
    ]);
    project = projectRes;
    globalSettings = settingsRes;
  } catch (error) {
    console.error("Error fetching project data:", error);
  }

  if (!project) return notFound();

  const formattedCategory = categorySlug.replace(/-/g, ' ');

  return (
    <main className="min-h-screen bg-white pt-28 px-[5px] pb-[5px] text-black">
      <div className="px-3 pt-6">
        <BackButton href={`/work/${categorySlug}`} label={`← ${formattedCategory}`} />
      </div>

      <div className="flex flex-col items-center justify-center pt-8 mb-14 md:mb-20">
        <h1 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black text-center px-4">
          {project.title}
        </h1>
        {project.description && (
          <DynamicText
            as="p"
            text={project.description}
            typography={globalSettings?.descriptionTypography}
            className="text-[10px] md:text-xs tracking-[0.2em] text-gray-500 mt-3 text-center px-4 max-w-xl"
          />
        )}
      </div>

      {/* Main Banner */}
      {project.videoUrl ? (
        <video 
          src={project.videoUrl} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto aspect-video object-cover mb-[5px]"
        />
      ) : project.coverImageUrl ? (
        <div className="relative w-full aspect-video mb-[5px]">
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}

      {/* Gallery Grid & Lightbox */}
      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery gallery={project.gallery} projectTitle={project.title} />
      )}
    </main>
  );
}
