import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Percent, Sparkles } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface SpecialOffersProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Special Offers',
    subtitle: 'Limited Time Promotional Deals',
    offer1: '🎉 Special Offer: Get 2 Business Ads FREE with every Website!',
    offer1Desc: 'Book any website package and receive 2 professional business poster template ads absolutely FREE!',
    offer2: '💥 Flat 20% OFF on all Website Development Packages!',
    offer2Desc: 'Save up to ₹1,260 on website packages. Limited time offer!',
    viewAllOffers: 'View All Offers',
    bookNow: 'Book Now',
  },
  hi: {
    title: 'विशेष ऑफर',
    subtitle: 'सीमित समय के प्रचार सौदे',
    offer1: '🎉 विशेष ऑफर: हर वेबसाइट के साथ 2 बिजनेस विज्ञापन मुफ्त पाएं!',
    offer1Desc: 'कोई भी वेबसाइट पैकेज बुक करें और 2 पेशेवर बिजनेस पोस्टर टेम्पलेट विज्ञापन बिल्कुल मुफ्त प्राप्त करें!',
    offer2: '💥 सभी वेबसाइट डेवलपमेंट पैकेज पर फ्लैट 20% छूट!',
    offer2Desc: 'वेबसाइट पैकेज पर ₹1,260 तक बचाएं। सीमित समय का ऑफर!',
    viewAllOffers: 'सभी ऑफर देखें',
    bookNow: 'अभी बुक करें',
  },
};

export default function SpecialOffers({ language }: SpecialOffersProps) {
  const t = translations[language];
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-navy/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="bg-brand-orange text-white px-6 py-2 text-lg mb-4 animate-bounce">
            <Sparkles className="h-5 w-5 mr-2 inline" />
            Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="w-24 h-1 bg-brand-orange mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
          {/* Offer 1: Free Business Ads */}
          <Card className="bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 border-2 border-brand-orange/50 shadow-xl hover:shadow-2xl hover:shadow-brand-orange/20 transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center shrink-0 animate-pulse">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{t.offer1}</h3>
                  <p className="text-muted-foreground">{t.offer1Desc}</p>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="/assets/generated/free-ads-banner.dim_800x300.png"
                  alt="Free Business Ads"
                  className="w-full h-auto"
                />
              </div>
              <Button
                onClick={() => window.open('https://wa.me/917691029526?text=I%20want%20to%20book%20a%20website%20and%20get%202%20FREE%20business%20ads', '_blank')}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-lg py-6"
              >
                {t.bookNow}
              </Button>
            </CardContent>
          </Card>

          {/* Offer 2: 20% Discount */}
          <Card className="bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 border-2 border-brand-blue/50 shadow-xl hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center shrink-0 animate-pulse">
                  <Percent className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{t.offer2}</h3>
                  <p className="text-muted-foreground">{t.offer2Desc}</p>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="/assets/generated/discount-badge.dim_200x200.png"
                  alt="20% Discount"
                  className="w-full h-auto"
                />
              </div>
              <Button
                onClick={() => navigate({ to: '/services' })}
                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-lg py-6"
              >
                View Packages
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* View All Offers Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate({ to: '/offers' })}
            className="bg-gradient-to-r from-brand-orange to-brand-blue hover:from-brand-orange/90 hover:to-brand-blue/90 text-white text-lg px-12 py-6"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {t.viewAllOffers}
          </Button>
        </div>
      </div>
    </section>
  );
}
