import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { supabase } from "@/integrations/supabase/client";

const FeaturedProducts = () => {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDbProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);

      if (!error && data) {
        const mapped = data.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          subcategory: p.subcategory || "",
          brand: p.brand || "",
          price: Number(p.price),
          originalPrice: p.original_price ? Number(p.original_price) : undefined,
          image: p.image_url || "/placeholder.svg",
          rating: 4.5,
          reviews: 0,
          inStock: p.in_stock ?? true,
          specifications: (p.specifications as Record<string, string>) || {},
          description: p.description || "",
          features: (p.features as string[]) || [],
          tags: (p.tags as string[]) || [],
        }));
        setDbProducts(mapped);
      }
    };
    fetchDbProducts();
  }, []);

  const allProducts = [...dbProducts, ...products].slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Top-rated products loved by our customers
            </p>
          </div>
          <Link 
            to="/search"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
