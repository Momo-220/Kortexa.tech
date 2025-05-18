'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  textSize?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
}

const Logo = ({ className = '', textSize = 'md', darkMode = false }: LogoProps) => {
  const [glowEffect, setGlowEffect] = useState(false);
  
  useEffect(() => {
    // Active le glow effect après un délai pour l'effet initial
    const timer = setTimeout(() => {
      setGlowEffect(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Déterminer la taille du texte
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };
  
  return (
    <motion.div 
      className={`font-bold ${textSizeClasses[textSize]} text-white flex items-center ${className} relative cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Effet de lueur derrière le logo */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 blur-md rounded-full bg-accent-500/30 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3], 
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      <div className="font-mono tracking-tight flex items-center">
        <motion.span 
          className="text-gray-400"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >&lt;</motion.span>
        
        <motion.span 
          className="text-white font-extrabold"
          animate={glowEffect ? {
            textShadow: ["0 0 2px rgba(255,255,255,0.3)", "0 0 5px rgba(255,255,255,0.5)", "0 0 2px rgba(255,255,255,0.3)"],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          KORTEXA
        </motion.span>
        
        <motion.span 
          className="text-accent-500 font-black tracking-tighter"
          animate={glowEffect ? {
            textShadow: ["0 0 3px rgba(99,102,241,0.3)", "0 0 8px rgba(99,102,241,0.7)", "0 0 3px rgba(99,102,241,0.3)"],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          .TECH
        </motion.span>
        
        <motion.span 
          className="text-gray-400"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >/&gt;</motion.span>
      </div>
    </motion.div>
  );
};

export default Logo; 