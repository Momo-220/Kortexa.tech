'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/utils/i18n';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: null
  });

  const { t } = useTranslation();
  
  // Fonction utilitaire pour s'assurer que les traductions sont des chaînes
  const ensureString = (value: string | object): string => {
    if (typeof value === 'string') return value;
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({
      submitted: true,
      success: true,
      error: null
    });
    
    // Ici, vous implémenteriez la logique d'envoi du formulaire à votre API
    // Example:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   
    //   if (!response.ok) throw new Error('Network response was not ok');
    //   
    //   setFormStatus({
    //     submitted: true,
    //     success: true,
    //     error: null
    //   });
    // } catch (error) {
    //   setFormStatus({
    //     submitted: true,
    //     success: false,
    //     error: error.message
    //   });
    // }
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-2xl mx-auto text-center"
          >
          <motion.h1 
            variants={fadeInUp}
              custom={0} 
              className="text-4xl md:text-5xl font-bold mb-6"
          >
              {ensureString(t('contact.title'))}
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
              custom={1} 
              className="text-xl text-dark-700 mb-12"
          >
              {ensureString(t('contact.subtitle'))}
          </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Formulaire et Infos de contact */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-dark-200/50 backdrop-blur-md border border-dark-300/20 rounded-2xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulaire */}
            <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-dark-800 mb-2">
                      {ensureString(t('contact.form.name'))}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-100/50 border border-dark-300/30 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder={ensureString(t('contact.form.name'))}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-dark-800 mb-2">
                      {ensureString(t('contact.form.email'))}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-100/50 border border-dark-300/30 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder={ensureString(t('contact.form.email'))}
                    />
                  </div>
                  </div>
                  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-dark-800 mb-2">
                      {ensureString(t('contact.form.phone'))}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-dark-100/50 border border-dark-300/30 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder={ensureString(t('contact.form.phone'))}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-dark-800 mb-2">
                      {ensureString(t('contact.form.company'))}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-dark-100/50 border border-dark-300/30 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder={ensureString(t('contact.form.company'))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-dark-800 mb-2">
                    {ensureString(t('contact.form.subject'))}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-100/50 border border-dark-300/30 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  >
                    <option value="">{ensureString(t('contact.form.subject'))}</option>
                    <option value="quote">{ensureString(t('contact.form.subject.option1'))}</option>
                    <option value="question">{ensureString(t('contact.form.subject.option2'))}</option>
                    <option value="partnership">{ensureString(t('contact.form.subject.option3'))}</option>
                    <option value="other">{ensureString(t('contact.form.subject.option4'))}</option>
                  </select>
                  </div>
                  
                  <div>
                  <label htmlFor="message" className="block text-dark-800 mb-2">
                    {ensureString(t('contact.form.message'))}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-dark-100/50 border border-dark-300/30 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder={ensureString(t('contact.form.message'))}
                  ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                  className="w-full py-3 px-6 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus.submitted}
                >
                  {formStatus.submitted ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                  ) : null}
                  {formStatus.submitted ? ensureString(t('contact.form.submitting')) : ensureString(t('contact.form.submit'))}
                  </motion.button>
                  
                {formStatus.submitted && (
                    <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 mt-6 rounded-lg text-center ${
                      formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {formStatus.success 
                      ? ensureString(t('contact.form.success'))
                      : ensureString(t('contact.form.error'))}
                    </motion.div>
                  )}
                </form>
              </div>
            
            {/* Informations de contact */}
            <div className="lg:col-span-1">
              <div className="bg-dark-100/50 backdrop-blur-md p-8 rounded-2xl shadow-lg h-full border border-dark-300/30">
                <h2 className="text-2xl font-bold mb-8 text-dark-900">Informations de contact</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-dark-900 group-hover:text-accent-500 transition-colors">Adresse</h3>
                      <p className="text-dark-700">
                        123 Rue de l'Innovation<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-dark-900 group-hover:text-accent-500 transition-colors">Email</h3>
                      <a href="mailto:contact@kortexa.tech" className="text-dark-700 hover:text-accent-500 transition-colors">contact@kortexa.tech</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-dark-900 group-hover:text-accent-500 transition-colors">Téléphone</h3>
                      <a href="tel:+33123456789" className="text-dark-700 hover:text-accent-500 transition-colors">+33 1 23 45 67 89</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-dark-900 group-hover:text-accent-500 transition-colors">Horaires</h3>
                      <p className="text-dark-700">
                        Lundi au Vendredi : 9h - 18h<br />
                        Samedi et Dimanche : Fermé
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="font-semibold text-lg mb-4 text-dark-900">Suivez-nous</h3>
                    <div className="flex space-x-4">
                      <motion.a 
                        whileHover={{ y: -3 }}
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 bg-dark-200 text-dark-700 hover:bg-accent-500 hover:text-white flex items-center justify-center rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        whileHover={{ y: -3 }}
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 bg-dark-200 text-dark-700 hover:bg-accent-500 hover:text-white flex items-center justify-center rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        whileHover={{ y: -3 }}
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 bg-dark-200 text-dark-700 hover:bg-accent-500 hover:text-white flex items-center justify-center rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ ou ressources supplémentaires */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUp} custom={0} className="text-3xl font-bold mb-8">
              {ensureString(t('contact.resources.title'))}
            </motion.h2>
            <motion.p variants={fadeInUp} custom={1} className="text-dark-700 mb-12">
              {ensureString(t('contact.resources.subtitle'))}
            </motion.p>
            
            <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/services" 
                passHref 
                legacyBehavior={false}
                className="px-6 py-3 bg-dark-300/50 rounded-lg hover:bg-dark-300/80 transition-colors"
              >
                {ensureString(t('contact.resources.services'))}
              </Link>
              <Link 
                href="/about" 
                passHref 
                legacyBehavior={false}
                className="px-6 py-3 bg-dark-300/50 rounded-lg hover:bg-dark-300/80 transition-colors"
              >
                {ensureString(t('contact.resources.about'))}
              </Link>
              <Link 
                href="/projets" 
                passHref 
                legacyBehavior={false}
                className="px-6 py-3 bg-dark-300/50 rounded-lg hover:bg-dark-300/80 transition-colors"
              >
                {ensureString(t('contact.resources.projects'))}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Carte interactive */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-b from-dark-100 to-dark-200"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-dark-900">Notre localisation</h2>
          <div className="h-[500px] rounded-2xl shadow-xl overflow-hidden border border-dark-300/30">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292290615468145!3d48.85836907928823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1621508229258!5m2!1sfr!2sfr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 