export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  materials: string[];
  dimensions: {
    width: number;
    depth: number;
    height: number;
    unit: string;
  };
  colors: string[];
  inStock: boolean;
  featured: boolean;
  customizable: boolean;
  leadTime: string;
  tags: string[];
}

export const categories = [
  { id: "living-room", name: "Living Room", count: 45 },
  { id: "bedroom", name: "Bedroom", count: 38 },
  { id: "dining", name: "Dining", count: 32 },
  { id: "office", name: "Office", count: 28 },
  { id: "outdoor", name: "Outdoor", count: 22 },
  { id: "storage", name: "Storage", count: 25 },
];

export const subcategories: Record<string, string[]> = {
  "living-room": ["Sofas", "Chairs", "Coffee Tables", "TV Units", "Cabinets"],
  bedroom: ["Beds", "Wardrobes", "Nightstands", "Dressers", "Benches"],
  dining: [
    "Dining Tables",
    "Dining Chairs",
    "Bar Stools",
    "Sideboards",
    "Bar Cabinets",
  ],
  office: [
    "Desks",
    "Office Chairs",
    "Bookcases",
    "Filing Cabinets",
    "Conference Tables",
  ],
  outdoor: [
    "Outdoor Sofas",
    "Loungers",
    "Patio Tables",
    "Garden Chairs",
    "Planters",
  ],
  storage: [
    "Shelving Units",
    "Cabinets",
    "Chests",
    "Media Consoles",
    "Modular Storage",
  ],
};

