'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';
import ChatBotMounter from '@/components/ChatBotMounter';

interface ClientSideComponentsProps {
  children: React.ReactNode;
}

export default function ClientSideComponents({ children }: ClientSideComponentsProps) {
  const [isClient, setIsClient] = useState(false);

  // S'assurer que ce composant n'est rendu que côté client
  useEffect(() => {
    setIsClient(true);
    
    // Nettoyer les attributs qui causent des erreurs d'hydratation
    const cleanupGrammarly = () => {
      ['data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'].forEach(attr => {
        document.documentElement.removeAttribute(attr);
        document.body.removeAttribute(attr);
      });
    };
    
    // Exécuter plusieurs fois pour s'assurer que tous les attributs sont supprimés
    cleanupGrammarly();
    setTimeout(cleanupGrammarly, 0);
    setTimeout(cleanupGrammarly, 100);
  }, []);

  // Pendant l'hydratation, rendre seulement le contenu sans aucun composant client
  if (!isClient) {
    return (
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="pt-28 flex-grow">
          {children}
        </div>
      </div>
    );
  }

  // Une fois que nous sommes côté client, rendre tous les composants client
  return (
    <ClientWrapper>
      <ChatBotMounter />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="pt-28 flex-grow" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </ClientWrapper>
  );
} 