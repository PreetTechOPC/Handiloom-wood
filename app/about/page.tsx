import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Shield,
  Globe2,
  Factory,
  Users,
  Sparkles,
  MapPin,
  ArrowRight,
  Play,
  Award,
  Leaf,
  Heart,
  CheckCircle2,
  Truck,
  Settings,
  Box,
  Layers,
  Globe,
  Container,
  Ruler,
  Hammer,
} from "lucide-react";

const faqs = [
  {
    q: "Do you ship internationally?",
    a: "Yes. We export luxury marble décor and bespoke stone furniture worldwide with secure export packaging and complete shipping documentation.",
  },
  {
    q: "Can you manufacture custom designs?",
    a: "Absolutely. We offer OEM, private label and bespoke manufacturing based on your drawings, dimensions, materials and branding requirements.",
  },
  {
    q: "Which natural stones do you work with?",
    a: "We specialize in White Marble, Green Onyx, Travertine, Black Marble, Rosso Levanto, and Banswara Marble. We also source additional natural stones on request.",
  },
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "MOQ depends on the product category. We support sample orders, hospitality projects and bulk wholesale production.",
  },
  {
    q: "What industries do you serve?",
    a: "We proudly serve Luxury Home Décor Brands, Interior Designers, Hotels & Resorts, Architects, Furniture Retailers, Importers & Distributors, and Private Label Brands.",
  },
  {
    q: "How do you ensure product quality?",
    a: "Every item is inspected for natural stone quality, finish, dimensions, packaging, and export readiness before shipment.",
  },
  {
    q: "How long does production take?",
    a: "Production timelines depend on order complexity and volume. Standard orders take 20–35 days, bespoke/OEM projects take 30–60 days, and sample orders are ready in 7–15 days.",
  },
];

const exportCountries = [
  "USA",
  "United Kingdom",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Netherlands",
  "UAE",
  "Saudi Arabia",
  "Singapore",
];

