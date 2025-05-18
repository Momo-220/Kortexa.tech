import React from 'react';
import Link from 'next/link';

// Base de données simulée des projets
const projects = [
  {
    id: 'medical-assistant',
    title: 'Assistant Médical IA',
    category: 'Santé',
    icon: '🏥',
    description: 'Un assistant intelligent pour les professionnels de la santé et les patients.',
    longDescription: `Notre Assistant Médical IA est une solution de pointe conçue pour révolutionner le secteur de la santé en combinant l'expertise médicale avec les dernières avancées en intelligence artificielle.

    Destiné aux professionnels de la santé et aux établissements médicaux, cet outil permet d'améliorer le diagnostic, d'optimiser les traitements et de personnaliser le suivi des patients grâce à l'analyse avancée de données médicales.`,
    features: [
      {
        title: 'Reconnaissance et analyse d\'images médicales',
        description: 'Analyse automatisée des images médicales (radiographies, IRM, scanners) avec détection et mise en évidence des anomalies potentielles.'
      },
      {
        title: 'Aide au diagnostic basée sur les symptômes',
        description: 'Système expert qui analyse les symptômes décrits et suggère des diagnostics possibles, hiérarchisés par probabilité et gravité.'
      },
      {
        title: 'Analyse des dossiers médicaux',
        description: 'Extraction et synthèse automatique des informations pertinentes à partir des dossiers médicaux des patients.'
      },
      {
        title: 'Suivi personnalisé des patients',
        description: 'Génération de plans de suivi personnalisés en fonction du profil médical, des traitements et de l\'évolution de l\'état du patient.'
      },
      {
        title: 'Alertes et rappels de médications',
        description: 'Système d\'alertes intelligent pour les interactions médicamenteuses, les contre-indications et les rappels de prise de médicaments.'
      }
    ],
    benefits: [
      'Réduction du temps de diagnostic de 40%',
      'Amélioration de la précision des diagnostics de 35%',
      'Diminution des erreurs médicales de 28%',
      'Optimisation du temps des professionnels de santé',
      'Amélioration de l\'expérience et du suivi des patients'
    ],
    technologies: [
      'Réseaux de neurones convolutifs pour l\'analyse d\'images',
      'Traitement du langage naturel pour l\'interprétation des symptômes',
      'Apprentissage par renforcement pour l\'optimisation des traitements',
      'Systèmes experts basés sur les dernières recherches médicales',
      'Interfaces utilisateur adaptées aux environnements médicaux'
    ],
    useCases: [
      {
        title: 'Hôpital Universitaire de Lyon',
        description: 'Implémentation de l\'Assistant Médical IA dans le service de radiologie, réduisant le temps d\'analyse des images de 45% et augmentant la précision du diagnostic de 32%.'
      },
      {
        title: 'Réseau de cliniques privées',
        description: 'Utilisation pour le suivi post-opératoire de patients, réduisant les réadmissions de 27% grâce à une détection précoce des complications potentielles.'
      },
      {
        title: 'Cabinet médical rural',
        description: 'Déploiement comme support au diagnostic pour compenser le manque de spécialistes, permettant des consultations plus précises et des orientations mieux ciblées.'
      }
    ]
  },
  {
    id: 'chef-culinaire',
    title: 'Chef Culinaire IA',
    category: 'Cuisine',
    icon: '🍳',
    description: 'Générateur de recettes personnalisées basé sur les ingrédients disponibles.',
    longDescription: 'Description détaillée du chef culinaire IA à venir.',
    features: [],
    benefits: [],
    technologies: [],
    useCases: []
    // (Données complètes à ajouter pour ce produit)
  },
  // (Autres projets à ajouter)
];

