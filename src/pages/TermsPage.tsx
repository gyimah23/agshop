import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - AG Electrical shop</title>
        <meta name="description" content="Read our terms and conditions for using our service." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground mb-6">Last Updated: December 2024</p>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Agreement to Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    By accessing and using this website, you accept and agree to be bound by the 
                    terms and provision of this agreement. If you do not agree to abide by the 
                    above, please do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Use License</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Permission is granted to temporarily download one copy of the materials 
                    (information or software) on AG Electrical shop's website for personal, 
                    non-commercial transitory viewing only. This is the grant of a license, 
                    not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the site</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any server</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    When you create an account with us, you must provide information that is 
                    accurate, complete, and current at all times. You are responsible for 
                    maintaining the confidentiality of your account and password and for 
                    restricting access to your computer.
                  </p>
                  <p>
                    You agree to accept responsibility for all activities that occur under 
                    your account or password.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    We strive to provide accurate product descriptions and pricing. However, 
                    we do not warrant that the descriptions, pricing, or other content is 
                    accurate, complete, or error-free.
                  </p>
                  <p>
                    We reserve the right to correct any errors, inaccuracies, or omissions 
                    and to change or update information at any time without prior notice.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Ordering and Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p className="font-semibold text-foreground">Order Placement</p>
                  <p>
                    All orders are subject to acceptance and confirmation by us. We reserve 
                    the right to reject any order for any reason.
                  </p>

                  <p className="font-semibold text-foreground mt-4">Price Changes</p>
                  <p>
                    Prices are subject to change without notice. We reserve the right to 
                    limit quantities and discontinue any product at any time.
                  </p>

                  <p className="font-semibold text-foreground mt-4">Payment</p>
                  <p>
                    Payment must be received before orders are dispatched. We accept various 
                    payment methods as displayed on the checkout page.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Shipping and Delivery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Shipping times are estimated and not guaranteed. We are not responsible 
                    for delays caused by shipping carriers or circumstances beyond our control.
                  </p>
                  <p>
                    Risk of loss passes to you upon delivery to the shipping carrier.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Returns and Refunds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Please refer to our separate Returns & Refunds Policy for complete details 
                    on return eligibility, procedures, and timelines.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    In no event shall AG Electrical shop or its suppliers be liable for any 
                    damages (including, without limitation, damages for loss of data or profit, 
                    or due to business interruption) arising out of the use or inability to use 
                    the materials on the site.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. User Conduct</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment</li>
                    <li>Post or transmit abusive, obscene, defamatory, or offensive content</li>
                    <li>Disrupt the normal flow of dialogue within our website</li>
                    <li>Attempt to gain unauthorized access to computer systems</li>
                    <li>Engage in any form of harassment or abuse of other users</li>
                    <li>Post spam or promotional content</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    All content on the site, including text, images, logos, and software, is 
                    the property of AG Electrical shop or its content suppliers and is protected 
                    by international copyright laws.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Disclaimer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    The materials on AG Electrical shop's website are provided on an 'as is' basis. 
                    AG Electrical shop makes no warranties, expressed or implied, and hereby 
                    disclaims and negates all other warranties including, without limitation, 
                    implied warranties or conditions of merchantability, fitness for a particular 
                    purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>12. Third-Party Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Our website may contain links to third-party websites. We are not responsible 
                    for the content, accuracy, or practices of these external sites. Your use of 
                    third-party websites is at your own risk and subject to their terms and conditions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>13. Modification of Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    AG Electrical shop may revise these terms of use for the website at any time 
                    without notice. By using this website, you are agreeing to be bound by the 
                    then current version of these terms of use.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>14. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    These terms and conditions are governed by and construed in accordance with 
                    the laws of India, and you irrevocably submit to the exclusive jurisdiction 
                    of the courts in that location.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>15. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">
                    If you have any questions about these Terms & Conditions:
                  </p>
                  <ul className="space-y-2">
                    <li>WhatsApp: <a href="https://wa.me/0203252249" className="text-primary hover:underline">0203252249</a></li>
                    <li>Phone: <a href="tel:+911234567890" className="text-primary hover:underline">+91 123 456 7890</a></li>
                    <li>Address: 123 Industrial Area, Phase 2, Mumbai, Maharashtra 400001</li>
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

export default TermsPage;
