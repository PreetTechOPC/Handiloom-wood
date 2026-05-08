import { hygraph, GET_GALLERY_ITEMS } from "@/lib/hygraph";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-dynamic";

interface GalleryItem {
  id: string;
  src: string;
  category: string;
  title: string;
  description: string;
}

export default async function GalleryPage() {
  let initialImages: GalleryItem[] = [];

  try {
    const { galleryItems } = await hygraph.request<{ galleryItems: any[] }>(GET_GALLERY_ITEMS);
    
    initialImages = galleryItems.map((item) => ({
      id: item.id,
      src: item.image?.url || "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=800&q=80",
      category: item.category || "Living room collection",
      title: item.title || "Handcrafted Piece",
      description: item.description || "Beautifully designed custom furniture",
    }));
  } catch (error) {
    console.error("Failed to fetch gallery items from Hygraph:", error);
    // Fallback or empty state
  }

  return <GalleryClient initialImages={initialImages} />;
}
