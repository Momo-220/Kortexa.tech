'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SplashScreen from '@/components/SplashScreen';

export default function SplashScreenPage() {
  const router = useRouter();
  const [isFinished, setIsFinished] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Gestionnaire de fin du SplashScreen
  const handleSplashFinished = () => {
    setIsFinished(true);
  };
  
  // Rediriger vers la page d'accueil une fois terminé
  useEffect(() => {
    // Si le SplashScreen est terminé, rediriger vers l'accueil après un court délai
    if (isFinished && !isRedirecting) {
      const timer = setTimeout(() => {
        setIsRedirecting(true);
        // Utiliser la méthode de navigation de Next.js
        router.push('/');
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isFinished, router, isRedirecting]);
  
  // Empêcher le défilement pendant le SplashScreen
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return <SplashScreen onFinished={handleSplashFinished} />;
} 