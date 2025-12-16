"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    review:
      "The quality of craftsmanship is absolutely exceptional. Our Milano chair has become the centerpiece of our living room. Every guest comments on its beauty. Worth every penny!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    product: "Milano Lounge Chair",
    productImage:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=80",
  },
  {
    id: 2,
    name: "James Thompson",
    location: "London, UK",
    rating: 5,
    review:
      "I've never experienced such attention to detail. The Oslo dining table is stunning and has transformed our dining experience completely. A true masterpiece of modern design.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    product: "Oslo Dining Table",
    productImage:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&q=80",
  },
  {
    id: 3,
    name: "Emily Chen",
    location: "Toronto, Canada",
    rating: 5,
    review:
      "From the ordering process to delivery, everything was seamless. The Vienna sofa exceeded all our expectations. Truly artisan quality that you can feel.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    product: "Vienna Sofa Set",
    productImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80",
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    location: "Miami, USA",
    rating: 5,
    review:
      "The customer service was outstanding and the Aurora bed frame is absolutely beautiful. It's transformed our bedroom into a luxury sanctuary. Highly recommend!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    product: "Aurora Bed Frame",
    productImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&q=80",
  },
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goToReview = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextReview = () => goToReview((currentIndex + 1) % reviews.length);
  const prevReview = () =>
    goToReview((currentIndex - 1 + reviews.length) % reviews.length);

  const currentReview = reviews[currentIndex];

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-20 sm:py-28 lg:py-40 bg-secondary/30 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="inline-flex items-center gap-2 text-primary font-medium tracking-wide uppercase text-sm mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            Testimonials
            <span className="w-8 h-[2px] bg-primary" />
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1]">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
        </div>

        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative">
            {/* Main card */}
            <div className="relative bg-secondary/50 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-border/50">
              <div className="absolute -top-8 left-12 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl glow-primary">
                <Quote className="w-8 h-8 text-primary-foreground" />
              </div>

              <div
                className={`grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-center transition-all duration-500 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-background shadow-xl">
                      <img
                        src={currentReview.image || "/placeholder.svg"}
                        alt={currentReview.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -inset-2 rounded-full border-2 border-primary/30 border-dashed animate-rotate-slow" />
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-foreground">
                    {currentReview.name}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {currentReview.location}
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: currentReview.rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      )
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-background/80 rounded-2xl w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden">
                        <img
                          src={currentReview.productImage || "/placeholder.svg"}
                          alt={currentReview.product}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground">
                          Purchased
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {currentReview.product}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed">
                    "{currentReview.review}"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-10">
              {/* Dots */}
              <div className="flex gap-3">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`h-3 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? "w-10 bg-primary shadow-lg glow-primary"
                        : "w-3 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prevReview}
                  className="w-14 h-14 rounded-full border-2 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center group"
                >
                  <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={nextReview}
                  className="w-14 h-14 rounded-full border-2 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center group"
                >
                  <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
