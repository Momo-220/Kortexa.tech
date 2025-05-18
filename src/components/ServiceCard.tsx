'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SVGProps, useId } from 'react';
import { ArrowRightIcon } from './ui/Icons';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
  index: number;
}

// Composant pour afficher l'icône SVG sans utiliser dangerouslySetInnerHTML
const IconSVG: React.FC<{ iconSvg: string; className?: string }> = ({ iconSvg, className }) => {
  // Utiliser un ID unique pour éviter les conflits d'hydratation
  const id = useId();
  
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path 
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ServiceCard = ({ title, description, icon, color, link, index }: ServiceCardProps) => {
  return (
    <Link 
      href={link} 
      passHref 
      legacyBehavior={false}
      data-testid={`service-card-${index}`}
      aria-label={`En savoir plus sur ${title}`}
    >
      <motion.div
        className="macbook-card h-full flex flex-col shadow-xl cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
        whileHover={{ 
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
          <div className="ml-4 text-dark-600 text-xs">{title}.app</div>
        </div>
        <div className="macbook-window flex-grow flex flex-col bg-dark-200/50">
          <div className="p-8 flex-grow flex flex-col">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${color} bg-opacity-20`}>
              {/* Icône simplifiée qui évite les problèmes d'hydratation */}
              <svg className="w-8 h-8 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {index === 0 && (
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                )}
                {index === 1 && (
                  <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                )}
                {index === 2 && (
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                )}
                {index === 3 && (
                  <>
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </>
                )}
                {index === 4 && (
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                )}
                {index === 5 && (
                  <>
                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 16.4299C16.1357 15.5256 14.6331 15 13 15C11.3669 15 9.86429 15.5256 9 16.4299" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </>
                )}
                {index === 6 && (
                  <path d="M12 2L14.5 6.5H9.5L12 2Z M12 22L14.5 17.5H9.5L12 22Z M2 12L6.5 9.5V14.5L2 12Z M22 12L17.5 9.5V14.5L22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                )}
                {index === 7 && (
                  <path d="M5 12.7C5 9.3 7.6 6.7 11 6.7C11.4 6.7 11.8 6.8 12.2 6.8C12.6 6.8 13 6.7 13.4 6.7C16.8 6.7 19.4 9.3 19.4 12.7C19.4 16.1 16.8 18.7 13.4 18.7C13 18.7 12.6 18.6 12.2 18.6C11.8 18.6 11.4 18.7 11 18.7C7.6 18.7 5 16.1 5 12.7Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
                )}
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
            <p className="text-gray-300 mb-8 flex-grow text-base leading-relaxed">{description}</p>
            
            <div className="mt-auto">
              <div className="inline-flex items-center text-accent-500 hover:text-accent-400 font-medium transition-colors">
                <span>En savoir plus</span>
                <ArrowRightIcon size={18} className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServiceCard; 