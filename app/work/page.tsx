import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Header from "@/components/Header";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WorkCategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await client.fetch(`*[_type == "category"] | order(orderRank){ 
      _id, 
      title, 
      "slug": slug.current, 
      "coverImageUrl": *[_type == "portfolioProject" && references(^._id) && coalesce(isArchived, false) == false] | order(orderRank)[0].coverImage.asset->url 
    }`);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <main className="min-h-screen bg-white pt-28 px-[5px] pb-[5px] text-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[5px]">
        {categories.map((category: any) => (
          <Link
            key={category._id}
            href={`/work/${category.slug}`}
            className="relative aspect-square w-full block overflow-hidden group active:scale-95 transition-transform duration-200"
          >
            {category.coverImageUrl ? (
              <Image
                src={category.coverImageUrl}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-black/30 transition-colors duration-500 hover:bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-white text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">
                {category.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
