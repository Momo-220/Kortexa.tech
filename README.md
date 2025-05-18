# Site web Kortexa

## Technologies utilisées

- Next.js (avec App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Prérequis

- Node.js 18+ 
- npm ou yarn

## Installation

```bash
# Cloner le dépôt
git clone <url-du-dépôt>
cd <nom-du-projet>

# Installer les dépendances
npm install
# ou
yarn install
```

## Développement local

```bash
# Démarrer le serveur de développement
npm run dev
# ou
yarn dev
```

Le site sera disponible à l'adresse `http://localhost:3000`.

## Déploiement sur Vercel

### Option 1 : Déploiement automatique (recommandé)

1. Créez un compte sur [Vercel](https://vercel.com)
2. Créez un nouveau projet et importez votre dépôt Git
3. Vercel détectera automatiquement qu'il s'agit d'un projet Next.js
4. Cliquez sur "Deploy"

### Option 2 : Déploiement via CLI Vercel

1. Installez Vercel CLI:
```bash
npm i -g vercel
```

2. Connectez-vous à votre compte Vercel:
```bash
vercel login
```

3. Déployez le projet:
```bash
vercel
```

## Fonctionnalités principales

- Plusieurs langues prises en charge
- Navigation améliorée avec préchargement des liens
- Interface utilisateur moderne avec animations
- Chatbot intégré
- Compatibilité mobile

## Configuration du Chatbot

Le chatbot utilise l'API Gemini de Google. Pour le configurer :

1. Obtenez une clé API sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez un fichier `.env.local` à la racine du projet
3. Ajoutez votre clé API dans le fichier `.env.local` :
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

Si aucune clé API n'est fournie, le chatbot fonctionnera en mode démonstration avec des réponses simulées.

## Développement local

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev
```

Le serveur démarrera sur le port 3002 : [http://localhost:3002](http://localhost:3002)

## Déploiement

```bash
# Construction pour la production
npm run build

# Démarrage du serveur de production
npm run start
```

## Structure du projet

- `/src/app` - Pages et routes de l'application
- `/src/components` - Composants React réutilisables
- `/src/components/ui` - Composants d'interface utilisateur (dont le ChatBot)
- `/src/services` - Services et intégrations externes (dont l'API Gemini)
- `/src/utils` - Utilitaires et fonctions d'aide
- `/public` - Ressources statiques (images, etc.)

## Personnalisation du Chatbot

Le composant ChatBot (`src/components/ui/ChatBot.tsx`) peut être personnalisé avec les propriétés suivantes :

- `position` - Position du chatbot sur l'écran ('bottom-right' ou 'bottom-left')
- `title` - Titre affiché dans l'en-tête du chatbot
- `welcomeMessage` - Message d'accueil affiché au chargement
- `apiKey` - Clé API Gemini (par défaut, utilise la variable d'environnement)

## Technologies Utilisées

- **Framework**: Next.js
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Interface Utilisateur**: Composants personnalisés avec design moderne

## Fonctionnalités Principales

### Page d'Accueil
- Header avec animations et présentation de l'entreprise
- Carrousel de logos des partenaires avec défilement automatique
- Vue d'ensemble des services
- Sections de présentation de l'entreprise

### Carrousel de Logos des Partenaires
- Défilement infini et automatique des logos
- Support pour les images au format JPG 
- Effet de fondu sur les bords avec gradient
- Gestion responsive pour différentes tailles d'écran
- Fallback textuel pour les partenaires sans logo

### Page de Services
- Présentation détaillée des services offerts
- Card design moderne et interactif
- Affichage des études de cas avec images illustratives
- Liste des technologies utilisées pour chaque service
- Résultats clés pour chaque type de service

### Page de Projets (Outils)
- Portfolio des projets réalisés par l'entreprise
- Filtrage par catégorie de projet
- Affichage des technologies utilisées pour chaque projet
- Design de carte macOS-like pour chaque projet
- Statut des projets (disponible ou en développement)
- Support pour les images des projets

## Structure des Dossiers d'Images

- `/public/logos/` - Logos des partenaires au format JPG
- `/public/projects/` - Images des projets du portfolio
- `/public/case-studies/` - Images des études de cas pour les services

## Instructions pour les Images

### Logos des Partenaires
Les logos des partenaires doivent être placés dans le dossier `/public/logos/` au format JPG et nommés selon le nom du partenaire (par exemple, `google.jpg`).

### Images de Projets
Pour ajouter une image à un projet dans le portfolio, placez l'image correspondante dans le dossier `/public/projects/` et référencez-la dans le composant de la page Outils.

### Images d'Études de Cas
Pour les études de cas dans la section Services, placez les images dans le dossier `/public/case-studies/` et assurez-vous de mettre à jour les références dans le composant de la page Services.

## Comment Personnaliser le Site

### Ajouter un Nouveau Projet
1. Ajoutez une nouvelle entrée dans le tableau `myProjects` dans le fichier `src/app/outils/page.tsx`
2. Placez l'image du projet dans le dossier `/public/projects/`
3. Personnalisez les détails du projet (titre, description, technologies, etc.)

### Modifier les Services
1. Modifiez le tableau `services` dans le fichier `src/app/services/page.tsx`
2. Placez l'image de l'étude de cas dans le dossier `/public/case-studies/`
3. Mettez à jour les détails du service (description, fonctionnalités, etc.)

### Ajouter un Nouveau Partenaire au Carrousel
1. Ajoutez une nouvelle entrée dans le tableau `partners` dans le fichier `src/components/LogoCarousel.tsx`
2. Placez le logo du partenaire dans le dossier `/public/logos/`
3. Si nécessaire, ajoutez le nom du partenaire à la liste `logosWithImages`

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT 