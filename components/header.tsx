"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

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
            <Link
              href="/"
              className="group flex items-center gap-3 relative z-10"
            >
              <Image src="/logo.webp" alt="Logo" width={200} height={100} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 group"
                >
                  {link.name}
                  <span
                    className={`absolute inset-0 rounded-full bg-secondary/80 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10`}
                  />
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
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
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-foreground transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-3" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 w-6 h-0.5 bg-foreground transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-5 w-6 h-0.5 bg-foreground transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-3" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />
        <nav className="relative h-full flex flex-col items-center justify-center gap-8 p-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
              }}
              className={`font-serif text-4xl font-medium text-foreground hover:text-primary transition-all duration-500 ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button
            style={{ transitionDelay: isMobileMenuOpen ? "400ms" : "0ms" }}
            className={`mt-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-lg transition-all duration-500 ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Contact Us
          </Button>
        </nav>
      </div>
    </>
  );
}
