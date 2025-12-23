import { motion } from "framer-motion";
import { ArrowRight, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bulk Order CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl gradient-hero p-8 md:p-12"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }}
              />
            </div>

            <div className="relative z-10">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                Bulk Orders for
                <span className="text-accent"> Contractors & Businesses</span>
              </h3>
              <p className="text-white/70 mb-6 max-w-md">
                Special pricing for large orders. Get dedicated support and faster delivery 
                for your project requirements.
              </p>
              <ul className="space-y-2 mb-8 text-white/80">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Volume discounts up to 25%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Dedicated account manager
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Priority shipping
                </li>
              </ul>
              <Link to="/bulk-order">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Request Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Download Catalogs CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-muted border border-border p-8 md:p-12"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Product Catalogs & 
                <span className="text-primary"> Technical Datasheets</span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Download detailed product catalogs and technical specifications 
                for all major brands and categories.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {["Polycab", "Havells", "Finolex", "Legrand"].map((brand) => (
                  <span 
                    key={brand}
                    className="px-3 py-1.5 bg-card rounded-full text-sm text-foreground border border-border"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              
              <Link to="/catalogs">
                <Button size="lg" variant="outline">
                  <Download className="mr-2 h-5 w-5" />
                  Browse Catalogs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
