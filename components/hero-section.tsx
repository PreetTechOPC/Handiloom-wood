"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-morph"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] animate-morph"
          style={{ animationDelay: "2s", transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-secondary rounded-full blur-[60px]"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-2xl">
            <div
              className={`inline-flex items-center gap-3 px-5 py-2.5 bg-foreground/5 backdrop-blur-sm rounded-full border border-foreground/10 transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-foreground/80">New Collection 2025</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>

            <div className="overflow-hidden">
              <h1
                className={`font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[0.95] tracking-tight transition-all duration-1000 delay-200 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                }`}
              >
                <span className="block">Crafted for</span>
                <span className="block mt-2">
                  <span className="text-primary">Living</span>
                  <span className="text-primary">.</span>
                </span>
              </h1>
            </div>

            <p
              className={`text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md transition-all duration-1000 delay-400 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Discover timeless furniture pieces that blend artisanal craftsmanship with modern design. Each piece tells
              a story.
            </p>

            <div
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-1000 delay-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-7 text-base group relative overflow-hidden shine-effect"
              >
                <span className="relative z-10 flex items-center">
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-7 text-base border-foreground/20 hover:bg-foreground hover:text-background bg-transparent group transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Watch Story
              </Button>
            </div>

            <div
              className={`flex items-center gap-6 pt-8 transition-all duration-1000 delay-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-11 h-11 rounded-full border-2 border-background overflow-hidden shadow-lg">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        i === 1
                          ? "1494790108377-be9c29b29330"
                          : i === 2
                            ? "1507003211169-0a1dd7228f2d"
                            : i === 3
                              ? "1438761681033-6461ffad8d80"
                              : "1472099645785-5658abf4ff4e"
                      }?w=100&q=80`}
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-11 h-11 rounded-full border-2 border-background bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg">
                  +2k
                </div>
              </div>
              <div className="border-l border-border pl-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">from 2,500+ happy customers</p>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Main Image */}
            <div
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl"
              style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                alt="Luxury living room setup"
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-primary-foreground/50 rounded-tl-2xl" />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-primary-foreground/50 rounded-br-2xl" />
            </div>

            <div
              className="absolute -top-6 -right-6 glass rounded-2xl p-5 shadow-xl max-w-[180px] animate-float"
              style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Handcrafted</p>
                  <p className="text-xs text-muted-foreground">Quality</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-8 -left-8 glass rounded-2xl p-5 shadow-xl animate-float-delayed z-20"
              style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=80"
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Milano Chair</p>
                  <p className="text-xs text-muted-foreground">Just sold!</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-12 -right-12 w-24 h-24 border-2 border-primary/20 rounded-full animate-rotate-slow" />
            <div className="absolute bottom-1/3 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs text-muted-foreground uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}
