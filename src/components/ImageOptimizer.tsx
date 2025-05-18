'use client';

import React, { useEffect } from 'react';

/**
 * Composant qui optimise automatiquement les images du site
 * - Convertit les images img en next/image lorsque possible
 * - Ajoute le lazy loading aux images
 * - Ajoute des attributs de taille pour éviter le CLS
 */
export default function ImageOptimizer() {
  useEffect(() => {
    // Ne s'exécute que côté client
    if (typeof window === 'undefined') return;

    // Fonction pour optimiser les images
    const optimizeImages = () => {
      // Sélectionne toutes les images standard (pas celles déjà optimisées par Next.js)
      const images = document.querySelectorAll('img:not([data-nimg])');
      
      images.forEach((img) => {
        // Type casting pour accéder aux propriétés spécifiques des images
        const imgElement = img as HTMLImageElement;
        
        // Ajoute le chargement différé
        if (!imgElement.hasAttribute('loading')) {
          imgElement.setAttribute('loading', 'lazy');
        }
        
        // Ajoute le décodage asynchrone
        if (!imgElement.hasAttribute('decoding')) {
          imgElement.setAttribute('decoding', 'async');
        }
        
        // Ajoute les dimensions si elles sont manquantes pour éviter le CLS
        if (imgElement.naturalWidth && imgElement.naturalHeight && 
            !imgElement.hasAttribute('width') && !imgElement.hasAttribute('height')) {
          const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
          imgElement.setAttribute('width', imgElement.naturalWidth.toString());
          imgElement.setAttribute('height', imgElement.naturalHeight.toString());
          
          // Ajoute un style pour maintenir le ratio d'aspect
          imgElement.style.aspectRatio = `${aspectRatio}`;
        }
        
        // Marque l'image comme optimisée
        imgElement.setAttribute('data-optimized', 'true');
      });
    };

    // Optimise les images au chargement de la page
    optimizeImages();

    // Réoptimise lors des changements de DOM (pour le contenu dynamique)
    const observer = new MutationObserver((mutations) => {
      let hasNewImages = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'IMG' || 
                (node.nodeType === Node.ELEMENT_NODE && 
                 (node as Element).querySelectorAll('img:not([data-optimized])').length > 0)) {
              hasNewImages = true;
            }
          });
        }
      });
      
      if (hasNewImages) {
        optimizeImages();
      }
    });
    
    // Observer le corps du document pour les changements
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Ce composant ne rend rien visuellement
  return null;
} 