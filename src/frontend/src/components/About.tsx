import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Zap, DollarSign, Users } from 'lucide-react';

interface AboutProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'About Us',
    subtitle: 'Meet the Founder',
    founder: 'Ajay Rankawat',
    description:
      'Rankawat Web Solutions specializes in delivering AI-powered, fast, and affordable web solutions tailored for small businesses. We combine modern technology with creative design to help businesses establish a strong online presence and achieve digital success.',
    mission: 'Our mission is to empower small businesses with professional websites that drive growth and success.',
    features: [
      { icon: Sparkles, title: 'AI-Powered', desc: 'Modern AI tools for better results' },
      { icon: Zap, title: 'Fast Delivery', desc: 'Quick turnaround times' },
      { icon: DollarSign, title: 'Affordable', desc: 'Budget-friendly pricing' },
      { icon: Users, title: 'Small Business Focus', desc: 'Tailored for your needs' },
    ],
  },
  hi: {
    title: 'हमारे बारे में',
    subtitle: 'संस्थापक से मिलें',
    founder: 'अजय रणकावत',
    description:
      'रणकावत वेब सॉल्यूशंस छोटे व्यवसायों के लिए AI-संचालित, तेज़ और किफायती वेब समाधान प्रदान करने में विशेषज्ञता रखता है। हम व्यवसायों को एक मजबूत ऑनलाइन उपस्थिति स्थापित करने और डिजिटल सफलता प्राप्त करने में मदद करने के लिए आधुनिक तकनीक को रचनात्मक डिज़ाइन के साथ जोड़ते हैं।',
    mission: 'हमारा मिशन छोटे व्यवसायों को पेशेवर वेबसाइटों के साथ सशक्त बनाना है जो विकास और सफलता को बढ़ावा देती हैं।',
    features: [
      { icon: Sparkles, title: 'AI-संचालित', desc: 'बेहतर परिणामों के लिए आधुनिक AI टूल्स' },
      { icon: Zap, title: 'तेज़ डिलीवरी', desc: 'त्वरित समय सीमा' },
      { icon: DollarSign, title: 'किफायती', desc: 'बजट-अनुकूल मूल्य निर्धारण' },
      { icon: Users, title: 'छोटे व्यवसाय फोकस', desc: 'आपकी जरूरतों के अनुरूप' },
    ],
  },
};

export default function About({ language }: AboutProps) {
  const t = translations[language];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-navy/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <p className="text-brand-orange font-semibold text-lg mb-2">{t.subtitle}</p>
              <h3 className="text-3xl font-bold text-foreground mb-4">{t.founder}</h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.description}</p>
            <p className="text-foreground font-medium text-lg italic border-l-4 border-brand-orange pl-4">
              {t.mission}
            </p>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {t.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-card border-brand-blue/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/10 group"
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-brand-orange/20 transition-colors">
                      <Icon className="h-6 w-6 text-brand-orange" />
                    </div>
                    <h4 className="font-bold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
