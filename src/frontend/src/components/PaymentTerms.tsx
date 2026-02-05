import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CheckCircle, Shield } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PaymentTermsProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Payment Terms',
    subtitle: 'Simple and Transparent Payment Structure',
    advance: 'Advance Payment',
    afterCompletion: 'After Completion',
    noHidden: 'No Hidden Charges',
    noHiddenDesc: 'What you see is what you pay. Complete transparency in pricing.',
  },
  hi: {
    title: 'भुगतान शर्तें',
    subtitle: 'सरल और पारदर्शी भुगतान संरचना',
    advance: 'अग्रिम भुगतान',
    afterCompletion: 'पूर्णता के बाद',
    noHidden: 'कोई छिपा हुआ शुल्क नहीं',
    noHiddenDesc: 'आप जो देखते हैं वही आप भुगतान करते हैं। मूल्य निर्धारण में पूर्ण पारदर्शिता।',
  },
};

export default function PaymentTerms({ language }: PaymentTermsProps) {
  const t = translations[language];
  const { actor, isFetching } = useActor();

  const { data: paymentTerms, isLoading } = useQuery({
    queryKey: ['paymentTerms'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPaymentTerms();
    },
    enabled: !!actor && !isFetching,
  });

  return (
    <section className="py-20 bg-gradient-to-b from-background to-navy/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="w-24 h-1 bg-brand-orange mx-auto mt-4" />
        </div>

        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card border-brand-blue/20">
                  <CardContent className="p-8">
                    <Skeleton className="h-16 w-16 rounded-full mb-4 mx-auto" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-2 border-brand-blue/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/10">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto">
                    <DollarSign className="h-8 w-8 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t.advance}</h3>
                  <Badge className="text-3xl font-bold bg-brand-orange text-white px-6 py-2">
                    {Number(paymentTerms?.advance)}%
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-card border-2 border-brand-blue/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/10">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t.afterCompletion}</h3>
                  <Badge className="text-3xl font-bold bg-brand-blue text-white px-6 py-2">
                    {Number(paymentTerms?.afterCompletion)}%
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 border-2 border-brand-orange/30 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/10">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t.noHidden}</h3>
                  <p className="text-muted-foreground text-sm">{t.noHiddenDesc}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
