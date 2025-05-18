'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, LazyMotion, domAnimation, m } from 'framer-motion';

// Animation variants optimisés - durées réduites pour plus de réactivité
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

// Optimisé pour une apparition plus rapide, délai réduit entre les éléments
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05 // Réduit le délai entre les éléments
    }
  }
};

// Nouvelles animations pour l'affichage en grille
const gridStaggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.03,
      delayChildren: 0.05
    }
  }
};

export default function Blog() {
  // Préchargement des animations pour une apparition instantanée
  const controls = useAnimation();
  
  useEffect(() => {
    // Démarrer les animations immédiatement sans délai
    controls.start("visible");
  }, [controls]);

  const blogPosts = [
    {
      id: 1,
      title: "Les dernières avancées en IA générative",
      excerpt: "Découvrez comment les modèles génératifs comme GPT-4 et DALL-E 3 transforment notre approche de la création de contenu et du traitement du langage naturel.",
      category: "Intelligence Artificielle",
      date: "15 mars 2023",
      author: "Marie Dupont",
      image: "/images/blog/ai-language-models.jpg",
      imagePlaceholder: "https://source.unsplash.com/random/800x600/?ai",
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      id: 2,
      title: "Optimisation des performances des applications Next.js",
      excerpt: "Techniques avancées pour améliorer les performances et l'expérience utilisateur de vos applications Next.js, du chargement initial aux interactions fluides.",
      category: "Développement Web",
      date: "03 mars 2023",
      author: "Thomas Martin",
      image: "/images/blog/nextjs-performance.jpg",
      imagePlaceholder: "https://source.unsplash.com/random/800x600/?coding",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 3,
      title: "L'automatisation des tests dans le développement mobile",
      excerpt: "Comment mettre en place une stratégie efficace de tests automatisés pour vos applications mobiles et garantir une qualité constante à chaque déploiement.",
      category: "Développement Mobile",
      date: "22 février 2023",
      author: "Julie Lemaire",
      image: "/images/blog/mobile-testing.jpg",
      imagePlaceholder: "https://source.unsplash.com/random/800x600/?mobile",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: 4,
      title: "Sécurité et IA : les enjeux à connaître",
      excerpt: "Les défis et les solutions pour assurer la sécurité des systèmes d'intelligence artificielle dans un environnement où les menaces évoluent sans cesse.",
      category: "Sécurité",
      date: "10 janvier 2023",
      author: "Alexandre Chen",
      image: "/images/blog/ai-security.jpg",
      imagePlaceholder: "https://source.unsplash.com/random/800x600/?security",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      id: 5,
      title: "Deep Learning appliqué au traitement d'images médicales",
      excerpt: "Comment l'IA révolutionne l'analyse d'images médicales et améliore le diagnostic, permettant une détection plus précoce et plus précise des pathologies.",
      category: "IA & Santé",
      date: "05 décembre 2022",
      author: "Sophie Marchand",
      image: "/images/blog/medical-imaging.jpg",
      imagePlaceholder: "https://source.unsplash.com/random/800x600/?medical",
      color: "from-teal-500/20 to-cyan-500/20"
    },
    {
      id: 6,
      title: "Intégration continue et déploiement continu pour les projets IA",
      excerpt: "Bonnes pratiques pour mettre en place des pipelines CI/CD efficaces pour vos projets d'IA et garantir une livraison fluide et fiable.",
      category: "DevOps",
      date: "18 novembre 2022",
      author: "Nicolas Dupont",
      image: "/images/blog/ci-cd-ai.jpg",
      imagePlaceholder: "https://source.unsplash.com/random/800x600/?devops",
      color: "from-amber-500/20 to-yellow-500/20"
    }
  ];

  return (
    // Utilisation de LazyMotion avec domAnimation pour optimiser le chargement
    <LazyMotion features={domAnimation}>
      {/* Header - animation optimisée */}
      <section className="relative min-h-[40vh] pt-28 pb-16 overflow-hidden will-change-transform">
        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial="hidden"
            animate={controls}
            variants={staggerChildren}
            className="max-w-4xl"
          >
            <m.span variants={fadeInUp} className="text-accent-500 font-semibold mb-4 block">
              Ressources &amp; Actualités
            </m.span>
            <m.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-900">
              Notre <span className="text-gradient">Blog</span> Technique
            </m.h1>
            <m.p variants={fadeInUp} className="text-xl text-dark-700 max-w-3xl">
              Découvrez nos derniers articles, tutoriels et insights sur l'IA, le développement web et mobile, et les technologies émergentes.
            </m.p>
          </m.div>
        </div>
        
        {/* Floating shapes optimisées */}
        <m.div 
          className="hidden lg:block absolute right-20 top-40 w-40 h-40 bg-accent-500/10 rounded-full blur-xl will-change-transform"
          animate={{ 
            y: [0, 15, 0], 
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror" 
          }}
          initial={{ opacity: 0.7 }}
        ></m.div>
        
        <m.div 
          className="hidden lg:block absolute left-20 bottom-40 w-32 h-32 bg-accent-600/10 rounded-full blur-xl will-change-transform"
          animate={{ 
            y: [0, -15, 0], 
            scale: [1, 1.03, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror"
          }}
          initial={{ opacity: 0.6 }}
        ></m.div>
      </section>
      
      {/* Blog Posts - Nouvelle mise en page en grille */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <m.div
            initial="hidden"
            animate={controls}
            variants={gridStaggerChildren}
            className="mb-16"
          >
            {/* Article principal en pleine largeur */}
            <m.div
                variants={fadeInUp}
              className="mb-16"
            >
              <m.article 
                className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200 will-change-transform"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image à gauche */}
                  <m.div 
                    className="relative h-96 lg:h-auto overflow-hidden"
                    variants={fadeInLeft}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${blogPosts[0].color} z-0`}></div>
                    <div className="absolute inset-4 rounded-2xl overflow-hidden z-10">
                      <div className="relative w-full h-full bg-dark-300/40 backdrop-blur-sm rounded-2xl">
                        <Image 
                          src={blogPosts[0].image}
                          alt={blogPosts[0].title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={true}
                          style={{ objectFit: 'cover' }}
                          className="rounded-2xl mix-blend-luminosity opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </m.div>
                  
                  {/* Contenu à droite */}
                  <m.div 
                    className="p-8 md:p-10 flex flex-col justify-between"
                    variants={fadeInRight}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="bg-dark-300/50 text-dark-800 px-4 py-1 rounded-full text-sm font-medium">
                          {blogPosts[0].category}
                        </span>
                        <span className="text-dark-600 text-sm">{blogPosts[0].date}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-dark-900 leading-tight">
                        {blogPosts[0].title}
                      </h2>
                      
                      <p className="text-dark-600 text-lg">
                        {blogPosts[0].excerpt}
                      </p>
                      
                      <div className="flex items-center text-dark-700 text-sm space-x-1">
                        <svg className="w-5 h-5 mr-1 text-dark-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Par {blogPosts[0].author}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link
                        href={`/blog/${blogPosts[0].id}`}
                        className="inline-flex items-center px-6 py-3 bg-accent-500 text-dark-900 font-medium rounded-lg hover:bg-accent-600 transition-colors group"
                        prefetch={true}
                      >
                        <span className="mr-2">Lire l'article</span>
                        <m.svg 
                          className="w-5 h-5" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 4, 0] }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut"
                          }}
                        >
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </m.svg>
                      </Link>
                  </div>
                  </m.div>
                </div>
              </m.article>
            </m.div>
            
            {/* Grille d'articles 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.slice(1, 5).map((post, index) => (
                <m.article 
                  key={post.id} 
                  className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200 will-change-transform flex flex-col h-full"
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.color} z-0`}></div>
                    <div className="absolute inset-3 rounded-xl overflow-hidden z-10">
                      <div className="relative w-full h-full bg-dark-300/40 backdrop-blur-sm rounded-xl">
                        <Image 
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index < 1}
                          style={{ objectFit: 'cover' }}
                          className="rounded-xl mix-blend-luminosity opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-auto space-y-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-dark-300/50 text-dark-800 px-3 py-0.5 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                        <span className="text-dark-600 text-xs">{post.date}</span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-dark-900 leading-tight">
                        {post.title}
                      </h2>
                      
                      <p className="text-dark-600 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-dark-300/20 flex items-center justify-between">
                      <div className="flex items-center text-dark-700 text-xs">
                        <svg className="w-4 h-4 mr-1 text-dark-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{post.author}</span>
                      </div>
                      
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-accent-500 hover:text-accent-600 font-medium text-sm flex items-center"
                        prefetch={true}
                        >
                        <span>Lire</span>
                        <m.svg 
                          className="w-4 h-4 ml-1" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: index * 0.1
                          }}
                        >
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </m.svg>
                      </Link>
                    </div>
                  </div>
                </m.article>
              ))}
            </div>
            
            {/* Article horizontal en bas */}
            <m.div
              variants={fadeInUp}
              className="mt-12"
            >
              <m.article 
                className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200 will-change-transform"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image à droite pour le dernier article */}
                  <m.div 
                    className="relative h-72 lg:h-full overflow-hidden lg:order-2"
                    variants={fadeInRight}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${blogPosts[5].color} z-0`}></div>
                    <div className="absolute inset-4 rounded-2xl overflow-hidden z-10">
                      <div className="relative w-full h-full bg-dark-300/40 backdrop-blur-sm rounded-2xl">
                        <Image 
                          src={blogPosts[5].image}
                          alt={blogPosts[5].title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: 'cover' }}
                          className="rounded-2xl mix-blend-luminosity opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </m.div>
                  
                  {/* Contenu à gauche */}
                  <m.div 
                    className="p-8 md:p-10 flex flex-col justify-between"
                    variants={fadeInLeft}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="bg-dark-300/50 text-dark-800 px-4 py-1 rounded-full text-sm font-medium">
                          {blogPosts[5].category}
                        </span>
                        <span className="text-dark-600 text-sm">{blogPosts[5].date}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-dark-900 leading-tight">
                        {blogPosts[5].title}
                      </h2>
                      
                      <p className="text-dark-600 text-lg">
                        {blogPosts[5].excerpt}
                      </p>
                      
                      <div className="flex items-center text-dark-700 text-sm space-x-1">
                        <svg className="w-5 h-5 mr-1 text-dark-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Par {blogPosts[5].author}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link
                        href={`/blog/${blogPosts[5].id}`}
                        className="inline-flex items-center px-6 py-3 bg-accent-500 text-dark-900 font-medium rounded-lg hover:bg-accent-600 transition-colors group"
                        prefetch={true}
                      >
                        <span className="mr-2">Lire l'article</span>
                        <m.svg 
                          className="w-5 h-5" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 4, 0] }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut"
                          }}
                        >
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </m.svg>
                      </Link>
                    </div>
                  </m.div>
                </div>
              </m.article>
            </m.div>
          </m.div>
        </div>
      </section>
      
      {/* Newsletter simplifiée */}
      <section className="py-16 bg-dark-100/50">
        <div className="container mx-auto px-4">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <m.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-dark-900">
              Restez à jour avec notre newsletter
            </m.h2>
            <m.p variants={fadeInUp} className="text-lg text-dark-700 mb-8">
              Recevez nos derniers articles, tutoriels et ressources directement dans votre boîte mail.
            </m.p>
            <m.form variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-grow px-6 py-3 rounded-lg bg-dark-200 border border-dark-300/50 text-dark-800 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent-500 text-dark-900 font-medium rounded-lg hover:bg-accent-600 transition-colors flex-shrink-0"
              >
                  S'abonner
              </button>
            </m.form>
            <m.p variants={fadeInUp} className="text-dark-600 text-sm mt-4">
              Nous respectons votre vie privée. Désabonnez-vous à tout moment.
            </m.p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
} 