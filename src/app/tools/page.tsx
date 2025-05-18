'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Tool {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technology: string;
  target: string;
  demoUrl: string;
}

const tools: Tool[] = [
  {
    id: 'chatbot-sante',
    title: 'Assistant Médical IA',
    description: 'Un chatbot spécialisé dans le conseil médical préliminaire',
    image: '/tools/medical-assistant.jpg',
    category: 'Santé',
    technology: 'GPT-4',
    target: 'Professionnels de santé',
    demoUrl: '/demo/medical-assistant',
  },
  {
    id: 'recettes-ia',
    title: 'Chef Culinaire IA',
    description: 'Générateur de recettes personnalisées basé sur vos ingrédients',
    image: '/tools/recipe-generator.jpg',
    category: 'Cuisine',
    technology: 'GPT-4',
    target: 'Grand public',
    demoUrl: '/demo/recipe-generator',
  },
  {
    id: 'religion-qa',
    title: 'Guide Spirituel IA',
    description: 'Assistant pour répondre aux questions religieuses',
    image: '/tools/spiritual-guide.jpg',
    category: 'Religion',
    technology: 'GPT-4',
    target: 'Communautés religieuses',
    demoUrl: '/demo/spiritual-guide',
  },
];

const categories = ['Tous', 'Santé', 'Cuisine', 'Religion'];
const technologies = ['Tous', 'GPT-4', 'DALL-E', 'Stable Diffusion'];
const targets = ['Tous', 'Grand public', 'Professionnels', 'Communautés religieuses'];

export default function Tools() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedTechnology, setSelectedTechnology] = useState('Tous');
  const [selectedTarget, setSelectedTarget] = useState('Tous');

  const filteredTools = tools.filter((tool) => {
    const categoryMatch = selectedCategory === 'Tous' || tool.category === selectedCategory;
    const technologyMatch = selectedTechnology === 'Tous' || tool.technology === selectedTechnology;
    const targetMatch = selectedTarget === 'Tous' || tool.target === selectedTarget;
    return categoryMatch && technologyMatch && targetMatch;
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bibliothèque d'Outils IA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre collection d'outils d'intelligence artificielle
            spécialisés pour différents domaines
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Technology Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologie
            </label>
            <select
              value={selectedTechnology}
              onChange={(e) => setSelectedTechnology(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {technologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>

          {/* Target Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Public Cible
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {targets.map((target) => (
                <option key={target} value={target}>
                  {target}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {tool.category}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    {tool.technology}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{tool.target}</span>
                  <Link
                    href={tool.demoUrl}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Tester
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Aucun outil ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 