"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Play, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Ambient glows & grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[480px] w-[480px] rounded-full bg-primary/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 sm:pb-24 relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 sm:gap-16 items-center">
          {/* Left: copy */}
          <div className="space-y-9 max-w-3xl">
            <div
              className={`inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm transition-all duration-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Artisan Living · 2025 Collection
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground transition-all duration-700 delay-80">
              <span className="inline-flex items-center gap-2">
                <span className="h-[1px] w-6 bg-foreground/30" /> Bespoke Craft
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-[1px] w-6 bg-foreground/30" /> Tailored
                Comfort
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-[1px] w-6 bg-foreground/30" /> Modern Rituals
              </span>
            </div>

            <div className="space-y-5">
              <h1
                className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight transition-all duration-700 delay-100 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Crafted to make every
                <span className="block text-primary">
                  space feel effortless.
                </span>
              </h1>
              <p
                className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl transition-all duration-700 delay-200 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                At Handiloomwood, we believe furniture is more than just a
                product — it’s a story of craftsmanship, culture, and
                connection. We export high-quality wooden furniture, handcrafted
                pieces, and customized designs worldwide, transforming hotels
                and homes with beauty, durability, and character.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-full bg-primary px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold text-primary-foreground shadow-[0_20px_60px_-25px_var(--primary)] transition-all hover:shadow-[0_25px_70px_-25px_var(--primary)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore the collection
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-foreground/15 bg-transparent px-8 py-6 text-base font-semibold text-foreground/80 transition-colors hover:bg-foreground hover:text-background"
                >
                  <Play className="mr-2 h-4 w-4" /> Watch our story
                </Button>
              </Link>
            </div>

            <div
              className={`grid gap-6 sm:grid-cols-3 transition-all duration-700 delay-400 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {[
                {
                  label: "Bespoke pieces crafted",
                  value: "2.5k",
                },
                {
                  label: "Average lead time",
                  value: "4-6 wks",
                },
                {
                  label: "Satisfaction rating",
                  value: "4.9/5",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur-md shadow-[0_14px_50px_-30px_rgba(0,0,0,0.48)]"
                >
                  <p className="text-3xl font-serif text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual stack */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-secondary/40 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-background" />
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
                alt="Curated interior"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="pointer-events-none absolute -left-6 top-6 rounded-2xl border border-primary/20 bg-background/80 px-4 py-3 shadow-xl backdrop-blur-md sm:-left-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Lifetime warranty
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Built to stay beautiful
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-8 right-6 flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/85 px-5 py-4 shadow-2xl backdrop-blur-md sm:right-12">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Featured set
              </p>
              <p className="text-lg font-semibold text-foreground">
                Oslo Lounge + Sideboard
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-green-500" /> In stock
                & ready to ship
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
