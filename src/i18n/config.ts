import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import tr from './tr.json';

const resources = {
  en: { translation: en },
  tr: { translation: tr }
};

// Tarayıcıdan dili al veya varsayılan olarak 'tr' kullan
const savedLanguage = localStorage.getItem('language') || 'tr';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

// Dil değiştiğinde HTML lang attribute'ını güncelle
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem('language', lng);
});

export default i18n;
