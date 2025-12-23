import { motion } from "framer-motion";
import { brands } from "@/data/products";

const BrandsSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Trusted Brands
          </h2>
          <p className="text-muted-foreground">
            We partner with industry-leading manufacturers
          </p>
        </motion.div>

        {/* Brands Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee">
            {[...brands, ...brands].map((brand, index) => (
              <motion.div
                key={`${brand}-${index}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % brands.length) * 0.1 }}
                className="flex items-center justify-center shrink-0"
              >
                <div className="px-8 py-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                  <span className="font-heading font-semibold text-lg text-foreground whitespace-nowrap">
                    {brand}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Static Grid for Mobile */}
        <div className="grid grid-cols-3 md:hidden gap-4 mt-8">
          {brands.slice(0, 6).map((brand) => (
            <div
              key={brand}
              className="px-4 py-3 bg-muted rounded-lg text-center"
            >
              <span className="font-heading font-medium text-sm text-foreground">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
