'use client';

import React, { lazy, Suspense } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * Fonction utilitaire pour charger paresseusement des composants avec Suspense
 * @param importFunc - Fonction d'importation dynamique du composant
 * @param fallback - Composant à afficher pendant le chargement (optionnel)
 * @param suspenseProps - Props additionnels pour le composant Suspense
 * @returns Composant enveloppé dans un Suspense
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = null,
  suspenseProps: Record<string, any> = {}
) {
  const LazyComponent = lazy(importFunc);

  return function LazyLoadedComponent(props: React.ComponentProps<T>): JSX.Element {
    return (
      <Suspense fallback={fallback} {...suspenseProps}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Charge un composant uniquement lorsqu'il est visible dans le viewport
 * @param importFunc - Fonction d'importation dynamique du composant
 * @returns Composant qui sera chargé uniquement lorsqu'il est visible
 */
export function lazyLoadOnVisible<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(() => {
    // Utilise Intersection Observer pour charger le composant uniquement lorsqu'il est visible
    return new Promise((resolve) => {
      if (typeof window !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            importFunc().then(resolve);
          }
        });

        // Crée un élément temporaire pour observer
        const element = document.createElement('div');
        document.body.appendChild(element);
        observer.observe(element);
        document.body.removeChild(element);

        // Fallback: charger après un délai même si jamais visible
        setTimeout(() => {
          observer.disconnect();
          importFunc().then(resolve);
        }, 5000);
      } else {
        // Fallback pour SSR
        importFunc().then(resolve);
      }
    });
  });
} 