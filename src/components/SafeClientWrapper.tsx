'use client';

import React, { useEffect, useState } from 'react';
import ClientWrapper from './ClientWrapper';
import HydrationFix from './HydrationFix';
import LanguageInitializer from './LanguageInitializer';

interface SafeClientWrapperProps {
  children: React.ReactNode;
}

const SafeClientWrapper: React.FC<SafeClientWrapperProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // S'assurer que le montage se fait uniquement côté client
  useEffect(() => {
    // Utiliser requestAnimationFrame pour garantir qu'on est dans la phase de rendu navigateur
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    
    return () => cancelAnimationFrame(frame);
  }, []);
  
  // Rendu minimal pendant l'hydratation pour éviter les incohérences
  if (!isMounted) {
    return (
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow hidden"></div>
      </div>
    );
  }
  
  // Une fois monté côté client, on peut afficher le contenu normal
  return (
    <>
      {/* Composant pour corriger les problèmes d'hydratation */}
      <HydrationFix />
      
      {/* Composant pour initialiser la langue */}
      <LanguageInitializer />
      
      {/* ClientWrapper avec toutes les fonctionnalités */}
      <ClientWrapper>
        {children}
      </ClientWrapper>
    </>
  );
};

export default SafeClientWrapper; 