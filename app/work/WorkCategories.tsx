"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Category = {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl: string | null;
};

export default function WorkCategories({ categories }: { categories: Category[] }) {
  return (
    <div className="w-full">
      {categories.map((category) => (
        <Link key={category._id} href={`/work/${category.slug}`} className="block w-full">
          <div className="relative w-full h-screen min-h-[80vh] flex flex-col justify-end overflow-hidden group">
            {/* Background Image */}
            {category.coverImageUrl ? (
              <Image
                src={category.coverImageUrl}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-zinc-900" />
            )}
            
            {/* Black overlay for contrast */}
            <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />

            {/* Content Superpuesto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-10 left-6 md:left-12 z-10"
            >
              <h2 className="text-4xl md:text-7xl font-extrabold uppercase text-white tracking-tight drop-shadow-md">
                {category.title}
              </h2>
              <div className="mt-4 text-white text-lg font-medium tracking-widest opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                VIEW <span className="text-xl">›</span>
              </div>
            </motion.div>
          </div>
        </Link>
      ))}
    </div>
  );
}
