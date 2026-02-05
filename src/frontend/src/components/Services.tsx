import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Globe,
  User,
  Megaphone,
  Store,
  RefreshCw,
  Smartphone,
  Zap,
  Search,
  Palette,
  FileImage,
} from 'lucide-react';

interface ServicesProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Our Services',
    subtitle: 'Comprehensive Web Solutions for Your Business',
    loading: 'Loading services...',
    featured: 'Featured',
  },
  hi: {
    title: 'हमारी सेवाएं',
    subtitle: 'आपके व्यवसाय के लिए व्यापक वेब समाधान',
    loading: 'सेवाएं लोड हो रही हैं...',
    featured: 'विशेष रुप से प्रदर्शित',
  },
};

const serviceIcons: { [key: string]: any } = {
  'Business Website Design': Globe,
  'Personal Portfolio': User,
  'Landing Page': Megaphone,
  'Solar/Shop/Coaching Website': Store,
  'Website Redesign': RefreshCw,
  'Responsive Design': Smartphone,
  'Fast Loading Websites': Zap,
  'Basic SEO Setup': Search,
  'Logo Design': Palette,
  'Business Poster Template Ads': FileImage,
};

const featuredServices = ['Logo Design', 'Business Poster Template Ads'];

export default function Services({ language }: ServicesProps) {
  const t = translations[language];
  const { actor, isFetching } = useActor();

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      const baseServices = await actor.getServices();
      // Add Logo Design and Business Poster Ads
      return [
        ...baseServices,
        {
          name: 'Logo Design',
          description: 'Professional logo design for your brand identity.',
          price: BigInt(300),
        },
        {
          name: 'Business Poster Template Ads',
          description: 'Eye-catching poster designs for social media and marketing.',
          price: BigInt(300),
        },
      ];
    },
    enabled: !!actor && !isFetching,
  });

  return (
    <section id="services" className="py-20 bg-navy/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="w-24 h-1 bg-brand-orange mx-auto mt-4" />
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="bg-card border-brand-blue/20">
                <CardHeader>
                  <Skeleton className="h-12 w-12 rounded-full mb-4" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {services?.map((service, index) => {
              const Icon = serviceIcons[service.name] || Globe;
              const price = Number(service.price);
              const isFeatured = featuredServices.includes(service.name);
              return (
                <Card
                  key={index}
                  className={`bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative ${
                    isFeatured
                      ? 'border-2 border-brand-orange shadow-lg shadow-brand-orange/20'
                      : 'border-brand-blue/20 hover:border-brand-orange/50 hover:shadow-brand-orange/10'
                  } group`}
                >
                  {isFeatured && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <Badge className="bg-brand-orange text-white px-3 py-1 shadow-lg">
                        {t.featured}
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                      isFeatured ? 'bg-brand-orange/20' : 'bg-brand-orange/10 group-hover:bg-brand-orange/20'
                    }`}>
                      <Icon className="h-6 w-6 text-brand-orange" />
                    </div>
                    <CardTitle className="text-foreground text-lg">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                    {price > 0 && (
                      <Badge variant="secondary" className="bg-brand-blue/20 text-brand-blue">
                        ₹{price.toLocaleString('en-IN')}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
