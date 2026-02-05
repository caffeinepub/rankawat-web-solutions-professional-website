import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Zap, Sparkles, HeadphonesIcon, Users, Award } from 'lucide-react';

interface WhyChooseUsProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Why Choose Us',
    subtitle: 'What Makes Rankawat Web Solutions Different',
    reasons: [
      {
        icon: DollarSign,
        title: 'Affordable Price',
        description: 'Budget-friendly packages designed for small businesses without compromising quality.',
      },
      {
        icon: Zap,
        title: 'Fast Delivery',
        description: 'Quick turnaround times with delivery as fast as 2 days for basic websites.',
      },
      {
        icon: Sparkles,
        title: 'Modern AI Tools',
        description: 'Leveraging cutting-edge AI technology for better design and functionality.',
      },
      {
        icon: HeadphonesIcon,
        title: 'After-Support',
        description: 'Dedicated support even after project completion to ensure your success.',
      },
      {
        icon: Users,
        title: 'Trusted by Small Businesses',
        description: 'Specialized in understanding and meeting the unique needs of small businesses.',
      },
      {
        icon: Award,
        title: 'Quality Guaranteed',
        description: 'Professional, responsive, and SEO-ready websites that drive results.',
      },
    ],
  },
  hi: {
    title: 'हमें क्यों चुनें',
    subtitle: 'रणकावत वेब सॉल्यूशंस को क्या अलग बनाता है',
    reasons: [
      {
        icon: DollarSign,
        title: 'किफायती मूल्य',
        description: 'गुणवत्ता से समझौता किए बिना छोटे व्यवसायों के लिए डिज़ाइन किए गए बजट-अनुकूल पैकेज।',
      },
      {
        icon: Zap,
        title: 'तेज़ डिलीवरी',
        description: 'बेसिक वेबसाइटों के लिए 2 दिनों जितनी तेज़ डिलीवरी के साथ त्वरित समय सीमा।',
      },
      {
        icon: Sparkles,
        title: 'आधुनिक AI टूल्स',
        description: 'बेहतर डिज़ाइन और कार्यक्षमता के लिए अत्याधुनिक AI तकनीक का लाभ उठाना।',
      },
      {
        icon: HeadphonesIcon,
        title: 'बाद में सहायता',
        description: 'आपकी सफलता सुनिश्चित करने के लिए परियोजना पूर्णता के बाद भी समर्पित सहायता।',
      },
      {
        icon: Users,
        title: 'छोटे व्यवसायों द्वारा विश्वसनीय',
        description: 'छोटे व्यवसायों की अनूठी जरूरतों को समझने और पूरा करने में विशेषज्ञता।',
      },
      {
        icon: Award,
        title: 'गुणवत्ता की गारंटी',
        description: 'पेशेवर, उत्तरदायी और SEO-तैयार वेबसाइटें जो परिणाम देती हैं।',
      },
    ],
  },
};

export default function WhyChooseUs({ language }: WhyChooseUsProps) {
  const t = translations[language];

  return (
    <section className="py-20 bg-navy/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="w-24 h-1 bg-brand-orange mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card
                key={index}
                className="bg-card border-brand-blue/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/10 group hover:-translate-y-1"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-orange to-brand-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
