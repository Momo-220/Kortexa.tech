'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company?: string;
  avatar?: string;
}

const TestimonialWall = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Données des témoignages - Doublons pour avoir plus d'éléments pour l'animation
  const testimonialData: Testimonial[] = [
    {
      id: "1",
      quote: "Kortexa.tech a transformé notre approche de l'analyse de données. Leur IA a identifié des tendances que nous n'aurions jamais découvertes.",
      name: "Sophie Leclerc",
      company: "InnoTech Solutions"
    },
    {
      id: "2",
      quote: "Après plusieurs recommandations, j'ai finalement fait appel à Kortexa. C'est absolument incroyable. Si vous aimez l'innovation, vous serez conquis.",
      name: "Thomas Dubois",
      company: "Groupe Nexum"
    },
    {
      id: "3",
      quote: "Kortexa.tech est à la pointe de l'innovation. Je tape 'Tab' plus souvent que n'importe quoi d'autre maintenant !",
      name: "Julie Moreau",
      company: "DataFlow Inc"
    },
    {
      id: "4",
      quote: "Leur système d'IA est le meilleur sur le marché. La base de code fonctionnait dès la première utilisation.",
      name: "Marc Lambert",
      company: "BioTech Innovations"
    },
    {
      id: "5",
      quote: "Kortexa.tech nous a aidés à automatiser nos processus avec une précision incroyable. Les modèles d'IA sont vraiment sur mesure.",
      name: "Camille Bernard",
      company: "SmartRetail"
    },
    {
      id: "6",
      quote: "J'ai installé la solution Kortexa... wow ! Un produit révolutionnaire qui a dépassé toutes nos attentes dès le départ.",
      name: "Paul Mercier",
      company: "TechFusion"
    },
    {
      id: "7",
      quote: "Leurs algorithmes prédictifs sont d'une précision remarquable et ont transformé notre capacité à anticiper les tendances du marché.",
      name: "Émilie Rousseau",
      company: "FinTech Global"
    },
    {
      id: "8",
      quote: "Le support de Kortexa est exceptionnel. C'est plus qu'un fournisseur, c'est un véritable accélérateur d'innovation pour notre entreprise.",
      name: "Antoine Lefebvre",
      company: "E-Commerce Plus"
    }
  ];

  // Créer deux rangées de témoignages avec des directions opposées
  const row1 = [...testimonialData.slice(0, 4), ...testimonialData.slice(0, 4)];
  const row2 = [...testimonialData.slice(4), ...testimonialData.slice(4)];
  
  // Déterminer aléatoirement quelles cartes sont en focus au chargement
  const [focusedCards, setFocusedCards] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    // Sélectionner aléatoirement 3-4 cartes à mettre en évidence
    const newFocusedCards = new Set<string>();
    const numberOfFocusedCards = Math.floor(Math.random() * 2) + 3; // 3-4 cartes
    
    while (newFocusedCards.size < numberOfFocusedCards) {
      const randomIndex = Math.floor(Math.random() * testimonialData.length);
      newFocusedCards.add(testimonialData[randomIndex].id);
    }
    
    setFocusedCards(newFocusedCards);
  }, []);

  // Générer un avatar avec les initiales si pas d'image
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Déterminer si une carte est en focus
  const isCardFocused = (id: string) => {
    return focusedCards.has(id) || hoveredCard === id;
  };

  // Animations pour les cartes
  const cardVariants = {
    hover: {
      scale: 1.05,
      zIndex: 10,
      boxShadow: "0 0 30px rgba(100, 100, 255, 0.3)",
      transition: {
        duration: 0.2
      }
    }
  };

  // Animation horizontale automatique
  const [animateX1] = useState(() => ({
    x: [0, -1920],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 60,
        ease: "linear"
      }
    }
  }));

  const [animateX2] = useState(() => ({
    x: [-1920, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 50,
        ease: "linear"
      }
    }
  }));

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Gradient radial au centre */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,transparent_50%)] opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Loved by world-class teams
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Des entreprises de toutes tailles font confiance à Kortexa.tech pour leurs solutions d'intelligence artificielle.
          </p>
        </motion.div>

        <div className="overflow-hidden mb-8">
          <motion.div 
            className="flex"
            animate={animateX1}
            style={{ width: "3840px" }} // Double de la largeur standard pour avoir assez de contenu pour l'animation
          >
            {row1.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                whileHover="hover"
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  bg-gray-900 border border-gray-800 rounded-xl p-6 
                  w-[350px] mx-4 flex-shrink-0
                  transition-all duration-300 backdrop-blur-sm
                  ${isCardFocused(testimonial.id) 
                    ? 'opacity-100 shadow-[0_0_20px_rgba(100,100,255,0.15)]' 
                    : 'opacity-40 hover:opacity-90'}
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {testimonial.avatar ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white text-sm font-medium">
                        {getInitials(testimonial.name)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-200 mb-4 font-medium text-sm leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-auto">
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      {testimonial.company && (
                        <p className="text-gray-400 text-xs">{testimonial.company}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Élément décoratif qui s'anime au survol */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: isCardFocused(testimonial.id) ? 1 : 0,
                    opacity: isCardFocused(testimonial.id) ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div 
            className="flex"
            animate={animateX2}
            style={{ width: "3840px" }} // Double de la largeur standard
          >
            {row2.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}-row2`}
                whileHover="hover"
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  bg-gray-900 border border-gray-800 rounded-xl p-6
                  w-[350px] mx-4 flex-shrink-0
                  transition-all duration-300 backdrop-blur-sm
                  ${isCardFocused(testimonial.id) 
                    ? 'opacity-100 shadow-[0_0_20px_rgba(100,100,255,0.15)]' 
                    : 'opacity-40 hover:opacity-90'}
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {testimonial.avatar ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white text-sm font-medium">
                        {getInitials(testimonial.name)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-200 mb-4 font-medium text-sm leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-auto">
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      {testimonial.company && (
                        <p className="text-gray-400 text-xs">{testimonial.company}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Élément décoratif qui s'anime au survol */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: isCardFocused(testimonial.id) ? 1 : 0,
                    opacity: isCardFocused(testimonial.id) ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialWall; 