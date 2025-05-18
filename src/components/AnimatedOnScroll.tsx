'use client';

import React, { ReactNode, memo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

// Types d'animation disponibles (liste réduite aux plus utiles et performantes)
export type AnimationType = 
  | 'fadeIn' 
  | 'fadeInUp' 
  | 'fadeInDown' 
  | 'fadeInLeft' 
  | 'fadeInRight'
  | 'zoomIn';

interface AnimatedOnScrollProps {
  children: ReactNode;
  type: AnimationType;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean; // Option pour désactiver l'animation (utile en mode économie de batterie)
}

// Définitions des variantes d'animation optimisées
const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (params: { duration: number, delay: number }) => ({ 
      opacity: 1,
      transition: { duration: params.duration, delay: params.delay } 
    })
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 }, // Réduit à 20px pour des animations plus subtiles
    visible: (params: { duration: number, delay: number }) => ({ 
      opacity: 1, 
      y: 0,
      transition: { duration: params.duration, delay: params.delay } 
    })
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: (params: { duration: number, delay: number }) => ({ 
      opacity: 1, 
      y: 0,
      transition: { duration: params.duration, delay: params.delay } 
    })
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: (params: { duration: number, delay: number }) => ({ 
      opacity: 1, 
      x: 0,
      transition: { duration: params.duration, delay: params.delay } 
    })
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: (params: { duration: number, delay: number }) => ({ 
      opacity: 1, 
      x: 0,
      transition: { duration: params.duration, delay: params.delay } 
    })
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 }, // Moins extrême pour de meilleures performances
    visible: (params: { duration: number, delay: number }) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { duration: params.duration, delay: params.delay } 
    })
  }
};

// Composant mémorisé pour éviter les rendus inutiles
const AnimatedOnScroll = memo(({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.5, // Légèrement plus rapide par défaut
  amount = 0.1, // Réduit à 0.1 pour déclencher l'animation plus tôt
  once = true,
  className = '',
  style = {},
  disabled = false
}: AnimatedOnScrollProps) => {
  // Si les animations sont désactivées, ne pas utiliser framer-motion
  if (disabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Utiliser LazyMotion pour charger les fonctionnalités d'animation uniquement si nécessaire
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className={className}
        style={style}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={animationVariants[type]}
        custom={{ duration, delay }}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
});

// Définir un nom pour le composant mémorisé (utile pour le débogage)
AnimatedOnScroll.displayName = 'AnimatedOnScroll';

export default AnimatedOnScroll; 