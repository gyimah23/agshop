import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      category: "General",
      items: [
        {
          question: "What is AG Electrical shop?",
          answer: "AG Electrical shop is India's leading online platform for quality electrical materials, supplies, and equipment. We serve contractors, electricians, businesses, and homeowners with a wide range of authentic products from top brands."
        },
        {
          question: "Why should I choose AG Electrical shop?",
          answer: "We offer 100% genuine products, competitive pricing, fast delivery, excellent customer support, and secure payment options. We've been serving the electrical industry since 2010 and have earned the trust of over 10,000 customers."
        },
        {
          question: "Is AG Electrical shop registered and licensed?",
          answer: "Yes, AG Electrical shop is a registered business operating under all applicable laws and regulations. We maintain certifications for electrical product sales and follow strict quality standards."
        },
        {
          question: "Do you deliver across India?",
          answer: "We deliver across most of India including metro cities, tier-2 and tier-3 cities, and industrial areas. Delivery typically takes 3-7 business days depending on location."
        }
      ]
    },
    {
      category: "Products & Ordering",
      items: [
        {
          question: "How do I know if a product is in stock?",
          answer: "Each product page displays the current stock status. You can also add items to your cart to check availability. If you're unsure, contact our support team for immediate confirmation."
        },
        {
          question: "Are all products on your site genuine?",
          answer: "Yes, 100% of our products are genuine and sourced directly from manufacturers or authorized distributors. We guarantee authenticity and provide proper warranty on all items."
        },
        {
          question: "Do you offer product recommendations?",
          answer: "Yes, our experienced team can help you select the right products for your needs. Contact our support team with your requirements, and we'll recommend suitable options."
        },
        {
          question: "Can I place custom orders for specific products?",
          answer: "We can often source products not listed on our website. Please contact us with your specific requirements, and our team will provide availability and pricing information."
        }
      ]
    },
    {
      category: "Pricing & Payments",
      items: [
        {
          question: "Why do prices vary across different platforms?",
          answer: "Prices may vary based on bulk quantities, seasonal promotions, brand policies, and operational costs. We always offer competitive pricing and special discounts for bulk orders."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit cards, debit cards, net banking, UPI, mobile wallets, and bank transfers. All payments are processed through secure gateways with SSL encryption."
        },
        {
          question: "Do you offer EMI or installment options?",
          answer: "For selected high-value items and partners, we offer EMI options through participating banks. Check the product page or contact us for EMI availability."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No, there are no hidden charges. All costs including product price, taxes, and shipping are clearly displayed before checkout. Free shipping applies on orders above ₹5,000."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      items: [
        {
          question: "How much does shipping cost?",
          answer: "Shipping is FREE for orders above ₹5,000. For orders below ₹5,000, standard shipping is ₹99. Express and next-day options are available at additional cost."
        },
        {
          question: "How long does delivery take?",
          answer: "Standard delivery: 5-7 business days. Express: 2-3 business days. Next-day available in selected cities. Delivery timeline starts after order confirmation."
        },
        {
          question: "Can I track my order?",
          answer: "Yes, you'll receive a tracking number via email and SMS once your order ships. You can track your package in real-time on our 'Track Order' page."
        },
        {
          question: "What if my order is delayed?",
          answer: "We aim for on-time delivery. If your order is delayed, please contact our support team. We'll investigate and provide compensation or resolutions as applicable."
        },
        {
          question: "Do you deliver on weekends and holidays?",
          answer: "Regular delivery is Monday-Saturday. Special arrangements for weekend/holiday delivery are available on request with additional charges."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      items: [
        {
          question: "What is your return policy?",
          answer: "You can return most items within 30 days of delivery. Items must be unused and in original packaging. Returns for defects are accepted throughout the warranty period."
        },
        {
          question: "How long does a refund take?",
          answer: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund goes back to your original payment method."
        },
        {
          question: "Do I have to pay for return shipping?",
          answer: "Return shipping is free for defective items. For customer-initiated returns, return shipping charges apply unless the item was damaged upon delivery."
        },
        {
          question: "Can I exchange items instead of getting a refund?",
          answer: "Yes, we offer exchanges for defective items at no additional cost. For other reasons, contact us to discuss exchange options."
        }
      ]
    },
    {
      category: "Warranty & Support",
      items: [
        {
          question: "What warranty do products come with?",
          answer: "Most items come with 1-2 years manufacturer warranty. Some high-end products have extended warranties. Check product pages for specific warranty details."
        },
        {
          question: "How do I claim warranty?",
          answer: "Contact our support team with your order number and issue details. We'll arrange free pickup and inspection. Warranty service is provided at no cost for covered issues."
        },
        {
          question: "Are there extended warranty options?",
          answer: "Yes, extended warranty plans are available for high-value items and specialized equipment. These cover accidental damage and provide faster replacement."
        },
        {
          question: "What is not covered by warranty?",
          answer: "Normal wear and tear, user damage, improper installation, unauthorized modifications, and natural disasters are typically not covered. Check warranty terms for full details."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach us via WhatsApp (0203252249), phone (+91 123 456 7890), or through the contact form on our website. Response time is typically 24 hours."
        }
      ]
    },
    {
      category: "Bulk Orders",
      items: [
        {
          question: "Do you offer bulk discounts?",
          answer: "Yes, we offer 10-30% discounts on bulk orders depending on quantity and product category. Minimum bulk order is usually ₹10,000 or 50 units."
        },
        {
          question: "What are your bulk order terms?",
          answer: "We offer flexible terms including special pricing, customized payment options, dedicated account managers, and scheduled deliveries for bulk orders."
        },
        {
          question: "Can we negotiate pricing for large orders?",
          answer: "Yes, pricing is negotiable for large orders. Contact our bulk sales team with your requirements for a customized quote."
        },
        {
          question: "Do you provide invoices for billing purposes?",
          answer: "Yes, we provide GST-compliant invoices for all orders. Bulk orders can have customized invoicing as per business requirements."
        }
      ]
    },
    {
      category: "Account & Security",
      items: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' on the homepage and enter your email or phone number. Verify through the OTP sent to you, and create your password. Your account is ready to use."
        },
        {
          question: "Is my personal information secure?",
          answer: "Yes, we use SSL encryption and follow strict data protection policies. Your payment information is secured with PCI compliance. We never share personal data with third parties."
        },
        {
          question: "Can I change my account information?",
          answer: "Yes, you can update your profile, address, phone number, and other details from your account settings anytime."
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to you. You can then create a new password."
        }
      ]
    }
  ];

  const filteredFAQs = faqItems.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <>
      <Helmet>
        <title>FAQ - AG Electrical shop</title>
        <meta name="description" content="Frequently asked questions about AG Electrical shop and our services." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Find answers to common questions about our products, services, and policies.
            </p>

            {/* Search Bar */}
            <div className="mb-12">
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-base h-12"
              />
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2">
                  Found {filteredFAQs.reduce((acc, cat) => acc + cat.items.length, 0)} results for "{searchQuery}"
                </p>
              )}
            </div>

            {/* FAQ Items */}
            {filteredFAQs.length > 0 ? (
              <div className="space-y-8">
                {filteredFAQs.map((category) => (
                  <div key={category.category}>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                      {category.category}
                    </h2>
                    <Card>
                      <CardContent className="p-0">
                        <Accordion type="single" collapsible className="w-full">
                          {category.items.map((item, index) => (
                            <AccordionItem
                              key={index}
                              value={`${category.category}-${index}`}
                              className="border-b last:border-b-0"
                            >
                              <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                                <span className="text-left font-semibold text-foreground">
                                  {item.question}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="px-6 py-4 text-muted-foreground">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">
                  No FAQs found for "{searchQuery}"
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}

            {/* Still Need Help */}
            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Still Have Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Can't find the answer you're looking for? Our support team is here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <a href="/contact">Contact Us</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://wa.me/0203252249">Chat on WhatsApp</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:+911234567890">Call Us</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQPage;
