'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Partner {
  name: string;
  logo: string;
}

// Liste des partenaires avec leurs logos
const partners: Partner[] = [
  { name: 'Google', logo: '/logos/google.jpg' },
  { name: 'Microsoft', logo: '/logos/microsoft.jpg' },
  { name: 'IBM', logo: '/logos/ibm.jpg' },
  { name: 'Tesla', logo: '/logos/tesla.jpg' },
  { name: 'Amazon', logo: '/logos/amazon.jpg' },
  { name: 'Apple', logo: '/logos/apple.jpg' },
  { name: 'Meta', logo: '/logos/meta.jpg' },
  { name: 'Oracle', logo: '/logos/oracle.jpg' },
  { name: 'Samsung', logo: '/logos/samsung.jpg' },
  { name: 'Intel', logo: '/logos/intel.jpg' },
  { name: 'Nvidia', logo: '/logos/nvidia.jpg' },
  { name: 'Salesforce', logo: '/logos/salesforce.jpg' },
];

// Pour le moment, on utilise les logos que nous avons créés
const logosWithImages = ['Google', 'Microsoft', 'IBM', 'Tesla', 'Amazon'];

export const LogoCarousel = () => {
  // Pour gérer la réactivité sur mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Vérifier la taille initiale
    handleResize();
    
    // Mettre à jour sur redimensionnement
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Créer une double liste pour le défilement infini
  const doubledPartners = [...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden py-12 bg-dark-100/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-dark-100/80 via-transparent to-dark-100/80 z-10" />
      <motion.div
        className="flex items-center"
        animate={{
          x: isMobile ? [0, -1500] : [0, -2000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear"
          }
        }}
      >
        {doubledPartners.map((partner, index) => (
          <div 
            key={`${partner.name}-${index}`}
            className="mx-10 flex-shrink-0 flex items-center justify-center"
          >
            <div className="relative h-20 w-48 flex items-center justify-center">
              {logosWithImages.includes(partner.name) ? (
                // Utiliser Image pour les partenaires avec image
                (<Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />)
              ) : (
                // Fallback pour les partenaires sans image
                (<div className="text-dark-700 font-semibold text-xl">
                  {partner.name}
                </div>)
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel; 