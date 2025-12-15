"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  SlidersHorizontal,
  Grid3x3,
  LayoutGrid,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";
import { products, categories, subcategories, materials } from "@/lib/products";

export default function ProductsPage() {
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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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

      {/* Main Content */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-primary/8 blur-[120px]" />
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
                  className="pl-12 pr-4 py-6 rounded-full border-foreground/10 bg-background/70 backdrop-blur-sm"
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
                    className={`p-2 rounded-full transition-colors ${
                      gridView === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridView("large")}
                    className={`p-2 rounded-full transition-colors ${
                      gridView === "large"
                        ? "bg-primary text-primary-foreground"
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
                  className="h-7 text-xs rounded-full"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-24 space-y-6 rounded-3xl border border-border/60 bg-background/80 backdrop-blur-sm p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Filters</h3>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary hover:underline"
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
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === cat.id ? null : cat.id
                            )
                          }
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-secondary/50 text-foreground/70"
                          }`}
                        >
                          {cat.name}{" "}
                          <span className="text-xs text-muted-foreground">
                            ({cat.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories */}
                  {selectedCategory && subcategories[selectedCategory] && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-foreground/80">
                        Type
                      </h4>
                      <div className="space-y-2">
                        {subcategories[selectedCategory].map((sub) => (
                          <label
                            key={sub}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 cursor-pointer text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={selectedSubcategories.includes(sub)}
                              onChange={() => toggleSubcategory(sub)}
                              className="rounded border-foreground/20"
                            />
                            <span className="text-foreground/70">{sub}</span>
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
                    <div className="space-y-2">
                      {materials.map((mat) => (
                        <label
                          key={mat}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={selectedMaterials.includes(mat)}
                            onChange={() => toggleMaterial(mat)}
                            className="rounded border-foreground/20"
                          />
                          <span className="text-foreground/70">{mat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={showInStockOnly}
                        onChange={(e) => setShowInStockOnly(e.target.checked)}
                        className="rounded border-foreground/20"
                      />
                      <span className="text-foreground/70">In stock only</span>
                    </label>
                    <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={showCustomizableOnly}
                        onChange={(e) =>
                          setShowCustomizableOnly(e.target.checked)
                        }
                        className="rounded border-foreground/20"
                      />
                      <span className="text-foreground/70">Customizable</span>
                    </label>
                  </div>
                </div>
              </aside>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
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
                    className="rounded-full"
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div
                  className={`grid gap-6 ${
                    gridView === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1 lg:grid-cols-2"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
                    >
                      <div
                        className={`relative ${
                          gridView === "large"
                            ? "aspect-[16/10]"
                            : "aspect-[4/5]"
                        } overflow-hidden`}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {product.featured && (
                          <div className="absolute top-4 right-4 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary-foreground">
                            Featured
                          </div>
                        )}

                        {!product.inStock && (
                          <div className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground">
                            Made to order
                          </div>
                        )}
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">
                              {product.subcategory}
                            </p>
                            <h3 className="font-serif text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.shortDescription}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          {product.materials.slice(0, 2).map((mat) => (
                            <span
                              key={mat}
                              className="rounded-full bg-secondary/60 px-2 py-1 text-foreground/70"
                            >
                              {mat}
                            </span>
                          ))}
                          {product.customizable && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-primary">
                              <CheckCircle2 className="h-3 w-3" />
                              Customizable
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <div>
                            <p className="font-serif text-2xl text-foreground">
                              ₹{(product.price / 1000).toFixed(0)}k
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.leadTime}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
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

      <Footer />
    </div>
  );
}
