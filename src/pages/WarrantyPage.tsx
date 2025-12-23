import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Calendar, AlertCircle, CheckCircle } from "lucide-react";

const WarrantyPage = () => {
  return (
    <>
      <Helmet>
        <title>Warranty - AG Electrical shop</title>
        <meta name="description" content="Learn about our warranty coverage and product protection." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-6">
              Warranty Policy
            </h1>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    AG Electrical shop Warranty
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    All products sold on AG Electrical shop come with comprehensive warranty coverage. 
                    We guarantee 100% genuine products backed by manufacturer warranty.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="font-semibold text-foreground">
                      ✓ 100% Genuine Product Guarantee
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Warranty Duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-foreground mb-2">1-Year Warranty</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Cables & Wires</li>
                        <li>Switches & Sockets</li>
                        <li>Panel Boards</li>
                        <li>Wiring Accessories</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">2-Year Warranty</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>LED Lighting Products</li>
                        <li>Fans & Motors</li>
                        <li>Electrical Appliances</li>
                        <li>Control Equipment</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">5-Year Warranty</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>MCB & RCCB Devices</li>
                        <li>Distribution Boxes</li>
                        <li>High-end Equipment</li>
                        <li>Selected Brands</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Manufacturer Warranty</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Extended by brand</li>
                        <li>Lifetime for some items</li>
                        <li>Additional coverage</li>
                        <li>Brand specific terms</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    What's Covered
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p className="font-semibold text-foreground">Manufacturing Defects:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Faulty components or workmanship</li>
                    <li>Defective materials or assembly</li>
                    <li>Premature failure within warranty period</li>
                    <li>Non-functional features or specifications</li>
                    <li>Damaged upon delivery (within 48 hours)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    What's NOT Covered
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Normal wear and tear</li>
                    <li>Misuse, abuse, or improper handling</li>
                    <li>Accidents, fire, or natural disasters</li>
                    <li>Unauthorized repairs or modifications</li>
                    <li>Cosmetic damage (scratches, dents)</li>
                    <li>Damage from improper installation</li>
                    <li>Failure due to inadequate maintenance</li>
                    <li>Electrical surges or voltage fluctuations</li>
                    <li>Installation and labor charges</li>
                    <li>Consumable items like batteries</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Claim Warranty</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-3">
                    <li>
                      <span className="font-semibold">Contact Us</span>
                      <p className="ml-6">Email or call us with your order number and issue details</p>
                    </li>
                    <li>
                      <span className="font-semibold">Provide Documentation</span>
                      <p className="ml-6">Share photos and your proof of purchase (invoice/receipt)</p>
                    </li>
                    <li>
                      <span className="font-semibold">Arrange Return</span>
                      <p className="ml-6">We'll arrange free pickup for warranty claim items</p>
                    </li>
                    <li>
                      <span className="font-semibold">Inspection</span>
                      <p className="ml-6">Our team will inspect the product for defects</p>
                    </li>
                    <li>
                      <span className="font-semibold">Resolution</span>
                      <p className="ml-6">Free repair, replacement, or refund as applicable</p>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Warranty Registration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Most products come with automatic warranty registration. For certain 
                    high-value items, registration with the manufacturer may be required.
                  </p>
                  <p className="font-semibold text-foreground mt-4">
                    Keep your invoice and product packaging for warranty claims.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Extended Warranty Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    For additional protection, we offer extended warranty plans for high-value 
                    items. Extended warranties cover accidental damage and provide faster 
                    replacement services.
                  </p>
                  <p className="pt-4">
                    Available for: LED panels, Industrial equipment, Specialized tools
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <ul className="space-y-2">
                    <li>WhatsApp: <a href="https://wa.me/0203252249" className="text-primary hover:underline">0203252249</a></li>
                    <li>Phone: <a href="tel:+911234567890" className="text-primary hover:underline">+91 123 456 7890</a></li>
                    <li>Hours: Mon-Sat, 9 AM - 6 PM</li>
                  </ul>
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

export default WarrantyPage;
