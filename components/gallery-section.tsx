"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  span?: string;
}

interface GallerySectionProps {
  images: GalleryItem[];
}

export function GallerySection({ images }: GallerySectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Default spans for the first 6 images to maintain the masonry-like grid
  const defaultSpans = [
    "lg:col-span-2 lg:row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 lg:row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [selectedFilter, setSelectedFilter] = useState("All Collections");

  if (!images || images.length === 0) return null;

  const filteredImagesList =
    selectedFilter === "All Collections"
      ? images
      : images.filter(
          (img) =>
            img.category?.toLowerCase() === selectedFilter.toLowerCase()
        );

  // Take first 6 of filtered images for the homepage grid display
  const displayImages = filteredImagesList.slice(0, 6).map((img, idx) => ({
    ...img,
    span: img.span || defaultSpans[idx] || "col-span-1 row-span-1",
  }));

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-28 lg:py-40 bg-secondary/30 relative overflow-hidden"
    >
      <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div
          className={`flex flex-col gap-6 lg:gap-0 lg:flex-row lg:items-end justify-between mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-xl space-y-4">
            <p className="inline-flex items-center gap-2 text-primary font-medium tracking-wide uppercase text-sm">
              <span className="w-8 h-[2px] bg-primary" />
              Gallery
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1]">
              Seeing is <span className="text-primary">Believing</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore how our furniture transforms spaces into beautiful,
              functional homes.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex w-fit whitespace-nowrap items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300 self-start lg:self-auto"
          >
            Explore Collection ⭐
          </Link>

          {/* Desktop Filter Pills */}
          <div className="hidden md:flex flex-wrap gap-2.5 lg:justify-end">
            {[
              "All Collections",
              "Furniture",
              "Stone Décor",
              "White Marble",
              "Travertine",
              "Green Onyx",
              "Hospitality",
              "Custom Projects",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? "bg-foreground text-background shadow-md"
                    : "bg-background/80 text-foreground hover:bg-foreground hover:text-background border border-border/40"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Mobile & Tablet Dropdown Menu */}
          <div className="md:hidden w-full sm:w-auto">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full sm:w-64 px-5 py-3 rounded-full text-sm font-medium bg-background border border-border/80 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2371717A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1.25rem_center] bg-no-repeat pr-10"
              aria-label="Filter gallery by category"
            >
              {[
                "All Collections",
                "Furniture",
                "Stone Décor",
                "White Marble",
                "Travertine",
                "Green Onyx",
                "Hospitality",
                "Custom Projects",
              ].map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-[160px] sm:auto-rows-[180px] lg:auto-rows-[220px]">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer ${
                image.span
              } transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500 ${
                  hoveredId === image.id ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                className={`absolute inset-0 p-3 sm:p-4 lg:p-6 flex flex-col justify-between transition-all duration-500 ${
                  hoveredId === image.id ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Bottom content */}
                <div
                  className={`transform transition-transform duration-500 ${
                    hoveredId === image.id ? "translate-y-0" : "translate-y-4"
                  }`}
                >
                  <span className="inline-block px-2 sm:px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full mb-2 sm:mb-3">
                    {image.category}
                  </span>
                  <p className="font-serif text-base sm:text-lg lg:text-2xl text-white font-medium">
                    {image.alt}
                  </p>
                </div>
              </div>

              <div
                className={`absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-white/0 rounded-tl-xl transition-all duration-500 ${
                  hoveredId === image.id ? "border-white/60" : ""
                }`}
              />
              <div
                className={`absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-white/0 rounded-br-xl transition-all duration-500 ${
                  hoveredId === image.id ? "border-white/60" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
