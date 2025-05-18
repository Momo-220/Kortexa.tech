'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/utils/i18n';

interface TabFeatureProps {
  customTitle?: string;
  customMainTitle?: string;
  customDescription?: string;
  customPrimaryButtonText?: string;
  customSecondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
}

const TabFeature = ({
  customTitle,
  customMainTitle,
  customDescription,
  customPrimaryButtonText,
  customSecondaryButtonText,
  primaryButtonHref = "/services",
  secondaryButtonHref = "/contact",
}: TabFeatureProps) => {
  const { t, language, ready } = useTranslation();
  
  // États pour stocker les valeurs côté client uniquement
  const [title, setTitle] = useState<string>('');
  const [mainTitle, setMainTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [primaryButtonText, setPrimaryButtonText] = useState<string>('');
  const [secondaryButtonText, setSecondaryButtonText] = useState<string>('');
  
  // Indicateur pour vérifier si le composant est monté côté client
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Initialiser les valeurs par défaut (fallback)
  const defaultTexts = {
    title: 'Intelligence Artificielle de Nouvelle Génération',
    mainTitle: 'Transformez votre entreprise avec l\'IA avancée',
    description: 'Kortexa.tech développe des solutions d\'intelligence artificielle sur mesure pour optimiser vos processus, analyser vos données et stimuler votre innovation.',
    primaryButtonText: 'Découvrir nos services',
    secondaryButtonText: 'Contacter nos experts'
  };

  // Initialiser les valeurs uniquement côté client pour éviter les erreurs d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mettre à jour les textes quand la langue change
  useEffect(() => {
    if (!isMounted) return;
    
    // Fonction pour obtenir une traduction avec fallback
    const getTranslation = (key: string, fallback: string): string => {
      try {
        // S'assurer que la traduction est une chaîne de caractères
        const translation = t(key);
        return typeof translation === 'string' ? translation : fallback;
      } catch (e) {
        console.warn(`Error getting translation for: ${key}`, e);
        return fallback;
      }
    };
    
    // Mettre à jour les textes avec les traductions ou valeurs par défaut
    setTitle(customTitle || getTranslation('homepage.tabFeature.title', defaultTexts.title));
    setMainTitle(customMainTitle || getTranslation('homepage.tabFeature.mainTitle', defaultTexts.mainTitle));
    setDescription(customDescription || getTranslation('homepage.tabFeature.description', defaultTexts.description));
    setPrimaryButtonText(customPrimaryButtonText || getTranslation('homepage.tabFeature.primaryButtonText', defaultTexts.primaryButtonText));
    setSecondaryButtonText(customSecondaryButtonText || getTranslation('homepage.tabFeature.secondaryButtonText', defaultTexts.secondaryButtonText));
    
    // Debug pour voir ce que contiennent vraiment les traductions
    if (process.env.NODE_ENV === 'development') {
      console.debug('[TabFeature] Translations:', {
        title: getTranslation('homepage.tabFeature.title', defaultTexts.title),
        mainTitle: getTranslation('homepage.tabFeature.mainTitle', defaultTexts.mainTitle),
        language,
        ready
      });
    }
  }, [t, language, isMounted, ready, customTitle, customMainTitle, customDescription, customPrimaryButtonText, customSecondaryButtonText]);

  // Ne pas rendre les éléments dynamiques côté serveur
  if (!isMounted) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="h-8 w-48 bg-gray-700/30 mx-auto mb-5 rounded"></div>
        <div className="h-16 w-3/4 bg-gray-700/30 mx-auto mb-8 rounded"></div>
        <div className="h-24 w-2/3 bg-gray-700/30 mx-auto rounded"></div>
      </div>
    );
  }

  return (
    <div>
      {/* En-tête centré avec le titre et la description */}
      <div className="max-w-5xl mx-auto px-6 py-32 text-center">
        <motion.p 
          className="text-indigo-300 text-xl mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.p>
        
        <motion.h1 
          className="text-6xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto mb-8 text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {mainTitle}
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
      {/* Zone avec dégradé et contenu */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Fond avec dégradé */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/30 via-purple-900/40 to-pink-600/30 rounded-3xl"></div>

          <div className="relative p-8 md:py-16 md:px-20 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Colonne gauche avec les boutons */}
              <div className="lg:col-span-2 self-center">
                <div className="flex flex-col md:flex-row lg:flex-col gap-6 justify-center lg:justify-start">
                  <Link
                    href={primaryButtonHref}
                    className="bg-gray-600/30 hover:bg-gray-600/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg flex items-center justify-center lg:justify-start transition-all border border-white/10"
                  >
                    <span className="flex items-center">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.6001 8.99989H20.4001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.6001 15H20.4001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.5002 3C9.8155 5.69961 8.92822 8.81787 8.92822 12C8.92822 15.1821 9.8155 18.3004 11.5002 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.5 3C14.1847 5.69961 15.072 8.81787 15.072 12C15.072 15.1821 14.1847 18.3004 12.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {primaryButtonText}
                    </span>
                  </Link>
                  
                  <Link
                    href={secondaryButtonHref}
                    className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl text-lg flex items-center justify-center lg:justify-start transition-all"
                  >
                    <span className="flex items-center">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {secondaryButtonText}
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Colonne droite avec l'image */}
              <div className="lg:col-span-3">
                <div className="rounded-xl overflow-hidden shadow-2xl bg-[#0e141b]/90 backdrop-blur-sm h-full">
                  <div className="bg-[#161b22] px-3 py-2 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-2 text-xs text-gray-400">{'>'} KORTEXA.TECH{'/'}</div>
                  </div>
                  
                  {/* Image remplaçant le placeholder */}
                  <div className="bg-[#0d1117] h-[350px] overflow-hidden relative">
                    <Image
                      src="/images/team-3.jpg"
                      alt="Tableau de bord IA Kortexa"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TabFeature; 