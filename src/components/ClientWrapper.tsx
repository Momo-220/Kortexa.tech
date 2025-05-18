'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import InstantNavigation from '@/components/InstantNavigation';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Effet pour l'initialisation
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Effet pour gérer le focus et le scroll lors des changements de page
  useEffect(() => {
    if (mounted) {
      // Défiler vers le haut de la page lors du changement de route
      window.scrollTo(0, 0);
      
      // Restaurer le focus sur le contenu principal pour l'accessibilité
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.focus();
        mainContent.setAttribute('tabindex', '-1');
      }
      
      // Activer également le défilement de la page (si désactivé)
      document.body.style.overflow = '';
    }
  }, [pathname, mounted]);
  
  // Si pas encore monté, ne rien afficher ou afficher un chargement minimal
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Chargement...</div>
    </div>;
  }
  
  // Rendu du contenu avec le système de navigation instantanée
  return (
    <>
      <InstantNavigation />
      {children}
    </>
  );
} 