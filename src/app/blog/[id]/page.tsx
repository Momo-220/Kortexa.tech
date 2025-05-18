'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion as m } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Fonction pour obtenir les articles de blog (ces données pourraient venir d'une API/BDD en production)
const getBlogPosts = () => {
  return [
    {
      id: 1,
      title: "Les dernières avancées en IA générative",
      excerpt: "Découvrez comment les modèles génératifs comme GPT-4 et DALL-E 3 transforment notre approche de la création de contenu et du traitement du langage naturel.",
      category: "Intelligence Artificielle",
      date: "15 mars 2023",
      author: "Marie Dupont",
      imageEmoji: "🧠",
      image: "/images/blog/ai-language-models.jpg",
      color: "from-blue-500/20 to-purple-500/20",
      content: `
        <p>Les modèles de langage ont connu une évolution spectaculaire ces dernières années. De simples modèles statistiques, ils sont devenus des architectures complexes capables de comprendre et de générer du texte d'une manière qui semblait inimaginable il y a seulement une décennie.</p>
        
        <h2>De Word2Vec à GPT</h2>
        <p>L'évolution a commencé avec des modèles comme Word2Vec, qui permettaient de représenter des mots sous forme de vecteurs numériques. Ces représentations vectorielles ont ouvert la voie à une meilleure compréhension sémantique du langage par les machines.</p>
        <p>Avec l'avènement des architectures de type Transformer en 2017, introduites dans le célèbre article "Attention is All You Need", nous avons assisté à une révolution dans le traitement du langage naturel. Ces architectures ont permis le développement de modèles comme BERT et GPT, capables de comprendre le contexte sur de longues séquences de texte.</p>
        
        <h2>Applications pratiques</h2>
        <p>Ces avancées ont permis le développement d'applications pratiques comme:</p>
        <ul>
          <li>La génération de texte de qualité humaine</li>
          <li>La traduction automatique très précise</li>
          <li>La réponse à des questions complexes</li>
          <li>La résumération automatique de documents</li>
          <li>La création de contenu personnalisé</li>
        </ul>
        
        <h2>Les défis actuels</h2>
        <p>Malgré ces avancées impressionnantes, les modèles de langage font face à plusieurs défis :</p>
        <p>Le problème des "hallucinations" reste présent, lorsque les modèles génèrent des informations fausses mais présentées avec confiance. La question des biais dans les données d'entraînement, qui peuvent être reproduits et amplifiés par les modèles, demeure également un sujet de préoccupation majeur.</p>
        
        <h2>L'avenir des modèles de langage</h2>
        <p>Les recherches actuelles s'orientent vers des modèles plus efficaces en termes de ressources, capables de fonctionner sur des appareils avec des contraintes matérielles. L'intégration de connaissances expertes et la réduction des biais sont également des axes de développement privilégiés.</p>
        <p>La multimodalité représente aussi une direction prometteuse, avec des modèles capables de traiter simultanément du texte, des images, de l'audio et même de la vidéo.</p>
        
        <p>L'évolution des modèles de langage continue à un rythme soutenu, promettant des applications toujours plus impressionnantes dans les années à venir.</p>
      `
    },
    {
      id: 2,
      title: "Optimisation des performances des applications Next.js",
      excerpt: "Techniques avancées pour améliorer les performances et l'expérience utilisateur de vos applications Next.js.",
      category: "Développement Web",
      date: "03 mars 2023",
      author: "Thomas Martin",
      imageEmoji: "⚡",
      content: `
        <p>Next.js s'est imposé comme l'un des frameworks React les plus populaires pour le développement web moderne. Son approche hybride, combinant rendu côté serveur (SSR), génération statique (SSG) et rendu côté client, offre une flexibilité remarquable. Cependant, pour tirer pleinement parti de ces fonctionnalités, il est essentiel d'optimiser les performances de vos applications.</p>
        
        <h2>Image Optimization</h2>
        <p>Next.js fournit un composant Image qui optimise automatiquement les images. Il redimensionne, optimise et diffuse les images dans des formats modernes comme WebP lorsque le navigateur les prend en charge.</p>
        <p>L'utilisation de ce composant peut réduire considérablement la taille des images et améliorer le temps de chargement de votre application.</p>
        
        <h2>Code Splitting</h2>
        <p>Next.js effectue automatiquement du code splitting, ce qui signifie que seul le code nécessaire à une page spécifique est chargé. Vous pouvez améliorer davantage ce comportement en utilisant l'importation dynamique pour les composants lourds qui ne sont pas immédiatement nécessaires.</p>
        
        <h2>Edge Runtime et Middleware</h2>
        <p>L'utilisation du middleware Next.js avec Edge Runtime permet d'exécuter du code au plus près des utilisateurs, réduisant ainsi la latence et améliorant les temps de réponse. C'est particulièrement utile pour les applications ayant une audience mondiale.</p>
        
        <h2>Stratégies de mise en cache</h2>
        <p>Next.js offre plusieurs approches pour la mise en cache:</p>
        <ul>
          <li>Mise en cache complète des pages avec getStaticProps</li>
          <li>Mise en cache sélective avec Incremental Static Regeneration (ISR)</li>
          <li>Mise en cache des requêtes API avec SWR ou React Query</li>
        </ul>
        
        <h2>Optimisations au niveau du build</h2>
        <p>L'optimisation du processus de build peut également améliorer les performances de développement et de production:</p>
        <ul>
          <li>Utilisation du transpileur SWC au lieu de Babel</li>
          <li>Configuration du minificateur Terser</li>
          <li>Adoption de la compilation incrémentielle</li>
        </ul>
        
        <p>En appliquant ces techniques d'optimisation, vous pouvez créer des applications Next.js rapides, réactives et offrant une excellente expérience utilisateur, tout en maintenant de bonnes performances pour les développeurs.</p>
      `
    },
    {
      id: 3,
      title: "L'automatisation des tests dans le développement mobile",
      excerpt: "Comment mettre en place une stratégie efficace de tests automatisés pour vos applications mobiles.",
      category: "Développement Mobile",
      date: "22 février 2023",
      author: "Julie Lemaire",
      imageEmoji: "📱",
      content: `
        <p>Dans le monde du développement mobile, où les cycles de livraison sont de plus en plus rapides et les attentes des utilisateurs toujours plus élevées, l'automatisation des tests est devenue indispensable. Une stratégie de test bien pensée permet non seulement d'assurer la qualité du produit final, mais aussi d'accélérer le développement en détectant les problèmes plus tôt.</p>
        
        <h2>Pyramide de tests pour le mobile</h2>
        <p>Une approche éprouvée consiste à structurer les tests en pyramide:</p>
        <ul>
          <li><strong>Tests unitaires</strong> à la base: rapides, nombreux, testant des fonctions isolées</li>
          <li><strong>Tests d'intégration</strong> au milieu: vérifiant l'interaction entre différents composants</li>
          <li><strong>Tests UI/E2E</strong> au sommet: moins nombreux, simulant des parcours utilisateur complets</li>
        </ul>
        
        <h2>Outils d'automatisation par plateforme</h2>
        <p>Pour Android:</p>
        <ul>
          <li>JUnit et Mockito pour les tests unitaires</li>
          <li>Espresso pour les tests d'interface utilisateur</li>
          <li>UI Automator pour les tests système</li>
        </ul>
        
        <p>Pour iOS:</p>
        <ul>
          <li>XCTest pour les tests unitaires et d'intégration</li>
          <li>XCUI Test pour les tests d'interface</li>
          <li>EarlGrey pour des tests UI plus avancés</li>
        </ul>
        
        <p>Pour les applications multiplateformes:</p>
        <ul>
          <li>Appium pour tester les applications natives, hybrides et web</li>
          <li>Detox pour les applications React Native</li>
          <li>Flutter Driver pour les applications Flutter</li>
        </ul>
        
        <h2>Intégration continue pour mobile</h2>
        <p>L'intégration des tests automatisés dans un pipeline CI/CD est cruciale:</p>
        <ul>
          <li>Exécution des tests à chaque commit ou pull request</li>
          <li>Matrices de test sur différents appareils et versions d'OS</li>
          <li>Feedback rapide aux développeurs via notifications</li>
        </ul>
        
        <h2>Tests sur des fermes d'appareils</h2>
        <p>Pour une couverture maximale, l'utilisation de services cloud comme Firebase Test Lab, AWS Device Farm ou BrowserStack permet de tester sur un large éventail d'appareils réels sans avoir à les gérer physiquement.</p>
        
        <p>En mettant en place une stratégie d'automatisation des tests adaptée à votre application mobile, vous pouvez réduire significativement le temps consacré aux tests manuels, améliorer la qualité de votre produit et accélérer vos cycles de développement.</p>
      `
    },
    {
      id: 4,
      title: "Sécurité et IA : les enjeux à connaître",
      excerpt: "Les défis et les solutions pour assurer la sécurité des systèmes d'intelligence artificielle.",
      category: "Sécurité",
      date: "10 janvier 2023",
      author: "Alexandre Chen",
      imageEmoji: "🔒",
      content: `
        <p>À mesure que l'intelligence artificielle s'intègre davantage dans nos systèmes critiques, la sécurité des modèles et des applications IA devient un enjeu majeur. Les vulnérabilités spécifiques à l'IA nécessitent de nouvelles approches et méthodologies pour garantir leur sécurité.</p>
        
        <h2>Attaques contre les modèles d'IA</h2>
        <p>Plusieurs types d'attaques ciblent spécifiquement les modèles d'IA:</p>
        <ul>
          <li><strong>Attaques par exemples adverses</strong>: modifications subtiles des entrées pour tromper le modèle</li>
          <li><strong>Empoisonnement des données</strong>: contamination des données d'entraînement pour manipuler les résultats</li>
          <li><strong>Extraction de modèle</strong>: vol des paramètres et de la structure d'un modèle propriétaire</li>
          <li><strong>Inférence de membres</strong>: déterminer si certaines données ont été utilisées pour l'entraînement</li>
        </ul>
        
        <h2>Protection des modèles</h2>
        <p>Pour protéger les modèles d'IA, plusieurs stratégies peuvent être mises en œuvre:</p>
        <ul>
          <li>Entraînement robuste incluant des exemples adverses</li>
          <li>Détection des entrées malveillantes par analyse statistique</li>
          <li>Distillation défensive pour rendre les modèles moins sensibles aux perturbations</li>
          <li>Anonymisation des données d'entraînement pour éviter les fuites d'informations</li>
        </ul>
        
        <h2>Confidentialité et IA</h2>
        <p>La protection des données personnelles utilisées par les systèmes d'IA est également cruciale:</p>
        <ul>
          <li>Apprentissage fédéré pour entraîner des modèles sans centraliser les données</li>
          <li>Confidentialité différentielle pour limiter l'information révélée sur chaque individu</li>
          <li>Calcul multipartite sécurisé pour les collaborations sans partage de données brutes</li>
        </ul>
        
        <h2>Cadre réglementaire</h2>
        <p>Les réglementations émergentes comme l'AI Act européen imposent de nouvelles contraintes sur les systèmes d'IA:</p>
        <ul>
          <li>Évaluation des risques obligatoire pour les systèmes à haut risque</li>
          <li>Exigences de transparence et d'explicabilité</li>
          <li>Documentation et traçabilité des modèles et des données</li>
        </ul>
        
        <p>En intégrant la sécurité dès la conception de vos systèmes d'IA et en restant informé des évolutions réglementaires, vous pouvez développer des applications d'IA à la fois innovantes et sécurisées.</p>
      `
    },
    {
      id: 5,
      title: "Deep Learning appliqué au traitement d'images médicales",
      excerpt: "Comment l'IA révolutionne l'analyse d'images médicales et améliore le diagnostic.",
      category: "IA & Santé",
      date: "05 décembre 2022",
      author: "Sophie Marchand",
      imageEmoji: "🏥",
      content: `
        <p>Le domaine médical connaît une véritable révolution grâce à l'application du deep learning au traitement d'images médicales. Ces avancées permettent d'améliorer la précision des diagnostics, de réduire le temps d'analyse et d'assister les professionnels de santé dans leur prise de décision.</p>
        
        <h2>Architectures de réseaux neuronaux adaptées</h2>
        <p>Plusieurs architectures de deep learning ont prouvé leur efficacité dans l'analyse d'images médicales:</p>
        <ul>
          <li>Les réseaux de neurones convolutifs (CNN) pour la classification d'images</li>
          <li>Les architectures U-Net pour la segmentation précise des structures anatomiques</li>
          <li>Les réseaux R-CNN et YOLO pour la détection et la localisation de lésions</li>
          <li>Les GAN (Generative Adversarial Networks) pour l'amélioration d'images à faible résolution</li>
        </ul>
        
        <h2>Applications cliniques</h2>
        <p>Ces technologies sont déjà appliquées dans de nombreux domaines médicaux:</p>
        <ul>
          <li><strong>Radiologie</strong>: détection de nodules pulmonaires, fractures osseuses, tumeurs</li>
          <li><strong>Dermatologie</strong>: classification des lésions cutanées, détection précoce du mélanome</li>
          <li><strong>Ophtalmologie</strong>: diagnostic de la rétinopathie diabétique, du glaucome</li>
          <li><strong>Pathologie</strong>: analyse automatisée des coupes histologiques</li>
          <li><strong>Cardiologie</strong>: interprétation des échographies et IRM cardiaques</li>
        </ul>
        
        <h2>Défis spécifiques aux données médicales</h2>
        <p>Le développement de modèles de deep learning pour les images médicales présente des défis particuliers:</p>
        <ul>
          <li>La rareté des données annotées par des experts</li>
          <li>Les déséquilibres importants entre classes (pathologies rares)</li>
          <li>L'hétérogénéité des modalités d'imagerie (CT, IRM, échographie, etc.)</li>
          <li>Les exigences strictes en matière de confidentialité des données</li>
          <li>Le besoin d'explicabilité des décisions algorithmiques</li>
        </ul>
        
        <h2>Validations cliniques et réglementations</h2>
        <p>Pour être déployés en milieu clinique, ces systèmes doivent passer par:</p>
        <ul>
          <li>Des études cliniques rigoureuses comparant leurs performances à celles des experts humains</li>
          <li>Des processus de validation externes sur des données indépendantes</li>
          <li>Des certifications réglementaires (FDA, marquage CE pour les dispositifs médicaux)</li>
        </ul>
        
        <p>L'avenir du diagnostic médical repose sur une collaboration intelligente entre l'expertise humaine et les capacités d'analyse des algorithmes de deep learning, ouvrant la voie à une médecine plus précise, personnalisée et accessible.</p>
      `
    },
    {
      id: 6,
      title: "Intégration continue et déploiement continu pour les projets IA",
      excerpt: "Bonnes pratiques pour mettre en place des pipelines CI/CD efficaces pour vos projets d'IA.",
      category: "DevOps",
      date: "18 novembre 2022",
      author: "Nicolas Dupont",
      imageEmoji: "🔄",
      content: `
        <p>Les projets d'intelligence artificielle posent des défis uniques en matière d'intégration continue et de déploiement continu (CI/CD). Au-delà du code traditionnel, ces projets impliquent des modèles, des données et des environnements d'exécution spécifiques qui nécessitent des approches adaptées.</p>
        
        <h2>Spécificités des projets IA</h2>
        <p>Les particularités des projets IA à prendre en compte dans une stratégie CI/CD:</p>
        <ul>
          <li>Dépendance aux données d'entraînement et de test</li>
          <li>Processus d'entraînement coûteux en ressources</li>
          <li>Reproducibilité des expérimentations</li>
          <li>Nécessité de suivre les performances des modèles</li>
          <li>Cohabitation du code de production et d'expérimentation</li>
        </ul>
        
        <h2>Versionnement adapté</h2>
        <p>Une stratégie de versionnement complète pour l'IA devrait inclure:</p>
        <ul>
          <li>Versionnement du code source (Git)</li>
          <li>Versionnement des données (DVC, LakeFS)</li>
          <li>Versionnement des modèles (MLflow, Weights & Biases)</li>
          <li>Versionnement des environnements (Docker, conda-pack)</li>
          <li>Traçabilité des expériences (MLflow, Neptune.ai)</li>
        </ul>
        
        <h2>Pipeline CI/CD pour l'IA</h2>
        <p>Un pipeline CI/CD complet pour un projet d'IA pourrait comprendre ces étapes:</p>
        <ul>
          <li>Validation du code (tests unitaires, linting)</li>
          <li>Validation des données (tests de qualité, détection de drift)</li>
          <li>Entraînement automatisé sur des sous-ensembles</li>
          <li>Évaluation des performances du modèle</li>
          <li>Tests d'intégration avec l'application</li>
          <li>Déploiement progressif avec surveillance</li>
        </ul>
        
        <h2>Infrastructures adaptées</h2>
        <p>L'infrastructure CI/CD pour l'IA nécessite:</p>
        <ul>
          <li>Accès à des ressources GPU/TPU pour l'entraînement</li>
          <li>Caching intelligent des données et artefacts volumineux</li>
          <li>Orchestration des workflows complexes (Kubeflow, Airflow)</li>
          <li>Scaling automatique des ressources selon les besoins</li>
        </ul>
        
        <h2>Métriques et surveillance</h2>
        <p>Après déploiement, il est crucial de surveiller:</p>
        <ul>
          <li>Les performances techniques (latence, utilisation des ressources)</li>
          <li>Les performances du modèle en production</li>
          <li>La dérive des données entrantes (data drift)</li>
          <li>La dérive des prédictions (concept drift)</li>
        </ul>
        
        <p>En adaptant vos pratiques DevOps aux spécificités des projets d'IA, vous pouvez garantir des déploiements plus fiables, maintenir la qualité de vos modèles dans le temps et accélérer le cycle de développement de vos solutions d'intelligence artificielle.</p>
      `
    }
  ];
};

