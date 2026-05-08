"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Furniture",
      href: "#",
      submenu: [
        { name: "Living Room", href: "/products?category=living-room" },
        { name: "Dining", href: "/products?category=dining" },
        { name: "Bedroom", href: "/products?category=bedroom" },
        { name: "Luxury Carving", href: "/products?category=luxury-carving" },
        { name: "Custom Projects", href: "/products?category=custom-projects" },
      ],
    },
    {
      name: "Stone Decor",
      href: "#",
      submenu: [
        { name: "Marble Decor", href: "/products?category=marble-decor" },
        { name: "Sculptures", href: "/products?category=sculptures" },
        { name: "Wall Panels", href: "/products?category=wall-panels" },
        { name: "Custom Projects", href: "/products?category=stone-custom-projects" },
      ],
    },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Gallery", href: "/gallery" },
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
              {navLinks.map((link) => 
                link.submenu ? (
                  <div
                    key={link.name}
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <DropdownMenu open={openDropdown === link.name} onOpenChange={(open) => !open && setOpenDropdown(null)} modal={false}>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-1 relative px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 group outline-none">
                          {link.name}
                          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        onMouseEnter={() => setOpenDropdown(link.name)}
                        className="min-w-[200px] rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                      >
                        {link.submenu.map((sub) => (
                          <DropdownMenuItem key={sub.name} asChild>
                            <Link
                              href={sub.href}
                              className="w-full px-4 py-2.5 text-sm rounded-xl cursor-pointer transition-colors hover:bg-secondary/80 hover:text-primary focus:bg-secondary/80 focus:text-primary outline-none"
                            >
                              {sub.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
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
                )
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/contact">
                <Button className="ml-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2.5 text-sm font-medium shine-effect overflow-hidden relative group">
                  <span className="relative z-10">Get in Touch</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative p-3 text-foreground z-50 -mr-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />
        
        <div className="relative h-full flex flex-col pt-24 pb-8 px-8 overflow-y-auto">
          {/* Close Button Inside Menu */}
          <button
            className="absolute top-6 right-6 p-3 text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {navLinks.map((link, index) => (
              <AccordionItem 
                key={link.name} 
                value={link.name}
                className="border-none"
              >
                {link.submenu ? (
                  <>
                    <AccordionTrigger 
                      className={`py-2 hover:no-underline font-serif text-3xl font-medium text-foreground transition-all duration-500 ${
                        isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {link.name}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 flex flex-col gap-4 pl-4 border-l border-primary/20">
                      {link.submenu.map((sub, subIdx) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="text-lg text-foreground/60 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-2 font-serif text-3xl font-medium text-foreground hover:text-primary transition-all duration-500 ${
                      isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </AccordionItem>
            ))}
          </Accordion>

          <div 
            className={`mt-auto pt-10 transition-all duration-700 delay-300 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-7 text-lg font-medium shadow-xl">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
