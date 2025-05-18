'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  once = true,
  amount = 0.2
}) => {
  // Animation en cascade des éléments enfants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay
      }
    }
  };

  // Animation par défaut pour chaque enfant
  // Ces enfants doivent avoir leur propre variants={childVariants}
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
    >
      {React.Children.map(children, (child) => {
        // Si l'enfant est un élément React valide, on lui ajoute les variants
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            variants: childVariants,
            // Préserver les variants existants s'ils sont définis
            ...(child.props.variants ? {} : { variants: childVariants })
          });
        }
        return child;
      })}
    </motion.div>
  );
};

export default AnimatedSection; 