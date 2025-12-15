import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Globe2,
  Factory,
  Users,
  Sparkles,
  MapPin,
  ArrowRight,
  Play,
} from "lucide-react";

const faqs = [
  {
    q: "Do you ship globally?",
    a: "Yes. We export to North America, Europe, Middle East, Southeast Asia, and Oceania with full documentation and compliant packaging.",
  },
  {
    q: "Can you customize designs?",
    a: "Absolutely. We tailor dimensions, finishes, upholstery, and hardware to brand and project specifications, including hospitality rollouts.",
  },
  {
    q: "What woods and finishes do you use?",
    a: "We work primarily with seasoned hardwoods like teak, oak, and ash, finished with durable low-VOC coatings for longevity and sheen control.",
  },
  {
    q: "Typical lead times?",
    a: "Standard pieces ship in 4-6 weeks; custom programs range 6-10 weeks depending on complexity and volume.",
  },
];

const exportCountries = [
  "USA",
  "Canada",
  "UK",
  "Germany",
  "France",
  "UAE",
  "Qatar",
  "Saudi Arabia",
  "Singapore",
  "Australia",
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

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-5 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> Trusted Indian Furniture
              Exporters Since 2009
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight text-foreground">
                Craftsmanship, culture
                <span className="block text-primary">& connection.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                From our Indian workshops to luxury hotels and homes worldwide,
                we build wooden furniture that travels with beauty, durability,
                and soul.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-[0_22px_70px_-28px_var(--primary)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our Story
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-foreground/20 bg-background/60 backdrop-blur-sm px-8 py-6 text-base font-semibold text-foreground hover:bg-foreground hover:text-background"
              >
                <Play className="mr-2 h-4 w-4" /> Watch Workshop Tour
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 text-sm">
              <span className="rounded-full border border-foreground/10 bg-background/70 backdrop-blur-sm px-4 py-2 text-foreground/80">
                🇮🇳 Made in India
              </span>
              <span className="rounded-full border border-foreground/10 bg-background/70 backdrop-blur-sm px-4 py-2 text-foreground/80">
                30+ Export Destinations
              </span>
              <span className="rounded-full border border-foreground/10 bg-background/70 backdrop-blur-sm px-4 py-2 text-foreground/80">
                Hospitality & Residential
              </span>
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
          {/* Our Story */}
          <div className="max-w-5xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-4 w-4" /> Our Story
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
              Built to carry the soul of Indian craft to the world.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              We started in 2009 with a single workshop and a promise: build
              wooden furniture that carries the soul of Indian craft to homes
              and hotels worldwide. Today, Handiloomwood is a trusted exporter
              delivering bespoke and ready-to-ship pieces that blend durability,
              beauty, and cultural nuance.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Years crafting",
                value: "15+",
                icon: Shield,
              },
              {
                label: "Clients served",
                value: "2.5k+",
                icon: Users,
              },
              {
                label: "Countries exported",
                value: "30+",
                icon: Globe2,
              },
              {
                label: "Custom programs",
                value: "800+",
                icon: Factory,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur-md shadow-[0_14px_50px_-30px_rgba(0,0,0,0.48)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-serif text-foreground">
                    {item.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-8">
              <div className="rounded-3xl border border-border/60 bg-secondary/40 p-8 shadow-2xl">
                <h2 className="font-serif text-3xl text-foreground mb-3">
                  Global export focus
                </h2>
                <p className="text-muted-foreground">
                  We collaborate with hospitality groups, residential
                  developers, and boutique studios to deliver consistent quality
                  at export scale. Every shipment is QC-checked,
                  moisture-balanced, and export-packed to arrive ready for
                  install.
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

              <div className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow-xl backdrop-blur-sm">
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  Manufacturing ethos
                </h3>
                <p className="text-muted-foreground">
                  Seasoned hardwoods, precision joinery, and finishes tuned for
                  climate resilience. Our workshops integrate CNC accuracy with
                  hand-finished detailing, ensuring every curve and joint honors
                  the material.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-foreground/80">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1">
                    <Factory className="h-4 w-4 text-primary" /> In-house kiln
                    drying
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1">
                    <Shield className="h-4 w-4 text-primary" /> 3-stage QC
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1">
                    <MapPin className="h-4 w-4 text-primary" /> Multi-facility
                    network
                  </span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-secondary/40 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-transparent to-background" />
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=80"
                alt="Workshop and showroom"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-secondary/40 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/18 via-transparent to-background" />
              <img
                src="https://images.unsplash.com/photo-1523419400524-218e1b0dba6e?w=1400&q=80"
                alt="Director portrait"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-3xl border border-border/60 bg-background/80 p-8 lg:p-10 shadow-xl backdrop-blur-sm space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
                Director’s note
              </p>
              <h3 className="font-serif text-3xl lg:text-4xl text-foreground">
                “Every piece should feel like it remembers the hands that made
                it.”
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We built Handiloomwood to celebrate the depth of Indian
                craftsmanship while meeting global standards for fit, finish,
                and reliability. Thank you for letting us be part of your spaces
                around the world.
              </p>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="h-12 w-12 rounded-full bg-primary/15" />
                <div>
                  <p className="font-semibold text-foreground">Arjun Mehra</p>
                  <p className="text-muted-foreground">
                    Founder & Managing Director
                  </p>
                </div>
              </div>
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
                  <Sparkles className="h-4 w-4" /> Let’s build together
                </p>
                <h3 className="font-serif text-3xl lg:text-4xl text-foreground">
                  Bespoke programs for hotels, homes, and brands.
                </h3>
                <p className="text-muted-foreground">
                  Share your specs, finishes, and timelines—we’ll tailor a
                  production and export plan that fits.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-7 py-5 text-primary-foreground font-semibold"
                >
                  Book a call
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-foreground/15 bg-background/60 backdrop-blur-sm px-7 py-5 text-foreground font-semibold hover:bg-foreground hover:text-background"
                >
                  Download catalog
                </Button>
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
