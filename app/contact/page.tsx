"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Globe,
  Building2,
  Headphones,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        consent: false,
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="relative bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Contact us"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-5xl space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-5 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Let's Work Together
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" /> 24h response
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
                <Globe className="h-4 w-4 text-primary" /> Serving 30+ countries
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.92] tracking-tight text-foreground">
              Let's design furniture that
              <span className="block text-primary">moves your spaces.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
              Tell us about your project, sourcing needs, or custom program. Our
              specialists will align specs, timelines, and logistics tailored to
              you.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/70 border border-border/50 px-4 py-2">
                <Headphones className="h-4 w-4 text-primary" /> Dedicated
                project manager
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/70 border border-border/50 px-4 py-2">
                <Building2 className="h-4 w-4 text-primary" /> 20k sq ft
                facility
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/70 border border-border/50 px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Export-grade
                packaging
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-primary/8 blur-[120px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="container mx-auto px-6 py-18 lg:py-20 relative space-y-16">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Reach Us
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl leading-tight">
                  Connect with Handiloomwood
                </h2>
                <p className="text-muted-foreground">
                  Choose your preferred channel. We typically respond within 24
                  hours.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        Mon-Sat · 9:00 AM - 6:00 PM IST
                      </p>
                      <div className="flex flex-col text-primary font-medium">
                        <a href="tel:+919876543210" className="hover:underline">
                          +91 98765 43210
                        </a>
                        <a href="tel:+919876543211" className="hover:underline">
                          +91 98765 43211
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        Fastest for detailed specs & documents
                      </p>
                      <div className="flex flex-col text-primary font-medium">
                        <a
                          href="mailto:info@handiloomwood.com"
                          className="hover:underline"
                        >
                          info@handiloomwood.com
                        </a>
                        <a
                          href="mailto:sales@handiloomwood.com"
                          className="hover:underline"
                        >
                          sales@handiloomwood.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">Office & Showroom</h3>
                      <p className="text-sm text-muted-foreground">
                        Visit our manufacturing facility
                      </p>
                      <p className="text-foreground/90 leading-relaxed">
                        123, Industrial Area, Phase 2<br />
                        Jodhpur, Rajasthan 342001
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">Business Hours</h3>
                      <div className="space-y-1 text-sm text-foreground/80">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Mon - Fri
                          </span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Saturday
                          </span>
                          <span className="font-medium">
                            10:00 AM - 4:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="font-medium">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-lg">
                  <h3 className="font-semibold mb-3">Need immediate help?</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Headphones className="h-4 w-4" /> Call Sales Team
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Globe className="h-4 w-4" /> WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="rounded-4xl border border-border/60 bg-background/85 backdrop-blur-xl shadow-2xl p-8 lg:p-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                    Enquiry
                  </p>
                  <h2 className="font-serif text-3xl">
                    Tell us about your project
                  </h2>
                  <p className="text-muted-foreground">
                    Share requirements, volumes, timelines, or finishes. We'll
                    tailor options for you.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. We will connect within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="rounded-xl border-foreground/10 bg-background/70 backdrop-blur-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="rounded-xl border-foreground/10 bg-background/70 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="rounded-xl border-foreground/10 bg-background/70 backdrop-blur-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="company"
                          className="text-sm font-medium"
                        >
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={handleChange}
                          className="rounded-xl border-foreground/10 bg-background/70 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Custom hospitality package, bulk order, etc."
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="rounded-xl border-foreground/10 bg-background/70 backdrop-blur-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message <span className="text-primary">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about dimensions, finishes, quantities, delivery timelines..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="rounded-xl border-foreground/10 bg-background/70 backdrop-blur-sm resize-none"
                      />
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          required
                          className="mt-1 h-4 w-4 rounded border-foreground/20 text-primary focus:ring-primary focus:ring-offset-0"
                        />
                        <span className="text-sm text-foreground/80 leading-relaxed">
                          I consent to Handiloomwood collecting and storing my
                          information provided above. By checking this box, I
                          authorize Handiloomwood to contact me via phone,
                          email, or WhatsApp regarding my inquiry and future
                          updates about products and services.{" "}
                          <span className="text-primary">*</span>
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !formData.consent}
                      className="w-full rounded-full text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. Your information will never be
                      shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl lg:text-4xl">
                Visit Our Showroom
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience our craftsmanship in person. Schedule a visit to our
                manufacturing facility and showroom.
              </p>
            </div>

            <div className="rounded-4xl border border-border/60 bg-background/80 backdrop-blur-sm shadow-2xl overflow-hidden">
              <div className="aspect-[16/9] lg:aspect-[21/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.0859432631484!2d73.02456631501637!3d26.263863183419855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c4eaaaaaaab%3A0x44fd5b8d0b0b4c8e!2sJodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1639834567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-6 text-center shadow-lg">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Manufacturing Unit</h3>
              <p className="text-sm text-muted-foreground">
                20,000 sq ft production facility with modern machinery
              </p>
            </div>

            <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-6 text-center shadow-lg">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Export Division</h3>
              <p className="text-sm text-muted-foreground">
                Shipping to 30+ countries with dedicated export support
              </p>
            </div>

            <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-6 text-center shadow-lg">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Customer Support</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated support team available Mon-Sat, 9 AM - 6 PM IST
              </p>
            </div>

            <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-6 text-center shadow-lg">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                ISO certified manufacturing with rigorous quality checks
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
