import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useNextTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types pour la gestion des langues
export type Language = 'fr' | 'en';

// Vérifier si nous sommes côté client
const isBrowser = typeof window !== 'undefined';

// Initialisation de i18next avec backend pour charger les traductions
if (isBrowser) {
  i18next
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng: 'fr',
      fallbackLng: 'fr',
      ns: ['common'],
      defaultNS: 'common',
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      },
      debug: process.env.NODE_ENV === 'development'
    })
    .catch(e => console.error('i18n init error:', e));
}

// Interface pour le store de langues
interface I18nStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Store Zustand pour la persistance de la langue
export const useI18n = create<I18nStore>()(
  persist(
    (set) => ({
      language: 'fr',
      setLanguage: (language: Language) => {
        if (isBrowser) {
          i18next.changeLanguage(language);
          document.documentElement.lang = language;
        }
        set({ language });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

// Hook pour obtenir les traductions
export const useTranslation = () => {
  const { language, setLanguage } = useI18n();
  const { t, ready, i18n } = useNextTranslation();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Synchroniser la langue au montage
  useEffect(() => {
    if (isBrowser) {
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }
      // Marquer comme initialisé après le premier rendu
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [language, i18n, isInitialized]);

  // Fonction pour basculer entre les langues
  const toggleLanguage = () => {
    if (!isBrowser) return;
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
  };
  
  // Fonction de traduction sécurisée
  const safeTranslate = (key: string, options?: any) => {
    if (!isBrowser) {
      // Côté serveur, utiliser le fallback
      return getDefaultText(key);
    }
    
    if (!ready || !isInitialized) {
      // Si les traductions ne sont pas prêtes, utiliser le fallback
      return getDefaultText(key);
    }
    
    try {
      const translation = t(key, options);
      
      // Vérifier si la traduction est identique à la clé (ce qui signifie qu'elle n'a pas été trouvée)
      if (translation === key || !translation) {
        console.warn(`Translation missing for key: ${key}`);
        return getDefaultText(key);
      }
      
      return translation;
    } catch (error) {
      console.error(`Error translating key: ${key}`, error);
      return getDefaultText(key);
    }
  };
  
  // Extraire un texte par défaut à partir de la clé
  const getDefaultText = (key: string): string => {
    // Prendre la dernière partie de la clé comme texte par défaut
    const parts = key.split('.');
    const lastPart = parts[parts.length - 1];
    
    // Transformer lastPart de camelCase à format texte
    // Exemple: "mainTitle" => "Main Title"
    return lastPart
      .replace(/([A-Z])/g, ' $1') // Ajouter un espace avant chaque majuscule
      .replace(/^./, (str) => str.toUpperCase()); // Première lettre en majuscule
  };
  
  return { 
    language, 
    setLanguage, 
    t: safeTranslate,
    toggleLanguage,
    ready: ready && isInitialized
  };
};

// Fonction pour initialiser la langue
export const initLanguage = () => {
  if (!isBrowser) return;
  
  const { language } = useI18n.getState();
  document.documentElement.lang = language;
  
  // Forcer le rechargement des traductions
  i18next.reloadResources()
    .then(() => console.log('Translations reloaded successfully'))
    .catch(e => console.error('Failed to reload translations:', e));
}; 