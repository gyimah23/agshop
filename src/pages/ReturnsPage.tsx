import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Clock, CheckCircle, AlertCircle } from "lucide-react";

const ReturnsPage = () => {
  return (
    <>
      <Helmet>
        <title>Returns & Refunds - AG Electrical shop</title>
        <meta name="description" content="Learn about our returns and refunds policy." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-6">
              Returns & Refunds Policy
            </h1>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Return Window
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-semibold text-foreground mb-2">30-Day Return Policy</p>
                    <p>
                      You can return most items within 30 days of delivery for a full refund.
                    </p>
                  </div>
                  <p>
                    Returns must be initiated within 30 days of order delivery. Items returned 
                    after this period may be rejected.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Return Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-3">Eligible for Return:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Defective or damaged items</li>
                      <li>Items not matching the description</li>
                      <li>Unopened and unused products</li>
                      <li>Items with manufacturing defects</li>
                      <li>Wrong item received</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-3 mt-6">Non-Returnable Items:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Used or damaged items (user damage)</li>
                      <li>Items without original packaging</li>
                      <li>Items installed or integrated into systems</li>
                      <li>Clearance or final sale items</li>
                      <li>Custom or made-to-order products</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Return</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-3">
                    <li>
                      <span className="font-semibold">Initiate Return</span>
                      <p className="ml-6">Go to your account and click "Return Order" within 30 days</p>
                    </li>
                    <li>
                      <span className="font-semibold">Select Items</span>
                      <p className="ml-6">Choose the items to return and provide a reason</p>
                    </li>
                    <li>
                      <span className="font-semibold">Arrange Pickup</span>
                      <p className="ml-6">We'll arrange free pickup from your location</p>
                    </li>
                    <li>
                      <span className="font-semibold">Item Inspection</span>
                      <p className="ml-6">We'll inspect and verify the return condition</p>
                    </li>
                    <li>
                      <span className="font-semibold">Refund Processing</span>
                      <p className="ml-6">Refund will be processed within 5-7 business days</p>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Refund Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Full Refund</p>
                      <p>Issued for defective items or wrong products delivered</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Partial Refund</p>
                      <p>May apply if item shows signs of use or damage beyond normal inspection</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Refund Timeline</p>
                      <p>5-7 business days after return inspection is complete</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Refund Method</p>
                      <p>Refunded to original payment method (credit card, debit card, bank transfer, wallet)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Important Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Shipping charges are non-refundable unless item was defective</li>
                    <li>Return shipping is free for defective items</li>
                    <li>Customer-initiated returns may have return shipping charges</li>
                    <li>Items must be in original packaging with all accessories</li>
                    <li>We reserve the right to refuse returns not meeting our policy</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">
                    If you have questions about returns or your refund status:
                  </p>
                  <ul className="space-y-2">
                    <li>WhatsApp: <a href="https://wa.me/0203252249" className="text-primary hover:underline">0203252249</a></li>
                    <li>Phone: <a href="tel:+911234567890" className="text-primary hover:underline">+91 123 456 7890</a></li>
                    <li>Response time: 24 hours</li>
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

export default ReturnsPage;
