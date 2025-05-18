'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  name: string;
  position: string;
  company: string;
  initials: string;
}

const TestimonialCard = ({ quote, name, position, company, initials }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="macbook-card hover:border-accent-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="macbook-header">
        <div className="macbook-dots">
          <div className="macbook-dot macbook-dot-red"></div>
          <div className="macbook-dot macbook-dot-yellow"></div>
          <div className="macbook-dot macbook-dot-green"></div>
        </div>
        <div className="ml-4 text-dark-600 text-xs">Testimonial.app</div>
      </div>
      <div className="card-body">
        <div className="text-accent-500 text-3xl mb-2">"</div>
        <p className="text-dark-600 italic mb-6">{quote}</p>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-accent-500/20 rounded-full mr-4 flex items-center justify-center text-accent-500 font-bold">{initials}</div>
          <div>
            <h4 className="font-semibold text-dark-800">{name}</h4>
            <p className="text-sm text-dark-500">{position}, {company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 