'use client';

import React, { createContext, useContext, useState } from 'react';

type Locale = 'en' | 'fr';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: 'Welcome to HomePlate',
    about: 'About',
    howItWorks: 'How it works',
    becomeACook: 'Become a cook',
    faq: 'FAQ',
    contact: 'Contact',
    login: 'Log in',
    signup: 'Sign up',
  },
  fr: {
    welcome: 'Bienvenue sur HomePlate',
    about: 'À propos',
    howItWorks: 'Comment ça marche',
    becomeACook: 'Devenir cuisinier',
    faq: 'FAQ',
    contact: 'Contact',
    login: 'Connexion',
    signup: "S'inscrire",
  }
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string) => {
    return translations[locale][key as keyof typeof translations['en']] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
