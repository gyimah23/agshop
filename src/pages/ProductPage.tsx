import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Download,
  ChevronRight,
  Check
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const ProductPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = products.find(p => p.id === productId);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand,
    }, quantity);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        brand: product.brand,
      });
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>{product.name} - AG Electrical shop</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "brand": { "@type": "Brand", "name": product.brand },
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "INR",
              "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviews
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background">
          {/* Breadcrumb */}
          <div className="bg-muted/50 border-b border-border">
            <div className="container-custom py-4">
              <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
                  {product.category.replace("-", " ")}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground line-clamp-1">{product.name}</span>
              </nav>
            </div>
          </div>

          {/* Product Section */}
          <div className="container-custom py-8 md:py-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="sticky top-32">
                  {/* Main Image */}
                  <div className="aspect-square bg-muted rounded-2xl overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === i ? "border-primary" : "border-border"
                        }`}
                      >
                        <img
                          src={product.image}
                          alt={`${product.name} view ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Brand & Title */}
                <div className="mb-4">
                  <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
                    {product.brand}
                  </p>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {product.name}
                  </h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-accent fill-accent"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <Badge className="bg-destructive text-destructive-foreground">
                        {discount}% OFF
                      </Badge>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-6">
                  {product.inStock ? (
                    <>
                      <Check className="h-5 w-5 text-success" />
                      <span className="text-success font-medium">In Stock</span>
                    </>
                  ) : (
                    <span className="text-destructive font-medium">Out of Stock</span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button size="lg" className="flex-1 sm:flex-none sm:px-12" onClick={handleAddToCart}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>

                  <Button size="lg" variant="outline" onClick={handleToggleWishlist}>
                    <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current text-destructive' : ''}`} />
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-8">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Datasheet
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl">
                  <div className="text-center">
                    <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Genuine Product</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="h-6 w-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Easy Returns</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tabs Section */}
            <div className="mt-12">
              <Tabs defaultValue="specifications">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger 
                    value="specifications"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Reviews ({product.reviews})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="specifications" className="mt-6">
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <tr key={key} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="px-6 py-4 font-medium text-foreground w-1/3">
                              {key}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="description" className="mt-6">
                  <div className="prose max-w-none text-muted-foreground">
                    <p>{product.description}</p>
                    <h3 className="text-foreground">Key Features</h3>
                    <ul>
                      {product.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Customer reviews coming soon</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
