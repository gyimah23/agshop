import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrderContext";
import { ArrowLeft, Package, Truck, Lock } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const { createOrder } = useOrders();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Shipping Address
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPincode: "",
    shippingCountry: "India",
    
    // Billing Address
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPincode: "",
    billingCountry: "India",
    
    // Card Details
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error("Valid phone number is required");
      return false;
    }
    if (!formData.shippingAddress.trim()) {
      toast.error("Shipping address is required");
      return false;
    }
    if (!formData.shippingCity.trim()) {
      toast.error("City is required");
      return false;
    }
    if (!formData.shippingState.trim()) {
      toast.error("State is required");
      return false;
    }
    if (!formData.shippingPincode.trim() || formData.shippingPincode.length !== 6) {
      toast.error("Valid 6-digit pincode is required");
      return false;
    }

    if (selectedPayment === "card") {
      if (!formData.cardName.trim()) {
        toast.error("Cardholder name is required");
        return false;
      }
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Valid 16-digit card number is required");
        return false;
      }
      if (!formData.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        toast.error("Valid expiry date (MM/YY) is required");
        return false;
      }
      if (!formData.cvv.trim() || formData.cvv.length !== 3) {
        toast.error("Valid 3-digit CVV is required");
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      // Create order
      const orderNumber = `AG${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      await createOrder({
        orderNumber,
        userId: "customer_" + Date.now(),
        sellerId: "seller_default",
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice: totalPrice,
        status: "pending",
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          email: formData.email,
          address: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          pincode: formData.shippingPincode,
        },
        createdAt: new Date().toISOString(),
      });

      toast.success(`Order placed successfully! Order #${orderNumber}`);
      setTimeout(() => {
        navigate(`/track-order?order=${orderNumber}`);
      }, 2000);
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-12">
          <div className="container-custom">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
                <p className="text-muted-foreground mb-6">Add items to proceed with checkout</p>
                <Button onClick={() => navigate("/")} size="lg">
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Back Button */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/cart")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>

            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
              <p className="text-muted-foreground mt-2">Complete your order</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Section - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9999999999"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shippingAddress">Address *</Label>
                      <Textarea
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        placeholder="123 Main Street, Apt 4B"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shippingCity">City *</Label>
                        <Input
                          id="shippingCity"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleInputChange}
                          placeholder="Mumbai"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shippingState">State *</Label>
                        <Input
                          id="shippingState"
                          name="shippingState"
                          value={formData.shippingState}
                          onChange={handleInputChange}
                          placeholder="Maharashtra"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shippingPincode">Pincode *</Label>
                        <Input
                          id="shippingPincode"
                          name="shippingPincode"
                          value={formData.shippingPincode}
                          onChange={handleInputChange}
                          placeholder="400001"
                          maxLength={6}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shippingCountry">Country *</Label>
                        <Select 
                          value={formData.shippingCountry}
                          onValueChange={(value) => handleSelectChange("shippingCountry", value)}
                        >
                          <SelectTrigger id="shippingCountry">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Same as shipping address?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                      />
                      <Label htmlFor="sameAsShipping">Yes, my billing address is the same</Label>
                    </div>
                  </CardContent>
                </Card>

                {!sameAsShipping && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress">Address *</Label>
                        <Textarea
                          id="billingAddress"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          placeholder="123 Main Street"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billingCity">City *</Label>
                          <Input
                            id="billingCity"
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleInputChange}
                            placeholder="Mumbai"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingState">State *</Label>
                          <Input
                            id="billingState"
                            name="billingState"
                            value={formData.billingState}
                            onChange={handleInputChange}
                            placeholder="Maharashtra"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="cursor-pointer">UPI</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label htmlFor="netbanking" className="cursor-pointer">Net Banking</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="cursor-pointer">Digital Wallet</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                      </div>
                    </RadioGroup>

                    {selectedPayment === "card" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name *</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\s/g, "");
                              value = value.replace(/(\d{4})/g, "$1 ").trim();
                              setFormData((prev) => ({
                                ...prev,
                                cardNumber: value,
                              }));
                            }}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, "");
                                if (value.length >= 2) {
                                  value = value.slice(0, 2) + "/" + value.slice(2, 4);
                                }
                                setFormData((prev) => ({
                                  ...prev,
                                  expiryDate: value,
                                }));
                              }}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setFormData((prev) => ({
                                  ...prev,
                                  cvv: value.slice(0, 3),
                                }));
                              }}
                              placeholder="123"
                              maxLength={3}
                              type="password"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Section - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <div className="flex-1">
                            <p className="font-medium line-clamp-2">{item.name}</p>
                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (18%)</span>
                        <span>₹{(totalPrice * 0.18).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">
                          ₹{(totalPrice * 1.18).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      size="lg"
                      className="w-full"
                    >
                      {loading ? "Processing..." : "Place Order"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      ✓ Your order is secure and encrypted
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
