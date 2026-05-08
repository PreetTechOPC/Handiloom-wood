import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Sparkles } from "lucide-react";
import { products as localProducts } from "@/lib/products";
import { hygraph, GET_ALL_PRODUCTS } from "@/lib/hygraph";
import { ProductsClient } from "./ProductsClient";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const { products } = await hygraph.request<{ products: any[] }>(GET_ALL_PRODUCTS);
    
    if (!products || !Array.isArray(products)) {
      console.warn("Hygraph returned no products or invalid format");
      return localProducts;
    }

    const ensureArray = (val: any) => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
      return [];
    };

    return products
      .filter(p => p && p.slug)
      .map(p => ({
        ...p,
        slug: p.slug || `product-${p.id}`,
        images: (p.images || []).map((img: any) => img?.url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"),
        materials: ensureArray(p.materials),
        colors: ensureArray(p.colors),
        tags: ensureArray(p.tags),
        dimensions: p.dimensions || { width: 0, depth: 0, height: 0, unit: "cm" }
      }));
  } catch (error) {
    console.error("Failed to fetch products from Hygraph:", error);
    return localProducts;
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="relative bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80"
            alt="Furniture collection"
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
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-5 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Premium Handcrafted Furniture
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-foreground">
              Explore our
              <span className="block text-primary">full collection.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              From living rooms to outdoor spaces, discover bespoke pieces built
              with care, exported worldwide.
            </p>
          </div>
        </div>
      </section>

      <ProductsClient initialProducts={products} />

      <Footer />
    </div>
  );
}
