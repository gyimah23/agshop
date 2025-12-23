import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Truck, MapPin, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useOrders } from "@/contexts/OrderContext";

const TrackOrderPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const { orders } = useOrders();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Find order by order number
    const foundOrder = orders.find(
      (order) =>
        order.orderNumber.toLowerCase() === trackingNumber.toLowerCase() ||
        order.id.toLowerCase() === trackingNumber.toLowerCase()
    );

    if (foundOrder) {
      setTrackingInfo(foundOrder);
      toast.success("Order found! Check details below.");
    } else {
      toast.error("Order not found. Please check your order number.");
      setTrackingInfo(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Order - AG Electrical shop</title>
        <meta name="description" content="Track your order in real-time with our tracking system." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-6">
              Track Your Order
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Enter your order number to see the latest status and estimated delivery date.
            </p>

            {/* Track Form */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Enter Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tracking">Order Number or Tracking ID</Label>
                    <Input 
                      id="tracking"
                      placeholder="e.g., AG12345678 or your email"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      required 
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Track Order
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Tracking Results */}
            {trackingInfo && (
              <div className="space-y-8">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                        <p className="font-semibold text-foreground">{trackingInfo.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <p className="font-semibold text-primary">{trackingInfo.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="font-semibold text-foreground">
                          ₹{trackingInfo.totalPrice?.toLocaleString("en-IN") || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                        <p className="font-semibold text-foreground">{trackingInfo.estimatedDelivery || "Processing"}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Delivery Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {trackingInfo.status === "pending" ? "10%" : 
                           trackingInfo.status === "confirmed" ? "25%" :
                           trackingInfo.status === "shipped" ? "75%" : "100%"}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ 
                            width: `${trackingInfo.status === "pending" ? "10%" : 
                                    trackingInfo.status === "confirmed" ? "25%" :
                                    trackingInfo.status === "shipped" ? "75%" : "100%"}`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase mb-1">From</p>
                          <p className="font-medium text-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {trackingInfo.shippingAddress?.city || "Warehouse"}
                          </p>
                        </div>
                        <div className="text-muted-foreground">→</div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground uppercase mb-1">To</p>
                          <p className="font-medium text-foreground flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            {trackingInfo.shippingAddress?.city || "Your Location"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {trackingInfo.shippingAddress && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-blue-900 mb-2">Delivery Address</p>
                        <p className="text-sm text-blue-800">
                          {trackingInfo.shippingAddress.name}
                        </p>
                        <p className="text-sm text-blue-800">
                          {trackingInfo.shippingAddress.address}
                        </p>
                        <p className="text-sm text-blue-800">
                          {trackingInfo.shippingAddress.city} - {trackingInfo.shippingAddress.pincode}
                        </p>
                        <p className="text-sm text-blue-800">
                          Phone: {trackingInfo.shippingAddress.phone}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Items */}
                {trackingInfo.items && trackingInfo.items.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {trackingInfo.items.map((item: any) => (
                          <div key={item.id} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-0">
                      {trackingInfo.trackingEvents && trackingInfo.trackingEvents.length > 0 ? (
                        trackingInfo.trackingEvents.map((event: any, index: number) => (
                          <div key={event.id} className="flex gap-4 pb-6 last:pb-0">
                            <div className="relative pt-1">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                              }`}>
                                <Package className="h-4 w-4" />
                              </div>
                              {index !== trackingInfo.trackingEvents.length - 1 && (
                                <div className="absolute top-8 left-4 w-0.5 h-12 bg-border"></div>
                              )}
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="font-semibold text-foreground">{event.status}</p>
                              <p className="text-sm text-muted-foreground">{event.location}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString()}
                              </p>
                              {event.notes && (
                                <p className="text-xs text-muted-foreground mt-1 italic">
                                  {event.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-4">No tracking events yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Help Section */}
            <div className="mt-12 bg-card rounded-lg border border-border p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Tracking Help
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Where can I find my order number?</h3>
                  <p className="text-muted-foreground">
                    Your order number is in your confirmation email and on your account page 
                    under "My Orders". It typically starts with "AG" followed by numbers.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">How often is tracking updated?</h3>
                  <p className="text-muted-foreground">
                    Tracking information is updated in real-time as your package moves through 
                    the delivery network. Updates are typically available within 30 minutes of 
                    each milestone.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">What if my tracking shows no updates?</h3>
                  <p className="text-muted-foreground">
                    If your order was recently placed, it may take a few hours for the first 
                    tracking update. For orders older than 3 days without updates, please 
                    contact our support team.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Can I change my delivery address?</h3>
                  <p className="text-muted-foreground">
                    If your order hasn't shipped yet, you can change the delivery address 
                    from your account. Once dispatched, please contact our support team immediately.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">What should I do if my order is late?</h3>
                  <p className="text-muted-foreground">
                    If your order is delayed beyond the estimated delivery date, please contact 
                    our customer support team with your order number. We'll investigate and 
                    provide a solution.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-12 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Need Help with Your Order?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="https://wa.me/0203252249">Chat on WhatsApp</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+911234567890">Call Support</a>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TrackOrderPage;
