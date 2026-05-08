import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProductsSection } from "@/components/products-section"
import { ReviewsSection } from "@/components/reviews-section"
import { GallerySection } from "@/components/gallery-section"
import { Footer } from "@/components/footer"
import { hygraph, GET_FEATURED_PRODUCTS, GET_GALLERY_ITEMS } from "@/lib/hygraph"

export const dynamic = "force-dynamic";

async function getGalleryItems() {
  try {
    const { galleryItems } = await hygraph.request<{ galleryItems: any[] }>(GET_GALLERY_ITEMS);
    return galleryItems.map(item => ({
      id: item.id,
      src: item.image?.url || "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=800&q=80",
      alt: item.title || "Gallery Image",
      category: item.category || "Living room collection"
    }));
  } catch (error) {
    console.error("Failed to fetch gallery items:", error);
    return [];
  }
}

async function getFeaturedProducts() {
  try {
    const { products } = await hygraph.request<{ products: any[] }>(GET_FEATURED_PRODUCTS);
    
    if (!products || !Array.isArray(products)) {
      return [];
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
    console.error("Failed to fetch featured products from Hygraph:", error);
    return [];
  }
}

export default async function Home() {
  const [featuredProducts, galleryImages] = await Promise.all([
    getFeaturedProducts(),
    getGalleryItems()
  ]);

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProductsSection products={featuredProducts} />
      <ReviewsSection />
      <GallerySection images={galleryImages} />
      <Footer />
    </main>
  )
}
