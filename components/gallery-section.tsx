"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    alt: "Modern Living Room",
    category: "Living",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    alt: "Elegant Bedroom",
    category: "Bedroom",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    alt: "Minimalist Dining",
    category: "Dining",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    alt: "Cozy Reading Nook",
    category: "Living",
    span: "col-span-1 lg:row-span-2",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
    alt: "Home Office",
    category: "Office",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
    alt: "Designer Sofa",
    category: "Living",
    span: "col-span-1 row-span-1",
  },
];

export function GallerySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300 self-start lg:self-auto"
          >
            View Full Gallery
          </Link>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {["All", "Living", "Bedroom", "Dining", "Office"].map(
              (filter, i) => (
                <button
                  key={filter}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    i === 0
                      ? "bg-foreground text-background"
                      : "bg-background/80 text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-[160px] sm:auto-rows-[180px] lg:auto-rows-[220px]">
          {galleryImages.map((image, index) => (
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
