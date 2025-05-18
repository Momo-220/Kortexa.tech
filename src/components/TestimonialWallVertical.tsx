'use client';

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/utils/i18n';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company?: string;
  avatar?: string;
}

const TestimonialWallVertical = () => {
  const { t, language } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // État pour stocker les données de témoignages
  const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);
  // Indicateur pour vérifier si le composant est monté côté client
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  // États pour les colonnes
  const [column1, setColumn1] = useState<Testimonial[]>([]);
  const [column2, setColumn2] = useState<Testimonial[]>([]);
  const [column3, setColumn3] = useState<Testimonial[]>([]);
  const [column4, setColumn4] = useState<Testimonial[]>([]);
  
  // Initialiser les données uniquement côté client
  useEffect(() => {
    // Marquer le composant comme monté côté client
    setIsMounted(true);
    
    // Initialiser les données de témoignages
    const data: Testimonial[] = [
    {
      id: "1",
        quote: t('testimonials.items.0.quote') as string,
        name: t('testimonials.items.0.name') as string,
        company: t('testimonials.items.0.company') as string
    },
    {
      id: "2",
        quote: t('testimonials.items.1.quote') as string,
        name: t('testimonials.items.1.name') as string,
        company: t('testimonials.items.1.company') as string
    },
    {
      id: "3",
        quote: t('testimonials.items.2.quote') as string,
        name: t('testimonials.items.2.name') as string,
        company: t('testimonials.items.2.company') as string
    },
    {
      id: "4",
        quote: t('testimonials.items.3.quote') as string,
        name: t('testimonials.items.3.name') as string,
        company: t('testimonials.items.3.company') as string
    },
    {
      id: "5",
        quote: t('testimonials.items.4.quote') as string,
        name: t('testimonials.items.4.name') as string,
        company: t('testimonials.items.4.company') as string
    },
    {
      id: "6",
        quote: t('testimonials.items.5.quote') as string,
        name: t('testimonials.items.5.name') as string,
        company: t('testimonials.items.5.company') as string
    },
    {
      id: "7",
        quote: t('testimonials.items.6.quote') as string,
        name: t('testimonials.items.6.name') as string,
        company: t('testimonials.items.6.company') as string
    },
    {
      id: "8",
        quote: t('testimonials.items.7.quote') as string,
        name: t('testimonials.items.7.name') as string,
        company: t('testimonials.items.7.company') as string
    }
  ];
    
    setTestimonialData(data);

    // Organisation des données en colonnes - Limiter la duplication pour améliorer les performances
    const duplicationsNeeded = Math.min(Math.floor(30 / data.length), 4); // Limiter à 30 éléments maximum
    const duplicatedTestimonials = Array(duplicationsNeeded).fill(data).flat();
  
  // Colonnes avec décalages différents pour éviter la répétition visuelle
    setColumn1(duplicatedTestimonials);
    setColumn2([...duplicatedTestimonials.slice(3), ...duplicatedTestimonials.slice(0, 3)]);
    setColumn3([...duplicatedTestimonials.slice(5), ...duplicatedTestimonials.slice(0, 5)]);
    setColumn4([...duplicatedTestimonials.slice(2), ...duplicatedTestimonials.slice(0, 2)]);
    
  }, [t, language]);
  
  // Gestion des cartes en focus
  const [focusedCards, setFocusedCards] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    if (!isMounted || testimonialData.length === 0) return;
    
    // Sélectionner aléatoirement les cartes en focus (limité à 3 maximum pour performance)
    const newFocusedCards = new Set<string>();
    const numberOfFocusedCards = Math.min(3, testimonialData.length);
    
    while (newFocusedCards.size < numberOfFocusedCards) {
      const randomIndex = Math.floor(Math.random() * testimonialData.length);
      newFocusedCards.add(testimonialData[randomIndex].id);
    }
    
    setFocusedCards(newFocusedCards);
    
    // Rotation des cartes en focus toutes les 15 secondes (augmenté pour réduire les calculs)
    const interval = setInterval(() => {
      rotateHighlightedCards();
    }, 15000);
    
    return () => clearInterval(interval);
  }, [isMounted, testimonialData, language]);
  
  // Rotation des cartes en focus
  const rotateHighlightedCards = useCallback(() => {
    if (testimonialData.length === 0) return;
    
    const newFocusedCards = new Set<string>();
    const numberOfFocusedCards = Math.min(3, testimonialData.length);
    
    while (newFocusedCards.size < numberOfFocusedCards && testimonialData.length > 0) {
      const randomIndex = Math.floor(Math.random() * testimonialData.length);
      newFocusedCards.add(testimonialData[randomIndex].id);
    }
    
    setFocusedCards(newFocusedCards);
  }, [testimonialData]);
  
  // Générer les initiales pour les avatars - mémorisé pour éviter les recalculs
  const getInitials = useCallback((name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }, []);
  
  // Vérifier si une carte est en focus
  const isCardFocused = useCallback((id: string) => {
    return focusedCards.has(id) || hoveredCard === id;
  }, [focusedCards, hoveredCard]);
  
  // Variants d'animation pour les cartes - simplifiés pour performance
  const cardVariants = {
    hover: {
      scale: 1.05, // Réduit pour moins de calcul GPU
      zIndex: 10,
      y: -8, // Réduit pour moins de calcul GPU
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200, // Réduit pour moins de calcul
        damping: 20
      }
    }
  };
  
  // Variants pour l'entrée initiale des cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8, // Légèrement plus rapide
        ease: "easeOut"
      }
    }
  };

  // Composant pour une carte de témoignage - mémorisé pour éviter les rendus inutiles
  const TestimonialCard = memo(({ testimonial, columnIndex }: { testimonial: Testimonial, columnIndex: number }) => {
    const isFocused = isCardFocused(testimonial.id);
    const uniqueKey = `${testimonial.id}-${columnIndex}`;
    
    return (
      <motion.div
        key={uniqueKey}
        whileHover="hover"
        variants={cardVariants}
        onMouseEnter={() => setHoveredCard(testimonial.id)}
        onMouseLeave={() => setHoveredCard(null)}
        className={`
          bg-gray-900/80 border border-gray-800 rounded-2xl p-6
          w-[95%] mx-auto mb-7 relative backdrop-blur-sm 
          transition-all duration-300 ease-in-out
          ${isFocused 
            ? 'opacity-100 shadow-lg border-gray-700 shadow-accent-500/10' 
            : 'opacity-80 hover:opacity-95'}
        `}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <p className="text-gray-200 font-medium text-base leading-relaxed mb-5 italic">
              &quot;{testimonial.quote}&quot;
            </p>
          </div>
          
          <div className="flex items-center mt-auto">
            <div className="flex-shrink-0">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center 
                text-white text-sm font-bold
                ${isFocused 
                  ? 'bg-gradient-to-br from-accent-500/50 to-accent-700/50 ring-2 ring-accent-500/40' 
                  : 'bg-gradient-to-br from-gray-600 to-gray-800'}
              `}>
                {getInitials(testimonial.name)}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-white text-sm font-semibold">{testimonial.name}</p>
              {testimonial.company && (
                <p className="text-gray-400 text-xs">{testimonial.company}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  });
  
  // Assigner un nom d'affichage au composant mémorisé
  TestimonialCard.displayName = 'TestimonialCard';

  // Si le composant n'est pas encore monté côté client, afficher un placeholder
  if (!isMounted) {
    return (
      <section className="py-16 relative overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col">
          <div className="text-center mb-10">
            <div className="h-10 w-64 bg-gray-700/30 mx-auto mb-6 rounded"></div>
            <div className="h-6 w-96 bg-gray-700/30 mx-auto rounded"></div>
          </div>
          <div className="flex justify-between h-[55vh] relative">
            {[1, 2, 3, 4].map((col) => (
              <div key={col} className="relative overflow-hidden w-[24%] h-full">
                {[1, 2, 3].map((card) => (
                  <div 
                    key={`placeholder-${col}-${card}`} 
                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 w-[95%] mx-auto mb-7 h-48"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Animation constants - réduites pour plus de performance
  const animationSettings = {
    column1: {
      duration: 45, // Plus lente pour réduire les calculs
      initial: 0
    },
    column2: {
      duration: 42,
      initial: "-50%"
    },
    column3: {
      duration: 48,
      initial: 0
    },
    column4: {
      duration: 40,
      initial: "-50%"
    }
  };

  return (
    <motion.section 
      className="py-16 relative overflow-hidden flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {t('testimonials.title') as string}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('testimonials.subtitle') as string}
          </p>
        </motion.div>

        <div className="flex justify-between h-[55vh] relative">
          {/* Colonne 1 - montante */}
          <div className="relative overflow-hidden w-[24%] h-full">
            <motion.div 
              className="absolute w-full"
              initial={{ y: animationSettings.column1.initial }}
              animate={{ 
                y: ["0%", "-50%"],
                transition: {
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: animationSettings.column1.duration,
                    ease: "linear",
                    repeatDelay: 0
                  }
                }
              }}
              style={{ height: "200%" }} 
            >
              {column1.map((testimonial, index) => (
                <TestimonialCard 
                  key={`col1-${testimonial.id}-${index}`}
                  testimonial={testimonial} 
                  columnIndex={1} 
                />
              ))}
            </motion.div>
          </div>

          {/* Colonne 2 - descendante */}
          <div className="relative overflow-hidden w-[24%] h-full">
            <motion.div 
              className="absolute w-full"
              initial={{ y: animationSettings.column2.initial }}
              animate={{ 
                y: ["-50%", "0%"],
                transition: {
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: animationSettings.column2.duration,
                    ease: "linear",
                    repeatDelay: 0
                  }
                }
              }}
              style={{ height: "200%" }}
            >
              {column2.map((testimonial, index) => (
                <TestimonialCard 
                  key={`col2-${testimonial.id}-${index}`}
                  testimonial={testimonial} 
                  columnIndex={2} 
                />
              ))}
            </motion.div>
          </div>

          {/* Colonne 3 - montante */}
          <div className="relative overflow-hidden w-[24%] h-full">
            <motion.div 
              className="absolute w-full"
              initial={{ y: animationSettings.column3.initial }}
              animate={{ 
                y: ["0%", "-50%"],
                transition: {
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: animationSettings.column3.duration,
                    ease: "linear",
                    repeatDelay: 0
                  }
                }
              }}
              style={{ height: "200%" }}
            >
              {column3.map((testimonial, index) => (
                <TestimonialCard 
                  key={`col3-${testimonial.id}-${index}`}
                  testimonial={testimonial} 
                  columnIndex={3} 
                />
              ))}
            </motion.div>
          </div>
          
          {/* Colonne 4 - descendante */}
          <div className="relative overflow-hidden w-[24%] h-full">
            <motion.div 
              className="absolute w-full"
              initial={{ y: animationSettings.column4.initial }}
              animate={{ 
                y: ["-50%", "0%"],
                transition: {
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: animationSettings.column4.duration,
                    ease: "linear",
                    repeatDelay: 0
                  }
                }
              }}
              style={{ height: "200%" }}
            >
              {column4.map((testimonial, index) => (
                <TestimonialCard 
                  key={`col4-${testimonial.id}-${index}`}
                  testimonial={testimonial} 
                  columnIndex={4} 
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialWallVertical; 