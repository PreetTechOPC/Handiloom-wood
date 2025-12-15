"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Shop", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "py-3 bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-border/50"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="group flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                  <span className="font-serif text-xl font-bold text-primary-foreground">A</span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-tight text-foreground leading-none">
                  Artisan
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Living</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setActiveLink(link.name)}
                  onMouseLeave={() => setActiveLink("")}
                  className="relative px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 group"
                >
                  {link.name}
                  <span
                    className={`absolute inset-0 rounded-full bg-secondary/80 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10`}
                  />
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300`}
                  />
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="relative p-3 text-foreground/60 hover:text-foreground transition-colors group">
                <Search className="w-5 h-5 relative z-10" />
                <span className="absolute inset-0 rounded-full bg-secondary/80 scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
              <button className="relative p-3 text-foreground/60 hover:text-foreground transition-colors group">
                <User className="w-5 h-5 relative z-10" />
                <span className="absolute inset-0 rounded-full bg-secondary/80 scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
              <button className="relative p-3 text-foreground/60 hover:text-foreground transition-colors group">
                <ShoppingBag className="w-5 h-5 relative z-10" />
                <span className="absolute inset-0 rounded-full bg-secondary/80 scale-0 group-hover:scale-100 transition-transform duration-300" />
                <span className="absolute -top-0 -right-0 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  2
                </span>
              </button>

              <Button className="ml-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2.5 text-sm font-medium shine-effect overflow-hidden relative group">
                <span className="relative z-10">Get in Touch</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative p-2 text-foreground z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 top-3" : ""}`}
                />
                <span
                  className={`absolute left-0 top-3 w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-5 w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 top-3" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />
        <nav className="relative h-full flex flex-col items-center justify-center gap-8 p-6">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms" }}
              className={`font-serif text-4xl font-medium text-foreground hover:text-primary transition-all duration-500 ${
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button
            style={{ transitionDelay: isMobileMenuOpen ? "400ms" : "0ms" }}
            className={`mt-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-lg transition-all duration-500 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Contact Us
          </Button>
        </nav>
      </div>
    </>
  )
}
