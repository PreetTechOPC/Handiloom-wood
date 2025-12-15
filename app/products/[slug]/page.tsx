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
  Clock,
  Shield,
  Truck,
  Heart,
  Share2,
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
    <div className="relative bg-background">
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

        <div className="container mx-auto px-6 py-12 relative">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to products
            </Link>
          </div>

          {/* Product Detail */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-2xl">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {product.featured && (
                  <div className="absolute top-6 right-6 rounded-full bg-primary/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-primary-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Featured
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.slice(1, 4).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-lg"
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                  {product.subcategory}
                </p>
                <h1 className="font-serif text-4xl lg:text-5xl leading-tight text-foreground">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.shortDescription}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 pb-6 border-b border-border">
                <p className="font-serif text-4xl text-foreground">
                  ₹{product.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Starting price</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-4 space-y-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    {product.leadTime}
                  </p>
                  <p className="text-xs text-muted-foreground">Lead time</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-4 space-y-2">
                  <Package className="h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    {product.inStock ? "In Stock" : "Made to Order"}
                  </p>
                  <p className="text-xs text-muted-foreground">Availability</p>
                </div>
              </div>

              {/* Materials */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Palette className="h-4 w-4 text-primary" />
                  Materials
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((mat) => (
                    <span
                      key={mat}
                      className="rounded-full bg-secondary/70 px-4 py-2 text-sm font-medium text-foreground"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Palette className="h-4 w-4 text-primary" />
                    Available Colors
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="rounded-full bg-secondary/70 px-4 py-2 text-sm font-medium text-foreground"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Ruler className="h-4 w-4 text-primary" />
                  Dimensions
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-serif text-foreground">
                        {product.dimensions.width}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Width
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif text-foreground">
                        {product.dimensions.depth}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Depth
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif text-foreground">
                        {product.dimensions.height}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Height
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {product.customizable && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                      Fully Customizable
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4 pt-6">
                <Button size="lg" className="flex-1 rounded-full text-base">
                  Add to Inquiry
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center space-y-2">
                  <Shield className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    Quality Assured
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <Truck className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    Global Shipping
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <Package className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    Secure Packaging
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="rounded-3xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-xl p-8 lg:p-12 space-y-6">
              <h2 className="font-serif text-3xl text-foreground">
                Product Details
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    Craftsmanship
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Handcrafted by skilled artisans using traditional techniques
                    passed down through generations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    Sustainability
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Made from responsibly sourced materials with minimal
                    environmental impact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
                  You may also like
                </h2>
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
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="p-6 space-y-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary">
                        {relatedProduct.subcategory}
                      </p>
                      <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="font-serif text-2xl text-foreground">
                        ₹{(relatedProduct.price / 1000).toFixed(0)}k
                      </p>
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
