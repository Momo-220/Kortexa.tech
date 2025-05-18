'use client';

import { useEffect, useState } from 'react';
import { initLanguage } from '@/utils/i18n';

const LanguageInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // Utiliser RAF pour s'assurer que nous sommes dans la phase de rendu du navigateur
    const frame = requestAnimationFrame(() => {
      // Vérifier qu'on est bien côté client
      if (typeof window !== 'undefined' && !initialized) {
        try {
          // Initialiser la langue avec un délai pour éviter les conflits
          setTimeout(() => {
            initLanguage();
            setInitialized(true);
          }, 0);
        } catch (e) {
          console.error('Error initializing language:', e);
        }
      }
    });
    
    return () => cancelAnimationFrame(frame);
  }, [initialized]);
  
  // Ne rend rien, ce composant est uniquement pour les effets secondaires
  return null;
};

export default LanguageInitializer; 