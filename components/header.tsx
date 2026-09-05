"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { ChevronDown, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

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
      name: "Wood Furniture",
      href: "/products?category=wood-furniture",
      submenu: [
        { name: "Living Room Furniture", href: "/products?category=living-room-furniture" },
        { name: "Dining Room Furniture", href: "/products?category=dining-room-furniture" },
        { name: "Bedroom Furniture", href: "/products?category=bedroom-furniture" },
        { name: "Console Tables", href: "/products?category=console-tables" },
        { name: "Coffee Tables", href: "/products?category=coffee-tables" },
        { name: "Side Tables", href: "/products?category=side-tables" },
        { name: "Outdoor Furniture", href: "/products?category=outdoor-furniture" },
        { name: "Custom Furniture", href: "/products?category=custom-furniture" },
      ],
    },
    {
      name: "Marble Décor",
      href: "/products?category=marble-decor",
      submenu: [
        { name: "Wash Basins", href: "/products?category=wash-basins" },
        { name: "Soap Dispensers", href: "/products?category=soap-dispensers" },
        { name: "Trays & Platters", href: "/products?category=trays-platters" },
        { name: "Decorative Bowls", href: "/products?category=decorative-bowls" },
        { name: "Candle Holders", href: "/products?category=candle-holders" },
        { name: "Decorative Boxes", href: "/products?category=decorative-boxes" },
        { name: "Marble Sculptures", href: "/products?category=marble-sculptures" },
        { name: "Garden & Outdoor Décor", href: "/products?category=garden-outdoor-decor" },
        { name: "Custom Marble Projects", href: "/products?category=custom-marble-projects" },
      ],
    },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href: string, submenu?: { href: string }[]) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (pathname.startsWith(href)) return true;
    if (submenu) {
      return submenu.some((item) => pathname === item.href);
    }
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "py-3 bg-background/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-border/50"
            : "py-5 bg-transparent"
        }`}
        aria-label="Main Navigation Header"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label="Handiloom Home"
            >
              <Image src="/logo.webp" alt="Handiloom Logo" width={200} height={100} priority />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Desktop Navigation">
              {navLinks.map((link) => {
                const active = isActiveLink(link.href, link.submenu);

                return link.submenu ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <DropdownMenu
                      open={openDropdown === link.name}
                      onOpenChange={(open) => !open && setOpenDropdown(null)}
                      modal={false}
                    >
                      <DropdownMenuTrigger asChild>
                        <Link
                          href={link.href}
                          onClick={() => {
                            setOpenDropdown(null);
                            router.push(link.href);
                          }}
                          className={`flex items-center gap-1.5 relative px-4 py-2 text-sm font-medium transition-colors duration-300 group outline-none cursor-pointer ${
                            active
                              ? "text-primary font-semibold"
                              : "text-foreground/80 hover:text-foreground"
                          }`}
                          aria-expanded={openDropdown === link.name}
                          aria-label={`${link.name} dropdown menu`}
                        >
                          {link.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              openDropdown === link.name ? "rotate-180 text-primary" : ""
                            }`}
                          />
                          <span
                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                              active ? "w-6" : "w-0 group-hover:w-4"
                            }`}
                          />
                        </Link>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        onMouseEnter={() => setOpenDropdown(link.name)}
                        className="min-w-[240px] rounded-2xl border border-border/70 bg-background/95 backdrop-blur-2xl p-2.5 shadow-2xl animate-in fade-in-80 zoom-in-95 duration-200"
                        align="start"
                      >
                        {link.submenu.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <DropdownMenuItem key={sub.name} asChild>
                              <Link
                                href={sub.href}
                                className={`w-full px-4 py-2.5 text-sm rounded-xl cursor-pointer transition-all duration-200 focus:outline-none flex items-center justify-between ${
                                  isSubActive
                                    ? "bg-secondary text-primary font-medium"
                                    : "text-foreground/80 hover:bg-secondary/70 hover:text-primary focus:bg-secondary/70 focus:text-primary"
                                }`}
                              >
                                <span>{sub.name}</span>
                                {isSubActive && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                )}
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                      active
                        ? "text-primary font-semibold"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                        active ? "w-6" : "w-0 group-hover:w-4"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Button asChild className="ml-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2.5 text-sm font-medium shine-effect overflow-hidden relative group">
                <Link href="/contact">
                  <span className="relative z-10">Get in Touch</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative p-3 text-foreground z-50 -mr-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
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
            aria-label="Close navigation menu"
          >
            <X className="h-8 w-8" />
          </button>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {navLinks.map((link, index) => {
              const active = isActiveLink(link.href, link.submenu);

              return (
                <AccordionItem
                  key={link.name}
                  value={link.name}
                  className="border-none"
                >
                  {link.submenu ? (
                    <>
                      <AccordionTrigger
                        className={`py-2 hover:no-underline font-serif text-2xl font-medium transition-all duration-500 ${
                          active ? "text-primary font-semibold" : "text-foreground"
                        } ${
                          isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 flex flex-col gap-3 pl-4 border-l border-primary/30">
                        {link.submenu.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={`text-base transition-colors ${
                                isSubActive
                                  ? "text-primary font-semibold"
                                  : "text-foreground/70 hover:text-primary"
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </AccordionContent>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block py-2 font-serif text-2xl font-medium transition-all duration-500 ${
                        active ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                      } ${
                        isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>

          <div
            className={`mt-auto pt-10 transition-all duration-700 delay-300 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-7 text-lg font-medium shadow-xl">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

