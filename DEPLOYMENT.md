# Guide de Déploiement - Rentiful NextJS

Ce guide explique comment déployer l'application Rentiful NextJS en utilisant Docker.

## Environnements

### Développement

Pour le développement local avec hot-reload :

```bash
# Démarrer l'environnement de développement
docker-compose up -d

# Voir les logs
docker-compose logs -f web

# Arrêter l'environnement
docker-compose down
```

L'application sera accessible sur `http://localhost:3000`

### Production

Pour déployer en production :

```bash
# Construire l'image de production
npm run build:prod

# Démarrer l'environnement de production
npm run start:prod

# Arrêter l'environnement de production
npm run stop:prod
```

Ou manuellement :

```bash
# Construire l'image
docker build -t rentiful-nextjs-prod -f Dockerfile.prod .

# Démarrer le container
docker run -p 3000:3000 rentiful-nextjs-prod

# Ou utiliser docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

L'application sera accessible sur `http://localhost:3000`

## Configuration

### Variables d'environnement

Créez un fichier `.env.local` pour les variables d'environnement :

```env
NEXT_PUBLIC_API_BASE_URL=https://api.rentiful.com
NODE_ENV=production
```

### Configuration Next.js

Le fichier `next.config.ts` est configuré pour :

- Mode `standalone` pour Docker
- Support de `next-intl` pour l'internationalisation

## Tests

### Tests avec Docker

```bash
# Exécuter tous les tests
npm run test:docker

# Tests avec couverture
npm run test:docker:coverage

# Tests en mode watch
npm run test:docker:watch
```

### Tests locaux

```bash
# Si node_modules est installé localement
npm test
npm run test:coverage
```

## Monitoring

### Health Check

L'environnement de production inclut un health check qui vérifie que l'application répond sur le port 3000.

### Logs

```bash
# Voir les logs du container de production
docker logs rentiful-nextjs-prod

# Suivre les logs en temps réel
docker logs -f rentiful-nextjs-prod
```

## Optimisations

### Image Docker

L'image de production utilise :

- Multi-stage build pour réduire la taille
- Alpine Linux pour un environnement minimal
- Mode standalone de Next.js
- Cache npm optimisé

### Performance

- Compression gzip activée
- Cache des assets statiques
- Optimisation des images Next.js
- Build optimisé pour la production

## Dépannage

### Problèmes courants

1. **Port déjà utilisé** : Changez le port dans docker-compose.yml
2. **Build échoue** : Vérifiez que tous les tests passent
3. **Container ne démarre pas** : Vérifiez les logs avec `docker logs`

### Commandes utiles

```bash
# Voir les containers en cours
docker ps

# Voir toutes les images
docker images

# Nettoyer les images inutilisées
docker system prune

# Rebuild sans cache
docker build --no-cache -t rentiful-nextjs-prod -f Dockerfile.prod .
```
