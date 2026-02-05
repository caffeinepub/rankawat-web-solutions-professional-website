import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Footer from './Footer';
import { createContext, useContext, useState } from 'react';

type LanguageContextType = {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export default function Layout() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="min-h-screen bg-background">
        <Header language={language} setLanguage={setLanguage} />
        <main>
          <Outlet />
        </main>
        <Footer language={language} />
      </div>
    </LanguageContext.Provider>
  );
}
