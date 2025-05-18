'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';
import { useTranslation } from '@/utils/i18n';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  // Fonction utilitaire pour s'assurer que les traductions sont des chaînes
  const ensureString = (value: string | object): string => {
    if (typeof value === 'string') return value;
    return '';
  };
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const footerLinks = {
    company: [
      { name: ensureString(t('footer.about')), href: '/about' },
      { name: ensureString(t('footer.values')), href: '/about#values' },
      { name: ensureString(t('footer.careers')), href: '/careers' },
      { name: ensureString(t('footer.partners')), href: '/partners' },
    ],
    services: [
      { name: ensureString(t('footer.conversationalAI')), href: '/services#conversational' },
      { name: ensureString(t('footer.automation')), href: '/services#automation' },
      { name: ensureString(t('footer.dataAnalysis')), href: '/services#data-analysis' },
      { name: ensureString(t('footer.customSolutions')), href: '/services#custom' },
    ],
    resources: [
      { name: ensureString(t('footer.blog')), href: '/blog' },
      { name: ensureString(t('footer.documentation')), href: '/docs' },
      { name: ensureString(t('footer.projects')), href: '/projets' },
      { name: ensureString(t('footer.api')), href: '/api' },
    ],
    legal: [
      { name: ensureString(t('footer.legalNotice')), href: '/legal' },
      { name: ensureString(t('footer.privacyPolicy')), href: '/privacy' },
      { name: ensureString(t('footer.termsOfUse')), href: '/terms' },
    ]
  };
  
  const socialLinks = [
    { 
      name: 'LinkedIn',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
      href: 'https://linkedin.com',
    },
    { 
      name: 'Twitter',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.035 10.035 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" /></svg>,
      href: 'https://twitter.com',
    },
    { 
      name: 'GitHub',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>,
      href: 'https://github.com',
    },
    { 
      name: 'YouTube',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>,
      href: 'https://youtube.com',
    }
  ];

  // Fonction sécurisée pour remplacer dans les chaînes de traduction
  const safeReplace = (input: string | object, searchValue: string | RegExp, replaceValue: string): string => {
    if (typeof input !== 'string') return '';
    return input.replace(searchValue, replaceValue);
  };

  return (
    <motion.footer 
      className="bg-dark-100/60 backdrop-blur-lg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto pt-12 pb-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Info */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="mb-6">
              <Logo textSize="md" />
            </div>
            
            <p className="text-dark-600 mb-6">
              {ensureString(t('footer.description'))}
            </p>
            
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-600 hover:text-accent-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="text-dark-600 text-sm">
              <p>{safeReplace(t('footer.copyright'), '{year}', currentYear.toString())}</p>
            </div>
          </motion.div>
          
          {/* Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-dark-900 mb-4">{ensureString(t('footer.company'))}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-600 hover:text-accent-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-dark-900 mb-4">{ensureString(t('footer.services'))}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-600 hover:text-accent-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-dark-900 mb-4">{ensureString(t('footer.resources'))}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-600 hover:text-accent-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold text-dark-900 mt-8 mb-4">{ensureString(t('footer.legal'))}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-600 hover:text-accent-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Newsletter */}
        <motion.div 
          variants={fadeInUp} 
          className="mt-12 pt-8 border-t border-dark-300/30"
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-dark-900 mb-3">{ensureString(t('footer.newsletter.title'))}</h3>
            <p className="text-dark-600 mb-6">
              {ensureString(t('footer.newsletter.description'))}
            </p>
            
            <form className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder={ensureString(t('footer.newsletter.placeholder'))}
                className="flex-grow px-4 py-3 rounded-l-lg bg-dark-200/50 border border-dark-300/30 text-dark-800 focus:outline-none focus:ring-1 focus:ring-accent-500"
              />
              <motion.button
                type="submit"
                className="px-5 py-3 bg-accent-500 text-dark-900 rounded-r-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {ensureString(t('footer.newsletter.button'))}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 