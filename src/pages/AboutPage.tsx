import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Truck, Shield } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - AG Electrical shop</title>
        <meta name="description" content="Learn about ElectroMart - your trusted partner for quality electrical materials since 2010." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom">
            <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-6">
              About ElectroMart
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Your trusted partner for quality electrical materials and supplies since 2010. 
              We serve contractors, electricians, and homeowners across India.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Users, title: "10,000+", desc: "Happy Customers" },
                { icon: Award, title: "100+", desc: "Top Brands" },
                { icon: Truck, title: "50,000+", desc: "Orders Delivered" },
                { icon: Shield, title: "100%", desc: "Genuine Products" },
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="flex flex-col items-center text-center py-8">
                    <item.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="prose max-w-3xl mx-auto text-muted-foreground">
              <h2 className="text-foreground">Our Story</h2>
              <p>
                AG Electrical shop was founded with a simple mission: to make quality electrical 
                materials accessible to everyone. What started as a small shop has grown 
                into one of India's leading online destinations for electrical supplies.
              </p>
              <h2 className="text-foreground">Our Promise</h2>
              <p>
                We partner directly with manufacturers to bring you authentic products at 
                competitive prices. Every item we sell comes with a guarantee of quality 
                and authenticity.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
