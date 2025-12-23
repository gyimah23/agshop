import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin, Shield } from "lucide-react";

const ShippingPage = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Policy - AG Electrical shop</title>
        <meta name="description" content="Learn about our shipping policy and delivery times." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-6">
              Shipping Policy
            </h1>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    AG Electrical shop delivers across India with special focus on major 
                    cities and industrial areas. We ship to:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>All metro cities (Delhi, Mumbai, Bangalore, Hyderabad, etc.)</li>
                    <li>Tier-2 and Tier-3 cities</li>
                    <li>Industrial areas and business zones</li>
                    <li>Selected rural areas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Delivery Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Standard Delivery</p>
                      <p>5-7 business days</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Express Delivery</p>
                      <p>2-3 business days</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Next Day Delivery</p>
                      <p>Selected cities only</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Weekend & Holidays</p>
                      <p>Deliveries on request</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Charges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p className="font-semibold text-success text-lg">FREE SHIPPING on orders above ₹5,000</p>
                  <div className="space-y-2">
                    <p>For orders below ₹5,000:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Standard Delivery: ₹99</li>
                      <li>Express Delivery: ₹199</li>
                      <li>Next Day Delivery: ₹299</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Shipping Safety
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>All items are securely packed with proper protection materials</li>
                    <li>Insurance coverage available for high-value orders</li>
                    <li>Real-time tracking for all shipments</li>
                    <li>Doorstep delivery with signature confirmation</li>
                    <li>Damaged goods replacement within 48 hours</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bulk Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    For bulk orders above 100 units or ₹50,000, we offer:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Customized shipping solutions</li>
                    <li>Special discounted shipping rates</li>
                    <li>Scheduled delivery at your convenience</li>
                    <li>Dedicated account manager</li>
                  </ul>
                  <p className="pt-4">
                    Contact us at <a href="tel:+911234567890" className="text-primary hover:underline">+91 123 456 7890</a> for bulk shipping inquiries.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Tracking</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">
                    You will receive a tracking link via email and SMS immediately after 
                    your order ships. You can track your order in real-time from dispatch 
                    to delivery.
                  </p>
                  <p>
                    For any shipping-related queries, contact our support team at 
                    <a href="https://wa.me/0203252249" className="text-primary hover:underline">0203252249</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ShippingPage;
