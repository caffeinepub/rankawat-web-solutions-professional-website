import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, MapPin, Loader2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { toast } from 'sonner';

interface ContactProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in Touch - Let\'s Build Your Dream Website',
    name: 'Your Name',
    phone: 'Phone Number',
    service: 'Select Service',
    message: 'Your Message',
    submit: 'Send Message',
    submitting: 'Sending...',
    whatsapp: 'WhatsApp',
    call: 'Call Now',
    successTitle: 'Message Sent!',
    successDesc: 'We will get back to you soon.',
    errorTitle: 'Error',
    errorDesc: 'Failed to send message. Please try again.',
    selectService: 'Choose a service...',
    services: [
      'Business Website Design',
      'Personal Portfolio',
      'Landing Page',
      'Solar/Shop/Coaching Website',
      'Website Redesign',
      'Logo Design',
      'Business Poster Ads',
      'SEO Services',
      'Other',
    ],
  },
  hi: {
    title: 'संपर्क करें',
    subtitle: 'संपर्क में रहें - आइए अपनी ड्रीम वेबसाइट बनाएं',
    name: 'आपका नाम',
    phone: 'फोन नंबर',
    service: 'सेवा चुनें',
    message: 'आपका संदेश',
    submit: 'संदेश भेजें',
    submitting: 'भेजा जा रहा है...',
    whatsapp: 'व्हाट्सएप',
    call: 'अभी कॉल करें',
    successTitle: 'संदेश भेजा गया!',
    successDesc: 'हम जल्द ही आपसे संपर्क करेंगे।',
    errorTitle: 'त्रुटि',
    errorDesc: 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।',
    selectService: 'एक सेवा चुनें...',
    services: [
      'बिजनेस वेबसाइट डिज़ाइन',
      'पर्सनल पोर्टफोलियो',
      'लैंडिंग पेज',
      'सोलर/शॉप/कोचिंग वेबसाइट',
      'वेबसाइट रीडिज़ाइन',
      'लोगो डिज़ाइन',
      'बिजनेस पोस्टर विज्ञापन',
      'SEO सेवाएं',
      'अन्य',
    ],
  },
};

export default function Contact({ language }: ContactProps) {
  const t = translations[language];
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      const timestamp = BigInt(Date.now());
      await actor.saveServiceInquiry(
        formData.name,
        formData.message,
        formData.phone,
        formData.service,
        timestamp
      );
    },
    onSuccess: () => {
      toast.success(t.successTitle, {
        description: t.successDesc,
      });
      setFormData({ name: '', phone: '', service: '', message: '' });
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
    onError: () => {
      toast.error(t.errorTitle, {
        description: t.errorDesc,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      toast.error(t.errorTitle, {
        description: 'Please fill in all required fields.',
      });
      return;
    }
    mutation.mutate();
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-navy/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="w-24 h-1 bg-brand-orange mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card border-brand-blue/20">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.name} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.name}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.phone}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">{t.service} *</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectService} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.message}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.message}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.submitting}
                    </>
                  ) : (
                    t.submit
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 border-brand-orange/30">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Phone</h3>
                    <a href="tel:7691029526" className="text-muted-foreground hover:text-brand-orange transition-colors">
                      +91 7691029526
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Location</h3>
                    <p className="text-muted-foreground">India</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                size="lg"
                onClick={() => window.open('https://wa.me/917691029526', '_blank')}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white h-20"
              >
                <SiWhatsapp className="h-6 w-6 mr-2" />
                {t.whatsapp}
              </Button>
              <Button
                size="lg"
                onClick={() => window.open('tel:7691029526', '_self')}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white h-20"
              >
                <Phone className="h-6 w-6 mr-2" />
                {t.call}
              </Button>
            </div>

            {/* Rate List Image */}
            <Card className="bg-card border-brand-blue/20 overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/assets/file_000000009d007207ad47a3f4b3186d0b.png"
                  alt="Rate List"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
