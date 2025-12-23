import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const WishlistPage = () => {
  const { items, removeFromWishlist, totalItems } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      brand: item.brand,
    });
  };

  return (
    <>
      <Helmet>
        <title>Wishlist - AG Electrical shop</title>
        <meta name="description" content="Your wishlist items" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3 mb-8">
                <Heart className="h-8 w-8 text-primary" />
                My Wishlist ({totalItems})
              </h1>

              {items.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
                  <h2 className="font-heading text-2xl font-bold mb-4">
                    Your wishlist is empty
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Save items you love by clicking the heart icon
                  </p>
                  <Button asChild>
                    <Link to="/">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-xl border border-border overflow-hidden group"
                    >
                      <Link to={`/product/${item.id}`}>
                        <div className="aspect-square bg-muted overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {item.brand}
                        </p>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-2">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-foreground">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            size="sm"
                            onClick={() => handleAddToCart(item)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 text-destructive hover:text-destructive"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WishlistPage;
