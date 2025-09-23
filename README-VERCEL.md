# 🚀 Déploiement Vercel - Tapfolio

## Configuration Vercel

### 1. Configuration automatique
Le projet est configuré pour Vercel avec :
- ✅ `vercel.json` - Configuration de déploiement
- ✅ Build optimisé pour la production
- ✅ Routing SPA pour Angular
- ✅ Variables d'environnement

### 2. Scripts de build
```bash
# Build standard
npm run build

# Build optimisé pour Vercel
npm run build:vercel
```

### 3. Variables d'environnement
Copiez `vercel-env.example` et configurez :
```bash
cp vercel-env.example .env.local
```

### 4. Déploiement

#### Option A : Vercel CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel

# Déploiement en production
vercel --prod
```

#### Option B : GitHub Integration
1. Connectez votre repo GitHub à Vercel
2. Vercel détectera automatiquement la configuration
3. Déploiement automatique à chaque push

### 5. Configuration Vercel Dashboard

#### Build Settings
- **Framework Preset**: Angular
- **Build Command**: `npm run build:vercel`
- **Output Directory**: `dist/projet-nfc`
- **Install Command**: `npm install`

#### Environment Variables
```
NODE_ENV=production
NG_BUILD_OPTIMIZATION=true
NG_BUILD_AOT=true
```

### 6. Optimisations incluses

#### Angular Production Build
- ✅ AOT (Ahead-of-Time) compilation
- ✅ Tree shaking
- ✅ Minification
- ✅ Bundle optimization
- ✅ Source maps désactivés
- ✅ License extraction

#### Vercel Optimizations
- ✅ Edge caching
- ✅ CDN global
- ✅ Automatic HTTPS
- ✅ Compression gzip/brotli

### 7. Monitoring et Analytics

#### Vercel Analytics (optionnel)
```bash
npm install @vercel/analytics
```

#### Performance Monitoring
- Core Web Vitals tracking
- Real User Monitoring
- Error tracking

### 8. Domain et SSL
- ✅ HTTPS automatique
- ✅ Custom domain support
- ✅ SSL certificates automatiques

### 9. Troubleshooting

#### Build Errors
```bash
# Vérifier la configuration
npm run build:vercel

# Logs détaillés
vercel logs
```

#### Routing Issues
- Vérifiez que `vercel.json` contient la route catch-all
- Assurez-vous que le routing Angular est configuré

### 10. Performance Tips

#### Bundle Analysis
```bash
# Analyser le bundle
npm run build:vercel -- --stats-json
npx webpack-bundle-analyzer dist/projet-nfc/stats.json
```

#### Lazy Loading
- ✅ Routes lazy-loaded
- ✅ Components standalone
- ✅ Tree-shaking optimisé

## 🎯 Résultat attendu

- **Performance**: 90+ Lighthouse Score
- **SEO**: Meta tags optimisés
- **PWA Ready**: Service worker ready
- **Mobile**: Responsive design
- **Accessibility**: WCAG compliant

## 📊 Monitoring

### Vercel Dashboard
- Build logs
- Performance metrics
- Error tracking
- Analytics

### Core Web Vitals
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

**🚀 Votre application Tapfolio est prête pour la production !**
