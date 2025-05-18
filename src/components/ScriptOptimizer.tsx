'use client';

import React, { useEffect } from 'react';

/**
 * Composant qui optimise le chargement des scripts
 * Version optimisée pour réduire les opérations DOM et améliorer les performances
 */
export default function ScriptOptimizer() {
  useEffect(() => {
    // Sortir immédiatement si on n'est pas dans un navigateur
    if (typeof window === 'undefined') return;

    // Exécuter l'optimisation après le chargement initial de la page
    // pour ne pas bloquer le rendu principal
    const timeoutId = setTimeout(() => {
      // Liste des domaines externes déjà traités
      const processedDomains = new Set<string>();
      const preconnectFragment = document.createDocumentFragment();

    // Optimise les scripts existants
      const scripts = document.querySelectorAll('script:not([data-optimized])');
    scripts.forEach((script) => {
      // Marque le script comme optimisé
      script.setAttribute('data-optimized', 'true');

        // Traiter uniquement les scripts avec source
        const scriptElement = script as HTMLScriptElement;
        if (scriptElement.src) {
        try {
            const scriptUrl = new URL(scriptElement.src);

            // Si le domaine est externe et pas encore traité
            if (scriptUrl.hostname !== window.location.hostname && !processedDomains.has(scriptUrl.origin)) {
              processedDomains.add(scriptUrl.origin);

              // Créer les éléments de préconnexion
              const link = document.createElement('link');
              link.rel = 'preconnect';
              link.href = scriptUrl.origin;
              link.crossOrigin = 'anonymous';
              preconnectFragment.appendChild(link);
            }

            // Rendre asynchrones les scripts externes non critiques
            if (scriptUrl.hostname !== window.location.hostname && 
                !scriptElement.hasAttribute('async') && 
                !scriptElement.hasAttribute('defer')) {
              scriptElement.defer = true;
          }
        } catch (e) {
            // Ignorer les URL invalides
        }
      }
    });

      // Ajouter toutes les préconnexions en une seule opération DOM
      if (preconnectFragment.childNodes.length > 0) {
        document.head.appendChild(preconnectFragment);
      }

      // Observer MutationObserver simplifié qui se concentre sur les scripts
    const observer = new MutationObserver((mutations) => {
        let hasNewScripts = false;
        
        // Vérifier d'abord s'il y a de nouveaux scripts
        for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
              const node = mutation.addedNodes[i];
              if (node.nodeName === 'SCRIPT' && !(node as Element).hasAttribute('data-optimized')) {
                hasNewScripts = true;
                break;
              }
            }
            if (hasNewScripts) break;
          }
        }
        
        // Si aucun nouveau script n'a été trouvé, sortir rapidement
        if (!hasNewScripts) return;
        
        // Optimiser les nouveaux scripts
        const newScripts = document.querySelectorAll('script:not([data-optimized])');
        newScripts.forEach(script => {
                script.setAttribute('data-optimized', 'true');
                
          const scriptElement = script as HTMLScriptElement;
          if (scriptElement.src && !scriptElement.hasAttribute('async') && !scriptElement.hasAttribute('defer')) {
            scriptElement.defer = true;
          }
      });
    });
    
      // Observer seulement le document body pour réduire la charge
      observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

      // Nettoyer l'observer après 10 secondes pour économiser des ressources
      // car la plupart des scripts sont chargés peu après la navigation
      const observerTimeoutId = setTimeout(() => {
        observer.disconnect();
      }, 10000);
      
      return () => {
        clearTimeout(observerTimeoutId);
        observer.disconnect();
      };
    }, 500); // Délai court pour permettre au rendu initial de se terminer

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
} 