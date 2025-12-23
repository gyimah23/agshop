import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrderNotifications, { NotificationAlert } from "@/components/notifications/OrderNotifications";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandsSection from "@/components/home/BrandsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const [addNotification, setAddNotification] = useState<((notification: NotificationAlert) => void) | null>(null);

  useEffect(() => {
    // Listen for order tracking updates from sellers
    const handleTrackingUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { orderNumber, status, location, notes } = customEvent.detail;
      
      if (addNotification) {
        addNotification({
          id: `notif_${Date.now()}`,
          type: "info",
          title: `Order ${orderNumber} Updated`,
          message: `Status: ${status} at ${location}. ${notes ? `Note: ${notes}` : ""}`,
          timestamp: new Date().toISOString(),
          orderId: orderNumber
        });
      }
    };

    window.addEventListener("orderTrackingUpdated", handleTrackingUpdate);
    return () => window.removeEventListener("orderTrackingUpdated", handleTrackingUpdate);
  }, [addNotification]);
  return (
    <>
      <Helmet>
        <title>AG Electrical shop - Quality Electrical Materials & Supplies Online</title>
        <meta 
          name="description" 
          content="Shop premium electrical materials online - cables, wires, switches, sockets, LED lighting, MCB, RCCB from top brands like Polycab, Havells, Finolex. Fast delivery across India." 
        />
        <meta name="keywords" content="electrical materials, cables, wires, switches, sockets, LED lights, MCB, RCCB, Polycab, Havells, Finolex, electrical supplies India" />
        <link rel="canonical" href="https://electromart.com" />
        <meta property="og:title" content="ElectroMart - Quality Electrical Materials & Supplies" />
        <meta property="og:description" content="Your trusted partner for quality electrical materials. Shop cables, switches, lighting & more from top brands." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <CategoriesSection />
          <FeaturedProducts />
          <BrandsSection />
          <CTASection />
        </main>
        <Footer />
        <OrderNotifications />
      </div>
    </>
  );
};

export default Index;
