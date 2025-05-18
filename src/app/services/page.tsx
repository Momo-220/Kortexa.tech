'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/utils/i18n';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      delay: custom * 0.1 || 0 
    } 
  })
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (custom) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      delay: custom * 0.1 || 0 
    } 
  })
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (custom) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      delay: custom * 0.1 || 0 
    } 
  })
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerFaster = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();
  
  // Fonction utilitaire pour s'assurer que les traductions sont des chaînes
  const ensureString = (value: string | object): string => {
    if (typeof value === 'string') return value;
    return '';
  };

const services = [
  {
    id: 'web-dev',
      title: ensureString(t('services.web-dev.title')),
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      description: ensureString(t('services.web-dev.description')),
    features: [
        ensureString(t('services.web-dev.feature1')),
        ensureString(t('services.web-dev.feature2')),
        ensureString(t('services.web-dev.feature3')),
        ensureString(t('services.web-dev.feature4')),
        ensureString(t('services.web-dev.feature5'))
    ],
    technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
      useCase: ensureString(t('services.web-dev.useCase')),
      image: '/images/team-1.jpg'
  },
  {
    id: 'mobile-dev',
      title: ensureString(t('services.mobile-dev.title')),
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18V18.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      description: ensureString(t('services.mobile-dev.description')),
    features: [
        ensureString(t('services.mobile-dev.feature1')),
        ensureString(t('services.mobile-dev.feature2')),
        ensureString(t('services.mobile-dev.feature3')),
        ensureString(t('services.mobile-dev.feature4')),
        ensureString(t('services.mobile-dev.feature5'))
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      useCase: ensureString(t('services.mobile-dev.useCase')),
      image: '/images/team-2.jpg'
  },
  {
    id: 'ai-solutions',
      title: ensureString(t('services.ai-solutions.title')),
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9H9.01M15 9H15.01M9.5 15C9.82588 15.3326 10.2148 15.5968 10.6441 15.7772C11.0734 15.9576 11.5344 16.0505 12 16.0505C12.4656 16.0505 12.9266 15.9576 13.3559 15.7772C13.7852 15.5968 14.1741 15.3326 14.5 15" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      description: ensureString(t('services.ai-solutions.description')),
    features: [
        ensureString(t('services.ai-solutions.feature1')),
        ensureString(t('services.ai-solutions.feature2')),
        ensureString(t('services.ai-solutions.feature3')),
        ensureString(t('services.ai-solutions.feature4')),
        ensureString(t('services.ai-solutions.feature5'))
    ],
    technologies: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenAI API', 'Hugging Face'],
      useCase: ensureString(t('services.ai-solutions.useCase')),
      image: '/images/team-3.jpg'
  },
  {
    id: 'automation',
      title: ensureString(t('services.automation.title')),
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      description: ensureString(t('services.automation.description')),
    features: [
        ensureString(t('services.automation.feature1')),
        ensureString(t('services.automation.feature2')),
        ensureString(t('services.automation.feature3')),
        ensureString(t('services.automation.feature4')),
        ensureString(t('services.automation.feature5'))
    ],
    technologies: ['Zapier', 'n8n', 'UiPath', 'Microsoft Power Automate', 'API RESTful'],
      useCase: ensureString(t('services.automation.useCase')),
      image: '/images/team-1.jpg'
  }
];

  return (
    <>
      {/* Header */}
      <section className="relative min-h-[50vh] pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl"
          >
            <motion.span variants={fadeInUp} custom={0} className="text-accent-500 font-semibold mb-4 block">
              {ensureString(t('services.title'))}
            </motion.span>
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-900" 
             dangerouslySetInnerHTML={{ __html: ensureString(t('services.heading')) }}>
            </motion.h1>
            <motion.p variants={fadeInUp} custom={2} className="text-xl text-dark-700 max-w-3xl">
              {ensureString(t('services.subtitle'))}
            </motion.p>
          </motion.div>
        </div>
      </section>
      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                className="macbook-card h-full flex flex-col"
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="macbook-header">
                  <div className="macbook-dots">
                    <div className="macbook-dot macbook-dot-red"></div>
                    <div className="macbook-dot macbook-dot-yellow"></div>
                    <div className="macbook-dot macbook-dot-green"></div>
                  </div>
                  <div className="ml-4 text-dark-600 text-xs">{service.title}.app</div>
                </div>
                <div className="macbook-window flex-grow flex flex-col">
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-accent-500 bg-opacity-20">
                      <span className="text-2xl" dangerouslySetInnerHTML={{ __html: service.icon }} />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-dark-900">{service.title}</h3>
                    <p className="text-dark-600 mb-6 flex-grow">{service.description}</p>
                    
                    <Link href={`#${service.id}`} className="mt-auto">
                      <motion.div 
                        className="flex items-center text-accent-500 hover:text-accent-600 font-medium"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <span className="mr-2">{ensureString(t('services.learnMore'))}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Detailed Services */}
      {services.map((service, serviceIndex) => (
        <section 
          key={service.id} 
          id={service.id} 
          className="py-20 border-t border-dark-300/20 relative overflow-hidden"
        >
          {/* Background decoration */}
          <motion.div 
            className={`absolute ${serviceIndex % 2 === 0 ? 'right-0' : 'left-0'} top-0 w-full h-full overflow-hidden opacity-5`}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.03, 0.05, 0.03]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8
            }}
          >
            <div className={`absolute ${serviceIndex % 2 === 0 ? '-right-40' : '-left-40'} ${serviceIndex % 2 === 0 ? '-top-40' : '-bottom-40'} w-80 h-80 border-8 border-accent-500 rounded-full`}></div>
          </motion.div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12">
              <motion.div 
                className="lg:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerChildren}
              >
                <motion.div variants={serviceIndex % 2 === 0 ? fadeInLeft : fadeInRight} custom={0} className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mr-4 bg-accent-500 bg-opacity-20">
                    <span className="text-2xl" dangerouslySetInnerHTML={{ __html: service.icon }} />
                  </div>
                  <h2 className="text-3xl font-bold text-dark-900">{service.title}</h2>
                </motion.div>
                <motion.p variants={serviceIndex % 2 === 0 ? fadeInLeft : fadeInRight} custom={1} className="text-dark-700 mb-8 text-lg">{service.description}</motion.p>
                
                <motion.div variants={serviceIndex % 2 === 0 ? fadeInLeft : fadeInRight} custom={2} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-dark-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-accent-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {ensureString(t('services.features'))}
                  </h3>
                  <motion.ul 
                    className="space-y-2 text-dark-700"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerFaster}
                  >
                    {service.features.map((feature, index) => (
                      <motion.li key={index} className="flex items-center" variants={fadeInUp} custom={index}>
                        <svg className="w-4 h-4 text-accent-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                
                <motion.div variants={serviceIndex % 2 === 0 ? fadeInLeft : fadeInRight} custom={3}>
                  <h3 className="text-xl font-semibold mb-4 text-dark-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-accent-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {ensureString(t('services.technologies'))}
                  </h3>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerFaster}
                  >
                    {service.technologies.map((tech, index) => (
                      <motion.span 
                        key={index} 
                        className="bg-dark-300/50 text-dark-800 px-3 py-1 rounded-full text-sm hover:bg-accent-500 hover:text-dark-100 transition-colors duration-300 cursor-default"
                        variants={fadeInUp}
                        custom={index}
                        whileHover={{ y: -3 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerChildren}
              >
                <motion.div 
                  className="macbook-card h-full"
                  variants={serviceIndex % 2 === 0 ? fadeInRight : fadeInLeft}
                  custom={0}
                >
                  <div className="macbook-header">
                    <div className="macbook-dots">
                      <div className="macbook-dot macbook-dot-red"></div>
                      <div className="macbook-dot macbook-dot-yellow"></div>
                      <div className="macbook-dot macbook-dot-green"></div>
                    </div>
                    <div className="ml-4 text-dark-600 text-xs">{service.title}-case-study.jpg</div>
                  </div>
                  <div className="p-6 bg-dark-200/50">
                    <motion.h3 
                      className="text-xl font-semibold mb-4 text-dark-900 flex items-center"
                      variants={serviceIndex % 2 === 0 ? fadeInRight : fadeInLeft}
                      custom={1}
                    >
                      <svg className="w-5 h-5 mr-2 text-accent-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {ensureString(t('services.caseStudy'))}
                    </motion.h3>
                    
                    {/* Image d'étude de cas - à remplacer par vos propres images JPG */}
                    <motion.div 
                      className="relative rounded-lg overflow-hidden mb-6 aspect-video shadow-lg"
                      variants={serviceIndex % 2 === 0 ? fadeInRight : fadeInLeft}
                      custom={2}
                    >
                      <Image 
                        src={service.image} 
                        alt={`${service.title} - ${ensureString(t('services.caseStudyAlt'))}`} 
                        width={600}
                        height={350}
                        className="object-cover w-full h-full"
                        priority={serviceIndex === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent flex items-end p-4">
                        <p className="text-dark-100 text-sm line-clamp-2">{service.useCase}</p>
                      </div>
                    </motion.div>
                    
                    <motion.h4 
                      className="font-semibold text-lg mb-3 text-dark-900"
                      variants={serviceIndex % 2 === 0 ? fadeInRight : fadeInLeft}
                      custom={3}
                    >
                      {ensureString(t('services.keyResults'))}
                    </motion.h4>
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                      variants={staggerFaster}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.div className="bg-dark-300/30 p-4 rounded-lg text-center" variants={fadeInUp} custom={0}>
                        <div className="text-2xl font-bold text-accent-500 mb-1">+45%</div>
                        <div className="text-dark-700 text-sm">{ensureString(t('services.metrics.productivity'))}</div>
                      </motion.div>
                      <motion.div className="bg-dark-300/30 p-4 rounded-lg text-center" variants={fadeInUp} custom={1}>
                        <div className="text-2xl font-bold text-accent-500 mb-1">-30%</div>
                        <div className="text-dark-700 text-sm">{ensureString(t('services.metrics.costs'))}</div>
                      </motion.div>
                      <motion.div className="bg-dark-300/30 p-4 rounded-lg text-center" variants={fadeInUp} custom={2}>
                        <div className="text-2xl font-bold text-accent-500 mb-1">+60%</div>
                        <div className="text-dark-700 text-sm">{ensureString(t('services.metrics.satisfaction'))}</div>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div variants={serviceIndex % 2 === 0 ? fadeInRight : fadeInLeft} custom={4}>
                      <Link href="/contact" passHref legacyBehavior={false}>
                        <motion.button 
                          className="w-full btn btn-primary flex items-center justify-center"
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10H16M8 14H16M9 18H15M14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {ensureString(t('services.requestQuote'))}
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark-100 to-dark-200">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-dark-900"
              variants={fadeInUp}
              custom={0}
            >
              {ensureString(t('services.cta.title'))}
            </motion.h2>
            <motion.p 
              className="text-lg text-dark-800 mb-8"
              variants={fadeInUp}
              custom={1}
            >
              {ensureString(t('services.cta.description'))}
            </motion.p>
            <motion.div
              variants={staggerFaster}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div variants={fadeInUp} custom={0}>
                <Link href="/contact" passHref legacyBehavior={false}>
                  <motion.button 
                    className="btn btn-primary px-8 py-3"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {ensureString(t('services.cta.contactUs'))}
                    </div>
                  </motion.button>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} custom={1}>
                <Link href="/projets" passHref legacyBehavior={false}>
                  <motion.button 
                    className="btn btn-secondary px-8 py-3"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 8H13C14.1046 8 15 8.89543 15 10V14C15 15.1046 14.1046 16 13 16H5C3.89543 16 3 15.1046 3 14V10C3 8.89543 3.89543 8 5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {ensureString(t('services.cta.viewProjects'))}
                    </div>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
} 