'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransitionEffect: React.FC = () => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathnameRef = useRef<string>(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Si le chemin change, déclencher l'animation de transition
    if (prevPathnameRef.current !== pathname) {
      // Nettoyer tout timeout précédent pour éviter les fuites
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      setIsNavigating(true);
      
      // Réinitialiser après l'animation
      timeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
      }, 600); // Durée légèrement plus longue pour l'animation complète
      
      // Mettre à jour la référence du chemin précédent
      prevPathnameRef.current = pathname;
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    };
  }, [pathname]);
  
  return (
    <AnimatePresence>
      {isNavigating && (
        <>
          {/* Barre de progression en haut */}
          <motion.div
            key="progress-bar"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ 
              scaleX: 1,
              opacity: [1, 1, 0],
              transition: { 
                scaleX: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: { 
                  duration: 0.5, 
                  times: [0, 0.8, 1],
                  delay: 0.2
                }
              }
            }}
            className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-500 via-accent-600 to-accent-400 origin-left z-50"
          />
          
          {/* Effet de flash subtil sur le changement de page */}
          <motion.div 
            key="flash-effect"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.05, 0],
              transition: { duration: 0.3, times: [0, 0.5, 1] }
            }}
            className="fixed inset-0 bg-white pointer-events-none z-40"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionEffect; 