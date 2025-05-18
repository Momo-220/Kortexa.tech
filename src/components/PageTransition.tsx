'use client';

import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Version ultra simplifiée qui ne fait que rendre les enfants
// Suppression de toutes les transitions pour éviter les erreurs
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return <>{children}</>;
};

export default PageTransition; 