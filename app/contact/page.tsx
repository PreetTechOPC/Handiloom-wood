"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { DownloadCatalogueButton } from "@/components/download-catalogue-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Shield,
} from "lucide-react";

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send inquiry. Please try again or email export@handiloomwood.com");
    } finally {
      setIsSubmitting(false);
    }

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        company: "",
        subject: "",
        message: "",
        consent: false,
      });
      setIsSubmitted(false);
    }, 5000);
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
              Let’s bring your vision to life
              <span className="block text-primary">in natural stone.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Share your marble, natural stone, or custom furniture requirements. From luxury décor and stone furniture to hospitality and private-label collections, our export specialists will help you with sourcing, customization, production, and worldwide delivery.
            </p>

            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/80 border border-primary/30 px-4 py-2 text-primary">
                Custom Marble Manufacturing
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/80 border border-primary/30 px-4 py-2 text-primary">
                OEM & Private Label
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/80 border border-primary/30 px-4 py-2 text-primary">
                Export Packaging Worldwide
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
          {/* Inquiry Form Section - Centered */}
          <div className="max-w-3xl mx-auto">
            <div className="rounded-4xl border border-border/60 bg-card shadow-2xl p-8 lg:p-10">
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                    Export Enquiry
                  </p>
                  <h2 className="font-serif text-3xl lg:text-4xl">
                    Tell us about your project
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Share your product requirements, dimensions, stone preference, quantity, destination country, or customization needs. Our team will prepare the best quotation within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl">Quotation Request Received!</h3>
                    <p className="text-muted-foreground">
                      Your enquiry is confidential. We respond to all international export enquiries within 24 hours.
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
                        <div className="flex gap-2">
                          <Select
                            value={formData.countryCode}
                            onValueChange={(val) =>
                              setFormData((prev) => ({
                                ...prev,
                                countryCode: val,
                              }))
                            }
                          >
                            <SelectTrigger className="w-[100px] rounded-xl border-foreground/10 bg-background/70 backdrop-blur-sm">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {countryCodes.map((item) => (
                                <SelectItem
                                  key={item.code + item.country}
                                  value={item.code}
                                >
                                  <span className="flex items-center gap-2">
                                    <span>{item.flag}</span>
                                    <span>{item.code}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="flex-1 rounded-xl border-foreground/10 bg-background/70 backdrop-blur-sm"
                          />
                        </div>
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
                        placeholder="Travertine Furniture, Marble Décor, Wash Basin, Hotel Project, OEM Order, Retail Collection…"
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
                        placeholder="Tell us about your preferred stone (Travertine, White Marble, Green Onyx, Black Marble), dimensions, quantity, destination country, customization, and expected delivery schedule."
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
                          I agree to allow Handiloomwood to contact me via email, phone, or WhatsApp regarding my enquiry, quotations, samples, and product updates. <span className="text-primary">*</span>
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !formData.consent}
                      className="w-full rounded-full text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Processing Request...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Request a Quote
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center font-medium">
                      Your enquiry is confidential. We respond to all international export enquiries within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                <Sparkles className="h-4 w-4" /> Get In Touch
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl leading-tight">
                Multiple Ways to Connect
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Connect with our export specialists for marble décor, stone furniture, hospitality projects, OEM manufacturing, and bulk orders. We typically respond within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Phone Card */}
              <div className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                  <div className="h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Sales & Export Support</h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      Mon–Sat | 9:00 AM – 6:00 PM (IST)
                    </p>
                    <div className="flex flex-col text-primary font-semibold text-sm pt-1">
                      <a href="tel:+919917524064" className="hover:underline">
                        +91 99175 24064
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-xs text-muted-foreground font-medium leading-normal">
                      Best for Quotations, Product Catalogues & Bulk Enquiries
                    </p>
                    <div className="flex flex-col text-primary font-semibold text-sm pt-1">
                      <a
                        href="mailto:export@handiloomwood.com"
                        className="hover:underline"
                      >
                        export@handiloomwood.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Us Card */}
              <div className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Visit Us</h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      Head Office & Export Operations
                    </p>
                    <p className="text-foreground/90 text-xs leading-relaxed pt-1">
                      Shop 1, Devidayal Apartment,<br />
                      Telipura Road, Ramnagar,<br />
                      Nainital, Uttarakhand 244715, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <div className="space-y-1 text-xs text-foreground/80">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground">Mon - Sat</span>
                          <span className="font-medium">9:00 AM - 6:00 PM (IST)</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="font-medium">Closed</span>
                        </div>
                        <p className="text-primary font-semibold text-xs pt-1 text-center">
                          Response Time: Within 24 Hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a
                href="tel:+919917524064"
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg"
              >
                <Headphones className="h-5 w-5" /> Call Sales Team
              </a>
              <a
                href="https://wa.me/919411300058"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-6 py-4 text-sm font-semibold text-white transition-all shadow-lg"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl lg:text-4xl">
                Visit Our Showroom
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Visit our showroom and explore handcrafted marble décor, luxury stone furniture, wash basins, tabletops, hospitality collections, and custom projects. Schedule an appointment with our export team for a personalized consultation.
              </p>
            </div>

            <div className="rounded-4xl border border-border/60 bg-background/80 backdrop-blur-sm shadow-2xl overflow-hidden relative">
              <a
                href="https://maps.app.goo.gl/ih9HtwQBMFRszHRs7?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
              >
                <MapPin className="h-4 w-4" /> Open in Google Maps
              </a>
              <div className="aspect-[16/9] lg:aspect-[21/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.498188169974!2d79.1245053!3d29.3986968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a16c7f8c142b7%3A0x6b63c78a0df70231!2sRamnagar%2C%20Uttarakhand%20244715!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
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

          {/* 4 Info Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-5 sm:p-6 text-center shadow-lg hover:border-primary/30 transition-all">
              <div className="inline-flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Manufacturing Facility</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Handcrafted marble décor and bespoke stone furniture produced with precision finishing and export-quality standards.
              </p>
            </div>

            <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-5 sm:p-6 text-center shadow-lg hover:border-primary/30 transition-all">
              <div className="inline-flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Export Division</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Supplying luxury marble collections to hospitality, retail, and interior-design clients across 15+ countries.
              </p>
            </div>

            <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-5 sm:p-6 text-center shadow-lg hover:border-primary/30 transition-all">
              <div className="inline-flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Export Support</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Dedicated sales assistance for quotations, samples, customization, and worldwide shipping.
              </p>
            </div>

            <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-5 sm:p-6 text-center shadow-lg hover:border-primary/30 transition-all">
              <div className="inline-flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Quality Assured</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Carefully selected natural stone, professional finishing, and secure export packaging for international delivery.
              </p>
            </div>
          </div>

          {/* Section 4: Final CTA Section */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-primary/20 bg-neutral-950 text-white p-8 sm:p-12 shadow-2xl text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              READY TO SOURCE PREMIUM NATURAL STONE
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl text-white max-w-2xl mx-auto leading-tight">
              Let's create something exceptional together
            </h3>
            <p className="text-neutral-300 max-w-2xl mx-auto text-base leading-relaxed">
              Whether you're sourcing marble décor, bespoke stone furniture, hospitality collections, or private-label products, our export team is ready to help.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-full bg-[#B84033] hover:bg-[#a2362b] text-white px-8 py-6 text-base font-semibold shadow-xl"
                >
                  <Send className="mr-2 h-4 w-4" /> Request a Quote
                </Button>
              </Link>
              <DownloadCatalogueButton
                size="lg"
                variant="outline"
                className="rounded-full border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 px-8 py-6 text-base font-semibold"
              />
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 pt-6 text-xs text-neutral-300 border-t border-neutral-800/80">
              <span className="flex items-center gap-1.5">
                🌎 Worldwide Export
              </span>
              <span className="flex items-center gap-1.5">
                🪨 100% Natural Stone
              </span>
              <span className="flex items-center gap-1.5">
                🏨 Hospitality Projects
              </span>
              <span className="flex items-center gap-1.5">
                🏷 OEM & Private Label
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
