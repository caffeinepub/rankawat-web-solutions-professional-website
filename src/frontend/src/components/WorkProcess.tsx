import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare, Palette, Code, CheckCircle } from 'lucide-react';

interface WorkProcessProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Work Process',
    subtitle: 'Simple 4-Step Process to Your Dream Website',
  },
  hi: {
    title: 'कार्य प्रक्रिया',
    subtitle: 'आपकी ड्रीम वेबसाइट के लिए सरल 4-चरण प्रक्रिया',
  },
};

const stepIcons = [MessageSquare, Palette, Code, CheckCircle];

export default function WorkProcess({ language }: WorkProcessProps) {
  const t = translations[language];
  const { actor, isFetching } = useActor();

  const { data: steps, isLoading } = useQuery({
    queryKey: ['workProcessSteps'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkProcessSteps();
    },
    enabled: !!actor && !isFetching,
  });

  return (
    <section id="process" className="py-20 bg-navy/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="w-24 h-1 bg-brand-orange mx-auto mt-4" />
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-card border-brand-blue/20">
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-16 rounded-full mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue via-brand-orange to-brand-blue opacity-30" />

            {steps?.map((step, index) => {
              const Icon = stepIcons[index] || MessageSquare;
              return (
                <Card
                  key={index}
                  className="bg-card border-brand-blue/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/10 relative z-10 group"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="relative inline-block">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-blue rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {Number(step.stepNumber)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
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
