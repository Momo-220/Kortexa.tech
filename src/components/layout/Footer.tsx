'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Développement Web', href: '/services#web' },
        { label: 'Intégration IA', href: '/services#ai' },
        { label: 'Conseil', href: '/services#consulting' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Démos', href: '/demos' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Carrières', href: '/careers' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">AI Solutions</h3>
            <p className="text-gray-400">
              Solutions d'intelligence artificielle innovantes pour votre entreprise
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {currentYear} AI Solutions. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}; 