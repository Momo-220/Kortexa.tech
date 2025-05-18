'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'gradient' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  className?: string;
  withGlow?: boolean;
  withArrow?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  withGlow = false,
  withArrow = false,
  ...props
}: ButtonProps) => {
  // Tailles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  // Variantes
  const variantClasses = {
    primary: 'bg-accent-500 text-white hover:bg-accent-600 border-transparent',
    secondary: 'bg-transparent border-2 border-dark-400 text-white hover:bg-dark-300/20 hover:border-accent-400',
    gradient: 'bg-gradient-to-r from-accent-400 to-accent-600 text-white border-transparent',
    outline: 'bg-transparent border-2 border-accent-500 text-accent-500 hover:bg-accent-500/10',
    ghost: 'bg-transparent text-white hover:bg-dark-300/20 border-transparent',
  };

  // Animations
  const buttonAnimations = {
    whileHover: { 
      y: -5, 
      boxShadow: withGlow 
        ? '0 10px 25px -5px rgba(99, 102, 241, 0.5)' 
        : '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      scale: 1.02,
    },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  };

  // Effet de brillance autour du bouton
  const glowEffect = withGlow && (
    <motion.div 
      className="absolute inset-0 -z-10 rounded-lg opacity-75"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.4, 0.6, 0.4],
        boxShadow: ['0 0 15px 2px rgba(99, 102, 241, 0.3)', '0 0 20px 5px rgba(99, 102, 241, 0.5)', '0 0 15px 2px rgba(99, 102, 241, 0.3)']
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: 'blur(8px)', background: variant === 'primary' || variant === 'gradient' ? 'rgba(99, 102, 241, 0.3)' : 'transparent' }}
    />
  );

  // Effet de chargement
  const loadingIndicator = isLoading && (
    <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg z-10">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
    </div>
  );

  // Construction des classes
  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center
    font-semibold rounded-lg transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-dark-900
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${isLoading ? 'cursor-wait text-transparent' : ''}
    ${className}
  `;

  // Icône à gauche ou à droite
  const iconLeft = icon && iconPosition === 'left' && (
    <span className="mr-2 inline-flex items-center">{icon}</span>
  );
  
  const iconRight = icon && iconPosition === 'right' && (
    <span className="ml-2 inline-flex items-center">{icon}</span>
  );

  // Flèche animée en option
  const arrow = withArrow && (
    <motion.svg
      className="ml-2 w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      initial={{ x: 0 }}
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        fillRule="evenodd"
        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </motion.svg>
  );

  // Le contenu du bouton
  const buttonContent = (
    <>
      {glowEffect}
      {loadingIndicator}
      {iconLeft}
      <span className="relative z-10">{children}</span>
      {iconRight}
      {arrow}
    </>
  );

  // Si un lien est fourni, renvoyer un Next.js Link
  if (href) {
    return (
      <Link 
        href={href}
        className="inline-block"
        onClick={(e) => {
          // Éviter la propagation pour empêcher les problèmes de navigation
          e.stopPropagation();
          // Si props.onClick existe, l'appeler
          if (props.onClick) {
            props.onClick(e as any);
          }
        }}
      >
        <motion.span
          className={baseClasses}
          {...buttonAnimations}
        >
          {buttonContent}
        </motion.span>
      </Link>
    );
  }

  // Sinon, renvoyer un bouton normal
  return (
    <motion.button
      className={baseClasses}
      {...buttonAnimations}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button; 