'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/utils/i18n';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const team: TeamMember[] = [
  {
    name: 'Sophie Martin',
    role: 'CEO & Fondatrice',
    bio: '10 ans d\'expérience en IA et développement. Passionnée par l\'innovation technologique.',
    image: '/images/team-1.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/sophie',
      twitter: 'https://twitter.com/sophie',
    },
  },
  {
    name: 'Thomas Dubois',
    role: 'CTO',
    bio: 'Expert en architecture cloud et systèmes distribués. Contributeur open source.',
    image: '/images/team-2.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/thomas',
      github: 'https://github.com/thomas',
    },
  },
  {
    name: 'Julie Bernard',
    role: 'Lead Data Scientist',
    bio: 'Spécialiste en apprentissage automatique et traitement du langage naturel.',
    image: '/images/team-3.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/julie',
      github: 'https://github.com/julie',
    },
  },
];

const values = [
  {
    title: 'about.value.innovation',
    description: 'about.value.innovation.desc',
    icon: '💡',
  },
  {
    title: 'about.value.excellence',
    description: 'about.value.excellence.desc',
    icon: '⭐',
  },
  {
    title: 'about.value.ethics',
    description: 'about.value.ethics.desc',
    icon: '🤝',
  },
  {
    title: 'about.value.collaboration',
    description: 'about.value.collaboration.desc',
    icon: '👥',
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function About() {
  const { t } = useTranslation();
  
  // Fonction utilitaire pour s'assurer que les traductions sont des chaînes
  const ensureString = (value: string | object): string => {
    if (typeof value === 'string') return value;
    return '';
  };
  
  // Initialiser les données de l'équipe avec les traductions
  const translatedTeam: TeamMember[] = [
    {
      name: ensureString(t('about.team.member1.name')),
      role: ensureString(t('about.team.member1.role')),
      bio: ensureString(t('about.team.member1.bio')),
      image: '/images/team-1.jpg',
      socials: {
        linkedin: 'https://linkedin.com/in/sophie',
        twitter: 'https://twitter.com/sophie',
      },
    },
    {
      name: ensureString(t('about.team.member2.name')),
      role: ensureString(t('about.team.member2.role')),
      bio: ensureString(t('about.team.member2.bio')),
      image: '/images/team-2.jpg',
      socials: {
        linkedin: 'https://linkedin.com/in/thomas',
        github: 'https://github.com/thomas',
      },
    },
    {
      name: ensureString(t('about.team.member3.name')),
      role: ensureString(t('about.team.member3.role')),
      bio: ensureString(t('about.team.member3.bio')),
      image: '/images/team-3.jpg',
      socials: {
        linkedin: 'https://linkedin.com/in/julie',
        github: 'https://github.com/julie',
      },
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200">
      {/* Hero section avec effet parallaxe */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/30 to-accent-600/30 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/team-1.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            {ensureString(t('about.ourStory'))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-accent-500 mx-auto mb-6"
          ></motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Vision & Mission avec design moderne */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              custom={0}
              variants={fadeInUp}
              className="text-4xl font-bold mb-8 text-center text-white"
            >
              {ensureString(t('about.ourVision'))}
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="text-xl leading-relaxed text-gray-300 mb-12 text-center"
            >
              {ensureString(t('about.visionText'))}
            </motion.p>
            
            <motion.div
              custom={2}
              variants={fadeInUp}
              className="flex justify-center"
            >
              <div className="w-32 h-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Values avec cartes modernes */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-white"
          >
            {ensureString(t('about.ourValues'))}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                className="bg-dark-100/70 backdrop-blur-md border border-dark-300/20 rounded-2xl p-8 text-center transition-all"
              >
                <div className="text-5xl mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/20">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{ensureString(t(value.title))}</h3>
                <p className="text-gray-300">{ensureString(t(value.description))}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team avec design moderne */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-white"
          >
            {ensureString(t('about.ourTeam'))}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {translatedTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-dark-100/70 backdrop-blur-md border border-dark-300/20 rounded-2xl overflow-hidden transition-all"
              >
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent"></div>
                </div>
                <div className="p-8 relative -mt-20">
                  <h3 className="text-2xl font-semibold mb-1 text-white">{member.name}</h3>
                  <p className="text-accent-500 mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-300 mb-6">{member.bio}</p>
                  <div className="flex gap-4">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                        </svg>
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Ajout d'un bouton de contact */}
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/contact" 
            passHref 
            legacyBehavior={false}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-accent-500 hover:bg-accent-600 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {ensureString(t('about.contactUs'))}
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 