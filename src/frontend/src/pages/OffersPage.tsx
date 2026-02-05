import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Percent, Sparkles, ArrowRight, Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useNavigate } from '@tanstack/react-router';
import { useLanguage } from '@/components/Layout';

const translations = {
  en: {
    title: 'Special Offers',
    subtitle: 'Limited Time Promotional Deals',
    offer1Title: 'Get 2 Business Ads FREE',
    offer1Desc: 'Book any website package and receive 2 professional business poster template ads absolutely FREE!',
    offer1Details: [
      'Professional poster designs',
      'Ready-to-use templates',
      'Social media optimized',
      'High-quality graphics',
    ],
    offer2Title: 'Flat 20% OFF',
    offer2Desc: 'Get flat 20% discount on all website development packages. Limited time offer!',
    offer2Details: [
      'Basic Website: ₹2,519 (was ₹3,149)',
      'Standard Website: ₹5,039 (was ₹6,299)',
      'Landing Page: ₹1,799 (was ₹2,249)',
    ],
    limitedTime: 'Limited Time Offer',
    bookNow: 'Book Now',
    whatsapp: 'WhatsApp Us',
    callNow: 'Call Now',
    viewServices: 'View All Services',
    savingsTitle: 'Your Savings',
    savingsDesc: 'Save up to ₹1,260 on website packages plus get 2 FREE business ads worth ₹600!',
    totalSavings: 'Total Savings: Up to ₹1,860',
    termsTitle: 'Offer Terms',
    terms: [
      'Valid for new bookings only',
      'Cannot be combined with other offers',
      'Free ads delivered with website',
      'Offer valid until stocks last',
    ],
    sampleAds: 'Sample Business Poster Ads',
  },
  hi: {
    title: 'विशेष ऑफर',
    subtitle: 'सीमित समय के प्रचार सौदे',
    offer1Title: '2 बिजनेस विज्ञापन मुफ्त पाएं',
    offer1Desc: 'कोई भी वेबसाइट पैकेज बुक करें और 2 पेशेवर बिजनेस पोस्टर टेम्पलेट विज्ञापन बिल्कुल मुफ्त प्राप्त करें!',
    offer1Details: [
      'पेशेवर पोस्टर डिज़ाइन',
      'उपयोग के लिए तैयार टेम्पलेट',
      'सोशल मीडिया के लिए अनुकूलित',
      'उच्च गुणवत्ता वाले ग्राफिक्स',
    ],
    offer2Title: 'फ्लैट 20% छूट',
    offer2Desc: 'सभी वेबसाइट डेवलपमेंट पैकेज पर फ्लैट 20% छूट पाएं। सीमित समय का ऑफर!',
    offer2Details: [
      'बेसिक वेबसाइट: ₹2,519 (था ₹3,149)',
      'स्टैंडर्ड वेबसाइट: ₹5,039 (था ₹6,299)',
      'लैंडिंग पेज: ₹1,799 (था ₹2,249)',
    ],
    limitedTime: 'सीमित समय का ऑफर',
    bookNow: 'अभी बुक करें',
    whatsapp: 'व्हाट्सएप करें',
    callNow: 'अभी कॉल करें',
    viewServices: 'सभी सेवाएं देखें',
    savingsTitle: 'आपकी बचत',
    savingsDesc: 'वेबसाइट पैकेज पर ₹1,260 तक बचाएं और ₹600 मूल्य के 2 मुफ्त बिजनेस विज्ञापन पाएं!',
    totalSavings: 'कुल बचत: ₹1,860 तक',
    termsTitle: 'ऑफर की शर्तें',
    terms: [
      'केवल नई बुकिंग के लिए मान्य',
      'अन्य ऑफर के साथ संयोजित नहीं किया जा सकता',
      'मुफ्त विज्ञापन वेबसाइट के साथ वितरित',
      'ऑफर स्टॉक खत्म होने तक मान्य',
    ],
    sampleAds: 'नमूना बिजनेस पोस्टर विज्ञापन',
  },
};

