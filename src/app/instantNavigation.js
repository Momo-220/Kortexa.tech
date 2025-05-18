'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Fonction qui précharge tous les liens internes de la page
 * pour une navigation plus rapide
 */
export function enableInstantNavigation() {
  const router = useRouter();

  useEffect(() => {
    // Précharger tous les liens internes présents sur la page
    const prefetchAllLinks = () => {
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('#')) {
          router.prefetch(href);
        }
      });
    };

    // Exécuter après le chargement complet pour s'assurer que tous les liens sont dans le DOM
    if (document.readyState === 'complete') {
      prefetchAllLinks();
    } else {
      window.addEventListener('load', prefetchAllLinks);
      return () => window.removeEventListener('load', prefetchAllLinks);
    }
  }, [router]);
}

// Composant qui active la navigation instantanée
export default function InstantNavigation() {
  enableInstantNavigation();
  return null;
} 