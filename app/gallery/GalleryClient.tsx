"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  category: string;
  title: string;
  description: string;
}

interface GalleryClientProps {
  initialImages: GalleryImage[];
}

const categories = [
  "All Collections",
  "Furniture",
  "Stone Décor",
  "White Marble",
  "Travertine",
  "Green Onyx",
  "Hospitality",
  "Custom Projects",
];

export default function GalleryClient({ initialImages }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Collections");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages =
    selectedCategory === "All Collections"
      ? initialImages
      : initialImages.filter(
          (img) =>
            img.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <div className="relative bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=1920&q=80"
            alt="Gallery"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-5 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Our Portfolio
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight">
              Craftsmanship in
              <span className="block text-primary">every detail.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
              Explore our collection of handcrafted furniture pieces. Each
              photograph tells a story of dedication, precision, and timeless
              design.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-primary/8 blur-[120px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="container mx-auto px-6 py-16 relative">
          {/* Category Filter */}
          <div className="mb-12 flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl lg:text-4xl">
                Browse by Category
              </h2>
              <p className="text-muted-foreground">
                Filter our work to find exactly what inspires you
              </p>
            </div>

            {/* Desktop Category Pills */}
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-secondary/60 text-foreground/70 hover:bg-secondary hover:text-foreground border border-border/40"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Category Dropdown */}
            <div className="md:hidden w-full max-w-xs px-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-5 py-3 rounded-full text-sm font-medium bg-background border border-border/80 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2371717A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1.25rem_center] bg-no-repeat pr-10"
                aria-label="Filter gallery items by category"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-sm text-muted-foreground">
              Showing {filteredImages.length}{" "}
              {filteredImages.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                        {image.category}
                      </p>
                      <h3 className="font-serif text-xl text-foreground">
                        {image.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/50 mb-4">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">
                No items found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try selecting a different category
              </p>
              <Button
                onClick={() => setSelectedCategory("All")}
                variant="outline"
                className="rounded-full"
              >
                View all
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 rounded-4xl border border-border/60 bg-background/80 backdrop-blur-xl p-12 text-center shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="font-serif text-3xl lg:text-4xl">
                Ready to bring these designs to life?
              </h2>
              <p className="text-muted-foreground text-lg">
                Our team can customize any piece to match your vision. Let's
                discuss your project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full text-base">
                  Request a Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base"
                >
                  Download Catalog
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 h-12 w-12 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 h-12 w-12 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 h-12 w-12 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="max-w-6xl w-full px-6">
            <div className="relative">
              <img
                src={filteredImages[currentImageIndex].src}
                alt={filteredImages[currentImageIndex].title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-3xl shadow-2xl"
              />

              <div className="mt-6 text-center space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                  {filteredImages[currentImageIndex].category}
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl">
                  {filteredImages[currentImageIndex].title}
                </h3>
                <p className="text-muted-foreground">
                  {filteredImages[currentImageIndex].description}
                </p>

                <div className="flex justify-center gap-3 pt-4">
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  {currentImageIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
