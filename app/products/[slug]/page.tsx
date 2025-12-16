import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Ruler,
  Package,
  Palette,
  Shield,
  Truck,
} from "lucide-react";
import {
  products,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="relative bg-background text-foreground">
      <Header />

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

        <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 relative">
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to products
            </Link>
            <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">
              {product.category}
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14">
            <div className="space-y-4 sm:space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 backdrop-blur-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent" />
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover aspect-[4/5]"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {product.featured && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg">
                      <Sparkles className="h-4 w-4" /> Featured
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-xs font-semibold text-foreground shadow-lg">
                      Made to order
                    </span>
                  )}
                </div>
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {product.images.slice(1, 4).map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm shadow-lg"
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 2}`}
                        className="h-full w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 space-y-6">
              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                  {product.subcategory} · {product.leadTime}
                </p>
                <h1 className="font-serif text-4xl lg:text-5xl leading-tight tracking-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              <div className="pt-4">
                <Link href="/contact" className="block">
                  <Button size="lg" className="w-full rounded-full text-base">
                    Talk to Us
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-sm p-4 space-y-1">
                  <Package className="h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold">
                    {product.inStock ? "Ready to ship" : "Made to order"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Packed securely for export
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-sm p-4 space-y-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold">
                    {product.customizable
                      ? "Fully customizable"
                      : "Signature finish"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Size, stain, fabric options
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground/70">
                  Highlights
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.tags.slice(0, 6).map((tag) => (
                    <div
                      key={tag}
                      className="flex items-start gap-2 rounded-xl border border-border/70 bg-background/80 p-3 text-sm text-foreground/80"
                    >
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Palette className="h-4 w-4 text-primary" /> Materials
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((mat) => (
                    <span
                      key={mat}
                      className="rounded-full border border-border/60 bg-secondary/60 px-4 py-2 text-sm text-foreground/80"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {product.colors.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Palette className="h-4 w-4 text-primary" /> Colors
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-foreground/80"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Ruler className="h-4 w-4 text-primary" /> Dimensions
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-sm p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <p className="text-xl font-serif">
                        {product.dimensions.width}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">
                        W ({product.dimensions.unit})
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-serif">
                        {product.dimensions.depth}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">
                        D ({product.dimensions.unit})
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-serif">
                        {product.dimensions.height}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">
                        H ({product.dimensions.unit})
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3 text-center space-y-2">
                  <Shield className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    Crafted to export standards
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3 text-center space-y-2">
                  <Truck className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    Global delivery support
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3 text-center space-y-2">
                  <Package className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    White-glove packaging
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="container mx-auto px-6 pb-16 space-y-12">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14">
            <div className="rounded-4xl border border-border/70 bg-background/80 backdrop-blur-xl p-8 lg:p-12 shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-primary/15 text-primary inline-flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                    Details
                  </p>
                  <h2 className="font-serif text-3xl">Product narrative</h2>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl border border-border/60 bg-secondary/60 p-4">
                  <h3 className="text-sm font-semibold">Craftsmanship</h3>
                  <p className="text-sm text-foreground/70 mt-1">
                    Hand finished by seasoned artisans with meticulous joinery
                    and durable topcoats.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-secondary/60 p-4">
                  <h3 className="text-sm font-semibold">Sustainability</h3>
                  <p className="text-sm text-foreground/70 mt-1">
                    Responsibly sourced lumber, low-VOC finishes, and
                    repair-friendly construction.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-3">
                  Care & Maintenance
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Dust with a soft dry cloth; avoid harsh solvents and direct
                    heat.
                  </p>
                  <p>
                    Use coasters; wipe spills immediately to protect finish.
                  </p>
                  <p>
                    Annual oiling/conditioning for solid wood surfaces
                    recommended.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-3">
                  Shipping & Support
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>White-glove delivery available in metro cities.</p>
                  <p>International exports packed to ISTA standards.</p>
                  <p>Dedicated project manager for custom orders.</p>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                    Curated for you
                  </p>
                  <h2 className="font-serif text-3xl lg:text-4xl">
                    You may also like
                  </h2>
                </div>
                <Link href="/products">
                  <Button variant="outline" className="rounded-full">
                    View all
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 space-y-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary">
                        {relatedProduct.subcategory}
                      </p>
                      <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="font-serif text-2xl text-foreground">
                          ₹{(relatedProduct.price / 1000).toFixed(0)}k
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {relatedProduct.leadTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
