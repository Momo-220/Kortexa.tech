'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { enableInstantNavigation } from '@/app/instantNavigation';

/**
 * Composant pour activer la navigation instantanée
 * Utilise la fonction enableInstantNavigation du module instantNavigation
 */
export default function InstantNavigation() {
  // Utiliser la fonction commune pour éviter la duplication de code
  enableInstantNavigation();
  
  // Ce composant ne rend rien visuellement
  return null;
} 