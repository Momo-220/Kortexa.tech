'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/utils/i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr'); // Valeur par défaut pour le SSR

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setIsMounted(true);
    setCurrentLanguage(language);
  }, [language]);

  // Suivre les changements de langue après le montage
  useEffect(() => {
    if (isMounted) {
      setCurrentLanguage(language);
    }
  }, [language, isMounted]);

  const handleClick = () => {
    if (!isMounted) return;
    console.log('LanguageSwitcher clicked');
    toggleLanguage();
  };

  // Rendu SSR - version statique
  if (!isMounted) {
    return (
      <button
        className="flex items-center justify-center rounded-full w-12 h-10 bg-dark-300/20 text-white"
        aria-label="Changer de langue"
      >
        <span className="font-semibold text-sm">FR</span>
      </button>
    );
  }

  // Rendu côté client avec animations
  return (
    <motion.button
      onClick={handleClick}
      className="flex items-center justify-center rounded-full w-12 h-10 bg-gradient-to-r from-accent-500/20 to-accent-600/30 text-white backdrop-blur-sm hover:from-accent-500/30 hover:to-accent-600/40 border border-white/10 transition-all duration-300"
      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(120, 120, 255, 0.3)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={currentLanguage === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <span className="font-semibold text-sm">
        {currentLanguage === 'fr' ? 'EN' : 'FR'}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher; 