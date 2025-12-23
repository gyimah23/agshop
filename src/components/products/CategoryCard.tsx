import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Category } from "@/data/products";
import { 
  Cable, 
  Plug, 
  ToggleRight, 
  Lightbulb, 
  ShieldCheck, 
  Wrench 
} from "lucide-react";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cable,
  Plug,
  ToggleRight,
  Lightbulb,
  ShieldCheck,
  Wrench
};

const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  const IconComponent = iconMap[category.icon] || Cable;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/category/${category.id}`}
        className="group block bg-card rounded-xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
            <IconComponent className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>

        <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {category.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {category.productCount}+ products
          </span>
          <span className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Explore
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
