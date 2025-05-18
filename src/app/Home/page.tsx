'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../../components/Header';
import ServiceCard from '../../components/ServiceCard';
import TestimonialWallVertical from '../../components/TestimonialWallVertical';
import TabFeature from '../../components/TabFeature';
import AnimatedOnScroll from '../../components/AnimatedOnScroll';
import AnimatedSection from '../../components/AnimatedSection';
import Button from '../../components/ui/Button';
import SplashScreen from '../../components/SplashScreen';
import { ArrowRightIcon, LightningIcon, ChatIcon } from '../../components/ui/Icons';
import { useTranslation } from '@/utils/i18n';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Nouveaux variants pour l'animation hiérarchique
const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Variante améliorée pour une cascade plus évidente
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      delayChildren: 0.2,      // Attendre avant de commencer la cascade
      staggerChildren: 0.12    // Délai plus important entre chaque enfant
    }
  }
};

// Variante spécifique pour le hero section
const heroStaggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",  // S'assurer que le parent apparaît avant les enfants
      delayChildren: 0.3,
      staggerChildren: 0.15    // Délai plus important pour la partie hero
    }
  }
};

export default function Home() {
  const { t } = useTranslation();
  // État pour gérer l'affichage du SplashScreen
  const [showSplash, setShowSplash] = useState(true);
  
  // Fonction pour marquer la fin du SplashScreen
  const handleSplashFinished = () => {
    setShowSplash(false);
    document.body.style.overflow = '';
  };
  
  // Effect pour gérer le overflow lors du SplashScreen
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);
  
  // Fonction utilitaire pour s'assurer que les traductions sont des chaînes
  const ensureString = (value: string | object): string => {
    if (typeof value === 'string') return value;
    return '';
  };
  
  // Services data with SVG icons
  const services = [
    {
      title: ensureString(t('homepage.servicesList.conversational.title')),
      description: ensureString(t('homepage.servicesList.conversational.description')),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12H8.01M12 12H12.01M16 12H16.01" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      color: "bg-accent-500",
      link: "/services#conversational",
      index: 0
    },
    // ... autres services ...
  ].map((service, i) => ({ ...service, index: i }));

  // Stats data
  const stats = [
    { number: "98%", label: ensureString(t('homepage.stats.items.satisfaction')) },
    { number: "24/7", label: ensureString(t('homepage.stats.items.support')) },
    { number: "+200", label: ensureString(t('homepage.stats.items.projects')) },
    { number: "+50", label: ensureString(t('homepage.stats.items.experts')) }
  ];

  return (
    <>
      {/* SplashScreen autonome */}
      {showSplash && <SplashScreen onFinished={handleSplashFinished} />}
      
      {/* TabFeature */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-16 pt-28"
      >
      <TabFeature />
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-28 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        {/* Contenu identique à celui dans page.tsx */}
        {/* ... */}
      </motion.section>

      {/* Featured Project/Case Study */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        {/* Contenu identique à celui dans page.tsx */}
        {/* ... */}
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-10 bg-dark-200/30 backdrop-blur-sm relative mb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        {/* Contenu identique à celui dans page.tsx */}
        {/* ... */}
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerChildren}
        className="py-16"
      >
      <TestimonialWallVertical />
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-dark-100 to-dark-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        {/* Contenu identique à celui dans page.tsx */}
        {/* ... */}
      </motion.section>
    </>
  );
} 