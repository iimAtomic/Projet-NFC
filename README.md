# The ONE - Portfolio Gratuit + Cartes NFC

![The One Logo](public/logo.png)

VKARD est une plateforme moderne de création de portfolios personnels avec support des cartes NFC. Construite avec Angular 20, elle offre une expérience utilisateur fluide et des fonctionnalités avancées de gestion de contenu.

## 🚀 Fonctionnalités

### 🔐 Authentification & Autorisation
- **Inscription/Connexion** avec validation de formulaire
- **Gestion des rôles** (USER/ADMIN) avec redirection automatique
- **Guards de sécurité** pour protéger les routes sensibles
- **Persistance de session** avec localStorage

### 👤 Gestion des Utilisateurs
- **Profils publics** accessibles via `/p/:username`
- **Dashboard personnel** pour la gestion du contenu
- **Panel d'administration** pour les administrateurs
- **Gestion des utilisateurs** (liste, suppression, liens de profil)

### 🎨 Portfolio Personnel
- **Profil public** avec informations personnelles
- **Expériences professionnelles** avec historique détaillé
- **Liens sociaux** (GitHub, LinkedIn, Twitter, Website)
- **Design responsive** avec Tailwind CSS

### 🛠️ Fonctionnalités Techniques
- **Lazy Loading** pour optimiser les performances
- **Angular Signals** pour la gestion d'état réactive
- **Angular Effects** pour les effets de bord
- **Interceptors HTTP** pour la gestion du loading
- **Tests unitaires** complets (Jasmine/Karma)
- **Accessibilité** (ARIA, navigation clavier)

## 🏗️ Architecture

### Structure du Projet
```
src/
├── app/
│   ├── core/                    # Services et logique métier
│   │   ├── data/               # Données mock et types
│   │   ├── guards/             # Guards de sécurité
│   │   ├── interceptors/       # Interceptors HTTP
│   │   └── services/           # Services principaux
│   ├── features/               # Modules fonctionnels
│   │   ├── admin/              # Panel d'administration
│   │   ├── auth/               # Authentification
│   │   ├── dashboard/          # Tableau de bord
│   │   ├── home/               # Page d'accueil
│   │   └── portfolio/          # Profils publics
│   └── shared/                 # Composants partagés
│       ├── directives/         # Directives personnalisées
│       └── pipes/              # Pipes personnalisés
```

### Technologies Utilisées
- **Angular 20** - Framework principal
- **TypeScript** - Langage de développement
- **Tailwind CSS** - Framework CSS
- **RxJS** - Programmation réactive
- **Jasmine/Karma** - Tests unitaires
- **ESLint/Prettier** - Qualité de code

## 🚀 Installation & Setup

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Git

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd projet-nfc

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

### Scripts Disponibles
```bash
# Développement
npm start                    # Serveur de développement
npm run watch               # Build en mode watch

# Build
npm run build               # Build de production
npm run build:vercel        # Build pour Vercel

# Tests
npm test                    # Tests unitaires
npm run test -- --watch    # Tests en mode watch

# Qualité de code
npm run lint                # Vérification ESLint
npm run lint:fix            # Correction automatique ESLint
npm run format              # Formatage Prettier
npm run format:check        # Vérification formatage
```

## 📱 Utilisation

### Comptes de Test
Le projet inclut des comptes de test pré-configurés :

**Utilisateur Standard :**
- Username: `jdoe`
- Email: `jdoe@example.com`
- Password: `Password123!`

**Administrateur :**
- Username: `admin`
- Email: `admin@tapfolio.dev`
- Password: `AdminStrong!2024`

### Navigation
1. **Page d'accueil** (`/`) - Présentation du service
2. **Authentification** (`/auth/login`, `/auth/register`) - Connexion/Inscription
3. **Dashboard** (`/dashboard`) - Gestion du profil personnel
4. **Panel Admin** (`/admin`) - Administration (rôle ADMIN uniquement)
5. **Profil Public** (`/p/:username`) - Affichage public du portfolio

### Fonctionnalités par Rôle

#### 👤 Utilisateur Standard
- Création et gestion du profil personnel
- Ajout d'expériences professionnelles
- Configuration des liens sociaux
- Visualisation du profil public

#### 👑 Administrateur
- Toutes les fonctionnalités utilisateur
- Accès au panel d'administration
- Liste de tous les utilisateurs
- Suppression d'utilisateurs
- Liens directs vers les profils publics

## 🔧 Configuration

### Variables d'Environnement
Le projet utilise des données mock stockées en localStorage. Pour la production, configurez :

```typescript
// src/app/core/services/auth.service.ts
// Modifier l'URL de l'API selon votre backend
```

### Personnalisation
- **Thème** : Modifier `src/styles.css` et `tailwind.config.js`
- **Données** : Éditer `src/app/core/data/mock-users.ts`
- **Routes** : Configurer `src/app/app.routes.ts`

## 🧪 Tests

### Structure des Tests
```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   ├── auth.guard.spec.ts
│   │   │   └── admin.guard.spec.ts
│   │   └── services/
│   │       ├── auth.service.spec.ts
│   │       ├── user-storage.service.spec.ts
│   │       └── portfolio.service.spec.ts
│   ├── features/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── login.component.spec.ts
│   │   │   └── register/
│   │   │       └── register.component.spec.ts
│   │   └── admin/
│   │       └── admin.component.spec.ts
│   └── shared/
│       └── pipes/
│           └── truncate.pipe.spec.ts
```

### Exécution des Tests
```bash
# Tous les tests
npm test

# Tests en mode watch
npm test -- --watch

# Tests avec couverture
npm test -- --code-coverage
```

## 🎨 Personnalisation

### Ajout de Nouvelles Fonctionnalités
1. Créer le composant dans `src/app/features/`
2. Ajouter la route dans `src/app/app.routes.ts`
3. Implémenter les tests unitaires
4. Mettre à jour la documentation

### Styles et Thème
- **Couleurs** : Modifier `tailwind.config.js`
- **Polices** : Éditer `src/index.html` et `src/styles.css`
- **Animations** : Utiliser GSAP dans les composants

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build:vercel
# Déployer le dossier dist/projet-nfc
```

### Autres Plateformes
```bash
npm run build
# Déployer le dossier dist/
```

## 📊 Performance

### Optimisations Incluses
- **Lazy Loading** des modules
- **OnPush** change detection
- **Angular Signals** pour la réactivité
- **Tree Shaking** automatique
- **Compression** des assets

### Métriques
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

## 🔒 Sécurité

### Mesures Implémentées
- **Guards de route** pour l'authentification
- **Validation des formulaires** côté client
- **Protection CSRF** (à configurer en production)
- **Sanitisation** des données utilisateur

### Recommandations Production
- Implémenter un backend sécurisé
- Utiliser HTTPS
- Configurer les CORS
- Ajouter la validation côté serveur

## 🤝 Contribution

### Workflow
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code
- Utiliser ESLint et Prettier
- Écrire des tests pour les nouvelles fonctionnalités
- Documenter les changements majeurs
- Suivre les conventions Angular

## 📝 Changelog

### Version 0.0.0
- ✅ Authentification complète (login/register)
- ✅ Gestion des rôles et permissions
- ✅ Dashboard utilisateur
- ✅ Panel d'administration
- ✅ Profils publics
- ✅ Tests unitaires complets
- ✅ Accessibilité (ARIA, navigation clavier)
- ✅ Angular Effects et Signals
- ✅ Design responsive avec Tailwind CSS

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation Angular
- Vérifier les tests unitaires pour les exemples d'utilisation

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec Par ImAtomiic en Angular 20**