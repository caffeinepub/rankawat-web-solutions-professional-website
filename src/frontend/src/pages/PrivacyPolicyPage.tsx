import { Mail, Phone } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-navy border-b border-brand-blue/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-brand-orange text-lg font-medium">
              Rankawat Web Solutions
            </p>
            <p className="text-muted-foreground mt-2">
              Last Updated: 05 Feb 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Rankawat Web Solutions ("we", "our", "us") takes your privacy very seriously. This Privacy Policy explains how we collect, use, protect, and handle your information when you use our website or services.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-brand-orange">1️⃣</span>
                Information We Collect
              </h2>
              <div className="bg-navy/50 border border-brand-blue/20 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  We may collect the following information from you:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Email Address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Mobile Number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Business Details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Website / Project Requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Information you share through WhatsApp, Contact Form, or Call</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-brand-orange">2️⃣</span>
                How We Use Your Information
              </h2>
              <div className="bg-navy/50 border border-brand-blue/20 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  Your information is used only for the following purposes:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>To provide website design, development, and digital services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>For customer support and communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>To provide project updates and service-related information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>For internal records and service improvement</span>
                  </li>
                </ul>
                <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-lg p-4">
                  <p className="text-brand-orange font-medium">
                    👉 We do not sell, rent, or misuse your personal information to any third party.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-brand-orange">3️⃣</span>
                Data Security
              </h2>
              <div className="bg-navy/50 border border-brand-blue/20 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  Rankawat Web Solutions uses the following measures to keep your personal information secure:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Secure hosting servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>SSL (Secure Socket Layer) protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Limited access systems</span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  These measures ensure your data is safe from unauthorized access.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-brand-orange">4️⃣</span>
                Cookies Policy
              </h2>
              <div className="bg-navy/50 border border-brand-blue/20 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  Our website may use cookies for:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Improving user experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Analyzing website performance and traffic</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  You can disable cookies through your browser settings if you wish.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-brand-orange">5️⃣</span>
                Third-Party Services
              </h2>
              <div className="bg-navy/50 border border-brand-blue/20 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  We may use third-party tools or services such as:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Google Analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Hosting providers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Payment gateways</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  These services have their own privacy policies, for which Rankawat Web Solutions is not directly responsible.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-brand-orange">6️⃣</span>
                User Rights
              </h2>
              <div className="bg-navy/50 border border-brand-blue/20 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  You have the full right to:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>View your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Correct any incorrect information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">•</span>
                    <span>Request deletion of your information</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  You can contact us for any of these requests.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-brand-orange">7️⃣</span>
                Changes to This Privacy Policy
              </h2>
              <div className="bg-navy/50 border border-brand-blue/20 rounded-lg p-6">
                <p className="text-muted-foreground">
                  Rankawat Web Solutions may update this Privacy Policy at any time. The updated version will be published on the website and will be effective immediately.
                </p>
              </div>
            </div>

            {/* Section 8 - Contact */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-brand-orange">8️⃣</span>
                Contact Us
              </h2>
              <div className="bg-navy/50 border border-brand-blue/20 rounded-lg p-6">
                <p className="text-muted-foreground mb-6">
                  If you have any questions related to our Privacy Policy, you can contact us:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-brand-orange/20 p-2 rounded-lg">
                      <span className="text-brand-orange font-bold text-lg">🏢</span>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Company Name:</p>
                      <p className="text-muted-foreground">Rankawat Web Solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-brand-orange/20 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Mobile:</p>
                      <a
                        href="tel:+917691029526"
                        className="text-brand-orange hover:text-brand-orange/80 transition-colors"
                      >
                        76910 29526
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-brand-orange/20 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Email:</p>
                      <a
                        href="mailto:rankawatwebsolutions09@gmail.com"
                        className="text-brand-orange hover:text-brand-orange/80 transition-colors break-all"
                      >
                        rankawatwebsolutions09@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
