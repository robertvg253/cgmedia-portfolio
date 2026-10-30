import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import DynamicText from "@/components/DynamicText";
import BackButton from "@/components/BackButton";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CategoryProjectsPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  let data: any = null;
  try {
    data = await client.fetch(
      `{
        "categoryGlobalSettings": *[_type == "categoryGlobalSettings"][0]{
          titleTypography {
            fontFamily,
            fontSize,
            isUppercase
          },
          descriptionTypography {
            fontFamily,
            fontSize,
            isUppercase
          }
        },
        "category": *[_type == "category" && slug.current == $categorySlug][0]{
          _id,
          title,
          description
        },
        "projects": *[_type == "portfolioProject" && category->slug.current == $categorySlug && coalesce(isArchived, false) == false] | order(orderRank){
          _id,
          title,
          "slug": slug.current,
          "coverImageUrl": coverImage.asset->url
        }
      }`,
      { categorySlug }
    );
  } catch (error) {
    console.error("Error fetching category projects:", error);
  }

  const { category, projects, categoryGlobalSettings } = data || {};

  if (!projects || projects.length === 0) return notFound();

  const formattedCategory = category?.title || categorySlug.replace(/-/g, ' ');

  return (
    <main className="min-h-screen bg-white pt-28 px-[5px] pb-[5px] text-black">
      <div className="px-3 pt-6">
        <BackButton href="/work" label="← BACK" />
      </div>

      <div className="flex flex-col items-center justify-center pt-8 mb-14 md:mb-20">
        <DynamicText
          as="h1"
          text={formattedCategory}
          typography={categoryGlobalSettings?.titleTypography}
          className="text-xs md:text-sm font-bold tracking-[0.2em] text-black text-center px-4"
        />
        {category?.description && (
          <DynamicText
            as="p"
            text={category.description}
            typography={categoryGlobalSettings?.descriptionTypography}
            className="text-[10px] md:text-xs tracking-[0.2em] text-gray-500 mt-3 text-center px-4 max-w-xl"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[5px]">
        {projects.map((project: any) => (
          <Link
            key={project._id}
            href={`/work/${categorySlug}/${project.slug}`}
            className="relative aspect-square w-full block overflow-hidden group active:opacity-70 transition-opacity duration-300 ease-in-out"
          >
            {project.coverImageUrl ? (
              <Image
                src={project.coverImageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-black/30 transition-colors duration-500 hover:bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-white text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">
                {project.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
