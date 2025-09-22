# Tapfolio 🚀

Une application Angular 17 moderne pour créer des portfolios professionnels numériques.

## ✨ Fonctionnalités

- **Portfolio Public** : Page publique avec design moderne et responsive
- **Authentification** : Système de connexion/inscription avec guards
- **Dashboard** : Interface d'édition de profil avec FormArray pour les expériences
- **Panel Admin** : Gestion des utilisateurs pour les administrateurs
- **Thème Sombre** : Design moderne avec Tailwind CSS et accents violets
- **Tests** : Couverture de tests unitaires et d'intégration

## 🛠️ Technologies

- **Angular 17** avec Standalone Components
- **Tailwind CSS** pour le styling
- **TypeScript** en mode strict
- **Angular Signals** pour la gestion d'état
- **RxJS** pour la programmation réactive
- **ESLint + Prettier** pour la qualité du code
- **Husky** pour les pre-commit hooks

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Installer Husky pour les pre-commit hooks
npm run prepare

# Démarrer le serveur de développement
npm start
```

## 📝 Scripts disponibles

```bash
# Développement
npm start                    # Serveur de développement
npm run build               # Build de production
npm run watch               # Build en mode watch

# Tests
npm test                    # Lancer les tests
npm run test -- --watch=false --browsers=ChromeHeadless

# Qualité du code
npm run lint                # Linter ESLint
npm run lint:fix            # Corriger automatiquement les erreurs ESLint
npm run format              # Formater avec Prettier
npm run format:check        # Vérifier le formatage
```

## 🏗️ Architecture DDD

```
src/app/
├── core/                   # Logique métier
│   ├── data/              # Données mock
│   ├── guards/            # Guards de protection
│   ├── interceptors/      # Intercepteurs HTTP
│   └── services/          # Services métier
├── features/              # Fonctionnalités
│   ├── auth/             # Authentification
│   ├── dashboard/         # Tableau de bord
│   ├── admin/             # Panel administrateur
│   ├── home/              # Page d'accueil
│   └── portfolio/         # Portfolio public
└── shared/                # Composants partagés
    ├── pipes/             # Pipes personnalisés
    └── directives/        # Directives personnalisées
```

## 🔐 Comptes de démonstration

- **Utilisateur** : `jdoe` / `Password123!`
- **Admin** : `admin` / `AdminStrong!2024`

## 🧪 Tests

```bash
# Tests unitaires
npm test

# Tests avec couverture
npm run test -- --code-coverage
```

## 📦 Build et déploiement

```bash
# Build de production
npm run build

# Les fichiers sont générés dans dist/
```

## 🎨 Design

- **Thème** : Sombre avec accents violets (#A020F0)
- **Responsive** : Mobile-first design
- **Composants** : Standalone Angular 17
- **Styling** : Tailwind CSS avec configuration personnalisée

## 🔧 Configuration

- **ESLint** : Configuration Angular avec règles strictes
- **Prettier** : Formatage automatique du code
- **Husky** : Pre-commit hooks pour la qualité
- **Lint-staged** : Linting des fichiers modifiés uniquement

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.