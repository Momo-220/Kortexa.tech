'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LogoCarousel from './LogoCarousel';
import Button from './ui/Button';
import { GlobeIcon, ChatIcon } from './ui/Icons';
import { useTranslation } from '@/utils/i18n';

const Header = () => {
  const { t } = useTranslation();
  
  // Fonction utilitaire pour s'assurer que les traductions sont des chaînes
  const ensureString = (value: string | object): string => {
    if (typeof value === 'string') return value;
    return '';
  };
  
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="text-accent-500 font-semibold mb-4 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {ensureString(t('header.tagline'))}
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              dangerouslySetInnerHTML={{ __html: ensureString(t('header.title')) }}
            >
            </motion.h1>
            <motion.p 
              className="text-lg text-dark-800 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {ensureString(t('header.subtitle'))}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Button 
                href="/services" 
                variant="primary" 
                withGlow 
                icon={<GlobeIcon />} 
                iconPosition="left"
              >
                {ensureString(t('header.cta.services'))}
              </Button>
              
              <Button 
                href="/contact" 
                variant="secondary" 
                icon={<ChatIcon />} 
                iconPosition="left"
              >
                {ensureString(t('header.cta.contact'))}
              </Button>
            </motion.div>
            
            {/* Remplacé par le composant LogoCarousel plus bas */}
          </motion.div>
          
          <motion.div 
            className="md:w-5/12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              <motion.div
                className="macbook-card overflow-hidden relative z-10 w-full"
                animate={{ 
                  rotateY: [0, 5, 0],
                  rotateX: [0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 8,
                  ease: "easeInOut"
                }}
              >
                <div className="macbook-header">
                  <div className="macbook-dots">
                    <div className="macbook-dot macbook-dot-red"></div>
                    <div className="macbook-dot macbook-dot-yellow"></div>
                    <div className="macbook-dot macbook-dot-green"></div>
                  </div>
                  <div className="ml-4 text-dark-600 text-xs font-mono flex items-center">
                    <span className="text-gray-400">&lt;</span>
                    <span className="text-white font-extrabold">KORTEXA</span>
                    <span className="text-accent-500 font-black tracking-tighter">.TECH</span>
                    <span className="text-gray-400">/&gt;</span>
                  </div>
                </div>
                <div className="relative aspect-video bg-dark-200">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
                    <div className="w-20 h-20 mb-4 rounded-full bg-accent-500/20 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="#A3A3A3" strokeWidth="2"/>
                        <path d="M17.5 6.5H17.51" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2 text-dark-900">{ensureString(t('header.assistant.title'))}</h3>
                      <p className="text-dark-700 mb-4">{ensureString(t('header.assistant.subtitle'))}</p>
                      
                      <div className="mt-4 flex justify-center">
                        <div className="inline-flex h-10 overflow-hidden rounded-lg p-1 bg-dark-300/30">
                          <div className="flex items-center space-x-2 px-3 text-sm text-dark-900 bg-dark-400/20 rounded-md">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <span>{ensureString(t('header.assistant.demo'))}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Éléments décoratifs */}
              <motion.div 
                className="absolute top-[-30px] right-[-30px] w-20 h-20 rounded-full bg-accent-500/10 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
              <motion.div 
                className="absolute bottom-[-20px] left-[-20px] w-16 h-16 rounded-full bg-accent-600/10 z-0"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Composant de défilement des logos des partenaires */}
      <motion.div
        className="w-full mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <motion.div 
          className="text-center mb-6 text-dark-700 font-semibold text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {ensureString(t('header.trustedBy'))}
        </motion.div>
        <LogoCarousel />
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-dark-700 text-sm mb-2">{ensureString(t('header.discover'))}</span>
        <motion.div 
          className="w-6 h-10 border-2 border-dark-700 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-dark-700 rounded-full mt-2"
            animate={{ 
              y: [0, 15, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Header; 