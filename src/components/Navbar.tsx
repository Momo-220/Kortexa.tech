'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/utils/i18n';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  // Optimiser le gestionnaire de défilement avec useCallback
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    // Appliquer l'effet de défilement immédiatement
    handleScroll();
    
    // Défilement
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Fermer le menu au changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Navigation items
  const navigation = [
    { name: t('nav.home') as string, href: '/Home' },
    { name: t('nav.services') as string, href: '/services' },
    { name: t('nav.about') as string, href: '/about' },
    { name: t('nav.projects') as string, href: '/projets' },
    { name: t('nav.blog') as string, href: '/blog' },
    { name: t('nav.contact') as string, href: '/contact' },
  ];

  // Obtenir le texte pour le bouton de contact
  const contactButtonText = t('nav.contactUs') as string;

  return (
    <div className="fixed w-full z-50 flex justify-center px-4 pt-4">
      <header 
        className={`w-full max-w-7xl rounded-2xl border border-dark-300/20 transition-all ${
          scrolled 
            ? 'bg-dark-100/80 backdrop-blur-xl py-3' 
            : 'bg-dark-200/40 backdrop-blur-md py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link
                href="/Home"
                className="flex items-center space-x-2"
                passHref
                legacyBehavior={false}
              >
                <Logo textSize="md" />
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              <div className="flex relative bg-dark-300/20 rounded-xl p-1">
                {navigation.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    passHref
                    legacyBehavior={false}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center justify-center ${
                      pathname === item.href
                        ? 'text-white bg-dark-400/50'
                        : 'text-dark-700 hover:text-white hover:bg-dark-300/30'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center space-x-3 ml-4">
                {/* Sélecteur de langue */}
                <LanguageSwitcher />
                
                {/* Bouton Contact */}
                <Link 
                  href="/contact" 
                  passHref
                  legacyBehavior={false}
                  className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-accent-400 to-accent-600 text-white rounded-lg hover:-translate-y-1 transition-transform inline-flex items-center"
                >
                  <span className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {contactButtonText}
                  </span>
                </Link>
              </div>
            </nav>

            {/* Menu mobile */}
            <div className="flex items-center space-x-3 md:hidden">
              {/* Sélecteur de langue mobile */}
              <LanguageSwitcher />
              
              <button 
                className="text-dark-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-dark-300/20"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu principal"
                aria-expanded={isOpen}
              >
                <div className="w-6 h-6 relative flex items-center justify-center">
                  <span 
                    className={`absolute h-0.5 w-5 transform transition-all duration-300 bg-white ${
                      isOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`}
                  />
                  <span 
                    className={`absolute h-0.5 w-5 transform transition-all duration-300 bg-white ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span 
                    className={`absolute h-0.5 w-5 transform transition-all duration-300 bg-white ${
                      isOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      
        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden px-4 pt-2 pb-4">
            <div className="border border-dark-300/20 rounded-xl bg-dark-200/90 backdrop-blur-xl shadow-lg p-2">
              <nav className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    passHref
                    legacyBehavior={false}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors block ${
                      pathname === item.href
                        ? 'text-white bg-gradient-to-r from-accent-500 to-accent-600'
                        : 'text-dark-700 hover:text-white hover:bg-dark-300/30'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="pt-2 pb-1">
                <Link 
                  href="/contact" 
                  passHref
                  legacyBehavior={false}
                  className="w-full px-4 py-3 text-sm font-medium bg-gradient-to-r from-accent-400 to-accent-600 text-white rounded-lg flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {contactButtonText}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar; 