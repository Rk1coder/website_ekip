import React, { createContext, useContext, useEffect, useState } from 'react';
import { messages } from './translations';

type Language = 'tr' | 'en';
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = 'gokturk-language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return window.localStorage.getItem(storageKey) === 'en' ? 'en' : 'tr';
    } catch {
      return 'tr';
    }
  });

  const t = (text: string): string => {
    const entry = messages[text as keyof typeof messages];
    return entry ? entry[language] : text;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = messages['Göktürk İHA - İnsansız Hava Araçları Ekibi'][language];
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // Language switching still works when the browser blocks storage.
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
