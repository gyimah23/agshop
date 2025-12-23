import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Gift, Percent, Clock } from "lucide-react";
import { toast } from "sonner";

const BulkOrderPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bulk order inquiry submitted! Our team will contact you soon.");
  };

  return (
    <>
      <Helmet>
        <title>Bulk Orders - AG Electrical shop</title>
        <meta name="description" content="Order electrical materials in bulk with special discounts and customized solutions." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom">
            <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-6">
              Bulk Orders
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Special pricing and customized solutions for contractors, electrical businesses, 
              and large-scale projects.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Benefits */}
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Benefits of Bulk Orders
                </h2>
                
                {[
                  {
                    icon: Percent,
                    title: "Special Discounts",
                    desc: "Get up to 20-30% off on bulk purchases"
                  },
                  {
                    icon: ShoppingCart,
                    title: "Wide Selection",
                    desc: "Access to our complete inventory for bulk requirements"
                  },
                  {
                    icon: Clock,
                    title: "Priority Handling",
                    desc: "Fast processing and scheduled delivery"
                  },
                  {
                    icon: Gift,
                    title: "Flexible Terms",
                    desc: "Custom payment terms for registered businesses"
                  }
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="flex items-start gap-4 py-4">
                      <item.icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Request Bulk Quote</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your company name" required />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Contact Name</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="products">Products Needed</Label>
                      <Textarea 
                        id="products" 
                        placeholder="List the products and quantities you need..." 
                        rows={4} 
                        required 
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Estimated Total Quantity</Label>
                        <Input id="quantity" type="number" placeholder="e.g., 500 units" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Input id="budget" placeholder="e.g., ₹50,000 - ₹1,00,000" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Any special requirements or timeline..." 
                        rows={3} 
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Request Quote
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQs Section */}
            <div className="bg-card rounded-lg border border-border p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
                Bulk Order FAQs
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    What is the minimum order quantity?
                  </h3>
                  <p className="text-muted-foreground">
                    Minimum bulk order is typically 50 units or ₹10,000 in total value. 
                    However, we can work with smaller quantities for special cases.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    What discounts do you offer for bulk orders?
                  </h3>
                  <p className="text-muted-foreground">
                    Discounts typically range from 10-30% depending on order quantity, 
                    product category, and total value. Custom quotes are provided for each inquiry.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Do you offer credit terms for bulk orders?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, we offer flexible payment terms for established businesses and 
                    registered contractors. Terms are customized based on order value and business history.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Can you customize products for bulk orders?
                  </h3>
                  <p className="text-muted-foreground">
                    We can provide some customization options for large orders including 
                    branding, packaging, and specifications. Please discuss this during the inquiry.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    What is the delivery timeline for bulk orders?
                  </h3>
                  <p className="text-muted-foreground">
                    Delivery depends on product availability and quantity. For in-stock items, 
                    we typically deliver within 3-5 days. For larger orders, delivery is arranged on 
                    a mutually agreed schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-12 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Need Immediate Assistance?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="tel:+911234567890">Call Our Bulk Team</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/0203252249">Send Requirements via WhatsApp</a>
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

export default BulkOrderPage;