// Fonction pour obtenir un projet par son ID
const getProjectById = (id: string) => {
  return projects.find(project => project.id === id) || projects[0]; // Par défaut, retourne le premier projet si ID non trouvé
};

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  return (
    <>
      {/* Header */}
      <section className="bg-dark-100 py-20">
        <div className="container mx-auto px-4">
          <Link
            href="/projets"
            className="text-accent-500 hover:text-accent-600 flex items-center mb-8">
            <span className="mr-1">←</span> Retour aux projets
          </Link>
          <div className="flex items-center gap-6 mb-6">
            <div className="text-6xl">{project.icon}</div>
            <div>
              <span className="bg-dark-300 text-dark-800 px-3 py-1 rounded-full text-sm inline-block mb-2">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-dark-900">{project.title}</h1>
            </div>
          </div>
          <p className="text-xl text-dark-700 max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>
      {/* Overview */}
      <section className="bg-dark-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-dark-900">Aperçu</h2>
              <div className="macbook-card">
                <div className="macbook-header">
                  <div className="macbook-dots">
                    <div className="macbook-dot macbook-dot-red"></div>
                    <div className="macbook-dot macbook-dot-yellow"></div>
                    <div className="macbook-dot macbook-dot-green"></div>
                  </div>
                  <div className="ml-4 text-dark-600 text-xs">Aperçu.app</div>
                </div>
                <div className="card-body">
                  <div className="prose prose-dark max-w-none">
                    {project.longDescription?.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-dark-700 mb-4">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold mb-6 text-dark-900">Avantages</h2>
              <div className="macbook-card">
                <div className="macbook-header">
                  <div className="macbook-dots">
                    <div className="macbook-dot macbook-dot-red"></div>
                    <div className="macbook-dot macbook-dot-yellow"></div>
                    <div className="macbook-dot macbook-dot-green"></div>
                  </div>
                  <div className="ml-4 text-dark-600 text-xs">Avantages.app</div>
                </div>
                <div className="card-body">
                  <ul className="space-y-3">
                    {project.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-accent-500 mr-2">✓</span>
                        <span className="text-dark-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="bg-dark-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-900">Fonctionnalités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.features?.map((feature, index) => (
              <div key={index} className="macbook-card hover:border-accent-500 transition-colors h-full">
                <div className="macbook-header">
                  <div className="macbook-dots">
                    <div className="macbook-dot macbook-dot-red"></div>
                    <div className="macbook-dot macbook-dot-yellow"></div>
                    <div className="macbook-dot macbook-dot-green"></div>
                  </div>
                  <div className="ml-4 text-dark-600 text-xs">Fonctionnalité.app</div>
                </div>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-3 text-dark-900">{feature.title}</h3>
                  <p className="text-dark-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Use Cases */}
      <section className="bg-dark-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-900">Études de cas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.useCases?.map((useCase, index) => (
              <div key={index} className="macbook-card hover:border-accent-500 transition-colors h-full">
                <div className="macbook-header">
                  <div className="macbook-dots">
                    <div className="macbook-dot macbook-dot-red"></div>
                    <div className="macbook-dot macbook-dot-yellow"></div>
                    <div className="macbook-dot macbook-dot-green"></div>
                  </div>
                  <div className="ml-4 text-dark-600 text-xs">CaseStudy.app</div>
                </div>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-3 text-dark-900">{useCase.title}</h3>
                  <p className="text-dark-600">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Technologies */}
      <section className="bg-dark-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-900">Technologies utilisées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.technologies?.map((tech, index) => (
              <div key={index} className="bg-dark-300 rounded-lg p-4 text-dark-800 flex items-center">
                <span className="text-accent-500 mr-3 text-2xl">•</span>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Demo & Contact */}
      <section className="bg-gradient-to-r from-accent-700 to-accent-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-dark-900">Intéressé par ce projet ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-dark-800">
            Découvrez comment notre {project.title} peut s'intégrer à vos processus et transformer votre activité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#"
              className="bg-dark-100 text-dark-900 px-8 py-3 rounded-lg font-semibold hover:bg-dark-200 transition-colors inline-block"
            >
              Voir la démonstration
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-dark-100 text-dark-900 px-8 py-3 rounded-lg font-semibold hover:bg-dark-100/20 transition-colors inline-block"
            >
              Demander plus d'informations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 