// Fonction pour obtenir un article par son ID
const getBlogPostById = (id: string | number) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return getBlogPosts().find(post => post.id === numericId);
};

// Type des paramètres de la page
type BlogPostParams = {
  params: {
    id: string;
  };
};

export default function BlogPost({ params }: BlogPostParams) {
  const blogPost = getBlogPostById(params.id);
  
  // Si l'article n'existe pas
  if (!blogPost) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-6">Article introuvable</h1>
        <p className="mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link 
          href="/blog" 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors"
        >
          Retour au blog
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Article Header - Version améliorée avec animations */}
      <section className="relative bg-dark-100 pt-28 pb-16 overflow-hidden">
        {/* Floating shapes */}
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
        
        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <m.div variants={fadeInUp}>
              <Link
                href="/blog"
                className="text-accent-500 hover:text-accent-600 flex items-center mb-8 group"
              >
                <m.span 
                  className="mr-2 transition-transform group-hover:-translate-x-1"
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  ←
                </m.span> 
                Retour aux articles
              </Link>
            </m.div>
            
            <m.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-dark-300/50 text-dark-800 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {blogPost.category}
              </span>
              <span className="text-dark-600 text-sm">{blogPost.date}</span>
            </m.div>
            
            <m.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-10 text-dark-900 max-w-4xl">
              {blogPost.title}
            </m.h1>
            
            <m.div variants={fadeInUp} className="flex items-center">
              <div className="w-14 h-14 bg-accent-500/10 rounded-full mr-5 flex items-center justify-center text-2xl">
                {blogPost.imageEmoji}
              </div>
              <div>
                <p className="font-semibold text-dark-800">{blogPost.author}</p>
                <p className="text-sm text-dark-600">Auteur</p>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>
      
      {/* Article Cover Image - Nouvelle section */}
      {blogPost.image && (
        <section className="py-8 bg-dark-50">
          <div className="container mx-auto px-4">
            <m.div 
              className="relative rounded-2xl overflow-hidden h-[40vh] md:h-[50vh] w-full max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${blogPost.color || 'from-accent-500/20 to-accent-600/20'} z-0`}></div>
              <div className="absolute inset-0 z-10">
                <Image 
                  src={blogPost.image}
                  alt={blogPost.title}
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 80vw"
                  style={{ objectFit: 'cover' }}
                  className="mix-blend-luminosity opacity-90"
                />
              </div>
            </m.div>
          </div>
        </section>
      )}
      
      {/* Article Content - Version améliorée */}
      <section className="py-16 bg-dark-50">
        <div className="container mx-auto px-4">
          <m.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <m.div className="prose prose-lg prose-dark mx-auto glass p-8 md:p-12 rounded-2xl">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </m.div>
            
            {/* Article Tags - Nouvelle section */}
            <div className="mt-12 flex flex-wrap gap-2 justify-center">
              <span className="px-4 py-1.5 rounded-full text-sm bg-dark-200/50 text-dark-600 backdrop-blur-sm">
                #{blogPost.category.toLowerCase().replace(/\s+/g, '')}
              </span>
              <span className="px-4 py-1.5 rounded-full text-sm bg-dark-200/50 text-dark-600 backdrop-blur-sm">
                #article
              </span>
              <span className="px-4 py-1.5 rounded-full text-sm bg-dark-200/50 text-dark-600 backdrop-blur-sm">
                #technologie
              </span>
            </div>
          </m.div>
        </div>
      </section>
      
      {/* Related Articles - Version améliorée */}
      <section className="py-20 bg-dark-100/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
          >
            <m.h2 variants={fadeInUp} className="text-3xl font-bold mb-10 text-dark-900 text-center">
              Articles similaires
            </m.h2>
            
            <m.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {getBlogPosts()
                .filter(p => p.id !== blogPost.id)
                .slice(0, 3)
                .map(relatedPost => (
                  <Link
                    href={`/blog/${relatedPost.id}`}
                    key={relatedPost.id}
                    className="block h-full"
                  >
                    <m.div 
                      className="card h-full hover:border-accent-500 transition-all duration-300 overflow-hidden"
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${relatedPost.color || 'from-accent-500/20 to-accent-600/20'} z-0`}></div>
                        {relatedPost.image && (
                          <div className="absolute inset-0 z-10">
                            <Image 
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              style={{ objectFit: 'cover' }}
                              className="mix-blend-luminosity opacity-90 hover:opacity-100 transition-opacity"
                            />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="bg-dark-300/70 backdrop-blur-sm text-dark-800 px-3 py-1 rounded-full text-xs">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="card-body p-6">
                        <h3 className="text-xl font-semibold mb-3 text-dark-900">{relatedPost.title}</h3>
                        <p className="text-dark-600 mb-4 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-dark-300/20">
                          <span className="text-dark-600 text-xs">{relatedPost.date}</span>
                          <span className="text-accent-500 hover:text-accent-600 flex items-center text-sm font-medium">
                            Lire plus <span className="ml-1">→</span>
                          </span>
                        </div>
                      </div>
                    </m.div>
                  </Link>
                ))}
            </m.div>
            
            <m.div variants={fadeInUp} className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-accent-500 text-dark-900 font-medium rounded-lg hover:bg-accent-600 transition-colors"
              >
                <span className="mr-2">Voir tous les articles</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>
    </>
  );
} 