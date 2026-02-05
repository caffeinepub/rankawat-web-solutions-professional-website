import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useNavigate } from '@tanstack/react-router';

interface HeroProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    tagline: 'Boosting Your Online Success',
    headline: 'Professional Website Design & Development',
    subheadline: 'AI Powered - Fast & Professional',
    description: 'Transform your business with modern, fast, and affordable web solutions designed for small businesses.',
    cta: 'Get Started',
    whatsapp: 'WhatsApp Us',
    viewOffers: 'View Special Offers',
  },
  hi: {
    tagline: 'आपकी ऑनलाइन सफलता को बढ़ावा देना',
    headline: 'प्रोफेशनल वेबसाइट डिज़ाइन और डेवलपमेंट',
    subheadline: 'AI पावर्ड - तेज़ और प्रोफेशनल',
    description: 'छोटे व्यवसायों के लिए डिज़ाइन किए गए आधुनिक, तेज़ और किफायती वेब समाधानों के साथ अपने व्यवसाय को बदलें।',
    cta: 'शुरू करें',
    whatsapp: 'व्हाट्सएप करें',
    viewOffers: 'विशेष ऑफर देखें',
  },
};

export default function Hero({ language }: HeroProps) {
  const t = translations[language];
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-background.dim_1920x1080.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-brand-blue/80" />
        <div className="absolute inset-0 bg-[url('/assets/generated/tech-pattern-bg.dim_1200x800.jpg')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <div className="inline-block">
              <img
                src="/assets/1000038581-removebg-preview.png"
                alt="Rankawat Web Solutions"
                className="h-16 md:h-20 w-auto mb-4"
              />
            </div>
            <p className="text-brand-orange text-lg md:text-xl font-semibold tracking-wide">{t.tagline}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.headline}
            </h1>
            <p className="text-brand-blue text-xl md:text-2xl font-medium">{t.subheadline}</p>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl">{t.description}</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/services' })}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 group"
              >
                {t.cta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://wa.me/917691029526', '_blank')}
                className="border-2 border-brand-blue text-white hover:bg-brand-blue/20 text-lg px-8 py-6"
              >
                <SiWhatsapp className="mr-2 h-5 w-5" />
                {t.whatsapp}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('tel:7691029526', '_self')}
                className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                7691029526
              </Button>
            </div>

            {/* Special Offer Badge */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/offers' })}
                className="bg-gradient-to-r from-brand-orange to-brand-blue hover:from-brand-orange/90 hover:to-brand-blue/90 text-white text-lg px-8 py-6 animate-pulse"
              >
                🎁 {t.viewOffers}
              </Button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="hidden lg:block animate-float">
            <img
              src="/assets/generated/web-dev-illustration.dim_800x600.jpg"
              alt="Web Development"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-brand-orange rounded-full" />
        </div>
      </div>
    </section>
  );
}
