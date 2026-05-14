import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  products as localProducts,
  getProductBySlug as getLocalProductBySlug,
  getProductsByCategory as getLocalProductsByCategory,
} from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { hygraph, GET_PRODUCT_BY_SLUG, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from "@/lib/hygraph";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { products } = await hygraph.request<{ products: { slug: string }[] }>(GET_ALL_PRODUCTS);
    if (!products || !Array.isArray(products)) return [];
    
    return products
      .filter(p => p && p.slug)
      .map((product) => ({
        slug: product.slug,
      }));
  } catch (error) {
    console.error("Failed to generate static params from Hygraph:", error);
    return localProducts.map((product) => ({
      slug: product.slug,
    }));
  }
}

async function getProduct(slug: string) {
  try {
    const decodedSlug = decodeURIComponent(slug);
    const trimmedSlug = decodedSlug.trim();
    
    // 1. Try fetching by exact decoded slug (handles spaces if they exist in DB)
    const { products } = await hygraph.request<{ products: any[] }>(GET_PRODUCT_BY_SLUG, { slug: decodedSlug });
    let product = products?.[0];
    
    // 2. Try fetching by trimmed slug if different
    if (!product && decodedSlug !== trimmedSlug) {
      const { products: trimmedProducts } = await hygraph.request<{ products: any[] }>(GET_PRODUCT_BY_SLUG, { slug: trimmedSlug });
      product = trimmedProducts?.[0];
    }
    
    // 3. If not found, try fetching by ID directly
    if (!product) {
      try {
        const { products: productsById } = await hygraph.request<{ products: any[] }>(GET_PRODUCT_BY_ID, { id: trimmedSlug });
        product = productsById?.[0];
      } catch (e) {
        // Ignore ID format errors
      }
    }
    
    // 4. Try stripping 'product-' prefix
    if (!product && trimmedSlug.startsWith('product-')) {
      const id = trimmedSlug.replace('product-', '');
      const { products: productsById } = await hygraph.request<{ products: any[] }>(GET_PRODUCT_BY_ID, { id });
      product = productsById?.[0];
    }
    
    // 5. Fallback to local products
    if (!product) {
      product = getLocalProductBySlug(trimmedSlug) || getLocalProductBySlug(decodedSlug);
      if (!product) return null;
      return product;
    }

    const ensureArray = (val: any) => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
      return [];
    };

    return {
      ...product,
      images: (product.images || []).map((img: any) => img?.url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"),
      materials: ensureArray(product.materials),
      colors: ensureArray(product.colors),
      tags: ensureArray(product.tags),
      dimensions: product.dimensions || { width: 0, depth: 0, height: 0, unit: "cm" }
    };
  } catch (error) {
    console.error("Failed to fetch product from Hygraph:", error);
    return getLocalProductBySlug(slug);
  }
}

