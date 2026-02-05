import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, Phone, Shield } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate, useLocation } from '@tanstack/react-router';

interface HeaderProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const translations = {
  en: {
    home: 'Home',
    services: 'Services',
    offers: 'Offers',
    admin: 'Admin Panel',
    callNow: 'Call Now',
  },
  hi: {
    home: 'होम',
    services: 'सेवाएं',
    offers: 'ऑफर',
    admin: 'एडमिन पैनल',
    callNow: 'अभी कॉल करें',
  },
};

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.home, path: '/' },
    { label: t.services, path: '/services' },
    { label: t.offers, path: '/offers' },
    { label: t.admin, path: '/admin', icon: Shield },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Top bar with "Made by" label */}
      <div className="absolute top-0 right-0 px-4 py-1">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Made by – Ajay Rankawat
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation('/')}>
            <img src="/assets/1000038581-removebg-preview.png" alt="Rankawat Web Solutions" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`text-white/90 hover:text-brand-orange transition-colors font-medium flex items-center gap-2 ${
                  location.pathname === item.path ? 'text-brand-orange' : ''
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-white hover:text-brand-orange"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
            <Button
              onClick={() => window.open('tel:7691029526', '_self')}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              <Phone className="h-4 w-4 mr-2" />
              {t.callNow}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-white"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-navy border-brand-blue/20">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`text-white text-lg hover:text-brand-orange transition-colors text-left flex items-center gap-2 ${
                        location.pathname === item.path ? 'text-brand-orange' : ''
                      }`}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {item.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => {
                      window.open('tel:7691029526', '_self');
                      setIsOpen(false);
                    }}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {t.callNow}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
