import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, Package } from "lucide-react";
import { toast } from "sonner";

const CatalogsPage = () => {
  const catalogs = [
    {
      id: 1,
      title: "Cables & Wires Catalog",
      description: "Complete range of cables, wires, and conductor products",
      date: "December 2024",
      pages: 48,
      icon: FileText
    },
    {
      id: 2,
      title: "Switches & Sockets Catalog",
      description: "Modular switches, sockets, and accessories",
      date: "December 2024",
      pages: 32,
      icon: Package
    },
    {
      id: 3,
      title: "LED Lighting Catalog",
      description: "LED bulbs, panels, tubes, and lighting solutions",
      date: "November 2024",
      pages: 40,
      icon: FileText
    },
    {
      id: 4,
      title: "MCB & RCCB Catalog",
      description: "Safety devices and circuit protection equipment",
      date: "October 2024",
      pages: 28,
      icon: Package
    },
    {
      id: 5,
      title: "Industrial Equipment Catalog",
      description: "Motors, transformers, and industrial-grade equipment",
      date: "September 2024",
      pages: 56,
      icon: FileText
    },
    {
      id: 6,
      title: "Tools & Accessories Catalog",
      description: "Testing tools, installation kits, and accessories",
      date: "August 2024",
      pages: 24,
      icon: Package
    }
  ];

  const handleDownload = (catalogTitle: string) => {
    toast.success(`Downloading ${catalogTitle}...`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("You'll receive our latest catalogs via email!");
  };

  return (
    <>
      <Helmet>
        <title>Download Catalogs - AG Electrical shop</title>
        <meta name="description" content="Download our product catalogs and price lists." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom">
            <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-6">
              Download Catalogs
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Access our comprehensive product catalogs with detailed specifications, 
              pricing, and ordering information.
            </p>

            {/* Newsletter Signup */}
            <Card className="mb-12 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Get Updates on New Catalogs</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="flex gap-4">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1"
                    required 
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </CardContent>
            </Card>

            {/* Catalogs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {catalogs.map((catalog) => (
                <Card key={catalog.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <catalog.icon className="h-8 w-8 text-primary" />
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {catalog.pages} Pages
                      </span>
                    </div>
                    <CardTitle className="text-lg">{catalog.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {catalog.description}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Updated: {catalog.date}
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={() => handleDownload(catalog.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="bg-card rounded-lg border border-border p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Additional Resources
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Price List</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>Current pricing for all products with bulk discounts</p>
                    <Button variant="outline" className="w-full" onClick={() => toast.success("Downloading price list...")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Price List
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Product Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>Detailed technical specifications for all product lines</p>
                    <Button variant="outline" className="w-full" onClick={() => toast.success("Downloading specifications...")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Specs
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Installation Guides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>Step-by-step installation and usage guides</p>
                    <Button variant="outline" className="w-full" onClick={() => toast.success("Downloading guides...")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Guides
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Warranty Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>Comprehensive warranty details and coverage information</p>
                    <Button variant="outline" className="w-full" onClick={() => toast.success("Downloading warranty info...")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Info
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Catalog FAQs
              </h2>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Are the catalogs updated regularly?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, our catalogs are updated quarterly with new products, pricing changes, 
                    and product improvements. Subscribe to our mailing list for updates.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Can I request a printed catalog?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, printed catalogs are available for bulk orders or businesses. 
                    Contact our sales team for pricing and delivery options.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Are the prices in the catalog current?
                  </h3>
                  <p className="text-muted-foreground">
                    Catalog prices are updated regularly, but we recommend checking the website 
                    for the most current pricing. Bulk discounts apply on orders above ₹10,000.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Can I get a custom catalog?
                  </h3>
                  <p className="text-muted-foreground">
                    For large partnerships or distributorships, we can create custom catalogs 
                    with your branding. Please contact our partnership team.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-12 text-center bg-primary/5 rounded-lg border border-primary/20 p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                Need a Custom Catalog?
              </h2>
              <p className="text-muted-foreground mb-6">
                Contact our sales team for custom catalogs or bulk pricing
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="https://wa.me/0203252249">Contact Sales (WhatsApp)</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+911234567890">Call Us</a>
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

export default CatalogsPage;
