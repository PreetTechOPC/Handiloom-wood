"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, EffectFade, Controller } from "swiper/modules";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

interface ProductGalleryProps {
  images: string[];
  name: string;
  featured?: boolean;
  inStock?: boolean;
}

export function ProductGallery({ images, name, featured, inStock }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="relative group overflow-hidden rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md shadow-2xl max-w-2xl mx-auto lg:mx-0 will-change-transform">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as any}
          spaceBetween={10}
          effect={"fade"}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs, EffectFade]}
          className="aspect-square w-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="relative overflow-hidden">
              <Image
                src={img}
                alt={`${name} - View ${idx + 1}`}
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[2000ms] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent z-10 pointer-events-none" />
            </SwiperSlide>
          ))}

          <div className="absolute bottom-4 left-4 flex gap-2 z-30">
            {featured && (
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg">
                <Sparkles className="h-4 w-4" /> Featured
              </span>
            )}
            {!inStock && (
              <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-xs font-semibold text-foreground shadow-lg">
                Made to order
              </span>
            )}
          </div>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-background/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background/40 active:scale-90">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-background/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background/40 active:scale-90">
            <ChevronRight className="h-6 w-6" />
          </button>
        </Swiper>
      </div>

      {images.length > 1 && (
        <div className="max-w-2xl mx-auto lg:mx-0">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide 
                key={idx} 
                className="relative aspect-square cursor-pointer rounded-2xl overflow-hidden border-2 border-transparent transition-all opacity-60 [.swiper-slide-thumb-active&]:opacity-100 [.swiper-slide-thumb-active&]:border-primary"
              >
                <Image
                  src={img}
                  alt={`${name} thumb ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 10vw"
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <style jsx global>{`
        .thumbs-swiper .swiper-slide {
          transition: all 0.3s ease;
        }
        .thumbs-swiper .swiper-slide:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}
