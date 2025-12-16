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

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "Living Room",
    title: "Modern Sofa Collection",
    description: "Handcrafted velvet sofa with teak frame",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "Bedroom",
    title: "Luxury Bed Frame",
    description: "Solid wood king-size bed with upholstered headboard",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    category: "Dining",
    title: "Elegant Dining Set",
    description: "8-seater walnut dining table with leather chairs",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    category: "Living Room",
    title: "Contemporary Lounge",
    description: "Modular seating with premium fabric finish",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
    category: "Office",
    title: "Executive Desk",
    description: "Solid sheesham wood desk with brass accents",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80",
    category: "Bedroom",
    title: "Wardrobe Collection",
    description: "Custom-built wardrobe with mirror panels",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    category: "Living Room",
    title: "Accent Chairs",
    description: "Mid-century inspired armchair in velvet",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80",
    category: "Dining",
    title: "Bar Cabinet",
    description: "Vintage-style cabinet with glass shelving",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&q=80",
    category: "Outdoor",
    title: "Patio Furniture",
    description: "Weather-resistant teak outdoor seating",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    category: "Living Room",
    title: "Coffee Table",
    description: "Marble top with brass frame coffee table",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80",
    category: "Office",
    title: "Bookshelf Unit",
    description: "Floor-to-ceiling oak bookcase with ladder",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
    category: "Bedroom",
    title: "Nightstand Pair",
    description: "Matching bedside tables with soft-close drawers",
  },
];

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining",
  "Office",
  "Outdoor",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

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

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-secondary/60 text-foreground/70 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
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