export default function AboutPage() {
  return (
    <div className="relative bg-background">
      {/* Header */}
      <Header />

      {/* Hero Banner with Background Image */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1920&q=80"
            alt="Handcrafted furniture workshop"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="container mx-auto px-6 py-28 lg:py-36 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left Column Content */}
            <div className="space-y-7 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-5 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" /> Trusted Indian Natural Stone & Luxury Furniture Exporter
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight text-foreground">
                  Crafting Timeless Spaces
                  <span className="block text-primary">in Natural Stone.</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Handiloomwood designs and exports handcrafted marble décor, natural stone accessories, bespoke furniture, and luxury interior collections. From premium residences and boutique hotels to retail brands and commercial projects, we create timeless pieces that combine exceptional craftsmanship with the beauty of natural stone.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-[0_22px_70px_-28px_var(--primary)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Our Collection
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <a href="mailto:export@handiloomwood.com">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-foreground/20 bg-background/60 backdrop-blur-sm px-8 py-6 text-base font-semibold text-foreground hover:bg-foreground hover:text-background"
                  >
                    Download Catalogue
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 text-sm font-medium">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-primary">
                  ✔ Premium Natural Stone
                </span>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-primary">
                  ✔ OEM & Private Label
                </span>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-primary">
                  ✔ Hospitality • Retail • Residential
                </span>
              </div>
            </div>

            {/* Right Column: Marble Table Showcase */}
            <div className="relative group">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border/60 bg-secondary/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1000&q=80"
                  alt="Handcrafted Natural Marble Article Table"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-background/80 backdrop-blur-md border border-border/50">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                    Bespoke Marble Article
                  </p>
                  <p className="font-serif text-lg font-medium text-foreground">
                    Hand-carved Natural Marble & Stone Center Piece
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-primary/8 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 py-24 relative space-y-20">
          {/* Why Choose Us */}
          <div className="max-w-7xl mx-auto">
            <div className="max-w-5xl space-y-6 mb-14">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                <Sparkles className="h-4 w-4" /> Why Choose Us
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
                Crafted for Luxury. Built to Last.
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                At Handiloomwood, we transform premium natural stone into timeless décor and bespoke furniture. Every piece is handcrafted by skilled artisans using carefully selected marble, travertine, and onyx, combining exceptional craftsmanship with global quality standards for residential, hospitality, and retail projects.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Box, // Marble block icon
                  title: "Premium Natural Stone",
                  description:
                    "Carefully selected marble, travertine, and onyx chosen for their natural beauty, durability, and unique character.",
                },
                {
                  icon: Layers, // Stone slab icon
                  title: "Expert Stone Craftsmanship",
                  description:
                    "Skilled artisans shape every piece with precision, preserving the beauty of natural stone through traditional craftsmanship.",
                },
                {
                  icon: Hammer, // Handcrafted tools icon
                  title: "Luxury Finishes",
                  description:
                    "Honed, polished, leathered, and custom finishes tailored to luxury interiors and premium hospitality projects.",
                },
                {
                  icon: Globe, // Globe icon
                  title: "15+ Years of Excellence",
                  description:
                    "Trusted by architects, designers, retailers, and hospitality brands across Domestic markets since 2009.",
                },
                {
                  icon: Container, // Shipping container icon
                  title: "Worldwide Export",
                  description:
                    "Complete export documentation, secure packaging, and reliable worldwide delivery for wholesale and commercial orders.",
                },
                {
                  icon: Ruler, // Architectural drawing icon
                  title: "OEM & Private Label",
                  description:
                    "Custom sizes, materials, branding, packaging, and exclusive product development for global retailers and private labels.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group rounded-3xl border border-border/60 bg-background/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-1"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Journey */}
          <div className="max-w-5xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-4 w-4" /> OUR JOURNEY
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
              Bringing India’s Finest Natural Stone to the World
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Handiloomwood has been creating handcrafted marble décor, natural stone accessories, bespoke furniture, and luxury interior collections. By combining premium marble, travertine, onyx, and fine wood craftsmanship, we help retailers, hospitality brands, architects, and interior designers bring timeless elegance to projects around the world.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                label: "15+ Years of Excellence",
                value: "15+ Years",
                icon: Shield,
              },
              {
                label: "15+ Countries Served",
                value: "15+ Countries",
                icon: Globe2,
              },
              {
                label: "OEM & Private Label Solutions",
                value: "OEM & Private Label",
                icon: Factory,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur-md shadow-xl hover:border-primary/30 transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xl font-serif font-bold text-foreground">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-8">
              <div className="rounded-3xl border border-border/60 bg-secondary/40 p-8 shadow-2xl">
                <h2 className="font-serif text-3xl text-foreground mb-3">
                  Serving Global Luxury Markets
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We proudly export premium marble décor, natural stone accessories, bespoke furniture, and custom collections for retailers, hospitality groups, architects, and interior designers worldwide.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {exportCountries.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-sm text-foreground/80"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow-xl backdrop-blur-sm space-y-4">
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  Our Craftsmanship
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our artisans shape premium marble, travertine and onyx into timeless décor and bespoke furniture. Every piece is hand-finished to preserve the natural beauty, veining and character of the stone.
                </p>
                <div className="pt-2 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Hand Finished</p>
                      <p className="text-xs text-muted-foreground">Every edge is refined by skilled artisans for a luxury finish.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Premium Natural Stone</p>
                      <p className="text-xs text-muted-foreground">Carefully selected White Marble, Green Onyx, Travertine and Black Marble.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Precision Quality Control</p>
                      <p className="text-xs text-muted-foreground">Every product is inspected before packaging and export.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-secondary/40 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-background" />
              <img
                src="https://images.unsplash.com/photo-1572297794908-f2ee5a2930d6?w=1400&q=80"
                alt="Natural Marble Crafting Workshop"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] items-center">
            <div className="relative max-w-md mx-auto lg:mx-0 w-full overflow-hidden rounded-3xl border border-border/70 bg-secondary/40 shadow-xl aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-background pointer-events-none" />
              <img
                src="/About us.PNG"
                alt="Arkan Khan - Founder & Managing Director"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="rounded-3xl border border-border/60 bg-background/80 p-8 lg:p-10 shadow-xl backdrop-blur-sm space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-primary font-semibold">
                DIRECTOR’S NOTE
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground leading-snug">
                “Natural stone is timeless. Our responsibility is to transform it into pieces people will admire for generations.”
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At HANDILOOMWOOD, we believe every block of natural stone carries its own character. Our artisans transform that beauty into luxury décor and bespoke furniture designed for homes, hotels and commercial spaces across the world.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="/About us.PNG"
                  alt="Arkan Khan"
                  className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <p className="font-semibold text-foreground">Arkan Khan</p>
                  <p className="text-muted-foreground text-sm">
                    Founder & Managing Director
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Manufacturing Video Section */}
          <div id="manufacturing-video" className="mt-20 scroll-mt-24">
            <div className="max-w-5xl space-y-6 mb-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                <Play className="h-4 w-4" /> BEHIND THE CRAFT
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
                Discover How Natural Stone Becomes Luxury
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Step inside our workshop and experience how skilled artisans transform carefully selected marble, travertine and onyx into luxury décor, bespoke furniture and architectural pieces. Every product is crafted with precision, attention to detail and uncompromising quality for clients worldwide.
              </p>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border/60 bg-secondary/40 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-background" />
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Handiloomwood Manufacturing Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: Box,
                  title: "🏛 Premium Natural Stone",
                  description:
                    "We source premium White Marble, Travertine, Green Onyx and Black Marble selected for their beauty and durability.",
                },
                {
                  icon: Hammer,
                  title: "✋ Skilled Stone Artisans",
                  description:
                    "Experienced craftsmen shape, carve and hand-finish every piece with exceptional attention to detail.",
                },
                {
                  icon: CheckCircle2,
                  title: "✔ Export Quality Assurance",
                  description:
                    "Every product undergoes dimensional, finish and packaging inspection before international shipment.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur-md shadow-lg"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-20 rounded-3xl border border-border/60 bg-background/80 p-8 lg:p-12 shadow-xl backdrop-blur-sm">
            <div className="max-w-xl mb-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-4">
                <Sparkles className="h-4 w-4" /> FAQs
              </p>
              <h3 className="font-serif text-3xl lg:text-4xl text-foreground">
                Common questions answered
              </h3>
            </div>
            <Accordion
              type="single"
              collapsible
              className="divide-y divide-border"
            >
              {faqs.map((item, idx) => (
                <AccordionItem key={item.q} value={`faq-${idx}`}>
                  <AccordionTrigger className="py-5 text-left text-foreground text-lg font-medium hover:text-primary transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground text-base">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA Band */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/14 via-background to-background shadow-[0_22px_70px_-30px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-6 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3 max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  <Sparkles className="h-4 w-4" /> START YOUR PROJECT
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground">
                  Luxury Marble Solutions for Homes, Hospitality & Global Brands
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Whether you’re sourcing luxury marble décor, bespoke stone furniture, hospitality collections or OEM private label products, our team is ready to bring your vision to life with premium natural stone craftsmanship.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 px-7 py-5 text-primary-foreground font-semibold shadow-lg"
                  >
                    Request a Quote
                  </Button>
                </Link>
                <a href="mailto:export@handiloomwood.com">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-foreground/15 bg-background/60 backdrop-blur-sm px-7 py-5 text-foreground font-semibold hover:bg-foreground hover:text-background"
                  >
                    Download Catalogue
                  </Button>
                </a>
                <a
                  href="https://wa.me/919411300058"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 text-sm font-semibold transition-all shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
