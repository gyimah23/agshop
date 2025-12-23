import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string) || "";
    const email = (fd.get("email") as string) || "";
    const subject = (fd.get("subject") as string) || "Contact form message";
    const message = (fd.get("message") as string) || "";

    // Open WhatsApp chat with prefilled message (do not send email)
    try {
      const phone = "0203252249";
      const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
      toast.success("Opening WhatsApp. Please send the message from your WhatsApp client.");
      form.reset();
    } catch (err) {
      console.error("Failed to open WhatsApp:", err);
      toast.error("Unable to open WhatsApp. Please contact 0203252249 directly.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - AG Electrical shop</title>
        <meta name="description" content="Get in touch with ElectroMart for any queries or support." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom">
            <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-6">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Have a question or need help? We're here for you.
            </p>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", content: "+233 0549247690" },
                  { icon: Mail, title: "WhatsApp", content: "0203252249" },
                  { icon: MapPin, title: "Address", content: "Eastern region, Asamakese james town " },
                  { icon: Clock, title: "Hours", content: "Mon - Sat: 9AM - 6PM" },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="flex items-start gap-4 py-4">
                      <item.icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" placeholder="How can we help?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" rows={5} placeholder="Your message..." required />
                    </div>
                    <Button type="submit" size="lg">Send Message</Button>
                  </form>
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

export default ContactPage;
