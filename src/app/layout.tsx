import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientSideComponents from '@/components/ClientSideComponents';

// Optimisation de la police avec préchargement et affichage de swap
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {/* Préchargement des ressources critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Métadonnées pour le SEO */}
        <title>KORTEXA - Solutions d'Intelligence Artificielle</title>
        <meta name="description" content="Solutions IA de pointe pour optimiser vos processus, analyser vos données et créer des expériences utilisateur exceptionnelles." />
        <meta name="keywords" content="intelligence artificielle, IA, machine learning, deep learning, NLP, vision par ordinateur" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className={inter.className}>
          {/* Conteneur statique pour le chatbot */}
          <div id="chatbot-container" className="chatbot-container"></div>
          
          {/* Composant client pour encapsuler tout le contenu dynamique */}
          <ClientSideComponents>
            {children}
          </ClientSideComponents>
        </div>
      </body>
    </html>
  );
} 