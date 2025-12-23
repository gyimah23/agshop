import { motion } from "framer-motion";
import { ArrowRight, Zap, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Powering Your Projects</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Quality Electrical
                <span className="block text-accent">Materials Delivered</span>
              </h1>

              <p className="text-lg text-white/70 mb-8 max-w-lg">
                From cables to circuit breakers, find everything you need for your 
                electrical projects. Trusted brands, competitive prices, fast delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/category/cables-wires">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/bulk-order">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10">
                    Bulk Orders
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-heading font-bold text-white">4,200+</div>
                  <div className="text-sm text-white/60">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-white">50+</div>
                  <div className="text-sm text-white/60">Brands</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-white">15k+</div>
                  <div className="text-sm text-white/60">Happy Customers</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Animated Circuit Background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 backdrop-blur-sm border border-white/10" />
                
                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-20 h-20 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center animate-float">
                  <Zap className="h-10 w-10 text-accent" />
                </div>
                <div className="absolute bottom-12 right-8 w-24 h-24 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute top-1/2 right-12 w-16 h-16 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <Truck className="h-8 w-8 text-white" />
                </div>

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                      <Zap className="h-16 w-16 text-accent" />
                    </div>
                    <p className="text-white/80 font-heading font-semibold text-xl">ElectroMart</p>
                    <p className="text-white/50 text-sm">Since 2010</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature Bar */}
      <div className="bg-card border-t border-border">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders above ₹5000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Genuine Products</p>
                <p className="text-xs text-muted-foreground">100% authentic brands</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Fast Delivery</p>
                <p className="text-xs text-muted-foreground">2-5 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Expert Support</p>
                <p className="text-xs text-muted-foreground">Technical assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
