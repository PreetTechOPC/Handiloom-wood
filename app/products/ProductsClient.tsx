"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  SlidersHorizontal,
  Grid3x3,
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { categories as staticCategories, subcategories, materials, Product } from "@/lib/products";

interface ProductsClientProps {
  initialProducts: Product[];
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showCustomizableOnly, setShowCustomizableOnly] = useState(false);
  const [gridView, setGridView] = useState<"grid" | "large">("grid");
  const [showFilters, setShowFilters] = useState(true);

  // Dynamic category counts
  const categories = useMemo(() => {
    return staticCategories.map(cat => ({
      ...cat,
      count: initialProducts.filter(p => p.category === cat.id).length
    }));
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        !product.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Subcategory filter
      if (
        selectedSubcategories.length > 0 &&
        !selectedSubcategories.includes(product.subcategory)
      ) {
        return false;
      }

      // Material filter
      if (
        selectedMaterials.length > 0 &&
        !selectedMaterials.some((mat) => product.materials.includes(mat))
      ) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Stock filter
      if (showInStockOnly && !product.inStock) {
        return false;
      }

      // Customizable filter
      if (showCustomizableOnly && !product.customizable) {
        return false;
      }

      return true;
    });
  }, [
    initialProducts,
    searchQuery,
    selectedCategory,
    selectedSubcategories,
    selectedMaterials,
    priceRange,
    showInStockOnly,
    showCustomizableOnly,
  ]);

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubcategories([]);
    setSelectedMaterials([]);
    setPriceRange([0, 200000]);
    setShowInStockOnly(false);
    setShowCustomizableOnly(false);
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedSubcategories.length +
    selectedMaterials.length +
    (showInStockOnly ? 1 : 0) +
    (showCustomizableOnly ? 1 : 0);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-primary/5 blur-[80px] will-change-transform" />
        <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-primary/5 blur-[80px] will-change-transform" />
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        {/* Search & Controls */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-foreground/10 bg-background/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full border-foreground/10 bg-background/70 backdrop-blur-sm"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>

              <div className="flex rounded-full border border-foreground/10 bg-background/70 backdrop-blur-sm p-1">
                <button
                  onClick={() => setGridView("grid")}
                  className={`p-2 rounded-full transition-all ${
                    gridView === "grid"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridView("large")}
                  className={`p-2 rounded-full transition-all ${
                    gridView === "large"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="hidden lg:block w-72 shrink-0 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="sticky top-24 space-y-6 rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md p-6 shadow-xl will-change-transform">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline transition-all"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-foreground/80">
                    Category
                  </h4>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === cat.id ? null : cat.id
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === cat.id
                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                            : "hover:bg-secondary text-foreground/70"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className={`text-xs ${selectedCategory === cat.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {cat.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {selectedCategory && subcategories[selectedCategory] && (
                  <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
                    <h4 className="font-medium text-sm text-foreground/80">
                      Type
                    </h4>
                    <div className="space-y-1">
                      {subcategories[selectedCategory].map((sub) => (
                        <label
                          key={sub}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer text-sm transition-colors group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubcategories.includes(sub)}
                            onChange={() => toggleSubcategory(sub)}
                            className="rounded border-foreground/20 text-primary focus:ring-primary/20"
                          />
                          <span className="text-foreground/70 group-hover:text-foreground transition-colors">{sub}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Materials */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-foreground/80">
                    Material
                  </h4>
                  <div className="space-y-1">
                    {materials.map((mat) => (
                      <label
                        key={mat}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer text-sm transition-colors group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(mat)}
                          onChange={() => toggleMaterial(mat)}
                          className="rounded border-foreground/20 text-primary focus:ring-primary/20"
                        />
                        <span className="text-foreground/70 group-hover:text-foreground transition-colors">{mat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer text-sm transition-colors group">
                    <input
                      type="checkbox"
                      checked={showInStockOnly}
                      onChange={(e) => setShowInStockOnly(e.target.checked)}
                      className="rounded border-foreground/20 text-primary focus:ring-primary/20"
                    />
                    <span className="text-foreground/70 group-hover:text-foreground transition-colors">In stock only</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer text-sm transition-colors group">
                    <input
                      type="checkbox"
                      checked={showCustomizableOnly}
                      onChange={(e) =>
                        setShowCustomizableOnly(e.target.checked)
                      }
                      className="rounded border-foreground/20 text-primary focus:ring-primary/20"
                    />
                    <span className="text-foreground/70 group-hover:text-foreground transition-colors">Customizable</span>
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-medium">
                Showing {filteredProducts.length} of {initialProducts.length}{" "}
                products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 animate-in fade-in duration-500">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/50 mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 transition-all duration-500 ${
                  gridView === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1 lg:grid-cols-2"
                }`}
              >
                {filteredProducts.map((product, idx) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 will-change-transform animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className={`relative ${
                        gridView === "large"
                          ? "aspect-[16/10]"
                          : "aspect-square"
                      } overflow-hidden`}
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={idx < 6}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {product.featured && (
                        <div className="absolute top-4 right-4 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
                          Featured
                        </div>
                      )}

                      {!product.inStock && (
                        <div className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground shadow-lg">
                          Made to order
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1">
                            {product.subcategory}
                          </p>
                          <h3 className="font-serif text-lg lg:text-xl text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                        {product.materials.slice(0, 2).map((mat) => (
                          <span
                            key={mat}
                            className="rounded-full bg-secondary/80 px-2 py-0.5 text-foreground/70 font-medium"
                          >
                            {mat}
                          </span>
                        ))}
                        {product.customizable && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary font-bold">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            Customizable
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div>
                          <p className="font-serif text-xl text-foreground">
                            ₹{(product.price / 1000).toFixed(0)}k
                          </p>
                          <p className="text-[10px] text-muted-foreground font-medium">
                            {product.leadTime}
                          </p>
                        </div>
                        <div
                          className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
