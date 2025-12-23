import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  ChevronDown,
  X
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { products, categories, brands } from "@/data/products";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const category = categories.find(c => c.id === categoryId);
  const categoryProducts = products.filter(p => p.category === categoryId);

  const filteredProducts = categoryProducts.filter(product => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory);
    return matchesBrand && matchesPrice && matchesSubcategory;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(sub) 
        ? prev.filter(s => s !== sub)
        : [...prev, sub]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedSubcategories([]);
    setPriceRange([0, 5000]);
  };

  const activeFiltersCount = selectedBrands.length + selectedSubcategories.length + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Subcategories */}
      {category && (
        <Accordion type="single" collapsible defaultValue="subcategories">
          <AccordionItem value="subcategories" className="border-b border-border">
            <AccordionTrigger className="py-4 font-heading font-semibold">
              Subcategories
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {category.subcategories.map((sub) => (
                  <label 
                    key={sub} 
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <Checkbox 
                      checked={selectedSubcategories.includes(sub)}
                      onCheckedChange={() => toggleSubcategory(sub)}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {sub}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Brands */}
      <Accordion type="single" collapsible defaultValue="brands">
        <AccordionItem value="brands" className="border-b border-border">
          <AccordionTrigger className="py-4 font-heading font-semibold">
            Brands
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {brands.map((brand) => (
                <label 
                  key={brand} 
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <Checkbox 
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Price Range */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price" className="border-b border-border">
          <AccordionTrigger className="py-4 font-heading font-semibold">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={5000}
                step={100}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Current Rating */}
      <Accordion type="single" collapsible>
        <AccordionItem value="rating" className="border-b border-border">
          <AccordionTrigger className="py-4 font-heading font-semibold">
            Current Rating
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {["6A", "10A", "16A", "20A", "25A", "32A"].map((rating) => (
                <label 
                  key={rating} 
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <Checkbox />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {rating}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{category?.name || "Products"} - ElectroMart</title>
        <meta 
          name="description" 
          content={category?.description || "Browse our extensive range of electrical materials"} 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-background">
          {/* Breadcrumb & Header */}
          <div className="bg-muted/50 border-b border-border">
            <div className="container-custom py-8">
              <nav className="text-sm text-muted-foreground mb-4">
                <a href="/" className="hover:text-primary">Home</a>
                <span className="mx-2">/</span>
                <span className="text-foreground">{category?.name || "Products"}</span>
              </nav>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {category?.name || "All Products"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {category?.description || "Browse our extensive range of electrical materials"}
              </p>
            </div>
          </div>

          <div className="container-custom py-8">
            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-32">
                  <h2 className="font-heading font-semibold text-lg mb-6">Filters</h2>
                  <FilterContent />
                </div>
              </aside>

              {/* Products Section */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="lg:hidden">
                          <SlidersHorizontal className="h-4 w-4 mr-2" />
                          Filters
                          {activeFiltersCount > 0 && (
                            <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                              {activeFiltersCount}
                            </Badge>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterContent />
                        </div>
                      </SheetContent>
                    </Sheet>

                    <span className="text-sm text-muted-foreground">
                      {filteredProducts.length} products
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <Select defaultValue="popular">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Toggle */}
                    <div className="hidden sm:flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-r-none ${viewMode === "grid" ? "bg-muted" : ""}`}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-l-none ${viewMode === "list" ? "bg-muted" : ""}`}
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {selectedBrands.map(brand => (
                      <Badge 
                        key={brand} 
                        variant="secondary" 
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => toggleBrand(brand)}
                      >
                        {brand}
                        <X className="h-3 w-3" />
                      </Badge>
                    ))}
                    {selectedSubcategories.map(sub => (
                      <Badge 
                        key={sub} 
                        variant="secondary" 
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => toggleSubcategory(sub)}
                      >
                        {sub}
                        <X className="h-3 w-3" />
                      </Badge>
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className={`grid gap-6 ${
                    viewMode === "grid" 
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                      : "grid-cols-1"
                  }`}>
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">No products match your filters</p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
