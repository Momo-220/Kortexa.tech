'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToHome() {
  const router = useRouter();
  
  useEffect(() => {
    // Rediriger vers /Home
    router.push('/Home');
  }, [router]);
  
  // Afficher un écran de chargement pendant la redirection
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-dark-700">Chargement...</p>
      </div>
    </div>
  );
} 