export default function OffersPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-navy to-brand-blue/20" />
        <div className="absolute inset-0 bg-[url('/assets/generated/tech-pattern-bg.dim_1200x800.jpg')] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="bg-brand-orange text-white px-6 py-2 text-lg mb-4">
              <Sparkles className="h-5 w-5 mr-2 inline" />
              {t.limitedTime}
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">{t.subtitle}</p>
            <div className="w-24 h-1 bg-brand-orange mx-auto mt-6" />
          </div>

          {/* Main Offers Grid */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Offer 1: Free Business Ads */}
            <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 border-2 border-brand-orange/50 shadow-2xl shadow-brand-orange/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl text-foreground mb-2">{t.offer1Title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{t.offer1Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src="/assets/generated/business-poster-sample.dim_400x600.png"
                    alt="Business Poster Sample"
                    className="w-full h-auto"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-brand-orange text-white text-lg px-4 py-2">FREE</Badge>
                  </div>
                </div>
                <ul className="space-y-3">
                  {t.offer1Details.map((detail, i) => (
                    <li key={i} className="flex items-center text-foreground">
                      <Sparkles className="h-5 w-5 text-brand-orange mr-3 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => window.open('https://wa.me/917691029526?text=I%20want%20to%20book%20a%20website%20and%20get%202%20FREE%20business%20ads', '_blank')}
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-lg py-6"
                >
                  <SiWhatsapp className="mr-2 h-5 w-5" />
                  {t.bookNow}
                </Button>
              </CardContent>
            </Card>

            {/* Offer 2: 20% Discount */}
            <Card className="bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 border-2 border-brand-blue/50 shadow-2xl shadow-brand-blue/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Percent className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl text-foreground mb-2">{t.offer2Title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{t.offer2Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src="/assets/generated/flat-20-off-badge.dim_200x200.png"
                    alt="20% Discount"
                    className="w-full h-auto"
                  />
                </div>
                <ul className="space-y-3">
                  {t.offer2Details.map((detail, i) => (
                    <li key={i} className="flex items-center text-foreground">
                      <Percent className="h-5 w-5 text-brand-blue mr-3 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => navigate({ to: '/services' })}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-lg py-6"
                >
                  {t.viewServices}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Savings Banner */}
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange border-0 shadow-2xl mb-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">{t.savingsTitle}</h3>
              <p className="text-white/90 text-lg mb-4">{t.savingsDesc}</p>
              <Badge className="bg-white text-brand-orange text-2xl px-8 py-3 font-bold">
                {t.totalSavings}
              </Badge>
            </CardContent>
          </Card>

          {/* Sample Business Poster Ads Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <h3 className="text-3xl font-bold text-foreground text-center mb-8">{t.sampleAds}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/assets/file_0000000019407207b66e3ddcb52817c1.png"
                  alt="Business Poster Sample 1"
                  className="w-full h-auto"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/assets/file_000000009d007207ad47a3f4b3186d0b.png"
                  alt="Business Poster Sample 2"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Free Ads Banner */}
          <div className="max-w-4xl mx-auto mb-12">
            <img
              src="/assets/generated/free-ads-banner.dim_800x300.png"
              alt="Free Ads Banner"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>

          {/* Special Offer Banner */}
          <div className="max-w-4xl mx-auto mb-12">
            <img
              src="/assets/generated/special-offer-banner.dim_800x300.png"
              alt="Special Offer Banner"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mb-12">
            <Button
              size="lg"
              onClick={() => window.open('https://wa.me/917691029526', '_blank')}
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6"
            >
              <SiWhatsapp className="mr-2 h-6 w-6" />
              {t.whatsapp}
            </Button>
            <Button
              size="lg"
              onClick={() => window.open('tel:7691029526', '_self')}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6"
            >
              <Phone className="mr-2 h-6 w-6" />
              {t.callNow}
            </Button>
          </div>

          {/* Terms and Conditions */}
          <Card className="max-w-3xl mx-auto bg-card border-brand-blue/20">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground text-center">{t.termsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {t.terms.map((term, i) => (
                  <li key={i} className="flex items-start text-muted-foreground">
                    <span className="text-brand-orange mr-3 shrink-0">•</span>
                    {term}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
