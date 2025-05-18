'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Types pour les témoignages
interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
}

const Testimonials = () => {
  // Configuration pour l'animation des témoignages
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});
  const gridRef = useRef<HTMLDivElement>(null);

  // Liste des témoignages
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sophie Leclerc",
      position: "Directrice Marketing",
      company: "InnoTech Solutions",
      quote: "Kortexa.tech a transformé notre approche de l'analyse de données. Leur IA a identifié des tendances que nous n'aurions jamais découvertes. C'est comme avoir un département d'analyse supplémentaire dans notre équipe."
    },
    {
      id: "2",
      name: "Thomas Dubois",
      position: "DSI",
      company: "Groupe Nexum",
      quote: "Après plusieurs recommandations, j'ai finalement fait appel à Kortexa. C'est absolument incroyable. Si vous aimez l'innovation ou si vous hésitez, vous serez conquis par leurs solutions d'IA. Un vrai partenaire technologique."
    },
    {
      id: "3",
      name: "Julie Moreau",
      position: "CEO",
      company: "DataFlow Inc",
      quote: "Kortexa.tech est à la pointe de l'innovation. Leurs outils d'IA nous permettent de gagner un temps considérable dans le traitement de nos données. Je tape 'Tab' plus souvent que n'importe quoi d'autre maintenant !"
    },
    {
      id: "4",
      name: "Marc Lambert",
      position: "Responsable R&D",
      company: "BioTech Innovations",
      quote: "Leur système d'IA est le meilleur sur le marché. J'ai juste eu à lui demander d'analyser nos données, et il a proposé des solutions auxquelles nous n'avions jamais pensé. La base de code fonctionnait dès la première utilisation."
    },
    {
      id: "5",
      name: "Camille Bernard",
      position: "Directrice des Opérations",
      company: "SmartRetail",
      quote: "Kortexa.tech nous a aidés à automatiser nos processus d'inventaire avec une précision incroyable. Les modèles d'IA qu'ils ont développés sont vraiment sur mesure et parfaitement adaptés à nos besoins spécifiques."
    },
    {
      id: "6",
      name: "Paul Mercier",
      position: "Lead Developer",
      company: "TechFusion",
      quote: "J'ai installé la solution Kortexa... wow ! J'avais entendu tellement d'ingénieurs dire que c'était leur outil préféré. Un produit révolutionnaire qui a dépassé toutes nos attentes dès le départ."
    },
    {
      id: "7",
      name: "Émilie Rousseau",
      position: "Analyste de Données",
      company: "FinTech Global",
      quote: "Kortexa.tech a considérablement amélioré notre workflow d'analyse. Leurs algorithmes prédictifs sont d'une précision remarquable et ont transformé notre capacité à anticiper les tendances du marché."
    },
    {
      id: "8",
      name: "Antoine Lefebvre",
      position: "CTO",
      company: "E-Commerce Plus",
      quote: "Le support de Kortexa est exceptionnel. Leur équipe a travaillé avec nous à chaque étape, de l'intégration à l'optimisation. C'est plus qu'un fournisseur, c'est un véritable accélérateur d'innovation pour notre entreprise."
    }
  ];

  useEffect(() => {
    // Initialisation des états de survol
    const initialHoverStates: { [key: string]: boolean } = {};
    testimonials.forEach(testimonial => {
      initialHoverStates[testimonial.id] = false;
    });
    setHoverStates(initialHoverStates);
  }, []);

  // Gérer le survol d'un témoignage
  const handleMouseEnter = (id: string) => {
    setHoverStates(prev => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id: string) => {
    setHoverStates(prev => ({ ...prev, [id]: false }));
  };

  return (
    <section className="py-20 bg-dark-100/30 backdrop-blur-sm relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Apprécié par nos<span className="text-accent-500"> clients</span>
          </h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            Des entreprises de toutes tailles font confiance à Kortexa.tech pour leurs solutions d'intelligence artificielle.
          </p>
        </motion.div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="macbook-card overflow-hidden group relative bg-dark-200/70 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => handleMouseEnter(testimonial.id)}
              onMouseLeave={() => handleMouseLeave(testimonial.id)}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="macbook-header">
                <div className="macbook-dots">
                  <div className="macbook-dot macbook-dot-red"></div>
                  <div className="macbook-dot macbook-dot-yellow"></div>
                  <div className="macbook-dot macbook-dot-green"></div>
                </div>
                <div className="ml-4 text-dark-600 text-xs">feedback.kortexa.tech</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="ml-1">
                    <h4 className="font-medium text-dark-900">{testimonial.name}</h4>
                    <p className="text-xs text-dark-600">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
                
                <p className="text-dark-700 text-sm leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
              
              {/* Effet de lueur sur hover */}
              <motion.div 
                className="absolute inset-0 bg-accent-500/5 opacity-0 group-hover:opacity-100 pointer-events-none"
                animate={hoverStates[testimonial.id] ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Bordure animée sur hover */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-500 to-transparent scale-x-0 origin-center"
                animate={hoverStates[testimonial.id] ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <motion.button
            className="btn btn-primary px-8 py-3"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voir plus de témoignages
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 