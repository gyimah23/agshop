import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <>
      <Helmet>
        <title>Shopping Cart - AG Electrical shop</title>
        <meta name="description" content="Your shopping cart" />
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
                <ShoppingCart className="h-8 w-8 text-primary" />
                Shopping Cart ({totalItems})
              </h1>

              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
                  <h2 className="font-heading text-2xl font-bold mb-4">
                    Your cart is empty
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Add items to get started
                  </p>
                  <Button asChild>
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2 space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <Link to={`/product/${item.id}`}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-24 h-24 object-cover rounded-lg"
                                />
                              </Link>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground uppercase mb-1">
                                  {item.brand}
                                </p>
                                <Link to={`/product/${item.id}`}>
                                  <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                                    {item.name}
                                  </h3>
                                </Link>
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="font-bold">
                                    ₹{item.price.toLocaleString()}
                                  </span>
                                  {item.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ₹{item.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center border border-border rounded-lg">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() =>
                                        updateQuantity(item.id, item.quantity - 1)
                                      }
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-10 text-center font-medium">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() =>
                                        updateQuantity(item.id, item.quantity + 1)
                                      }
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <span className="font-bold text-lg">
                                      ₹{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" asChild>
                        <Link to="/">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Continue Shopping
                        </Link>
                      </Button>
                      <Button variant="outline" onClick={clearCart}>
                        Clear Cart
                      </Button>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <Card className="sticky top-32">
                      <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Subtotal ({totalItems} items)
                          </span>
                          <span className="font-medium">
                            ₹{totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="font-medium text-success">
                            {totalPrice >= 5000 ? "FREE" : "₹99"}
                          </span>
                        </div>
                        {totalPrice < 5000 && (
                          <p className="text-xs text-muted-foreground">
                            Add ₹{(5000 - totalPrice).toLocaleString()} more for
                            free shipping
                          </p>
                        )}
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>
                            ₹
                            {(
                              totalPrice + (totalPrice >= 5000 ? 0 : 99)
                            ).toLocaleString()}
                          </span>
                        </div>
                        <Button size="lg" className="w-full" asChild>
                          <Link to="/checkout">Proceed to Checkout</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
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

export default CartPage;
