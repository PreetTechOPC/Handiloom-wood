"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/lib/products";

const localProducts = [
  {
    id: "1",
    name: "Milano Lounge Chair",
    category: "Seating",
    subcategory: "Lounge & reading",
    shortDescription:
      "Tailored curves with deep comfort, kiln-dried frame, and soft boucle upholstery for daily lounging.",
    materials: ["Italian boucle", "Solid oak base", "Feather-wrapped seat"],
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80"],
    featured: true,
    price: 45000,
    slug: "milano-lounge-chair",
    inStock: true,
    leadTime: "2-4 weeks",
    tags: ["Best Seller"]
  },
  {
    id: "2",
    name: "Oslo Dining Table",
    category: "Tables",
    subcategory: "Dining & hosting",
    shortDescription:
      "Slim Scandinavian profile with chamfered edges and a floating top for six guests.",
    materials: ["Solid ash", "Seats 6", "Matte lacquer"],
    images: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80"],
    featured: true,
    price: 85000,
    slug: "oslo-dining-table",
    inStock: true,
    leadTime: "4-6 weeks",
    tags: ["New"]
  },
  {
    id: "3",
    name: "Vienna Sofa Set",
    category: "Living Room",
    subcategory: "Living room centerpiece",
    shortDescription:
      "Low, generous silhouette with bench seat and down blend cushions for laid-back hosting.",
    materials: ["Performance linen", "Bench cushion", "Modular arms"],
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"],
    featured: true,
    price: 125000,
    slug: "vienna-sofa-set",
    inStock: true,
    leadTime: "6-8 weeks",
    tags: []
  },
];

interface ProductsSectionProps {
  products?: Product[];
}

export function ProductsSection({ products: initialProducts }: ProductsSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const displayProducts = (initialProducts && initialProducts.length > 0) ? initialProducts : (localProducts as unknown as Product[]);

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
      id="products"
      className="py-28 lg:py-40 bg-secondary/30 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-primary font-medium tracking-wide uppercase text-sm mb-4">
              <span className="w-8 h-[2px] bg-primary" />
              Our Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1]">
              Top Selling <span className="text-primary">Pieces</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Curated selection of our most loved furniture, handpicked for
              exceptional quality and design.
            </p>
          </div>
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 border-foreground/20 hover:bg-foreground hover:text-background self-start lg:self-auto group bg-transparent transition-all duration-300"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-background rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {product.featured && (
                  <span
                    className={`absolute top-4 left-4 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-full shadow-lg`}
                  >
                    Featured
                  </span>
                )}

                <div
                  className={`absolute inset-x-4 bottom-4 transition-all duration-500 ${
                    hoveredId === product.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <Link href={`/products/${product.slug}`}>
                    <Button className="w-full bg-background/95 backdrop-blur-md hover:bg-primary text-foreground hover:text-primary-foreground rounded-full py-6 font-semibold transition-all duration-300 shadow-lg group/btn">
                      View Details
                      <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-foreground/5 text-foreground">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 fill-primary text-primary"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-foreground">
                      5.0
                    </span>
                    <span className="text-sm text-muted-foreground">
                      (100+)
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                  {product.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-foreground/70 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/5">
                    {product.subcategory}
                  </span>
                  {product.materials.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="text-xs text-foreground/70 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/0 group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
