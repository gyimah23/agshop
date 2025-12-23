import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, UserButton, useUser, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { 
  Search, 
  Heart, 
  User, 
  Menu, 
  X,
  Phone,
  Mail,
  ChevronDown,
  Zap,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import CartSheet from "@/components/cart/CartSheet";
import MegaMenu from "./MegaMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();
  const { totalItems: wishlistCount } = useWishlist();
  
  const isSeller = user?.publicMetadata?.role === "seller" || 
                   user?.unsafeMetadata?.role === "seller";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container-custom py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+911234567890" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">+233549247690</span>
              </a>
              <a href="https://wa.me/0549247690" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">0549247690</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Free shipping on orders above GHS5000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <Zap className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
              </div>
              <div className="font-heading">
                <span className="text-xl font-bold text-foreground">AG</span>
                <span className="text-xl font-bold text-primary">Electricals shop</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  placeholder="Search cables, switches, lighting..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-4 pr-12 h-11 transition-all duration-300 ${
                    isSearchFocused ? "ring-2 ring-primary shadow-glow" : ""
                  }`}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <Button 
                  type="submit"
                  size="sm" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <CartSheet />
              
              {/* Auth Buttons */}
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl="/">
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <User className="h-5 w-5" />
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="hidden sm:flex items-center gap-2">
                  {isSeller && (
                    <Link to="/seller">
                      <Button variant="ghost" size="icon" title="Seller Dashboard">
                        <LayoutDashboard className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  <Link to="/account">
                    <Button variant="ghost" size="sm" className="gap-2">
                      My Account
                    </Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-4 md:hidden">
            <div className="relative">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 h-10"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <nav className="hidden md:block bg-card border-b border-border">
        <div className="container-custom">
          <ul className="flex items-center gap-1">
            {categories.map((category) => (
              <li
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(category.id)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {category.name}
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <AnimatePresence>
                  {activeMegaMenu === category.id && (
                    <MegaMenu category={category} />
                  )}
                </AnimatePresence>
              </li>
            ))}
            <li>
              <Link
                to="/bulk-order"
                className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Bulk Orders
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border"
          >
            <nav className="container-custom py-4">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="font-medium">{category.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/bulk-order"
                    className="flex items-center px-4 py-3 rounded-lg text-accent font-medium hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bulk Orders
                  </Link>
                </li>
                
                {/* Mobile Auth */}
                <li className="pt-4 border-t border-border">
                  <SignedOut>
                    <SignInButton mode="modal" forceRedirectUrl="/">
                      <button
                        className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        Sign In / Sign Up
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="space-y-2">
                      <Link
                        to="/account"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        My Account
                      </Link>
                      {isSeller && (
                        <Link
                          to="/seller"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          Seller Dashboard
                        </Link>
                      )}
                    </div>
                  </SignedIn>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
