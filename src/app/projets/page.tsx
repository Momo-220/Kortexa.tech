'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.1 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.01,
      delayChildren: 0
    }
  }
};

// Structure pour les projets
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  liveUrl: string;
  status: 'disponible' | 'prochainement';
  technologies: string[];
}

// Exemple de projets (à remplacer par les vrais projets)
const myProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Outil IA - Analyse de Texte',
    category: 'Intelligence Artificielle',
    description: 'Outil d\'analyse sémantique et de traitement du langage naturel permettant d\'extraire des insights à partir de grands volumes de textes.',
    image: '/projects/ia-text-analyzer.jpg',
    liveUrl: 'https://example.com/project-1',
    status: 'disponible',
    technologies: ['Python', 'NLP', 'TensorFlow', 'Flask']
  },
  {
    id: 'project-2',
    title: 'Dashboard Analytics',
    category: 'Développement Web',
    description: 'Tableau de bord interactif permettant de visualiser et d\'analyser les données commerciales en temps réel pour une prise de décision éclairée.',
    image: '/projects/analytics-dashboard.jpg',
    liveUrl: 'https://example.com/project-2',
    status: 'disponible',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB']
  },
  {
    id: 'project-3',
    title: 'Système de Recommandation',
    category: 'Machine Learning',
    description: 'Système intelligent qui analyse les comportements utilisateurs pour proposer des recommandations personnalisées de produits ou de contenus.',
    image: '/projects/recommendation-system.jpg',
    liveUrl: 'https://example.com/project-3',
    status: 'disponible',
    technologies: ['Python', 'scikit-learn', 'AWS', 'API RESTful']
  },
  {
    id: 'project-4',
    title: 'Application de Gestion RH',
    category: 'Business Intelligence',
    description: 'Solution complète de gestion des ressources humaines intégrant des fonctionnalités avancées de reporting et d\'analyse prévisionnelle.',
    image: '/projects/hr-management-app.jpg',
    liveUrl: 'https://example.com/project-4',
    status: 'disponible',
    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Chart.js']
  },
  {
    id: 'project-5',
    title: 'Assistant Vocal Intelligent',
    category: 'Intelligence Artificielle',
    description: 'Assistant virtuel basé sur l\'IA conversationnelle capable de comprendre le langage naturel et d\'exécuter des tâches complexes.',
    image: '/projects/voice-assistant.jpg',
    liveUrl: 'https://example.com/project-5',
    status: 'disponible',
    technologies: ['TensorFlow', 'WebSpeech API', 'Node.js', 'WebRTC']
  },
  {
    id: 'project-6',
    title: 'Plateforme E-learning',
    category: 'Éducation',
    description: 'Plateforme d\'apprentissage en ligne avec suivi personnalisé des progrès, gamification et intégration de modules d\'IA pour l\'adaptation du contenu.',
    image: '/projects/elearning-platform.jpg',
    liveUrl: 'https://example.com/project-6',
    status: 'prochainement',
    technologies: ['Next.js', 'GraphQL', 'Firebase', 'Tailwind CSS']
  }
];

// Catégories extraites des projets (+ 'Tous')
const allCategories = ['Tous', ...Array.from(new Set(myProjects.map(project => project.category)))];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredProjects = myProjects.filter(
    project => selectedCategory === 'Tous' || project.category === selectedCategory
  );

  return (
    <>
      {/* Header */}
      <section className="relative min-h-[50vh] pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="visible"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl"
          >
            <motion.span initial={{ opacity: 1 }} className="text-accent-500 font-semibold mb-4 block">
              Nos réalisations
            </motion.span>
            <motion.h1 initial={{ opacity: 1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-900">
              Projets <span className="text-gradient">innovants</span>
            </motion.h1>
            <motion.p initial={{ opacity: 1 }} className="text-xl text-dark-700 max-w-3xl">
              Découvrez notre portfolio de projets d'IA, applications web, et autres réalisations innovantes qui transforment les industries.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Floating shapes */}
        <motion.div 
          className="hidden lg:block absolute right-20 top-40 w-40 h-40 bg-accent-500/10 rounded-full blur-xl"
          initial={{ opacity: 1 }}
          animate={{ 
            y: [0, 15, 0], 
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        ></motion.div>
        
        <motion.div 
          className="hidden lg:block absolute left-20 bottom-40 w-32 h-32 bg-accent-600/10 rounded-full blur-xl"
          initial={{ opacity: 1 }}
          animate={{ 
            y: [0, -15, 0], 
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0 
          }}
        ></motion.div>
      </section>
      {/* Filter Tabs */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap space-x-2 rounded-xl bg-dark-200/50 p-1 max-w-4xl mx-auto">
            {allCategories.map((category) => (
              <button
                key={category}
                className={`rounded-lg py-3 px-4 text-sm font-medium transition-all whitespace-nowrap mb-1 ${
                  selectedCategory === category
                    ? 'bg-accent-500 text-dark-900 shadow-lg'
                    : 'text-dark-600 hover:bg-dark-300/30 hover:text-dark-900'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="macbook-card h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="macbook-header">
                  <div className="macbook-dots">
                    <div className="macbook-dot macbook-dot-red"></div>
                    <div className="macbook-dot macbook-dot-yellow"></div>
                    <div className="macbook-dot macbook-dot-green"></div>
                  </div>
                  <div className="ml-4 text-dark-600 text-xs">{project.title}.app</div>
                </div>
                <div className="aspect-video bg-dark-200 overflow-hidden relative">
                  {/* Zone d'image - à remplacer par vos propres images JPG */}
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Image 
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className="macbook-window flex-grow flex flex-col">
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-dark-300/50 text-dark-800 px-3 py-1 rounded-full text-sm">
                        {project.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        project.status === "disponible" 
                          ? 'bg-green-800/20 text-green-300' 
                          : 'bg-amber-800/20 text-amber-300'
                      }`}>
                        {project.status === "disponible" ? 'En ligne' : 'En développement'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-dark-900">{project.title}</h3>
                    <p className="text-dark-600 mb-6 flex-grow">{project.description}</p>
                    
                    {/* Technologies utilisées */}
                    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-dark-300/30 text-dark-600 px-2 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      {project.status === "disponible" ? (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <div
                            className="btn btn-primary w-full flex items-center justify-center"
                          >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Visiter le projet
                          </div>
                        </a>
                      ) : (
                        <button 
                          className="btn-outline opacity-70 cursor-not-allowed w-full"
                          disabled
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Bientôt disponible
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark-100 to-dark-200">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark-900">
              Un projet <span className="text-accent-500">à concrétiser</span> ?
            </h2>
            <p className="text-lg text-dark-800 mb-8">
              Vous avez une idée de projet innovant ? Nous pouvons vous aider à la transformer en réalité. Contactez-nous pour discuter de votre vision.
            </p>
            <Link href="/contact">
              <button className="btn btn-primary px-8 py-3">
                <div className="flex items-center">
                  <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Nous contacter
                </div>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 