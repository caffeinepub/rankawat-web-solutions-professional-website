import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Percent } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { SiWhatsapp } from 'react-icons/si';

interface RateListProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Rate List',
    subtitle: 'Transparent Pricing with 20% OFF',
    basic: 'Basic Website',
    standard: 'Standard Business Website',
    landing: 'Landing Page',
    mostPopular: 'Most Popular',
    discount: '20% OFF',
    originalPrice: 'Original',
    discountedPrice: 'Now',
    features: 'Features',
    extraServices: 'Extra Services (Optional)',
    getStarted: 'Get Started',
    basicFeatures: [
      '1 Page Website',
      'Mobile Friendly',
      'Contact Button (Call/WhatsApp)',
      '2 Days Delivery',
    ],
    standardFeatures: [
      '4-5 Pages',
      'Home, About, Services, Gallery, Contact',
      'WhatsApp + Call Button',
      'Basic SEO',
      '4-5 Days Delivery',
    ],
    landingFeatures: [
      'Single Page',
      'Lead Form',
      'Fast Loading',
      'Best for Facebook/Google Ads',
    ],
  },
  hi: {
    title: 'मूल्य सूची',
    subtitle: '20% छूट के साथ पारदर्शी मूल्य निर्धारण',
    basic: 'बेसिक वेबसाइट',
    standard: 'स्टैंडर्ड बिजनेस वेबसाइट',
    landing: 'लैंडिंग पेज',
    mostPopular: 'सबसे लोकप्रिय',
    discount: '20% छूट',
    originalPrice: 'मूल',
    discountedPrice: 'अब',
    features: 'विशेषताएं',
    extraServices: 'अतिरिक्त सेवाएं (वैकल्पिक)',
    getStarted: 'शुरू करें',
    basicFeatures: [
      '1 पेज वेबसाइट',
      'मोबाइल फ्रेंडली',
      'संपर्क बटन (कॉल/व्हाट्सएप)',
      '2 दिन डिलीवरी',
    ],
    standardFeatures: [
      '4-5 पेज',
      'होम, अबाउट, सर्विसेज, गैलरी, कॉन्टैक्ट',
      'व्हाट्सएप + कॉल बटन',
      'बेसिक SEO',
      '4-5 दिन डिलीवरी',
    ],
    landingFeatures: [
      'सिंगल पेज',
      'लीड फॉर्म',
      'फास्ट लोडिंग',
      'फेसबुक/गूगल विज्ञापनों के लिए सर्वश्रेष्ठ',
    ],
  },
};

export default function RateList({ language }: RateListProps) {
  const t = translations[language];
  const { actor, isFetching } = useActor();

  const { data: pricing, isLoading } = useQuery({
    queryKey: ['pricing'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPricing();
    },
    enabled: !!actor && !isFetching,
  });

  const applyDiscount = (price: bigint | undefined) => {
    if (!price) return 0;
    return Math.round(Number(price) * 0.8); // 20% discount
  };

  const packages = [
    {
      name: t.basic,
      originalPrice: pricing?.basicWebsite,
      discountedPrice: applyDiscount(pricing?.basicWebsite),
      features: t.basicFeatures,
      popular: false,
    },
    {
      name: t.standard,
      originalPrice: pricing?.standardWebsite,
      discountedPrice: applyDiscount(pricing?.standardWebsite),
      features: t.standardFeatures,
      popular: true,
    },
    {
      name: t.landing,
      originalPrice: pricing?.landingPage,
      discountedPrice: applyDiscount(pricing?.landingPage),
      features: t.landingFeatures,
      popular: false,
    },
  ];

  const extraServices = [
    { name: 'Domain Setup', price: pricing?.domainSetup },
    { name: 'Hosting Setup', price: pricing?.hostingSetup, suffix: '/year' },
    { name: 'Google Search Console', price: pricing?.googleConsole },
    { name: 'Google Business Profile', price: pricing?.googleProfile },
    { name: 'Website Maintenance', price: pricing?.maintenance },
    { name: 'Logo Design', price: pricing?.logoDesign },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-navy/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-brand-orange text-white px-6 py-2 text-lg mb-4">
            <Percent className="h-5 w-5 mr-2 inline" />
            {t.discount}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="w-24 h-1 bg-brand-orange mx-auto mt-4" />
        </div>

        {/* Main Packages */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {isLoading ? (
            <>
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card border-brand-blue/20">
                  <CardHeader>
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-12 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-40 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative bg-card border-2 transition-all duration-300 hover:shadow-xl ${
                  pkg.popular
                    ? 'border-brand-orange shadow-lg shadow-brand-orange/20 scale-105'
                    : 'border-brand-blue/20 hover:border-brand-orange/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-brand-orange text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1 inline" />
                      {t.mostPopular}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-foreground mb-2">{pkg.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground line-through">
                      {t.originalPrice}: ₹{Number(pkg.originalPrice).toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-brand-orange">
                        ₹{pkg.discountedPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">
                      Save ₹{(Number(pkg.originalPrice) - pkg.discountedPrice).toLocaleString('en-IN')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-brand-orange mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => window.open('https://wa.me/917691029526?text=I%20want%20to%20book%20' + pkg.name, '_blank')}
                    className={`w-full ${
                      pkg.popular
                        ? 'bg-brand-orange hover:bg-brand-orange/90'
                        : 'bg-brand-blue hover:bg-brand-blue/90'
                    } text-white`}
                  >
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    {t.getStarted}
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Extra Services */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">{t.extraServices}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-card border-brand-blue/20">
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              extraServices.map((service, index) => (
                <Card
                  key={index}
                  className="bg-card border-brand-blue/20 hover:border-brand-orange/50 transition-all"
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <span className="text-foreground font-medium">{service.name}</span>
                    <Badge variant="secondary" className="bg-brand-orange/20 text-brand-orange">
                      ₹{Number(service.price).toLocaleString('en-IN')}
                      {service.suffix || ''}
                    </Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
