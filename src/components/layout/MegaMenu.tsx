import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Category, brands } from "@/data/products";

interface MegaMenuProps {
  category: Category;
}

const MegaMenu = ({ category }: MegaMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full w-screen max-w-4xl bg-card border border-border rounded-b-lg shadow-xl"
      style={{ marginLeft: "-1rem" }}
    >
      <div className="p-6 grid grid-cols-3 gap-8">
        {/* Subcategories */}
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-4">
            {category.name}
          </h3>
          <ul className="space-y-2">
            {category.subcategories.map((sub) => (
              <li key={sub}>
                <Link
                  to={`/category/${category.id}?subcategory=${encodeURIComponent(sub)}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {sub}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={`/category/${category.id}`}
            className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:gap-2 transition-all"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Popular Brands */}
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Popular Brands
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {brands.slice(0, 8).map((brand) => (
              <Link
                key={brand}
                to={`/category/${category.id}?brand=${encodeURIComponent(brand)}`}
                className="px-3 py-2 text-sm rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-center"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4">
          <h3 className="font-heading font-semibold text-foreground mb-2">
            Special Offer
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get 15% off on bulk orders of {category.name.toLowerCase()}
          </p>
          <Link
            to="/bulk-order"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-4 text-2xl font-heading font-bold text-accent">
            {category.productCount}+ Products
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