async function getRelatedProducts(category: string, currentId: string) {
  // For simplicity, we'll use local related products if hygraph fails, 
  // or you could add a GET_RELATED_PRODUCTS query.
  return getLocalProductsByCategory(category)
    .filter((p) => p.id !== currentId)
    .slice(0, 3);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <div className="relative bg-background text-foreground">
      <Header />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-primary/5 blur-[80px] will-change-transform" />
          <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-primary/5 blur-[80px] will-change-transform" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-6 relative">
          <div className="mb-8 sm:mb-10 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground bg-background/50 backdrop-blur-sm p-3 rounded-2xl border border-border/40 w-fit animate-in fade-in slide-in-from-top-4 duration-500">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to products
            </Link>
            <span className="h-4 w-[1px] bg-border mx-1" />
            <span className="text-xs uppercase tracking-[0.25em] text-foreground/50 font-semibold">
              {product.category}
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 xl:gap-14">
            <ProductGallery 
              images={product.images} 
              name={product.name} 
              featured={product.featured}
              inStock={product.inStock}
            />

            <aside className="lg:sticky lg:top-24 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {product.subcategory} · {product.leadTime}
                </p>
                <h1 className="font-serif text-4xl lg:text-5xl leading-tight tracking-tight text-foreground">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              <div className="pt-4">
                <Link href="/contact" className="block">
                  <Button size="lg" className="w-full rounded-full text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:scale-[0.98]">
                    Talk to Us
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-sm p-4 space-y-1 transition-all hover:border-primary/30">
                  <Package className="h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold">
                    {product.inStock ? "Ready to ship" : "Made to order"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Packed securely for export
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 backdrop-blur-sm p-4 space-y-1 transition-all hover:border-primary/30">
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
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/50">
                  Highlights
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.tags.slice(0, 6).map((tag: string) => (
                    <div
                      key={tag}
                      className="flex items-start gap-2 rounded-xl border border-border/70 bg-background/80 p-3 text-sm text-foreground/80 hover:border-primary/20 transition-colors"
                    >
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                  <Palette className="h-3.5 w-3.5 text-primary" /> Materials
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((mat: string) => (
                    <span
                      key={mat}
                      className="rounded-full border border-border/60 bg-secondary/80 px-4 py-2 text-xs font-medium text-foreground/80 hover:bg-secondary transition-colors"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {product.colors.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                    <Palette className="h-3.5 w-3.5 text-primary" /> Colors
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color: string) => (
                      <span
                        key={color}
                        className="rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-medium text-foreground/80 hover:border-border transition-colors"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                  <Ruler className="h-3.5 w-3.5 text-primary" /> Dimensions
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/40 backdrop-blur-md p-4 hover:border-primary/30 transition-all">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <p className="text-xl font-serif">
                        {product.dimensions.width}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        W ({product.dimensions.unit})
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-serif">
                        {product.dimensions.depth}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        D ({product.dimensions.unit})
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-serif">
                        {product.dimensions.height}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        H ({product.dimensions.unit})
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3 text-center space-y-2 hover:border-primary/20 transition-all">
                  <Shield className="h-5 w-5 text-primary mx-auto" />
                  <p className="text-[10px] text-muted-foreground font-bold leading-tight">
                    Crafted to export standards
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3 text-center space-y-2 hover:border-primary/20 transition-all">
                  <Truck className="h-5 w-5 text-primary mx-auto" />
                  <p className="text-[10px] text-muted-foreground font-bold leading-tight">
                    Global delivery support
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/80 p-3 text-center space-y-2 hover:border-primary/20 transition-all">
                  <Package className="h-5 w-5 text-primary mx-auto" />
                  <p className="text-[10px] text-muted-foreground font-bold leading-tight">
                    White-glove packaging
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="container mx-auto px-6 pb-16 space-y-12 animate-in fade-in duration-1000">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14">
            <div className="rounded-4xl border border-border/70 bg-background/40 backdrop-blur-md p-8 lg:p-12 shadow-2xl space-y-6 will-change-transform">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-primary/15 text-primary inline-flex items-center justify-center shadow-inner">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-foreground/40">
                    Details
                  </p>
                  <h2 className="font-serif text-3xl">Product narrative</h2>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl border border-border/60 bg-secondary/80 p-4 shadow-sm">
                  <h3 className="text-sm font-bold">Craftsmanship</h3>
                  <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                    Hand finished by seasoned artisans with meticulous joinery
                    and durable topcoats.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-secondary/80 p-4 shadow-sm">
                  <h3 className="text-sm font-bold">Sustainability</h3>
                  <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                    Responsibly sourced lumber, low-VOC finishes, and
                    repair-friendly construction.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-xl hover:border-primary/20 transition-all">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Care & Maintenance
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground font-medium">
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

              <div className="rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm p-6 shadow-xl hover:border-primary/20 transition-all">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Shipping & Support
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground font-medium">
                  <p>White-glove delivery available in metro cities.</p>
                  <p>International exports packed to ISTA standards.</p>
                  <p>Dedicated project manager for custom orders.</p>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="space-y-8 pt-8">
              <div className="flex items-center justify-between border-b border-border/50 pb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-foreground/40">
                    Curated for you
                  </p>
                  <h2 className="font-serif text-3xl lg:text-4xl">
                    You may also like
                  </h2>
                </div>
                <Link href="/products">
                  <Button variant="outline" className="rounded-full font-bold hover:bg-primary/5">
                    View all
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct, idx) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 space-y-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                        {relatedProduct.subcategory}
                      </p>
                      <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between pt-2 border-t border-border/40">
                        <p className="font-serif text-2xl text-foreground">
                          ₹{(relatedProduct.price / 1000).toFixed(0)}k
                        </p>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
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
