import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Eye, Share2, Trash2 } from "lucide-react";

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - AG Electrical shop</title>
        <meta name="description" content="Our privacy policy explains how we collect and protect your data." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-background py-12">
          <div className="container-custom max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-6">Last Updated: December 2024</p>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    AG Electrical shop ("we", "us", "our", or "Company") operates the 
                    platform. This page informs you of our policies regarding the collection, 
                    use, and disclosure of personal data when you use our service and the 
                    choices you have associated with that data.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Information Collection and Use
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p className="font-semibold text-foreground">We collect several different types of information:</p>
                  
                  <div>
                    <p className="font-semibold text-foreground mb-2">Personal Data</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Email address</li>
                      <li>First name and last name</li>
                      <li>Phone number</li>
                      <li>Address, State, Province, ZIP/Postal code, City</li>
                      <li>Cookies and Usage Data</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-2">Usage Data</p>
                    <p>
                      We may also collect information on how the service is accessed and used 
                      ("Usage Data"). This may include information such as your computer's 
                      IP address, browser type, browser version, and pages visited.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Purpose of Data Collection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>We use the collected data for various purposes:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>To provide and maintain the service</li>
                    <li>To notify you about changes to our service</li>
                    <li>To allow you to participate in interactive features of our service</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information for service improvement</li>
                    <li>To monitor the usage of our service</li>
                    <li>To detect, prevent and address technical issues</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security of Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    The security of your data is important to us but remember that no method 
                    of transmission over the Internet or method of electronic storage is 100% 
                    secure. While we strive to use commercially acceptable means to protect 
                    your Personal Data, we cannot guarantee its absolute security.
                  </p>
                  <p className="font-semibold text-foreground">
                    Our security measures include:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>SSL encryption for all transactions</li>
                    <li>Secure payment gateway integration</li>
                    <li>Regular security audits</li>
                    <li>Restricted access to personal data</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Disclosure of Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>We may disclose your Personal Data in the good faith belief that disclosure is necessary to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Comply with applicable laws, regulations, court orders, or governmental requests</li>
                    <li>Enforce our Terms and Conditions and other agreements</li>
                    <li>Protect the security or integrity of our service</li>
                    <li>Protect the rights, privacy, safety, or property of our users or the public</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    We may employ third-party companies and individuals to facilitate our 
                    service ("Service Providers"), to provide the service on our behalf, to 
                    perform service-related services, or to assist us in analyzing how our 
                    service is used.
                  </p>
                  <p>
                    These third parties have access to your Personal Data only to perform 
                    these tasks on our behalf and are obligated not to disclose or use it 
                    for any other purpose.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    Data Deletion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    You have the right to request deletion of your personal data. Upon your 
                    request, we will delete your account and associated personal information 
                    within 30 days, except where we are required to retain the data for legal 
                    or business purposes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cookies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Cookies are files with a small amount of data that are commonly used as 
                    anonymous unique identifiers. They are sent to your browser from the 
                    websites that you visit and are stored on your computer's hard drive.
                  </p>
                  <p>
                    We use cookies to collect information about your browsing activities and 
                    remember your preferences. You can instruct your browser to refuse all 
                    cookies or to indicate when a cookie is being sent.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Our service is not addressed to anyone under the age of 18. We do not 
                    knowingly collect personally identifiable information from children under 
                    18. If we become aware that a child under 18 has provided us with personal 
                    data, we will delete such information and terminate the child's account.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of 
                    any changes by posting the new Privacy Policy on this page and updating 
                    the "Last Updated" date at the top of this page.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <ul className="space-y-2">
                    <li>WhatsApp: <a href="https://wa.me/0203252249" className="text-primary hover:underline">0203252249</a></li>
                    <li>Phone: <a href="tel:+911234567890" className="text-primary hover:underline">+91 123 456 7890</a></li>
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

export default PrivacyPage;
