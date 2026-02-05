import { Heart, Shield } from 'lucide-react';
import { SiWhatsapp, SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';
import { useNavigate } from '@tanstack/react-router';

interface FooterProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    tagline: 'Boosting Your Online Success',
    quickLinks: 'Quick Links',
    services: 'Services',
    contact: 'Contact',
    followUs: 'Follow Us',
    copyright: '© 2025 Rankawat Web Solutions. All rights reserved.',
    builtWith: 'Built with',
    using: 'using',
    links: {
      home: 'Home',
      services: 'Services',
      offers: 'Offers',
      admin: 'Admin Panel',
      'privacy-policy': 'Privacy Policy',
    },
  },
  hi: {
    tagline: 'आपकी ऑनलाइन सफलता को बढ़ावा देना',
    quickLinks: 'त्वरित लिंक',
    services: 'सेवाएं',
    contact: 'संपर्क',
    followUs: 'हमें फॉलो करें',
    copyright: '© 2025 रणकावत वेब सॉल्यूशंस। सर्वाधिकार सुरक्षित।',
    builtWith: 'के साथ बनाया गया',
    using: 'उपयोग करके',
    links: {
      home: 'होम',
      services: 'सेवाएं',
      offers: 'ऑफर',
      admin: 'एडमिन पैनल',
      'privacy-policy': 'गोपनीयता नीति',
    },
  },
};

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  const navigate = useNavigate();

  const handleNavigation = (key: string) => {
    if (key === 'home') {
      navigate({ to: '/' });
    } else {
      navigate({ to: `/${key}` });
    }
  };

  return (
    <footer className="bg-navy border-t border-brand-blue/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/assets/1000038581-removebg-preview.png"
              alt="Rankawat Web Solutions"
              className="h-12 w-auto"
            />
            <p className="text-brand-orange text-sm font-medium">{t.tagline}</p>
            <p className="text-muted-foreground text-sm">
              Professional web solutions for small businesses. AI-powered, fast, and affordable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              {Object.entries(t.links).map(([key, label]) => (
                <li key={key}>
                  <button
                    onClick={() => handleNavigation(key)}
                    className="text-muted-foreground hover:text-brand-orange transition-colors text-sm flex items-center gap-2"
                  >
                    {key === 'admin' && <Shield className="h-3 w-3" />}
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-bold mb-4">{t.services}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Business Website Design</li>
              <li>Personal Portfolio</li>
              <li>Landing Page</li>
              <li>Website Redesign</li>
              <li>Logo Design</li>
              <li>Business Poster Ads</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-foreground font-bold mb-4">{t.contact}</h3>
            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <p>Phone: +91 7691029526</p>
            </div>
            <div>
              <h4 className="text-foreground font-semibold mb-3 text-sm">{t.followUs}</h4>
              <div className="flex space-x-3">
                <a
                  href="https://wa.me/917691029526"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-orange/20 transition-colors"
                >
                  <SiWhatsapp className="h-5 w-5 text-brand-blue hover:text-brand-orange transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-orange/20 transition-colors"
                >
                  <SiFacebook className="h-5 w-5 text-brand-blue hover:text-brand-orange transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-orange/20 transition-colors"
                >
                  <SiInstagram className="h-5 w-5 text-brand-blue hover:text-brand-orange transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center hover:bg-brand-orange/20 transition-colors"
                >
                  <SiLinkedin className="h-5 w-5 text-brand-blue hover:text-brand-orange transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-blue/20 pt-8 text-center space-y-2">
          <p className="text-muted-foreground text-sm">{t.copyright}</p>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            {t.builtWith} <Heart className="h-4 w-4 text-brand-orange fill-brand-orange" /> {t.using}{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:text-brand-orange/80 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
