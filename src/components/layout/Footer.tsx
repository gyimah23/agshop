import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  Zap, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-secondary-foreground/70">
                Get updates on new products, offers, and industry news
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Zap className="h-8 w-8 text-primary" />
              <div className="font-heading">
                <span className="text-xl font-bold">AG Electricals</span>
                <span className="text-xl font-bold text-primary">shop</span>
              </div>
            </Link>
            <p className="text-secondary-foreground/70 mb-6">
              Your trusted partner for quality electrical materials. 
              Serving contractors, electricians, and homeowners since 2010.
            </p>
            <div className="space-y-3">
              <a href="tel:+911234567890" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                +91 123 456 7890
              </a>
              <a href="https://wa.me/0203252249" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                0203252249
              </a>
              <div className="flex items-start gap-3 text-secondary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                123 Industrial Area, Phase 2, Mumbai, Maharashtra 400001
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.id}`}
                    className="text-secondary-foreground/70 hover:text-accent transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/bulk-order" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/catalogs" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Download Catalogs
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
            <p>© 2024 ElectroMart. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <img src="/placeholder.svg" alt="Visa" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="Mastercard" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="UPI" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="Net Banking" className="h-8 opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (e: string) => {
    return /^\S+@\S+\.\S+$/.test(e);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email })
        .select();

      if (error) {
        // If unique constraint or duplicate, show friendly message
        if (error.message?.toLowerCase().includes("duplicate") || error.code === "23505") {
          toast.success("You're already subscribed.");
        } else {
          console.error("Subscribe error:", error);
          toast.error("Unable to subscribe. Please try again later.");
        }
      } else {
        toast.success("Subscribed — check your inbox for confirmation.");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to subscribe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full md:w-auto gap-2">
      <Input
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full md:w-80 bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
      />
      <Button className="shrink-0" onClick={handleSubscribe} disabled={loading}>
        {loading ? "Subscribing..." : "Subscribe"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
