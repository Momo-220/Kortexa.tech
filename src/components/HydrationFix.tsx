'use client';

import { useEffect, useState } from 'react';

/**
 * Composant qui corrige les erreurs d'hydratation causées par les extensions de navigateur
 * comme Grammarly qui ajoutent des attributs data-* au HTML/body
 */
const HydrationFix = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Exécuté uniquement côté client après hydratation
  useEffect(() => {
    // Utiliser requestAnimationFrame pour s'assurer d'être dans la phase de rendu du navigateur
    const frame = requestAnimationFrame(() => {
      setIsClient(true);
      
      // Nettoyer les attributs problématiques qui causent des erreurs d'hydratation
      const cleanupAttributes = () => {
        const attrs = ['data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];
        attrs.forEach(attr => {
          if (document.body.hasAttribute(attr)) {
            document.body.removeAttribute(attr);
          }
          if (document.documentElement.hasAttribute(attr)) {
            document.documentElement.removeAttribute(attr);
          }
        });
      };
      
      // Nettoyer immédiatement
      cleanupAttributes();
    });
    
    return () => cancelAnimationFrame(frame);
  }, []);
  
  // Ne renvoie rien, ce composant est uniquement pour les effets secondaires
  return null;
};

export default HydrationFix; 