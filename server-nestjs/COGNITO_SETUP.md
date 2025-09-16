# Configuration AWS Cognito pour Rentiful Backend

Ce guide explique comment configurer l'authentification AWS Cognito avec le backend NestJS.

## Prérequis

1. Un User Pool AWS Cognito configuré
2. Un App Client configuré dans le User Pool
3. Les variables d'environnement configurées

## Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rentiful?schema=public"

# AWS Cognito Configuration
COGNITO_USER_POOL_ID=your-user-pool-id
COGNITO_CLIENT_ID=your-client-id
COGNITO_REGION=your-region

# JWT Secret (for local development)
JWT_SECRET=your-jwt-secret-key

# Server Configuration
PORT=4000
FRONTEND_URL=http://localhost:3000
```

## Configuration AWS Cognito

### 1. User Pool Configuration

Dans votre User Pool AWS Cognito, assurez-vous que :

- **Token expiration** : Configurez selon vos besoins (par défaut 1 heure)
- **Custom attributes** : Ajoutez un attribut personnalisé `role` pour distinguer les managers et tenants
- **App client settings** : Activez les flows d'authentification nécessaires

### 2. Custom Attributes

Ajoutez un attribut personnalisé `role` dans votre User Pool :

- **Name** : `role`
- **Type** : String
- **Min length** : 1
- **Max length** : 20

### 3. App Client Configuration

Dans les paramètres de votre App Client :

- Activez `ALLOW_USER_SRP_AUTH`
- Activez `ALLOW_REFRESH_TOKEN_AUTH`
- Configurez les URLs de callback appropriées

## Structure de l'API

### Endpoints Authentifiés

Tous les endpoints suivants nécessitent un token JWT valide dans l'en-tête `Authorization: Bearer <token>`.

#### Auth

- `GET /auth/profile` - Récupère le profil de l'utilisateur authentifié

#### Managers

- `GET /managers/:cognitoId` - Récupère les données d'un manager
- `PUT /managers/:cognitoId` - Met à jour les données d'un manager

#### Tenants

- `GET /tenants/:cognitoId` - Récupère les données d'un tenant
- `PUT /tenants/:cognitoId` - Met à jour les données d'un tenant

## Sécurité

- **Autorisation** : Les utilisateurs ne peuvent accéder qu'à leurs propres données
- **Validation des tokens** : Tous les tokens JWT sont validés avec AWS Cognito
- **CORS** : Configuré pour permettre les requêtes depuis le frontend

## Utilisation avec le Frontend

Le frontend NextJS utilise AWS Amplify pour l'authentification. Le token JWT obtenu par Amplify est automatiquement inclus dans les requêtes vers le backend.

### Exemple de requête depuis le frontend

```typescript
// Le token est automatiquement inclus par RTK Query
const { data: userData } = useGetAuthUserQuery();
```

## Développement

### Démarrer le serveur

```bash
npm run start:dev
```

### Tests

```bash
npm run test
```

## Déploiement

Assurez-vous que toutes les variables d'environnement sont configurées dans votre environnement de production, notamment :

- `COGNITO_USER_POOL_ID`
- `COGNITO_CLIENT_ID`
- `COGNITO_REGION`
- `DATABASE_URL`
