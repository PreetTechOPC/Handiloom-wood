"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Award, Leaf, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Only the finest materials sourced from sustainable suppliers worldwide.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description:
      "Committed to sustainable practices and minimal environmental impact.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Each piece crafted with passion by skilled artisans.",
  },
];

function Counter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 sm:py-28 lg:py-40 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -skew-x-12 translate-x-1/4" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative">
              {/* Main Image with reveal animation */}
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1572297794908-f2ee5a2930d6?w=800&q=80"
                  alt="Our craftsman workshop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>

              <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-background hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80"
                  alt="Craftsmanship detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>

              <div className="absolute -top-8 -left-8 glass rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center animate-pulse-glow">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-serif text-4xl font-bold text-foreground">
                      <Counter end={15} suffix="+" />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Years of Excellence
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-20 -left-20 w-40 h-40 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="1"
                      cy="1"
                      r="1"
                      fill="currentColor"
                      className="text-primary"
                    />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div>
              <p className="inline-flex items-center gap-2 text-primary font-medium tracking-wide uppercase text-sm mb-4">
                <span className="w-8 h-[2px] bg-primary" />
                About Us
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-balance">
                Where Tradition Meets{" "}
                <span className="text-primary">Modern Design</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2009, Artisan Living began with a simple vision: to
              create furniture that stands the test of time. We believe that
              every home deserves pieces that are not just functional, but works
              of art that tell a story.
            </p>

            <div className="grid grid-cols-3 gap-6 py-8 border-y border-border">
              <div className="text-center">
                <p className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  <Counter end={500} suffix="+" />
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Unique Designs
                </p>
              </div>
              <div className="text-center border-x border-border">
                <p className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  <Counter end={98} suffix="%" />
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Satisfaction
                </p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  <Counter end={25} suffix="+" />
                </p>
                <p className="text-sm text-muted-foreground mt-1">Countries</p>
              </div>
            </div>

            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group flex gap-5 items-start p-5 rounded-2xl hover:bg-secondary/50 transition-all duration-300 cursor-pointer"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button
                size="lg"
                className="rounded-full px-10 py-7 text-base bg-foreground text-background hover:bg-foreground/90 group mt-4 shine-effect overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
