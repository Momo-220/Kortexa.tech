'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import TestimonialWallVertical from '../components/TestimonialWallVertical';
import TabFeature from '../components/TabFeature';
import AnimatedOnScroll from '../components/AnimatedOnScroll';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/ui/Button';
import SplashScreen from '../components/SplashScreen';
import { ArrowRightIcon, LightningIcon, ChatIcon } from '../components/ui/Icons';
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
    {
      title: ensureString(t('homepage.servicesList.dataAnalysis.title')),
      description: ensureString(t('homepage.servicesList.dataAnalysis.description')),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      color: "bg-dark-500",
      link: "/services#data-analysis",
      index: 1
    },
    {
      title: ensureString(t('homepage.servicesList.automation.title')),
      description: ensureString(t('homepage.servicesList.automation.description')),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      color: "bg-accent-600",
      link: "/services#automation",
      index: 2
    },
    {
      title: ensureString(t('homepage.servicesList.vision.title')),
      description: ensureString(t('homepage.servicesList.vision.description')),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      color: "bg-dark-700",
      link: "/services#vision",
      index: 3
    },
    {
      title: ensureString(t('homepage.servicesList.nlp.title')),
      description: ensureString(t('homepage.servicesList.nlp.description')),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      color: "bg-accent-400",
      link: "/services#nlp",
      index: 4
    },
    {
      title: ensureString(t('homepage.servicesList.recommendation.title')),
      description: ensureString(t('homepage.servicesList.recommendation.description')),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 16.4299C16.1357 15.5256 14.6331 15 13 15C11.3669 15 9.86429 15.5256 9 16.4299" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      color: "bg-dark-400",
      link: "/services#recommendation",
      index: 5
    },
    {
      title: ensureString(t('homepage.servicesList.generative.title')),
      description: ensureString(t('homepage.servicesList.generative.description')),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.50024 3H5.5C4.11929 3 3 4.11929 3 5.5V10M9.50024 3C9.74056 3 9.87072 3 9.99261 3.01092C11.1363 3.08875 12.0449 3.9973 12.1227 5.14099C12.1336 5.26288 12.1336 5.39305 12.1336 5.63336M9.50024 3H12.1336M12.1336 5.63336V10M12.1336 5.63336H3M20.5 14H14.5002M20.5 14C20.7403 14 20.8705 14 20.9923 14.0109C22.1361 14.0888 23.0446 14.9973 23.1225 16.141C23.1334 16.2629 23.1334 16.3931 23.1334 16.6334M20.5 14V16.6334M3 10V16.6334M3.00001 14H9M3 16.6334C3 16.8737 3 17.0039 3.01092 17.1258C3.08875 18.2695 3.9973 19.178 5.14099 19.2558C5.26288 19.2667 5.39304 19.2667 5.63336 19.2667M3 16.6334H5.63336M14.5002 14V16.6334M14.5002 14C14.2599 14 14.1297 14 14.0078 14.0109C12.864 14.0888 11.9555 14.9973 11.8776 16.141C11.8667 16.2629 11.8667 16.3931 11.8667 16.6334M23.1334 16.6334V18.5C23.1334 19.8807 22.0141 21 20.6334 21H18.7667M23.1334 16.6334H20.5M11.8667 16.6334V18.5C11.8667 19.8807 10.7474 21 9.36669 21H5.63336M11.8667 16.6334H14.5002M5.63336 19.2667V21M5.63336 19.2667H9.36669" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      color: "bg-accent-700",
      link: "/services#generative",
      index: 6
    },
    {
      title: ensureString(t('homepage.servicesList.iot.title')),
      description: ensureString(t('homepage.servicesList.iot.description')),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.7C5 9.3 7.6 6.7 11 6.7C11.4 6.7 11.8 6.8 12.2 6.8C12.6 6.8 13 6.7 13.4 6.7C16.8 6.7 19.4 9.3 19.4 12.7C19.4 16.1 16.8 18.7 13.4 18.7C13 18.7 12.6 18.6 12.2 18.6C11.8 18.6 11.4 18.7 11 18.7C7.6 18.7 5 16.1 5 12.7Z" stroke="#A3A3A3" stroke-width="1.5" stroke-miterlimit="10"/><path d="M10.4 3L13.6 6.2" stroke="#A3A3A3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6 3L10.4 6.2" stroke="#A3A3A3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.9 19.1L8.1 22.3" stroke="#A3A3A3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.1 19.1L4.9 22.3" stroke="#A3A3A3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.1 19.1L15.9 22.3" stroke="#A3A3A3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.9 19.1L19.1 22.3" stroke="#A3A3A3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      color: "bg-dark-600",
      link: "/services#iot",
      index: 7
    }
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
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <motion.span variants={fadeInUp} className="text-accent-500 text-xl font-semibold mb-6 block">
              {ensureString(t('homepage.services.sectionTitle'))}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-8 text-white">
              {ensureString(t('homepage.services.mainTitle'))}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-center text-gray-300 max-w-4xl mx-auto text-lg">
              {ensureString(t('homepage.services.description'))}
            </motion.p>
          </motion.div>

          {/* Première rangée de services - délai initial plus court */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10"
            variants={staggerChildren}
          >
            {services.slice(0, 4).map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
              <ServiceCard 
                title={service.title}
                description={service.description}
                icon={service.icon}
                color={service.color}
                link={service.link}
                index={index}
              />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Deuxième rangée de services - avec délai supplémentaire */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16"
            variants={staggerChildren}
          >
            {services.slice(4).map((service, index) => (
              <motion.div key={index + 4} variants={fadeInUp}>
              <ServiceCard 
                key={index + 4}
                title={service.title}
                description={service.description}
                icon={service.icon}
                color={service.color}
                link={service.link}
                index={index + 4}
              />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <Link 
              href="/services"
              passHref
              legacyBehavior={false}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-accent-500 hover:bg-accent-600 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {ensureString(t('homepage.services.allServices'))}
              <ArrowRightIcon className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Project/Case Study */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <motion.span variants={fadeInUp} className="text-accent-500 font-semibold mb-4 block">{ensureString(t('homepage.caseStudy.sectionTitle'))}</motion.span>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-dark-900">{ensureString(t('homepage.caseStudy.title'))}</motion.h2>
              <motion.p variants={fadeInUp} className="text-dark-600 mb-6">
                {ensureString(t('homepage.caseStudy.description'))}
              </motion.p>
              
              <motion.div className="space-y-4 mb-8" variants={staggerChildren}>
                <motion.div className="flex items-start" variants={fadeInUp}>
                  <svg className="w-5 h-5 text-accent-500 mt-1 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-dark-800">{ensureString(t('homepage.caseStudy.benefits.cost'))}</p>
                </motion.div>
                <motion.div className="flex items-start" variants={fadeInUp}>
                  <svg className="w-5 h-5 text-accent-500 mt-1 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-dark-800">{ensureString(t('homepage.caseStudy.benefits.research'))}</p>
                </motion.div>
                <motion.div className="flex items-start" variants={fadeInUp}>
                  <svg className="w-5 h-5 text-accent-500 mt-1 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-dark-800">{ensureString(t('homepage.caseStudy.benefits.prediction'))}</p>
                </motion.div>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <Link 
                  href="/projets"
                  passHref
                  legacyBehavior={false}
                  className="inline-flex items-center px-6 py-3 border-2 border-accent-500 text-accent-500 font-medium rounded-lg hover:bg-accent-500/10 transition-colors"
                >
                  <span>{ensureString(t('homepage.caseStudy.cta'))}</span>
                  <svg
                    className="ml-2 w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeInRight} className="relative">
              <motion.div 
                className="macbook-card overflow-hidden"
                whileHover={{ 
                  rotateY: 5,
                  rotateX: -5,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="macbook-header">
                  <div className="macbook-dots">
                    <div className="macbook-dot macbook-dot-red"></div>
                    <div className="macbook-dot macbook-dot-yellow"></div>
                    <div className="macbook-dot macbook-dot-green"></div>
                  </div>
                  <div className="ml-4 text-dark-600 text-xs">pharma-analytics.kortexa.tech</div>
                </div>
                <div className="p-8 bg-dark-200">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-dark-300 flex items-center justify-center">
                    <svg className="w-16 h-16 text-accent-500/50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 12L10 16.3301V7.66987L16 12Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <div className="w-1/2 h-10 bg-dark-300 rounded-md"></div>
                    <div className="w-1/2 h-10 bg-dark-300 rounded-md"></div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="h-24 bg-dark-300 rounded-md"></div>
                    <div className="h-24 bg-dark-300 rounded-md"></div>
                    <div className="h-24 bg-dark-300 rounded-md"></div>
                    <div className="h-24 bg-dark-300 rounded-md"></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-10 -right-10 w-20 h-20 bg-accent-500/10 rounded-full z-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-accent-600/10 rounded-full z-0"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-10 bg-dark-200/30 backdrop-blur-sm relative mb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="mb-8 text-center" variants={fadeInUp}>
            <motion.span variants={fadeInUp} className="text-accent-500 font-semibold mb-4 block">
              {ensureString(t('homepage.stats.sectionTitle'))}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-dark-900">
              {ensureString(t('homepage.stats.title'))}
            </motion.h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto"
            variants={staggerChildren}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-accent-500 mb-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 10, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <motion.div variants={fadeIn} className="text-dark-700">{stat.label}</motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
        <div className="container mx-auto px-4 text-center">
          <motion.div className="max-w-3xl mx-auto" variants={fadeInUp}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-dark-900" dangerouslySetInnerHTML={{ __html: ensureString(t('homepage.cta.title')) }}>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-dark-800 mb-8">
              {ensureString(t('homepage.cta.description'))}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link 
                href="/contact"
                passHref
                legacyBehavior={false}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-accent-400 to-accent-600 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <ChatIcon className="mr-2" />
                {ensureString(t('homepage.cta.button'))}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
} 