export const materials = [
  "Teak",
  "Oak",
  "Walnut",
  "Ash",
  "Mango Wood",
  "Sheesham",
  "Reclaimed Wood",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Oslo Lounge Chair",
    slug: "oslo-lounge-chair",
    category: "living-room",
    subcategory: "Chairs",
    price: 42500,
    description:
      "The Oslo Lounge Chair combines Scandinavian minimalism with Indian craftsmanship. Hand-carved from sustainably sourced teak, featuring a floating backrest design and premium linen upholstery. Each curve is precision-milled then hand-finished, ensuring sculptural quality and lasting comfort.",
    shortDescription:
      "Scandinavian-inspired lounge chair in solid teak with premium upholstery.",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=1200&q=80",
    ],
    materials: ["Teak", "Linen"],
    dimensions: { width: 75, depth: 85, height: 78, unit: "cm" },
    colors: ["Natural Teak", "Walnut Stain", "Charcoal"],
    inStock: true,
    featured: true,
    customizable: true,
    leadTime: "4-6 weeks",
    tags: ["lounge", "modern", "handcrafted", "scandinavian"],
  },
  {
    id: "2",
    name: "Milano Dining Table",
    slug: "milano-dining-table",
    category: "dining",
    subcategory: "Dining Tables",
    price: 95000,
    description:
      "A statement dining table crafted from solid walnut with live-edge detailing. The Milano features a unique book-matched tabletop and tapered steel legs. Seats 6-8 comfortably. Hand-finished with natural oil for depth and protection.",
    shortDescription:
      "Live-edge walnut dining table with book-matched top and steel base.",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80",
    ],
    materials: ["Walnut", "Steel"],
    dimensions: { width: 200, depth: 100, height: 75, unit: "cm" },
    colors: ["Natural Walnut", "Dark Walnut"],
    inStock: true,
    featured: true,
    customizable: true,
    leadTime: "6-8 weeks",
    tags: ["dining", "live-edge", "contemporary", "statement"],
  },
  {
    id: "3",
    name: "Vienna Modular Sofa",
    slug: "vienna-modular-sofa",
    category: "living-room",
    subcategory: "Sofas",
    price: 125000,
    description:
      "Luxurious 3-seater modular sofa in premium velvet upholstery. Oak frame with pocket-sprung seat cushions and feather-wrapped back pillows. The Vienna offers cloud-like comfort with a refined silhouette. Configure as sectional or standalone.",
    shortDescription:
      "Premium modular sofa with oak frame and velvet upholstery.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80",
    ],
    materials: ["Oak", "Velvet", "Foam"],
    dimensions: { width: 220, depth: 95, height: 85, unit: "cm" },
    colors: ["Navy", "Emerald", "Blush", "Charcoal"],
    inStock: true,
    featured: true,
    customizable: true,
    leadTime: "8-10 weeks",
    tags: ["sofa", "modular", "luxury", "comfort"],
  },
  {
    id: "4",
    name: "Heritage Sheesham Bed",
    slug: "heritage-sheesham-bed",
    category: "bedroom",
    subcategory: "Beds",
    price: 78000,
    description:
      "King-size platform bed crafted from solid sheesham wood. Features traditional joinery with contemporary clean lines. Low-profile design with slatted base for mattress support. Hand-carved headboard with geometric inlay detail.",
    shortDescription: "King-size sheesham platform bed with carved headboard.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
    ],
    materials: ["Sheesham"],
    dimensions: { width: 180, depth: 210, height: 120, unit: "cm" },
    colors: ["Natural", "Honey", "Espresso"],
    inStock: true,
    featured: false,
    customizable: true,
    leadTime: "5-7 weeks",
    tags: ["bed", "sheesham", "traditional", "handcrafted"],
  },
  {
    id: "5",
    name: "Kyoto Office Desk",
    slug: "kyoto-office-desk",
    category: "office",
    subcategory: "Desks",
    price: 52000,
    description:
      "Minimalist writing desk in solid ash with seamless dovetail drawers. Cable management built into the frame. Ideal for focused work with clean lines and ample surface area. Japanese-inspired joinery throughout.",
    shortDescription:
      "Minimalist ash wood desk with integrated cable management.",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80",
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80",
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1200&q=80",
    ],
    materials: ["Ash"],
    dimensions: { width: 140, depth: 70, height: 75, unit: "cm" },
    colors: ["Natural Ash", "White Oak"],
    inStock: true,
    featured: false,
    customizable: true,
    leadTime: "4-5 weeks",
    tags: ["desk", "minimalist", "office", "workspace"],
  },
  {
    id: "6",
    name: "Havana Outdoor Lounger",
    slug: "havana-outdoor-lounger",
    category: "outdoor",
    subcategory: "Loungers",
    price: 38000,
    description:
      "Weather-resistant teak lounger with adjustable backrest. Marine-grade cushions in UV-resistant fabric. Built for coastal climates with rust-proof hardware. Folds flat for storage.",
    shortDescription: "Teak outdoor lounger with marine-grade cushions.",
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
    materials: ["Teak", "Outdoor Fabric"],
    dimensions: { width: 70, depth: 200, height: 35, unit: "cm" },
    colors: ["Natural Teak", "Weathered Gray"],
    inStock: true,
    featured: false,
    customizable: false,
    leadTime: "3-4 weeks",
    tags: ["outdoor", "lounger", "weather-resistant", "patio"],
  },
  {
    id: "7",
    name: "Brooklyn Industrial Bookcase",
    slug: "brooklyn-industrial-bookcase",
    category: "storage",
    subcategory: "Bookcases",
    price: 32000,
    description:
      "Open bookcase with reclaimed mango wood shelves and powder-coated steel frame. Industrial aesthetic meets sustainable materials. Five adjustable shelves for versatile display and storage.",
    shortDescription:
      "Industrial bookcase with reclaimed wood and steel frame.",
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&q=80",
      "https://images.unsplash.com/photo-1595428773946-1af84f1c823b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600494448655-f7ae4261d61e?w=1200&q=80",
    ],
    materials: ["Mango Wood", "Steel"],
    dimensions: { width: 90, depth: 35, height: 180, unit: "cm" },
    colors: ["Reclaimed Natural", "Dark Stain"],
    inStock: true,
    featured: false,
    customizable: false,
    leadTime: "3-4 weeks",
    tags: ["bookcase", "industrial", "reclaimed", "storage"],
  },
  {
    id: "8",
    name: "Aurora Velvet Dining Chair",
    slug: "aurora-velvet-dining-chair",
    category: "dining",
    subcategory: "Dining Chairs",
    price: 18500,
    description:
      "Upholstered dining chair with channel-tufted backrest in jewel-tone velvet. Black powder-coated steel legs with gold-tipped feet. Cushioned seat for extended dining comfort. Sold individually or as set of 4.",
    shortDescription:
      "Velvet dining chair with channel-tufted back and steel legs.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      "https://images.unsplash.com/photo-1601866728398-9e2a1e5d6a2e?w=1200&q=80",
      "https://images.unsplash.com/photo-1615065773550-d067e0b57f54?w=1200&q=80",
    ],
    materials: ["Velvet", "Steel"],
    dimensions: { width: 48, depth: 58, height: 88, unit: "cm" },
    colors: ["Emerald", "Sapphire", "Ruby", "Gold"],
    inStock: true,
    featured: true,
    customizable: false,
    leadTime: "4-5 weeks",
    tags: ["dining-chair", "velvet", "contemporary", "elegant"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
