'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Logo from './Logo';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  useEffect(() => {
    // Durée totale du splash screen en ms (réduite pour accélérer)
    const duration = 2000;
    startTimeRef.current = performance.now();
    
    // Fonction d'animation utilisant requestAnimationFrame pour plus de fluidité
    const updateProgress = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(newProgress);
      
      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(updateProgress);
      } else {
        // Attendre un peu après avoir atteint 100% avant de disparaître
        setTimeout(onFinished, 300); // Réduit de 500ms à 300ms pour accélérer
      }
    };
    
    // Démarrer l'animation
    animationRef.current = requestAnimationFrame(updateProgress);
    
    // Nettoyage à la désinstallation du composant
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onFinished]);

  // Variants pour optimiser les animations avec Framer Motion
  const containerVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const circleVariants = {
    rotate360: {
      rotate: 360,
      transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
    },
    rotateNeg360: {
      rotate: -360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    rotate180: {
      rotate: 180,
      transition: { duration: 3, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50"
      variants={containerVariants}
      initial="visible"
      animate={progress === 100 ? "hidden" : "visible"}
    >
      <div className="relative flex items-center justify-center">
        {/* Logo au centre avec hardware acceleration */}
        <div className="z-10 transform scale-150 will-change-transform">
          <Logo textSize="lg" />
        </div>
        
        {/* Cercle de chargement avec animation - utilisation de will-change pour hardware acceleration */}
        <motion.div
          className="absolute rounded-full border-transparent will-change-transform"
          style={{
            width: '320px',
            height: '320px',
            borderTopColor: '#6366F1', // Couleur accent
            borderLeftColor: '#6366F1',
            opacity: 0.7,
            borderWidth: '6px'
          }}
          variants={circleVariants}
          animate="rotate360"
        />
        
        {/* Un deuxième cercle avec rotation inverse */}
        <motion.div
          className="absolute rounded-full border-transparent will-change-transform"
          style={{
            width: '384px',
            height: '384px',
            borderRightColor: '#06B6D4', // Couleur secondaire
            borderBottomColor: '#06B6D4',
            opacity: 0.7,
            borderWidth: '6px'
          }}
          variants={circleVariants}
          animate="rotateNeg360"
        />
        
        {/* Un troisième cercle avec rotation plus lente */}
        <motion.div
          className="absolute rounded-full border-transparent will-change-transform"
          style={{
            width: '448px',
            height: '448px',
            borderTopColor: '#F43F5E', // Rose
            borderRightColor: '#F43F5E',
            opacity: 0.5,
            borderWidth: '4px'
          }}
          variants={circleVariants}
          animate="rotate180"
        />
        
        {/* Indicateur de progression circulaire */}
        <svg className="absolute will-change-transform" style={{ width: '416px', height: '416px' }} viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#6366F1"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{
              strokeDasharray: "1 1000",
              transformOrigin: "center",
              transform: "rotate(-90deg)",
              opacity: 0.8
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default SplashScreen; 